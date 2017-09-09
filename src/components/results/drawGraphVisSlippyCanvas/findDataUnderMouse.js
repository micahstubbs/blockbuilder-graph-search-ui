export default function findDataUnderMouse(props) {
  const { mousePosition, simulation, searchRadius, transform } = props;
  const m = mousePosition;
  // const mT = [transform.invertX(m[0]), transform.invertY(m[1])];
  const resultFound = simulation.find(m[0], m[1], searchRadius);
  return resultFound;
}
