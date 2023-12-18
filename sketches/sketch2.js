let sketchB = function (p) {
  let dom = document.querySelector('#sketchBGoesHere');
  console.log(dom);
  let domWidth = dom.clientWidth;
  let domHeight = dom.clientHeight;
  let canvas;
  var actRandomSeed = 0;
  var count = 150;
  var circles = [];

  p.setup = function () {
    canvas = p.createCanvas(domWidth, domHeight);
    canvas.parent(dom);
    p.cursor(p.CROSS);
    p.noStroke();
    p.fill(0, 130, 164);

    for (let i = 0; i < count; i++) {
      circles.push({
        x: p.random(0, p.width),
        y: p.random(0, p.height),
        angle: p.random(p.TWO_PI),
        sparkle: p.random(255),
        gravity: p.createVector(0, 0),
      });
    }
  };

  p.draw = function () {
    p.clear();

    var faderX = p.mouseX / p.width;

    var centerX = p.width / 2;
    var centerY = p.height / 2;
    var gradientRadius = 90;
    var c1 = p.color('#00000088');
    var c2 = p.color('#FFFFFF');

    // 중심 원 그리기

    for (var r = gradientRadius; r > 0; r--) {
      var inter = p.map(r, gradientRadius, 0, 0, 1);
      var c = p.lerpColor(c1, c2, inter);
      p.fill(c);
      p.ellipse(centerX, centerY, r * 2, r * 2);
    }

    for (var i = 0; i < count; i++) {
      var circle = circles[i];
      var angle = p.radians(360 / count) * i + circle.angle;
      var circleX = centerX + p.cos(angle) * 250;
      var circleY = centerY + p.sin(angle) * 250;

      circle.gravity.set(centerX - circle.x, centerY - circle.y);
      circle.gravity.normalize();
      circle.gravity.mult(1.4); // 중력의 세기

      circle.x += circle.gravity.x;
      circle.y += circle.gravity.y;

      var x = p.lerp(circle.x, circleX, faderX);
      var y = p.lerp(circle.y, circleY, faderX);

      var sparkleAlpha = p.map(p.sin(circle.sparkle), -1, 1, 100, 255);
      var fixedColor = p.color(255, 255, 150, sparkleAlpha);
      p.fill(fixedColor);
      p.ellipse(x, y, 10, 10);

      // 각도 및 반짝임 업데이트
      circle.angle += 0.01;
      circle.sparkle += 0.05;
    }
  };

  p.mousePressed = function () {
    actRandomSeed = p.random(100000);
  };

  p.keyReleased = function () {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
  };
};

var myp5B = new p5(sketchB);
