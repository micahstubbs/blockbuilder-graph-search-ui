// import drawLink from './drawLink';
import drawNode from './drawNode';

export default function render(props) {
  const { context, width, height, graph, imageCache, rects, radius } = props;
  context.clearRect(0, 0, width, height);
  // draw the invisible background
  rects.forEach(rect => {
    context.clearRect(0, 0, width, height);

    // draw the links
    context.strokeStyle = '#aaa'; // link gray
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
    context.stroke();

    const path = new Path2D();
    path.moveTo(100 / 2 + 50, 100 / 2);
    path.lineTo(100 / 2, 100 / 2 - 50);
    path.lineTo(100 / 2 - 50, 100 / 2);
    context.fillStyle = '#aaa'; // link gray
    context.fill(path);

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
