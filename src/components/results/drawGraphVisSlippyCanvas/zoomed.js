import * as d3 from 'd3';

import render from './render';

export default function zoomed(props) {
  const { context, width, height, graph, imageCache } = props;
  const transform = d3.event.transform;
  const renderProps = {
    context,
    width,
    height,
    transform,
    graph,
    imageCache
  };
  render(renderProps);
}
