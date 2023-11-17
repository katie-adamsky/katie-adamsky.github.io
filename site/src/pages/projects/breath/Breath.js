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
  'A generative animated tessellation', 
  <div>
    <p>
      Breath of the Compassionate is the name of an Islamic geometric tessellation.
      You can look at it as a series of diagonally oriented squares - half of them are 
      expanding outwards while the other half contract. It is a study in balance, in give and take.
    </p>
    <p>
      I also added generative and interactive elements to keep it interesting: you can press any key to 
      randomly change the color gradient, or click the animation to pause it.
    </p>
  </div>,
  <BreathP5 />,
  "https://github.com/katie-adamsky/katie-adamsky.github.io/blob/main/site/src/pages/projects/breath/sketch.js",
);


export default Breath;