import drawLink from './drawLink';
import drawNode from './drawNode';

export default function render(props) {
  const { context, width, height, transform, graph, imageCache } = props;
  context.save();
  context.clearRect(0, 0, width, height);
  context.beginPath();
  context.translate(transform.x, transform.y);
  context.scale(transform.k, transform.k);

  // draw links
  graph.links.forEach(drawLink.bind(this, context));
  context.strokeStyle = '#aaa';
  context.stroke();

  graph.nodes.forEach(node => {
    context.beginPath();
    drawNode(context, imageCache, width, height, node);
  });

  context.restore();
}
