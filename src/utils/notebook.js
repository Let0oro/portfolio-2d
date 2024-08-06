let canvas;
let r, g, b;

const TOTAL = 3;
let points = [];

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
			size: noise(0.5, 5),
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
    line(pmouseX, pmouseY, mouseX, mouseY);
}

function drawCircles () 
{
    const time = millis()/1000;
	for(let i = 0; i < TOTAL; i++){
		const point = points[i];
		
		point.dir += noise(point.pos.x/4, point.pos.y/4, time)-0.477;
		
		const mouseAngle = atan2(mouseY-point.pos.y * 2, mouseX-point.pos.x);
		point.dir += (mouseAngle - point.dir) * 0.5;
		
		point.size *= 0.99;
		if(point.size < 2){
			point.size = random(2, 5);
			point.pos.x = mouseX + random(-50, 50);
			point.pos.y = mouseY + random(-50, 50);
		}
		
		point.pos.x += cos(point.dir) / (point.size + 2.5) * 10;
		point.pos.y += sin(point.dir) / (point.size + 2.5) * 10;
		
		//trick 5
		strokeWeight(15 * noise(0.005 * frameCount + noise(0, 200)));
		stroke(0)
		fill(220)
		circle(point.pos.x, point.pos.y, point.size);
	}
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;