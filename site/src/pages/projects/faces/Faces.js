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

const Faces = new Project('Faces', 'Randomly generated faces', 'TODO description', <FacesP5 />);

export default Faces;