import * as d3 from 'd3';

export default function nodeDragStarted(props) {
  const { simulation } = props;
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d3.event.subject.fx = d3.event.subject.x;
  d3.event.subject.fy = d3.event.subject.y;
}
