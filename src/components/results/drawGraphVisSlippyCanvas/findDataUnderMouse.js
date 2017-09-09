export default function findDataUnderMouse(props) {
  console.log('props from findDataUnderMouse', props);
  const { mousePosition, simulation, searchRadius } = props;
  const m = mousePosition;
  console.log('m', m);
  const resultFound = simulation.find(m[0], m[1], searchRadius);
  console.log('resultFound in findDataUnderMouse', resultFound);
  return resultFound;
}
