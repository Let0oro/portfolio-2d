let canvas;
let r, g, b;

const TOTAL = 10;
let points = [];
let angle = 0;

function windowResized() 
{
    resizeCanvas(windowWidth, windowHeight);
}

function setup() 
{
    canvas = createCanvas(windowHeight, windowWidth);
    canvas.position(0, 0);
    canvas.parent("notebook");
    smooth();
    resizeCanvas(windowWidth, windowHeight);
	canvas.background(100);
	noStroke();

    for(var i = 0; i < TOTAL; i++){
		points.push({
			pos: createVector(mouseX + noise(0, 30) - 15, mouseY + noise(0, 30) - 15),
			dir: TWO_PI * noise(0.005 * frameCount),
			size: noise(0.5, 8),
		});
	}

}

function draw() 
{
    canvas.background(220);
	
	drawRects();
    drawLines();
    drawCircles();
}

function drawRects () 
{
	const size = 16*2;
	const totalHLines = Math.ceil(windowHeight / size);

	strokeWeight(.5);
	line(windowWidth * 0.10, 0, windowWidth * 0.10, windowHeight)
	for(let i = 1; i < totalHLines; i++){
		line(0, i * size, windowWidth, i * size)
	}
}

function drawLines() 
{
    strokeWeight(15 * noise(0.005 * frameCount));
    stroke(255 * noise(0.005 * frameCount), 255 * noise(0.005 * frameCount), 255 * noise(0.005 * frameCount));
	if (mouseX > 15 && mouseY > 15 && mouseX < windowWidth - 15 && mouseY < windowHeight - 15) {
		line(pmouseX, pmouseY, mouseX, mouseY);
	}
}

function drawCircles () 
{
    // const time = millis()/1000;
	for(let i = 0; i < TOTAL; i++){
		const point = points[i];
		
		// point.dir += noise(point.pos.x/4, point.pos.y/4, time)-0.477;
		// point.dir += cos(point.pos.x) * sin(point.pos.y);
		
		point.size *= 0.99;
		if(point.size < 2){
			point.size = random(2, 5);
			point.pos.x = mouseX + random(-10, 10);
			point.pos.y = mouseY + random(-10, 10);
		}
		
		// point.pos.x += cos(point.dir) / (point.size + 2.5) * 10;
		// point.pos.y += sin(point.dir) / (point.size + 2.5) * 10;
		
		//trick 5
		strokeWeight(15 * noise(0.005 * frameCount + noise(0, 200)));
		stroke(0)
		fill(0)
		if (point.pos.x < 20 || point.pos.y < 20 || point.pos.x > windowWidth - 20 || point.pos.y > windowHeight - 20) {
			const speed = 0.015 * noise(0.005 * frameCount);
			const radius = 100 * noise(0.005 * frameCount);
			const x = windowWidth/2 + radius * cos(angle + i);
			const y = windowHeight/2 + radius * sin(angle + i);
			circle(x, y, point.size*2);
			angle += speed;
			// circle(windowWidth * noise(0.0005 * frameCount * PI), windowHeight * noise(0.0005 * frameCount * PI**2/2), point.size*2);
		} else {
			circle(point.pos.x, point.pos.y, point.size*2);
		}
	}
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;