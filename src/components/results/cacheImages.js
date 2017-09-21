export default function cacheImages(graph, imageCache) {
  graph.nodes.forEach(d => {
    const image = new Image();

    image.src = `https://gist.githubusercontent.com/raw/${d.id}/thumbnail.png`;
    imageCache[d.id] = image;
  });
}
