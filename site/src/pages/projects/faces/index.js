import { ReactP5Wrapper } from "@p5-wrapper/react";
import {setup, draw, keyPressed} from './sketch';
import Project from '../Project';
import useWindowDimensions from "../../../layout/useWindowDimensions";

function handleResize(p5, props) {
  return () => {
    let {width} = props;
    if (width > 1000) {
      width = 1000;
    }
    p5.resizeCanvas(width, 400);
  }
}

function setupBasedOnScreenSize(p5, props) {
  return () => {
    let {width} = props;
    if (width > 1000) {
      width = 1000;
    }
    setup(p5, width);
  }
}

function sketch(p5) {
  let state = {
    width: 1000
  }

  p5.updateWithProps = props => {
    state = Object.assign(state, props)
  };

  p5.setup = setupBasedOnScreenSize(p5, state);
  p5.draw = () => {
    draw(p5);
  }
  p5.keyPressed = () => {
    keyPressed();
  }
  p5.touchStarted = () => {
    let touches = p5.touches;
    if (touches.length > 0 && touches[0].x >= 0 
      && touches[0].x <= p5.width 
      && touches[0].y >= 0 
      && touches[0].y <= p5.height) {
        keyPressed();
    }
  }
  p5.windowResized = handleResize(p5, state);
}

function FacesP5() {
  const {width} = useWindowDimensions();
  return <ReactP5Wrapper sketch={sketch} width={width}/>;
}

const Faces = new Project(
  'Faces', 
  'Randomly generated faces', 
  <p>
    This was a great learning exercise in p5.js. I learned how to draw basic shapes and apply Perlin noise to them to give 
    them a hand-drawn feel. Tap the screen or press any key for a fun surprise!
  </p>, 
  <FacesP5 />,
  "https://github.com/katie-adamsky/katie-adamsky.github.io/blob/main/site/src/pages/projects/faces/sketch.js",
  "yellow"
);

export default Faces;