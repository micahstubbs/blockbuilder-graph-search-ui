import * as d3 from 'd3';

export default function dragEnded() {
  // const { simulation } = props;
  // if (!d3.event.active) simulation.alphaTarget(0);
  // console.log('d3.event.subject from nodeDragEnded', d3.event.subject);
  // uncomment to unpin nodes
  // d3.event.subject.fx = null;
  // d3.event.subject.fy = null;
  d3.event.subject.active = false;
}
