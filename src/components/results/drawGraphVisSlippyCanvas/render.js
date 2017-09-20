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
      const sourceX = graph.nodes[link.source.index].x + rect.x;
      const sourceY = graph.nodes[link.source.index].y + rect.y;
      const targetX = graph.nodes[link.target.index].x + rect.x;
      const targetY = graph.nodes[link.target.index].y + rect.y;

      const t = Math.atan2(targetY - sourceY, targetX - sourceX);
      const arrowTargetX = targetX - radius * Math.cos(t);
      const arrowTargetY = targetY - radius * Math.sin(t);
      const dt = Math.PI*(3/4);
      const arrowLength  = 6;

      // draw the link line
      context.moveTo(sourceX, sourceY);
      context.lineTo(targetX, targetY);

      // draw the link arrow
      const path = new Path2D();
      // left
      path.moveTo(
        arrowLength * Math.cos(t - dt) + arrowTargetX,
        arrowLength * Math.sin(t - dt) + arrowTargetY
      );
      // right
      path.lineTo(
        arrowLength * Math.cos(t + dt) + arrowTargetX,
        arrowLength * Math.sin(t + dt) + arrowTargetY
      );
      // center-point
      path.lineTo(
        arrowTargetX,
        arrowTargetY
      );
      context.fillStyle = '#aaa'; // link gray
      context.fill(path);
    });
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
}
