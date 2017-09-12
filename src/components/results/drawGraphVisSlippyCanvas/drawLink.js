export default function drawLink(props, link) {
  const { graph, context, rect } = props;
  if (
    typeof graph.nodes[link.source] !== 'undefined' &&
    typeof graph.nodes[link.target] !== 'undefined'
  ) {
    // console.log('rect.x', rect.x);
    // console.log('graph.nodes[link.source]', graph.nodes[link.source]);
    // console.log('graph.nodes[link.source].x', graph.nodes[link.source].x);
    context.moveTo(
      graph.nodes[link.source].x + rect.x,
      graph.nodes[link.source].y + rect.y
    );
    context.lineTo(
      graph.nodes[link.target].x + rect.x,
      graph.nodes[link.target].y + rect.y
    );
  }
}
