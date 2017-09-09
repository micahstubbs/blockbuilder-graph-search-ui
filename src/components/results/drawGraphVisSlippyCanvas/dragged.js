import * as d3 from 'd3';

import render from './render';
import findDataUnderMouse from './findDataUnderMouse';

export default function dragged(props) {
  const {
    context,
    width,
    height,
    transform,
    graph,
    imageCache,
    simulation,
    searchRadius,
    canvas
  } = props;
  const renderProps = {
    context,
    width,
    height,
    transform,
    graph,
    imageCache
  };
  const m = d3.mouse(canvas);
  const findDataUnderMouseProps = {
    mousePosition: m,
    simulation,
    searchRadius,
    transform
  };
  const d = findDataUnderMouse(findDataUnderMouseProps);
  if (typeof d !== 'undefined') {
    d3.event.subject.fx = transform.invertX(d3.event.x);
    d3.event.subject.fy = transform.invertY(d3.event.y);
    render(renderProps);
  } else {
    d3.event.subject[0] = transform.invertX(d3.event.x);
    d3.event.subject[1] = transform.invertY(d3.event.y);
    render(renderProps);
  }
}
