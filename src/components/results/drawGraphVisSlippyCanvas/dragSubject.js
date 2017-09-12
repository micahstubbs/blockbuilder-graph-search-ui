import * as d3 from 'd3';

export default function dragSubject(props) {
  console.log('dragSubject was called');
  const { graph, radius, rects, currentSubject } = props;
  let i;
  const n = graph.nodes.length;
  let dx;
  let dy;
  let d2;
  let s2 = radius * radius * 4;
  let node;
  let subject;

  for (i = 0; i < n; i += 1) {
    node = graph.nodes[i];
    dx = d3.event.x - node.x - rects[0].x;
    dy = d3.event.y - node.y - rects[0].y;
    d2 = dx * dx + dy * dy;

    // console.log('dx', dx);
    // console.log('dy', dy);
    // console.log('d2', d2);
    // console.log('s2', s2);

    if (d2 < s2) {
      subject = node;
      s2 = d2;
    } else if (typeof subject === 'undefined') {
      let background = rects[0];
      subject = background;
      // console.log('background', background);
    }
  }
  currentSubject[0] = subject;
  return subject;
}
