
/*
  Params for flow field
  Decrease noiseScale for a faster-moving field
  Decrease gridScale for more granularity
  set showField to True to visualize the vectors
*/
var rows, cols, flowField;
var noiseScale=70, gridScale = 10;
var showField = false;

function drawFlowField(p5, base, vec) {
  p5.push();
  p5.stroke(p5.color("white"));
  p5.strokeWeight(1);
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
    this.history = [];
    this.history.push(this.loc);
  }

  move(p5) {
    let flowFieldIndex = Math.floor(this.loc.x/gridScale) + Math.floor(this.loc.y/gridScale)*cols;
    if (flowFieldIndex < flowField.length && flowFieldIndex >= 0) {
      this.dir = flowField[flowFieldIndex];
    }
    let vel = this.dir.copy();
    this.loc.add(vel.mult(this.speed));
    this.history.push(this.loc.copy());
    if (this.history.length > 30) {
      this.history.shift();
    }
    this.trail(p5);
    if (this.loc.x<0 || this.loc.x>p5.width || this.loc.y<0 || this.loc.y>p5.height) {
      this.loc = p5.createVector(p5.random(p5.width*1.2), p5.random(p5.height), 5);
      this.dir = p5.createVector(p5.cos(0), p5.sin(0));
      this.history = [];
    }
  }

  trail(p5) {
    let col = p5.color("black");
    p5.push();
    let prev = this.history[0];
    for (let i = 1; i < this.history.length; i++) {
      let cur = this.history[i];
      p5.stroke(col);
      p5.strokeWeight(cur.z);
      p5.line(cur.x, cur.y, prev.x, prev.y);
      col = p5.lerpColor(p5.color("black"), p5.color("white"), i/10);
      prev = cur;
    }
    p5.pop();
  }
}

let numParticles = 100, particles = [numParticles];

function setup(p5, canvasWidth) {
  let canvasHeight = 600;
  p5.createCanvas(canvasWidth, canvasHeight);
  p5.colorMode(p5.HSB); 
  cols = Math.floor(p5.width/gridScale);
  rows = Math.floor(p5.height/gridScale);
  flowField = new Array(rows * cols);

  var angle = 0; //during draw(), the direction will be determined by the flow field
  var dir = p5.createVector(p5.cos(angle), p5.sin(angle));
  particles = new Array(numParticles);
  for (let i=0; i < particles.length; i++) {
    var loc = p5.createVector(p5.random(p5.width*1.2), p5.random(p5.height), 5);
    var speed = p5.random(0.25,1);
    particles[i] = new Particle(loc, dir, speed);
  }
}

function draw(p5) {
  p5.background(p5.color(0, 0, 0, 5));
  for (let y = 0; y <= rows; y++) {
    for (let x = 0; x <= cols; x++) {
      let angle = p5.noise(x/noiseScale, y/noiseScale, p5.frameCount/noiseScale)*p5.TWO_PI;
      let vector = p5.constructor.Vector.fromAngle(angle, gridScale);
      if (showField) {
        let base = p5.createVector(x * gridScale, y*gridScale);
        drawFlowField(p5, base, vector);
      }
      flowField[x + y*cols] = vector;
    }
  }
  for (let i=0; i < particles.length; i++) {
    particles[i].move(p5);
  }
}

export {setup, draw}