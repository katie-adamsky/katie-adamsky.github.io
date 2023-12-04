let diameter;
let timer = 0;
const STATES = {
    STOPPED_1: 0,
    EXPANDING: 1,
    STOPPED_2: 2,
    CONTRACTING: 3,
}
let state = STATES.STOPPED_1;

function setup(p5) {
  p5.createCanvas(1000, 600);
  diameter = 50;
}

function draw(p5) {
  p5.background(220);

  if (state === STATES.STOPPED_1) {
    if (timer < 4000) {
      timer += p5.deltaTime;
    } else {
      timer = 0;
      state = STATES.EXPANDING;
    }
  }

  else if (state === STATES.EXPANDING) {
    if (timer < 4000) {
      diameter += 2;
      timer += p5.deltaTime;
    } else {
      timer = 0;
      state = STATES.STOPPED_2;
    }
  }

  else if (state === STATES.STOPPED_2) {
    if (timer < 4000) {
      timer += p5.deltaTime;
    } else {
      timer = 0;
      state = STATES.CONTRACTING;
    }
  }
  
  else if (state === STATES.CONTRACTING) {
    if (timer < 4000) {
      diameter -= 2;
      timer += p5.deltaTime;
    } else {
      timer = 0;
      state = STATES.STOPPED_1;
    }
  }

  p5.ellipse(p5.width / 2, p5.height / 2, diameter, diameter);
}
 
  
  export {setup, draw}