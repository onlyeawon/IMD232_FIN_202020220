const imgContainers = document.querySelectorAll('.imgContainer');

imgContainers.forEach((container) => {
  const imgs = container.querySelectorAll('img');

  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const imageSpacing = 200; // 이미지 간격

  const usedPositions = []; // 이미지가 배치된 위치를 저장하는 배열

  function getRandomPosition(imgWidth, imgHeight) {
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;

    const angle = Math.random() * 2 * Math.PI;
    const radiusX = Math.random() * (containerWidth / 2 - imgWidth);
    const radiusY = Math.random() * (containerHeight / 2 - imgHeight);

    const left = centerX + radiusX * Math.cos(angle);
    const top = centerY + radiusY * Math.sin(angle);

    return { left, top };
  }

  function checkOverlap(newPosition, imgWidth, imgHeight) {
    for (const usedPosition of usedPositions) {
      if (
        newPosition.left < usedPosition.left + imgWidth + imageSpacing &&
        newPosition.left + imgWidth + imageSpacing > usedPosition.left &&
        newPosition.top < usedPosition.top + imgHeight + imageSpacing &&
        newPosition.top + imgHeight + imageSpacing > usedPosition.top
      ) {
        return true; // 겹치는 경우 true 반환
      }
    }
    return false; // 겹치지 않는 경우 false 반환
  }

  imgs.forEach((eachImg) => {
    const imgWidth = eachImg.clientWidth;
    const imgHeight = eachImg.clientHeight;

    let position;

    do {
      position = getRandomPosition(imgWidth, imgHeight);
    } while (checkOverlap(position, imgWidth, imgHeight));

    eachImg.style.position = 'absolute';
    eachImg.style.left = position.left + 'px';
    eachImg.style.top = position.top + 'px';

    usedPositions.push(position);
  });
});
