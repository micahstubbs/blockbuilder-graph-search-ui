import drawLink from './drawLink';
import drawNode from './drawNode';

export default function render(props) {
  const { context, width, height, graph, imageCache, rects, radius } = props;

  context.save();
  context.clearRect(0, 0, width, height);
  // draw the invisible background
  rects.forEach(rect => {
    context.clearRect(0, 0, width, height);

    // draw the links
    context.strokeStyle = '#aaa';
    context.lineWidth = 1;
    context.beginPath();

    const drawLinkProps = { graph, context, rect };
    graph.links.forEach(drawLink.bind(this, drawLinkProps));
    context.stroke();

    // draw the nodes
    context.beginPath();
    const drawNodeProps = {
      rect,
      context,
      imageCache,
      radius
    };
    graph.nodes.forEach(drawNode.bind(this, drawNodeProps));
    context.fill();
  });

  context.restore();
}
