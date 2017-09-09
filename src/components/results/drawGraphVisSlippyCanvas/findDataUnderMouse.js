export default function findDataUnderMouse(props) {
  const { mousePosition, simulation, searchRadius } = props;
  const m = mousePosition;
  const resultFound = simulation.find(m[0], m[1], searchRadius);
  return resultFound;
}
