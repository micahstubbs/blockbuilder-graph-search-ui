import * as d3 from 'd3';

export default function nodeDragStarted(props) {
  // const { simulation } = props;
  // if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  // circles.splice(circles.indexOf(d3.event.subject), 1);
  // circles.push(d3.event.subject);
  d3.event.subject.active = true;
}
