import * as d3 from 'd3';
import cloneDeep from 'lodash.clonedeep';
import forceInABox from '../../lib/forceInABox';
import jLouvain from '../../lib/jsLouvain';

import cacheImages from './cacheImages';

export default function drawGraphVisBoundedForce(inputGraph) {
  console.log('drawGraphVisBoundedForce was called');
  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const searchRadius = 30;

  const color = d3.scaleOrdinal().range(d3.schemeCategory20);
  let simulation;

  //
  // cache images
  //
  const imageCache = {};
  drawGraph(inputGraph, 'grid');

  //
  // visualize the graph
  //
  function drawGraph(inputGraph) {
    // make a copy of inputGraph
    // so that we have a pristine globalGraph
    // to use the next time we call drawGraph
    const graph = cloneDeep(inputGraph);

    cacheImages(graph, imageCache);

    // Create the simulation with a small forceX and Y towards the center
    simulation = d3
      .forceSimulation()
      .force('charge', d3.forceManyBody())
      .force('x', d3.forceX(0).strength(0.003))
      .force('y', d3.forceY(0).strength(0.003));

    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    simulation.alphaTarget(0.2).restart();

    //
    // detect communities with jsLouvain
    //
    const nodeData = graph.nodes.map(function(d) {
      return d.id;
    });
    const linkData = graph.links.map(function(d) {
      return { source: d.source, target: d.target, weight: d.weight };
    });

    const community = jLouvain().nodes(nodeData).edges(linkData);
    const result = community();

    const nodeIndexHash = {};
    graph.nodes.forEach(function(node, i) {
      node.group = result[node.id];
      nodeIndexHash[node.id] = i;
    });

    //
    //
    //
    const users = d3
      .nest()
      .key(d => d.user)
      .entries(graph.nodes)
      .sort((a, b) => b.values.length - a.values.length);

    color.domain(users.map(d => d.key));

    //
    // process links data to use simple node array index ids
    // for source and target values
    // to satisfy the assumption of the forceInABox layout
    //
    graph.links.forEach(link => {
      // record the gistId
      link.sourceGistId = link.source;
      link.targetGistId = link.target;

      // now use the node index
      link.source = nodeIndexHash[link.source];
      link.target = nodeIndexHash[link.target];
    });

    //
    // Instantiate the grouping force
    //
    const groupingForce = forceInABox()
      .strength(0.001) // Strength to foci
      .template('force') // Either treemap or force
      .groupBy('group') // Node attribute to group
      .links(graph.links) // The graph links. Must be called after setting the grouping attribute
      .size([width, height]); // Size of the chart

    // Add your forceInABox to the simulation
    simulation
      .nodes(graph.nodes)
      .force('group', groupingForce)
      .force(
        'link',
        d3
          .forceLink(graph.links)
          .distance(50)
          .strength(groupingForce.getLinkStrength) // default link force will try to join nodes in the same group stronger than if they are in different groups
      )
      .on('tick', ticked);

    d3
      .select(canvas)
      .on('mousemove', mousemoved)
      .on('click', clicked)
      .call(
        d3
          .drag()
          .container(canvas)
          .subject(dragsubject)
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      );

    function ticked() {
      context.clearRect(0, 0, width, height);
      context.save();

      context.translate(width / 2, height / 2);

      context.beginPath();
      graph.links.forEach(drawLink.bind(this));
      context.strokeStyle = '#aaa';
      context.stroke();

      users.forEach(user => {
        context.beginPath();
        user.values.forEach(drawNode.bind(this));
      });

      context.restore();
    }

    function dragsubject() {
      const m = [d3.event.x, d3.event.y];
      const d = findDataUnderMouse(m);
      return d;
    }

    function mousemoved() {
      //
      // disable mouse move links for now
      //
      const a = this.parentNode;
      const m = d3.mouse(this);
      const d = findDataUnderMouse(m);

      if (!d) return a.removeAttribute('href');
      a.removeAttribute('title');
      a.setAttribute(
        'href',
        `http://bl.ocks.org/${d.user ? `${d.user}/` : ''}${d.id}`
      );
      a.setAttribute(
        'title',
        `${d.id}${d.user ? ` by ${d.user}` : ''}${d.description
          ? `\n${d.description}`
          : ''}`
      );
    }

    function clicked() {
      console.log('this from clicked', this);
      const m = d3.mouse(this);
      const d = findDataUnderMouse(m);
      const blockUrl = `http://bl.ocks.org/${d.user
        ? `${d.user}/`
        : ''}${d.id}`;
      window.open(blockUrl);
    }
  }

  function findDataUnderMouse(mousePosition) {
    const m = mousePosition;
    const bFM = [
      boundScalar(m[0], 'boundedForce'),
      boundScalar(m[1], 'boundedForce')
    ];
    console.log('m', m);
    console.log('bFM', bFM);
    const resultFound = simulation.find(bFM[0], bFM[1], searchRadius);
    console.log('resultFound in findDataUnderMouse', resultFound);
    return resultFound;
  }

  function dragstarted() {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;
  }

  function dragged() {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
  }

  function dragended() {
    if (!d3.event.active) simulation.alphaTarget(0);
    d3.event.subject.fx = null;
    d3.event.subject.fy = null;
  }

  // a small function to ensure that
  // points stay inside the canvas
  function boundScalar(p) {
    const halfEdge = 448;
    const minP = Math.min(p, halfEdge);
    return Math.max(-halfEdge, minP);
  }

  function drawLink(d) {
    context.moveTo(
      boundScalar(d.source.x),
      boundScalar(d.source.y)
    );
    context.lineTo(
      boundScalar(d.target.x),
      boundScalar(d.target.y)
    );
  }

  function drawNode(d) {
    // old solid color nodes
    // context.moveTo(d.x + 3, d.y);
    // context.arc(d.x, d.y, 3, 0, 2 * Math.PI);

    const image = imageCache[d.id];
    const iconWidth = 92;
    const iconHeight = 48;
    const radius = 22;

    // draw border to check intution
    context.strokeStyle = 'darkgray';
    context.strokeRect(-width / 2, -height / 2, width - 2, height - 2);

    const nX = boundScalar(d.x);
    const nY = boundScalar(d.y);

    // draw images with a circular clip mask
    // so that rectangular thumbnail images become
    // round node icons
    if (typeof image !== 'undefined' && image.height > 0) {
      context.save();
      context.beginPath();
      context.arc(nX, nY, radius, 0, Math.PI * 2, true);
      context.closePath();
      context.clip();

      context.drawImage(
        image,
        0,
        0,
        230,
        120,
        nX - iconWidth / 2,
        nY - iconHeight / 2,
        iconWidth,
        iconHeight
      );

      context.beginPath();
      context.arc(0, 0, 2, 0, Math.PI * 2, true);
      context.clip();
      context.closePath();
      context.restore();
    } else {
      // gray from the blockbuilder search results page
      context.fillStyle = '#EEEEEE';
      context.beginPath();
      context.arc(nX, nY, radius, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();

      // teal from blockbuilder search results page
      context.fillStyle = '#66B5B4';
      context.font = '20px Georgia';
      context.fillText('?', nX - 5, nY + 8);
    }
  }
}
