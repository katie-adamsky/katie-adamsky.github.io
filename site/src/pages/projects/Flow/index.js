import { ReactP5Wrapper } from "@p5-wrapper/react";
import {setup, draw, FLOW_FIELD_MODE, CURVE, ZOOM, NOISE_SCALE, NUM_PARTICLES} from './sketch';
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
    draw(p5, props);
  } 
}

function sketch(p5) {
  let state = {
    width: 1000,
    mode: FLOW_FIELD_MODE.PERLIN_NOISE,
    zoom: ZOOM,
    curve: CURVE,
    noiseScale: NOISE_SCALE,
    numParticles: NUM_PARTICLES,
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
  const [noiseScale, setNoiseScale] = useState(NOISE_SCALE);
  const [numParticles, setNumParticles] = useState(NUM_PARTICLES);
  const dropdownOptions = Object.values(FLOW_FIELD_MODE);
  const [zoom, setZoom] = useState(ZOOM);
  const [curve, setCurve] = useState(CURVE);
  const [showField, toggleField] = useState(false);
  const [gridScale, setGridScale] = useState(5);

  return (
    <div>
    <div className="customization">
        <div className="options-container">
          <label htmlFor="fieldMode">Flow field mode: </label>
          <select 
            className="dropdown" 
            id="fieldMode" 
            onChange={(event) => setMode(event.target.value)}
            value={mode}>
            {dropdownOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {mode===FLOW_FIELD_MODE.SIN_WAVE 
          ? 
          <>
            <div className="options-container">
              <label htmlFor="zoom">Zoom: </label>
              <input
                type="number"
                step="0.01"
                id="zoom"
                value={zoom}
                onChange={input => setZoom(input.target.value)}
                placeholder=""
                className="number-input"
              />
            </div>
            <div className="options-container">
              <label htmlFor="curve">Curve: </label>
              <input
                type="number"
                step="0.5"
                id="curve"
                value={curve}
                onChange={input => setCurve(input.target.value)}
                placeholder=""
                className="number-input"
              />
            </div>
          </>
          : <></>
        }

          <div className="options-container">
            <label htmlFor="noiseScale">Noise scale (smaller = more noise): </label>
            <input
              type="number"
              step="10"
              min="0"
              max="2000"
              id="noiseScale"
              value={noiseScale}
              onChange={input => setNoiseScale(input.target.value)}
              placeholder=""
              className="number-input"
            />
          </div>
          <div className="options-container">
            <label htmlFor="numParticles">Number of Particles: </label>
            <input
              type="number"
              step="100"
              min="0"
              max="10000"
              id="numParticles"
              value={numParticles}
              onChange={input => setNumParticles(input.target.value)}
              placeholder=""
              className="number-input"
            />
          </div>
          <div className="options-container">
            <label htmlFor="showField">Show flow field: </label>
            <input
              type="checkbox"
              checked={showField}
              onChange={() => toggleField(!showField)}
              className="number-input"
            />
          </div>
          <div className="options-container">
            <label htmlFor="gridScale">Flow field resolution: </label>
            <input
              type="number"
              step="1"
              min="0"
              max="1000"
              id="gridScale"
              value={gridScale}
              onChange={input => setGridScale(input.target.value)}
              placeholder=""
              className="number-input"
            />
          </div>
      </div>
      <ReactP5Wrapper sketch={sketch} width={width} 
        mode={mode} zoom={zoom} curve={curve} noiseScale={noiseScale} 
        numParticles={numParticles} showField={showField} newGridScale={gridScale}/> 
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
      As each particle moves through the canvas, its path is determined by these 
      invisible vectors.
    </p>
    <p>
      I highly recommend messing around with the different options - tweaking a variable can completely change 
      the appearance of the field.
    </p>
  </div>,
  <FlowP5 />,
  "https://github.com/katie-adamsky/katie-adamsky.github.io/blob/main/site/src/pages/projects/Flow/sketch.js",
  "teal"
);


export default Flow;