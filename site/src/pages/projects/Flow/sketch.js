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
  particles = new Array(NUM_PARTICLES);
  for (let i=0; i < particles.length; i++) {
    var loc = p5.createVector(p5.random(p5.width*1.2), p5.random(p5.height), particleSize);
    var speed = p5.random(0.25,1);
    particles[i] = new Particle(loc, dir, speed);
  }
}

var rows, cols, flowField;

let gridScale = 5;

let NUM_PARTICLES = 3000, particles = [NUM_PARTICLES], particleSize = 0.5;
const FLOW_FIELD_MODE = {
  SIN_WAVE: 'Sine Wave',
  PERLIN_NOISE: 'Perlin Noise',
};


let NOISE_SCALE = 50, ZOOM=0.05, CURVE=2.5;

function defineFlowField(p5, mode, curve, zoom, noiseScale, showField) {
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

function draw(p5, props) {
  //layer on a little color on each refresh so the older particles slowly disappear
  p5.blendMode(p5.MULTIPLY);
  p5.background(p5.color("#CAF0F8"));
  p5.blendMode(p5.BLEND);

  //update the flow field each frame
  let {mode, curve, zoom, noiseScale, numParticles, showField} = props;
  defineFlowField(p5, mode, curve, zoom, noiseScale, showField);

  //update each particle
  for (let i=0; i < numParticles; i++) {
    if (i < particles.length) {
      particles[i].move(p5);
    } else {
      var loc = p5.createVector(p5.random(p5.width*1.2), p5.random(p5.height), particleSize);
      var speed = p5.random(0.25,1);
      var dir = p5.createVector(p5.cos(0), p5.sin(0));
      particles.push(new Particle(loc, dir, speed));
    }
  }
}

export {setup, draw, FLOW_FIELD_MODE, CURVE, ZOOM, NOISE_SCALE, NUM_PARTICLES}