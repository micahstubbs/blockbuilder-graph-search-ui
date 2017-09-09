import * as d3 from 'd3';

import render from './render';

export default function dragged(props) {
  const { context, width, height, transform, graph, imageCache } = props;
  const renderProps = {
    context,
    width,
    height,
    transform,
    graph,
    imageCache
  };
  d3.event.subject[0] = transform.invertX(d3.event.x);
  d3.event.subject[1] = transform.invertY(d3.event.y);
  render(renderProps);
}
