const myCanvas = document.querySelector("#isometric");
const windowWidth = myCanvas.clientWidth;
const windowHeight = myCanvas.clientHeight;

let points = [];
const size = (windowHeight + windowWidth) / (2 * 10) / 1.2;
const yScale = 0.8;
const yScaleStreet  = 0.4;
const radius = 10;
const space = 10;
let totalPerRow;
let canvas;

function windowResized() {
  canvas.resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas(windowHeight, windowWidth);
  canvas.parent("isometric");
  canvas.background(220);
  for (let y = size / 2 * yScale; y < height; y += size / 2 * yScale) {
    let x = ((y) % (size * yScale) == 0) ? size : size / 2;
    let firstInRow = true;
    for (; x < width; x += size) {
      let p = createVector(x, y, 1);
      p.orientation = random(["left", "right"]);
      if (firstInRow) {
        //first point in a row cannot be left oriented
        firstInRow = false;
        p.orientation = "right";
      }
      points.push(p);
    }
    //last point in a row cannot be right oriented
    points[points.length - 1].orientation = "left";
    if (!totalPerRow) totalPerRow = points.length;
  }
  noLoop();
}

function draw() {
  canvas.background(220);
  // draw grid
  points.forEach((p, i) => {
    //border
    beginShape();
    vertex(p.x - size / 2, p.y);
    vertex(p.x, p.y - size / 2 * yScale);
    vertex(p.x + size / 2, p.y);
    vertex(p.x, p.y + size / 2 * yScale);
    endShape(CLOSE);

    //center
    // ellipse(p.x, p.y, 8, 8);

    //index
    text(i, p.x - 5, p.y + 5);
  });

  //draw rects
  // drawRects();
}

function drawRects() {
  fill(255, 0, 0);
  noStroke();
  for (let t = 0; t < 100; t++) {
    let p = random(points);
    let i = points.indexOf(p);
    if (
      p.z == 1 && //enabled
      i < points.length - totalPerRow //not the last row
    ) {
      p.z = 0;
      let quad = [];
      if (p.orientation == "right" && points[i + totalPerRow].z == 1) {
        points[i + totalPerRow].z = 0;
        quad.push(createVector(p.x - size / 2 + space, p.y));
        quad.push(createVector(p.x, p.y - size / 2 * yScale + space));
        quad.push(createVector(p.x + size - space, p.y + size / 2 * yScale));
        quad.push(createVector(p.x + size / 2, p.y + size * yScale - space));
      }
      else if (p.orientation == "left" && points[i + totalPerRow - 1].z == 1) {
        points[i + totalPerRow - 1].z = 0;
        quad.push(createVector(p.x - size + space, p.y + size / 2 * yScale));
        quad.push(createVector(p.x, p.y - size / 2 * yScale + space));
        quad.push(createVector(p.x + size / 2 - space, p.y));
        quad.push(createVector(p.x - size / 2, p.y + size * yScale - space));
      }
      drawRoundedPolygon(quad, radius);
    }
  }
}

function convertToClosed(points, radius) {
  // this value *actually* depends on the angle between the lines.
  // a 180 degree angle means f can be 1, a 10 degree angle needs
  // an f closer to 4!
  // const f = 2.5;
  let closed = [];
  let p1, p2, p3, p2l, p2r;
  let dx1, dy1, dx2, dy2, m;
  for (let i = 0, last = points.length; i < last; i++) { // >
    p1 = points[i];
    p2 = points[(i + 1) % last];
    p3 = points[(i + 2) % last];

    dx1 = p2.x - p1.x;
    dy1 = p2.y - p1.y;
    m = sqrt(dx1 * dx1 + dy1 * dy1);
    p2l = createVector(p2.x - radius * dx1 / m, p2.y - radius * dy1 / m);

    dx2 = p3.x - p2.x;
    dy2 = p3.y - p2.y;
    m = sqrt(dx2 * dx2 + dy2 * dy2);
    p2r = createVector(p2.x + radius * dx2 / m, p2.y + radius * dy2 / m);

    closed.push(p2l);
    closed.push(p2);
    closed.push(p2r);
  }
  return closed;
}

function roundIsosceles(p1, p2, p3, t) {
  let mt = 1 - t,
    c1x = (mt * p1.x + t * p2.x),
    c1y = (mt * p1.y + t * p2.y),
    c2x = (mt * p3.x + t * p2.x),
    c2y = (mt * p3.y + t * p2.y);
  return [c1x, c1y, c2x, c2y];
}

function drawRoundedPolygon(points, radius) {
  let closed = convertToClosed(points, radius);
  let p1, p2, p3;
  beginShape();
  for (let i = 0, last = closed.length; i < last; i += 3) { //>
    p1 = closed[i];
    p2 = closed[i + 1];
    p3 = closed[i + 2];
    // rounded isosceles triangle connector values:
    let c = roundIsosceles(p1, p2, p3, 0.75);
    // tell Processing that we have points to add to our shape:
    vertex(p1.x, p1.y);
    bezierVertex(c[0], c[1], c[2], c[3], p3.x, p3.y);
  }
  endShape(CLOSE);
}

window.draw = draw;
window.setup = setup;
window.windowResized = windowResized;
