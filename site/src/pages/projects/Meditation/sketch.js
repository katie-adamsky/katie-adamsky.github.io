class Particle {
    constructor(angle, speed, size, offset) {
      this.angle = angle; //in radians
      this.speed = speed; //in radians
      this.size = size; // diameter of particle
      this.offset = offset; //distance from main circle
    }
  
    move(p5) {
        this.angle += this.speed;
        //this.offset = avgOffset + diameter*Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
        let x = p5.width / 2 + (diameter/2 + this.offset) * Math.cos(this.angle);
        let y = p5.height / 2 + (diameter/2 + this.offset) * Math.sin(this.angle);
        p5.noStroke();
        p5.fill("#CBC0D3");
        p5.ellipse(x, y, this.size, this.size);
    }
}
  
let diameter;
let timer = 0;
const STATES = {
    STOPPED_1: 0,
    EXPANDING: 1,
    STOPPED_2: 2,
    CONTRACTING: 3,
}
let state = STATES.STOPPED_1;
let numParticles = 2000;
let particles;
let avgSpeed = 0.0025, speedStdDev = 0.0005;
let avgOffset = 100, offsetStdDev = 25;


function setup(p5) {
  p5.createCanvas(1000, 600);
  diameter = 50;
  particles = Array.from({length: numParticles}, () =>
    new Particle(
        Math.random() * 2 * Math.PI, //distribute particles evenly over circle to start
        avgSpeed + speedStdDev*Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random()),
        Math.floor(Math.random() * 5), //particle diameter from 0-5 px
        avgOffset + offsetStdDev*Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random()),
    )
  );
  console.log(particles);
}

function changeState(state) {
    if (state === STATES.STOPPED_1) {
      return STATES.EXPANDING;
    }  else if (state === STATES.EXPANDING) {
      return STATES.STOPPED_2;
    } else if (state === STATES.STOPPED_2) {
      return STATES.CONTRACTING;
    } else if (state === STATES.CONTRACTING) {
      return STATES.STOPPED_1;
    }
}

function draw(p5) {
  p5.background("black");
  for (let i=0; i < numParticles; i++) {
    particles[i].move(p5);
  }
  timer += p5.deltaTime;
  if (timer >= 4000) {
    timer = 0;
    state = changeState(state);
  }
  if (state === STATES.EXPANDING) {
    diameter += 1;
  } else if (state === STATES.CONTRACTING) {
    diameter -= 1;
  }

}
 
  
  export {setup, draw}