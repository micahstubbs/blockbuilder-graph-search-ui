import * as d3 from 'd3';

export default function dragended(props) {
  const { simulation } = props;
  if (!d3.event.active) simulation.alphaTarget(0);
  d3.event.subject.fx = null;
  d3.event.subject.fy = null;
}
