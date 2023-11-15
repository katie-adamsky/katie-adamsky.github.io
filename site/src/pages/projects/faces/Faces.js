import { ReactP5Wrapper } from "@p5-wrapper/react";
import {setup, draw, keyPressed} from './sketch'

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


export default function Faces() {
  return <ReactP5Wrapper sketch={sketch} />;
}