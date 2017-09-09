import * as d3 from 'd3';

import findDataUnderMouse from './findDataUnderMouse';

export default function dragSubject(props) {
  const { transform, points, searchRadius, simulation } = props;
  let i;
  const x = transform.invertX(d3.event.x);
  const y = transform.invertY(d3.event.y);
  const m = [x, y];
  const findDataUnderMouseProps = {
    mousePosition: m,
    simulation,
    searchRadius,
    transform
  }
  const d = findDataUnderMouse(findDataUnderMouseProps);
  return d;

  // for (i = points.length - 1; i >= 0; --i) {
  //   let point = points[i];
  //   dx = x - point[0];
  //   dy = y - point[1];
  //   if (dx * dx + dy * dy < searchRadius * searchRadius) {
  //     point.x = transform.applyX(point[0]);
  //     point.y = transform.applyY(point[1]);
  //     return point;
  //   }
  // }
}
