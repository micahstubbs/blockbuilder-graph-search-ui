export default function onClick(props) {
  const { currentSubject } = props;
  const d = currentSubject[0];

  if (typeof d !== 'undefined') {
    const blockUrl = `http://bl.ocks.org/${d.user ? `${d.user}/` : ''}${d.id}`;
    window.open(blockUrl);
  }
}
