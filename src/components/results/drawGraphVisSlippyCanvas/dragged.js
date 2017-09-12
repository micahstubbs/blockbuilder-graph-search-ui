import * as d3 from 'd3';

export default function dragged() {
  d3.event.subject.x = d3.event.x;
  d3.event.subject.y = d3.event.y;
}
