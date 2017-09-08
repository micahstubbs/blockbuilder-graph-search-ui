import * as d3 from 'd3';

export default function drawGraphVisSlippyCanvas(inputGraph) {
  console.log('drawGraphVisSlippyCanvas was called');

  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const radius = 2.5;
    let transform = d3.zoomIdentity;

  const points = d3.range(2000).map(phyllotaxis(10));

  console.log('canvas', canvas);

  d3.select(canvas)
    .call(
      d3
        .drag()
        .subject(dragsubject)
        .on('drag', dragged)
    )
    .call(
      d3
        .zoom()
        .scaleExtent([1 / 2, 8])
        .on('zoom', zoomed)
    )
    
  console.log('render from drawGraphVisSlippyCanvas', render);
  const boundRender = render().bind(this, canvas);
  boundRender();

  context.clearRect(0, 0, width, height);

  function zoomed() {
    transform = d3.event.transform;
    render();
  }

  function dragsubject() {
    var i,
      x = transform.invertX(d3.event.x),
      y = transform.invertY(d3.event.y),
      dx,
      dy;

    for (i = points.length - 1; i >= 0; --i) {
      let point = points[i];
      dx = x - point[0];
      dy = y - point[1];
      if (dx * dx + dy * dy < radius * radius) {
        point.x = transform.applyX(point[0]);
        point.y = transform.applyY(point[1]);
        return point;
      }
    }
  }

  function dragged() {
    d3.event.subject[0] = transform.invertX(d3.event.x);
    d3.event.subject[1] = transform.invertY(d3.event.y);
    render();
  }

  function render() {
    context.save();
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.translate(transform.x, transform.y);
    context.scale(transform.k, transform.k);
    points.forEach(drawPoint);
    context.fill();
    context.restore();
  }

  function drawPoint(point) {
    context.moveTo(point[0] + radius, point[1]);
    context.arc(point[0], point[1], radius, 0, 2 * Math.PI);
  }

  function phyllotaxis(radius) {
    var theta = Math.PI * (3 - Math.sqrt(5));
    return function(i) {
      var r = radius * Math.sqrt(i),
        a = theta * i;
      return [width / 2 + r * Math.cos(a), height / 2 + r * Math.sin(a)];
    };
  }
}
