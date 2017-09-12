import dragSubject from './dragSubject';

export default function onClick(props) {
  const { graph, radius, rects } = props;
  const dragSubjectProps = { graph, radius, rects };
  const d = dragSubject(dragSubjectProps);

  if (typeof d !== 'undefined') {
    const blockUrl = `http://bl.ocks.org/${d.user ? `${d.user}/` : ''}${d.id}`;
    window.open(blockUrl);
  }
}
