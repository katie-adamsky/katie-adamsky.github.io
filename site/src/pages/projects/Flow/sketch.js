
/*
  Params for flow field
  Decrease noiseScale for a faster-moving field
  Decrease gridScale for more granularity
  set showField to True to visualize the vectors
*/
var rows, cols, flowField;
var noiseScale=10, gridScale = 10;
var showField = true;

function drawFlowField(p5, base, vec) {
  p5.push();
  p5.stroke(p5.color("white"));
  p5.strokeWeight(1);
  p5.fill(p5.color("purple"));
  p5.translate(base.x, base.y);
  p5.line(0, 0, vec.x, vec.y);
  p5.rotate(vec.heading());
  p5.translate(vec.mag(), 0);
  p5.pop();
}

class Particle {
  constructor(loc, dir, speed) {
    this.loc = loc;
    this.dir = dir;
    this.speed = speed;
  }

  
}

let particle;

function setup(p5, canvasWidth) {
  let canvasHeight = 600;
  p5.createCanvas(canvasWidth, canvasHeight);
  p5.colorMode(p5.HSB); 
  cols = Math.floor(p5.width/gridScale);
  rows = Math.floor(p5.height/gridScale);
  flowField = new Array(rows * cols);

  var loc = p5.createVector(Math.random(canvasWidth*1.2), Math.random(canvasHeight), 2);
  var angle = 0; //during draw(), the direction will be determined by the flow field
  var dir = p5.createVector(p5.cos(angle), p5.sin(angle));
  var speed = Math.random(0.5,2);
  particle = new Particle(loc, dir, speed);
}

function draw(p5) {
  p5.fill(0, 10);
  p5.noStroke();
  p5.rect(0, 0, p5.width, p5.height);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let angle = p5.noise(x/noiseScale, y/noiseScale, p5.frameCount/noiseScale)*p5.TWO_PI;
      let vector = p5.constructor.Vector.fromAngle(angle, gridScale);
      if (showField) {
        let base = p5.createVector(x * gridScale, y*gridScale);
        drawFlowField(p5, base, vector);
      }
      flowField[x + y*cols] = vector;
    }
  }
}

export {setup, draw}