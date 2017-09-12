// import drawLink from './drawLink';
import drawNode from './drawNode';

export default function render(props) {
  const { context, width, height, graph, imageCache, rects, radius } = props;
  context.clearRect(0, 0, width, height);
  // draw the invisible background
  rects.forEach(rect => {
    context.clearRect(0, 0, width, height);

    // draw the links
      context.strokeStyle = '#aaa';
      context.lineWidth = 1;
      context.beginPath();
      graph.links.forEach(link => {
        context.moveTo(
          graph.nodes[link.source.index].x + rect.x,
          graph.nodes[link.source.index].y + rect.y
        );
        context.lineTo(
          graph.nodes[link.target.index].x + rect.x,
          graph.nodes[link.target.index].y + rect.y
        );
      });
      context.stroke();;

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
}
