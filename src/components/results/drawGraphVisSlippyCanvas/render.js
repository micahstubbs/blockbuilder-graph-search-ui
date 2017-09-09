import drawLink from './drawLink';

export default function render(props) {
  const { context, width, height, transform, points, drawPoint, graph } = props;
  context.save();
  context.clearRect(0, 0, width, height);
  context.beginPath();
  context.translate(transform.x, transform.y);
  context.scale(transform.k, transform.k);

  // draw links
  graph.links.forEach(drawLink.bind(this, context));
  context.strokeStyle = '#aaa';
  context.stroke();
  points.forEach(drawPoint);
  context.fill();

  context.restore();
}
