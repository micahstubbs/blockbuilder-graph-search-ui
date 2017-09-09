export default function drawNode(context, imageCache, width, height, d) {
    // old solid color nodes
    // context.moveTo(d.x + 3, d.y);
    // context.arc(d.x, d.y, 3, 0, 2 * Math.PI);

    const image = imageCache[d.id];
    const iconWidth = 92;
    const iconHeight = 48;
    const radius = 22;

    // draw border to check intution
    // context.strokeStyle = 'darkgray';
    // context.strokeRect(-width / 2, -height / 2, width - 2, height - 2);

    const nX = d.x;
    const nY = d.y;

    // draw images with a circular clip mask
    // so that rectangular thumbnail images become
    // round node icons
    if (typeof image !== 'undefined' && image.height > 0) {
      context.save();
      context.beginPath();
      context.arc(nX, nY, radius, 0, Math.PI * 2, true);
      context.closePath();
      context.clip();

      context.drawImage(
        image,
        0,
        0,
        230,
        120,
        nX - iconWidth / 2,
        nY - iconHeight / 2,
        iconWidth,
        iconHeight
      );

      context.beginPath();
      context.arc(0, 0, 2, 0, Math.PI * 2, true);
      context.clip();
      context.closePath();
      context.restore();
    } else {
      // gray from the blockbuilder search results page
      context.fillStyle = '#EEEEEE';
      context.beginPath();
      context.arc(nX, nY, radius, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();

      // teal from blockbuilder search results page
      context.fillStyle = '#66B5B4';
      context.font = '20px Georgia';
      context.fillText('?', nX - 5, nY + 8);
    }
  }