const imgContainers = document.querySelectorAll('.imgContainer');

imgContainers.forEach((container) => {
  const imgs = container.querySelectorAll('img');

  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  imgs.forEach((eachImg) => {
    const imgWidth = eachImg.clientWidth;
    const imgHeight = eachImg.clientHeight;

    eachImg.style.position = 'absolute';
    eachImg.style.left = Math.random() * (containerWidth - imgWidth) + 'px';
    eachImg.style.top = Math.random() * (containerHeight - imgHeight) + 'px';
  });
});
