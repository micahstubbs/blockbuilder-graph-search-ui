import * as d3 from 'd3';

import findDataUnderMouse from './findDataUnderMouse';

export default function dragSubject(props) {
  const { transform, searchRadius, simulation } = props;
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
}
