import feather from '../../public/assets/images/pluma.png';
let canvas, img, imgback;

const TOTAL = 8;
let points = [];

function windowResized() {
	resizeCanvas(windowWidth, document.body.clientHeight);
}

function preload() {
	img = loadImage(feather);
	imgback = loadImage(feather);
}

function setup() {
	canvas = createCanvas(document.body.clientHeight, windowWidth);
	canvas.position(0, 0);
	canvas.parent("notebook");
	smooth();
	resizeCanvas(windowWidth, document.body.clientHeight);
	// canvas.background(100);
	noStroke();

	angleMode(DEGREES);

	img.resize(20, 79.4 * 1.5);
	imgback.resize(23, 83.4 * 1.5);
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
	console.log({bodyH: document.body.clientHeight});
	console.log({windowHeight});

	drawRects();
	if (windowWidth > 780) {
		drawFeather();
		drawInk();
	}
}

function drawRects() {
	const size = 16 * (1 + (windowWidth > 780));
	const totalHLines = Math.ceil(document.body.clientHeight / size);

	strokeWeight(.5);
	stroke(color(255, 0, 0));
	line(windowWidth * 0.1, 0, windowWidth * 0.1, document.body.clientHeight)
	stroke(0);
	for (let i = 1; i < totalHLines; i++) {
		line(0, i * size, windowWidth, i * size)
	}
}

function drawFeather() {

	push();

	translate(mouseX, mouseY);
	rotate(30);

	image(imgback, 0 - 1.5, 0 - 81.4 * 1.5);
	image(img, 0, 0 - 79.4 * 1.5);
	rotate(0);

	pop();
	
}

function drawInk() {
	var time = millis() / 1000;
	for (let i = 0; i < TOTAL; i++) {
		const point = points[i];

		point.size *= 0.99 % time;
		if (point.size < 1) {
			point.size = random(1, 2.5);
			point.pos.x = (mouseX != pmouseX) ? mouseX + random(-5, 5) : null;
			point.pos.y = (mouseX != pmouseX) ? mouseY + random(-5, 5) : null;
		}

		strokeWeight(15 * noise(0.005 * frameCount + noise(0, 200)));
		stroke(0)
		fill(0)

		if (point.pos.x && point.pos.y) circle(point.pos.x, point.pos.y, point.size * 2);
	}
}

window.setup = setup;
window.draw = draw;
window.preload = preload;
window.windowResized = windowResized;