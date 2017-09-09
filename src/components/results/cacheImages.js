export default function cacheImages(graph, imageCache) {
  graph.nodes.forEach(d => {
    const image = new Image();

    image.src = `https://bl.ocks.org/${d.user
      ? `${d.user}/`
      : ''}raw/${d.id}/thumbnail.png`;
    imageCache[d.id] = image;
  });
}
