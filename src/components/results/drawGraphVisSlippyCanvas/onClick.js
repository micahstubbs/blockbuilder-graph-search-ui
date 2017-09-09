import * as d3 from 'd3';

import findDataUnderMouse from './findDataUnderMouse';

export default function onClick(props) {
  const { simulation, searchRadius, canvas } = props;
  const m = d3.mouse(canvas);
  const findDataUnderMouseProps = {
    mousePosition: m,
    simulation,
    searchRadius
  };
  const d = findDataUnderMouse(findDataUnderMouseProps);
  const blockUrl = `http://bl.ocks.org/${d.user ? `${d.user}/` : ''}${d.id}`;
  window.open(blockUrl);
}
