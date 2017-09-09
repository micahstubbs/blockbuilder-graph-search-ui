export default function render(props) {
  const { context, width, height, transform, points, drawPoint } = props;
  context.save();
  context.clearRect(0, 0, width, height);
  context.beginPath();
  context.translate(transform.x, transform.y);
  context.scale(transform.k, transform.k);
  points.forEach(drawPoint);
  context.fill();
  context.restore();
}
