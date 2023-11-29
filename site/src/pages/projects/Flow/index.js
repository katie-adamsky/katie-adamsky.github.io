import { ReactP5Wrapper } from "@p5-wrapper/react";
import {setup, draw, FLOW_FIELD_MODE} from './sketch';
import Project from '../Project';
import useWindowDimensions from "../../../layout/useWindowDimensions";
import { useState } from 'react';

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

function drawWithProps(p5, props) {
  return () => {
    let {mode} = props;
    draw(p5, mode);
  } 
}

function sketch(p5) {
  let state = {
    width: 1000,
    mode: FLOW_FIELD_MODE.PERLIN_NOISE,
  }

  p5.updateWithProps = props => {
    state = Object.assign(state, props)
  };
  p5.setup = setupBasedOnScreenSize(p5, state);
  p5.draw = drawWithProps(p5, state);
  p5.windowResized = handleResize(p5, state);
}


const FlowP5 = () => {
  const {width} = useWindowDimensions();
  const [mode, setMode] = useState(FLOW_FIELD_MODE.PERLIN_NOISE);
  const dropdownOptions = Object.values(FLOW_FIELD_MODE);

  const handleDropdownChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <div>
    <div className="customization">
      <label htmlFor="dropdown">Flow field mode: </label>
      <select className="dropdown" id="dropdown" onChange={handleDropdownChange} value={mode}>
        {dropdownOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      </div>
      <ReactP5Wrapper sketch={sketch} width={width} mode={mode}/> 
    </div>
  );
};

const Flow = new Project(
  'Flow Field', 
  'Invisible forces guide thousands of particles', 
  <div>
    <p>
      A flow field is a common animation technique for complex systems that need to look natural. 
      To create one, the programmer divides the canvas into a grid, each with its own vector.
      As each particle moves through the canvas, the its path is determined by these 
      invisible vectors.
    </p>
  </div>,
  <FlowP5 />,
  "https://github.com/katie-adamsky/katie-adamsky.github.io/blob/main/site/src/pages/projects/Flow/sketch.js",
  "teal"
);


export default Flow;