import { ReactP5Wrapper } from "@p5-wrapper/react";
import {setup, draw} from './sketch';
import Project from '../Project';
import useWindowDimensions from "../../../layout/useWindowDimensions";

function handleResize(p5, props) {
  return () => {
    let {width} = props;
    if (width > 1000) {
      width = 1000;
    } 
    p5.resizeCanvas(width, 600);
    p5.background(p5.color(0, 0, 0, 5));
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
  p5.windowResized = handleResize(p5, state);
}


function FlowP5() {
  const {width} = useWindowDimensions();
  return <ReactP5Wrapper sketch={sketch} width={width}/>;
}

const Flow = new Project(
  'Flow Field', 
  '', 
  <div>
    TODO
  </div>,
  <FlowP5 />,
  "https://github.com/katie-adamsky/katie-adamsky.github.io/blob/main/site/src/pages/projects/Flow/sketch.js",
);


export default Flow;