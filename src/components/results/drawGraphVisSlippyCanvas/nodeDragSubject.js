import * as d3 from 'd3';

import findDataUnderMouse from './findDataUnderMouse';

export default function nodeDragSubject(props) {
  const { simulation, searchRadius } = props;
  const m = [d3.event.x, d3.event.y];
  const findDataUnderMouseProps = {
    mousePosition: m,
    simulation,
    searchRadius
  }
  const d = findDataUnderMouse(findDataUnderMouseProps);
  return d;
}
