import * as d3 from 'd3';
import cloneDeep from 'lodash.clonedeep';

import jLouvain from '../../../lib/jsLouvain';
import forceInABox from '../../../lib/forceInABox';

import render from './render';
import cacheImages from '../cacheImages';
import dragged from './dragged';
import zoomed from './zoomed';
import dragSubject from './dragSubject';
import onClick from './onClick';
import nodeDragSubject from './nodeDragSubject';
import nodeDragStarted from './nodeDragStarted';
import nodeDragged from './nodeDragged';
import nodeDragEnded from './nodeDragEnded';

export default function drawGraphVisSlippyCanvas(inputGraph) {
  console.log('drawGraphVisSlippyCanvas was called');
  console.log('inputGraph from drawGraphVisSlippyCanvas', inputGraph);
  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  let transform = d3.zoomIdentity;

  const imageCache = {};
  let simulation;
  const searchRadius = 30;

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

  const community = jLouvain()
    .nodes(nodeData)
    .edges(linkData);
  const result = community();

  const nodeIndexHash = {};
  graph.nodes.forEach(function(node, i) {
    node.group = result[node.id];
    nodeIndexHash[node.id] = i;
  });

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
    );
  // .on('tick', ticked);

  for (var i = 0; i < 200; i++) {
    simulation.tick();
  }
  simulation.stop();

  //
  // setup drag and zoom
  //
  const draggedProps = {
    context,
    width,
    height,
    transform,
    graph,
    imageCache,
    simulation,
    searchRadius,
    canvas
  };
  const zoomedProps = { context, width, height, graph, imageCache };
  const dragSubjectProps = {
    transform,
    points: graph.nodes,
    searchRadius,
    simulation
  };
  const onClickProps = { simulation, searchRadius, canvas, transform };
  const nodeDragSubjectProps = { simulation, searchRadius };
  const nodeDragStartedProps = { simulation };
  const nodeDragEndedProps = { simulation };
  d3
    .select(canvas)
    .on('click', onClick.bind(this, onClickProps))
    .call(
      d3
        .drag()
        .container(canvas)
        .subject(dragSubject.bind(this, dragSubjectProps))
        .on('start', nodeDragStarted.bind(this, nodeDragStartedProps))
        .on('drag', dragged.bind(this, draggedProps))
        .on('end', nodeDragEnded.bind(this, nodeDragEndedProps))
    )
    // .call(
    //   d3
    //     .drag()
    //     .container(canvas)
    //     .subject(nodeDragSubject.bind(this, nodeDragSubjectProps))
    //     .on('start', nodeDragStarted.bind(this, nodeDragStartedProps))
    //     .on('drag', nodeDragged)
    //     .on('end', nodeDragEnded.bind(this, nodeDragEndedProps))
    // )
    .call(
      d3
        .zoom()
        .scaleExtent([1 / 2, 8])
        .on('zoom', zoomed.bind(this, zoomedProps))
    );

  //
  // call render once to initialize
  //
  let renderProps = {
    context,
    width,
    height,
    transform,
    graph,
    imageCache
  };
  render(renderProps);
}
