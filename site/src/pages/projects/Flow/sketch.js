
/*
  Params for flow field
  Decrease noiseScale for a faster-moving field
  Decrease gridScale for more granularity
  set showField to True to visualize the vectors
*/
var rows, cols, flowField;
var noiseScale=10, gridScale = 10;
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
    this.prev = loc;
    this.dir = dir;
    this.speed = speed;
  }

  move(p5) {
    if (this.loc.x<0 || this.loc.x>p5.width || this.loc.y<0 || this.loc.y>p5.height) {
        this.loc = p5.createVector(p5.random(p5.width*1.2), p5.random(p5.height), 2);
        this.prev = this.loc;
        this.dir = p5.createVector(p5.cos(0), p5.sin(0));
    } else {
      let flowFieldIndex = Math.floor(this.loc.x/gridScale) + Math.floor(this.loc.y/gridScale)*cols;
      if (flowFieldIndex < flowField.length && flowFieldIndex >= 0) {
        this.dir = flowField[flowFieldIndex];
      }
      let vel = this.dir.copy();
      this.prev = this.loc.copy();
      this.loc.add(vel.mult(this.speed));
    }
    this.trail(p5);
  }

  trail(p5) {
    p5.stroke("white");
    p5.strokeWeight(this.loc.z);
    p5.line(this.loc.x, this.loc.y, this.prev.x, this.prev.y);
  }
}

let numParticles = 2000, particles = [numParticles];

function setup(p5, canvasWidth) {
  let canvasHeight = 600;
  p5.createCanvas(canvasWidth, canvasHeight);
  p5.colorMode(p5.HSB); 
  p5.background(p5.color(0, 0, 0, 5));
  cols = Math.floor(p5.width/gridScale);
  rows = Math.floor(p5.height/gridScale);
  flowField = new Array(rows * cols);

  var angle = 0; //during draw(), the direction will be determined by the flow field
  var dir = p5.createVector(p5.cos(angle), p5.sin(angle));
  particles = new Array(numParticles);
  for (let i=0; i < particles.length; i++) {
    var loc = p5.createVector(p5.random(p5.width*1.2), p5.random(p5.height), 2);
    var speed = p5.random(0.25,1);
    particles[i] = new Particle(loc, dir, speed);
  }
}

function draw(p5) {
  //layer on a little gray on each refresh so the older particles slowly disappear
  p5.blendMode(p5.MULTIPLY);
  p5.background(p5.color("#c8c8c8"));
  p5.blendMode(p5.BLEND);
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