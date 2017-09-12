import * as d3 from 'd3';
import cloneDeep from 'lodash.clonedeep';

import jLouvain from '../../../lib/jsLouvain';

import render from './render';
import cacheImages from '../cacheImages';
import dragged from './dragged';
// import zoomed from './zoomed';
import dragSubject from './dragSubject';
import onClick from './onClick';
import dragStarted from './dragStarted';
import dragEnded from './dragEnded';

export default function drawGraphVisSlippyCanvas(inputGraph) {
  console.log('drawGraphVisSlippyCanvas was called');
  console.log('inputGraph from drawGraphVisSlippyCanvas', inputGraph);
  const canvas = d3.select('canvas');
  const context = canvas.node().getContext('2d');
  const width = canvas.property('width');
  const height = canvas.property('height');
  // let transform = d3.zoomIdentity;

  const imageCache = {};
  let simulation;

  // make a rect for the background
  // d3.drag updates these values behind the scenes
  const rects = [{ x: 0, y: 0, x2: 0, y2: 0 }];
  const radius = 22;

  // make a copy of inputGraph
  // so that we have a pristine globalGraph
  // to use the next time we call drawGraph
  const graph = cloneDeep(inputGraph);
  cacheImages(graph, imageCache);

  //
  // setup force simulation
  //
  simulation = d3
    .forceSimulation()
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2));

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

  // .call(
  //   d3
  //     .zoom()
  //     .scaleExtent([1 / 2, 8])
  //     .on('zoom', zoomed.bind(this, zoomedProps))
  // );

  //
  // call render once to initialize
  //
  let renderProps = {
    context,
    width,
    height,
    graph,
    imageCache,
    rects,
    radius
  };

  // add a link force
  simulation
    .nodes(graph.nodes)
    .force('link', d3.forceLink(graph.links).distance(50))
    .on('tick', ticked.bind(this, renderProps));

  //
  // setup drag and zoom
  //
  const draggedProps = {
    context,
    width,
    height,
    graph,
    imageCache,
    simulation,
    radius,
    canvas
  };
  // const zoomedProps = { context, width, height, graph, imageCache };
  const dragSubjectProps = {
    graph,
    radius,
    rects
  };
  const onClickProps = {
    graph,
    radius,
    rects
  };
  const dragStartedProps = { simulation };
  const dragEndedProps = { simulation };
  canvas.on('click', onClick.bind(this, onClickProps)).call(
    d3
      .drag()
      .subject(dragSubject.bind(this, dragSubjectProps))
      .on('start', dragStarted.bind(this, dragStartedProps))
      .on('drag', dragged.bind(this, draggedProps))
      .on('end', dragEnded.bind(this, dragEndedProps))
      .on('start.render drag.render end.render', render.bind(this, renderProps))
  );

  function ticked(props) {
    render(props);
  }
}
