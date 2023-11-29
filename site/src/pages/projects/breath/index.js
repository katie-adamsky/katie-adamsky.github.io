import { ReactP5Wrapper } from "@p5-wrapper/react";
import {setup, draw, mousePressed, keyPressed} from './sketch'
import Project from '../Project';
import useWindowDimensions from "../../../layout/useWindowDimensions";

function handleResize(p5, props) {
  return () => {
    let {width} = props;
    if (width > 1000) {
      width = 1000;
    } 
    p5.resizeCanvas(width, 600);
  }
}

function setupBasedOnScreenSize(p5, props) {
  return () => {
    let {width} = props;
    if (width > 1000) {
      width = 1000;
    }
    setup(p5, width, 600);
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
  };
  p5.mousePressed = () => {
    mousePressed();
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
        //default behavior calls mousePressed too
    }
  }
  p5.windowResized = handleResize(p5, state);
}


function BreathP5() {
  const {width} = useWindowDimensions();
  return <ReactP5Wrapper sketch={sketch} width={width}/>;
}

const Breath = new Project(
  'Breath of the Compassionate', 
  'A generative animated tessellation', 
  <div>
    <p>
      Breath of the Compassionate is the name of an Islamic geometric tessellation.
      You can look at it as a series of diagonally oriented squares - half of them are 
      expanding outwards while the other half contract (it's easier to see this if you pause it). It is a study in balance, in give and take.
    </p>
    <p>
      I also added generative and interactive elements to keep it interesting: you can press any key to 
      randomly change the color gradient, or click/tap the animation to pause it.
    </p>
  </div>,
  <BreathP5 />,
  "https://github.com/katie-adamsky/katie-adamsky.github.io/blob/main/site/src/pages/projects/breath/sketch.js",
  "purple",
);


export default Breath;