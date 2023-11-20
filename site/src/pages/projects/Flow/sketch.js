var rows, cols, flowField;
var showField = false, gridScale = 5;

let numParticles = 10000, particles = [numParticles], particleSize = 0.5;

class Particle {
  constructor(loc, dir, speed) {
    this.loc = loc;
    this.prev = loc;
    this.dir = dir;
    this.speed = speed;
  }

  move(p5) {
    if (this.loc.x<0 || this.loc.x>p5.width || this.loc.y<0 || this.loc.y>p5.height) {
        this.loc = p5.createVector(p5.random(p5.width*1.2), p5.random(p5.height), particleSize);
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
    p5.stroke("#CBC0D3");
    p5.strokeWeight(particleSize);
    p5.line(this.loc.x, this.loc.y, this.prev.x, this.prev.y);
  }
}

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
    var loc = p5.createVector(p5.random(p5.width*1.2), p5.random(p5.height), particleSize);
    var speed = p5.random(0.25,1);
    particles[i] = new Particle(loc, dir, speed);
  }
}

const FLOW_FIELD_MODE = {
  SIN_WAVE: 'sin_wave',
  PERLIN_NOISE: 'perlin_noise',
  BLACK_HOLE: 'black_hole',
};

function defineFlowField(p5, mode) {
  //Params for sin wave mode (starting point: curve 2.5, zoom 0.08, noiseScale 50)
  let curve=2.5;
  let zoom=0.08;
  //denominator for noise function (decrease for more noise)
  var noiseScale=50; 
  let angle;
  for (let y = 0; y <= rows; y++) {
    for (let x = 0; x <= cols; x++) {
      if (mode === FLOW_FIELD_MODE.SIN_WAVE) {
        angle = (Math.cos(x*zoom) + Math.sin(y*zoom))*curve*p5.noise(x/noiseScale, y/noiseScale, p5.frameCount/noiseScale);
      } else if (mode === FLOW_FIELD_MODE.PERLIN_NOISE) {
        angle = p5.noise(x/noiseScale, y/noiseScale, p5.frameCount/noiseScale)*p5.TWO_PI;
      }
      let vector = p5.constructor.Vector.fromAngle(angle, gridScale);
      if (showField) {
        let base = p5.createVector(x * gridScale, y*gridScale);
        drawFlowField(p5, base, vector);
      }
      flowField[x + y*cols] = vector;
    }
  }
}

function drawFlowField(p5, base, vec) {
  p5.push();
  p5.stroke(p5.color("#48CAE4"));
  p5.strokeWeight(particleSize/2);
  p5.translate(base.x, base.y);
  p5.line(0, 0, vec.x, vec.y);
  p5.rotate(vec.heading());
  p5.translate(vec.mag(), 0);
  p5.pop();
}

function draw(p5) {
  //layer on a little color on each refresh so the older particles slowly disappear
  p5.blendMode(p5.MULTIPLY);
  p5.background(p5.color("#CAF0F8"));
  p5.blendMode(p5.BLEND);

  //update the flow field each frame
  defineFlowField(p5, FLOW_FIELD_MODE.PERLIN_NOISE);

  //update each particle
  for (let i=0; i < particles.length; i++) {
    particles[i].move(p5);
  }
}

export {setup, draw}