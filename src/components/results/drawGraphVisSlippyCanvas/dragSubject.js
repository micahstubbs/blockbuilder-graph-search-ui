import * as d3 from 'd3';

export default function dragSubject(props) {
  const { transform, points, radius } = props;
  let i;
  const x = transform.invertX(d3.event.x);
  const y = transform.invertY(d3.event.y);
  let dx;
  let dy;

  for (i = points.length - 1; i >= 0; --i) {
    let point = points[i];
    dx = x - point[0];
    dy = y - point[1];
    if (dx * dx + dy * dy < radius * radius) {
      point.x = transform.applyX(point[0]);
      point.y = transform.applyY(point[1]);
      return point;
    }
  }
}
