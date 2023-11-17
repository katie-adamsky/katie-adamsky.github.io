import { ReactP5Wrapper } from "@p5-wrapper/react";
import {setup, draw, keyPressed} from './sketch';
import Project from '.././Project';

function sketch(p5) {
  p5.setup = () => {
    setup(p5);
  }
  p5.draw = () => {
    draw(p5);
  }
  p5.keyPressed = () => {
    keyPressed();
  }
}

function FacesP5() {
  return <ReactP5Wrapper sketch={sketch} />;
}

const Faces = new Project(
  'Faces', 
  'Randomly generated faces', 
  <p>
    This was a great learning exercise in p5.js. I learned how to draw basic shapes and apply Perlin noise to them to give 
    them a hand-drawn feel. Press any key for a fun surprise!
  </p>, 
  <FacesP5 />,
  "https://github.com/katie-adamsky/katie-adamsky.github.io/blob/main/site/src/pages/projects/faces/sketch.js"
);

export default Faces;