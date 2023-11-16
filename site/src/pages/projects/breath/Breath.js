import { ReactP5Wrapper } from "@p5-wrapper/react";
import {setup, draw, mousePressed, keyPressed} from './sketch'
import Project from '.././Project';

function sketch(p5) {
  p5.setup = () => {
    setup(p5);
  }
  p5.draw = () => {
    draw(p5);
  };
  p5.mousePressed = () => {
    mousePressed();
  }
  p5.keyPressed = () => {
    keyPressed();
  }
}


function BreathP5() {
  return <ReactP5Wrapper sketch={sketch} />;
}

const Breath = new Project(
  'Breath of the Compassionate', 
  'A generative animated tessalation', 
  'TODO longer description',
  <BreathP5 />,
);


export default Breath;