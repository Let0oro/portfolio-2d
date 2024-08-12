let canvas;
let img, imgback;
let r, g, b;

const TOTAL = 5;
let points = [];
let angle = 0;

function windowResized() {
	resizeCanvas(windowWidth, windowHeight * 2);
}

function preload() {
	img = loadImage('../../public/assets/images/pluma.png');
	imgback = loadImage('../../public/assets/images/pluma.png');
}

function setup() {
	canvas = createCanvas(windowHeight * 2, windowWidth);
	canvas.position(0, 0);
	canvas.parent("notebook");
	smooth();
	resizeCanvas(windowWidth, windowHeight * 2);
	canvas.background(100);
	noStroke();

	img.resize(40, 79.4);
	imgback.resize(44, 83.4);
	img.filter(INVERT);

	for (var i = 0; i < TOTAL; i++) {
		points.push({
			pos: createVector(mouseX + noise(0, 30) - 15, mouseY + noise(0, 30) - 15),
			dir: TWO_PI * noise(0.005 * frameCount),
			size: noise(0.5, 8),
		});
	}

}

function draw() {
	canvas.background(220);

	drawRects();
	drawLines();
	drawCircles();
}

function drawRects() {
	const size = 16 * 2;
	const totalHLines = Math.ceil(windowHeight * 2 / size);

	strokeWeight(.5);
	line(windowWidth * 0.10, 0, windowWidth * 0.10, windowHeight * 2)
	for (let i = 1; i < totalHLines; i++) {
		line(0, i * size, windowWidth, i * size)
	}
}

function drawLines() {

	// Display the image.
	image(imgback, mouseX - 2, mouseY - 81.4);
	image(img, mouseX, mouseY - 79.4);
	
}

function drawCircles() {
	var time = millis() / 1000;
	for (let i = 0; i < TOTAL; i++) {
		const point = points[i];

		point.size *= 0.99 % time;
		if (point.size < 1) {
			point.size = random(1, 2.5);
			point.pos.x = mouseX + random(-10, 10);
			point.pos.y = mouseY + random(-10, 10);
		}

		strokeWeight(15 * noise(0.005 * frameCount + noise(0, 200)));
		stroke(0)
		fill(0)
		// if ((point.pos.x > 20 && point.pos.y > 20 &&
		// 	point.pos.x < windowWidth - 20 && point.pos.y < windowHeight * 2 - 20)
		// ) {
		circle(point.pos.x, point.pos.y, point.size * 2);
		// }
	}
}

window.setup = setup;
window.draw = draw;
window.preload = preload;
window.windowResized = windowResized;