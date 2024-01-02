import { ReactP5Wrapper } from "@p5-wrapper/react";
import {setup, draw} from './sketch';
import Project from '../Project';
import useWindowDimensions from "../../../layout/useWindowDimensions";
import { useState, useEffect } from 'react';

function setupBasedOnScreenSize(p5, props) {
  return () => {
    let {width} = props;
    if (width > 1000) {
      width = 1000;
    }
    setup(p5);
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
}

const Bell = () => {
  const [audio, setAudio] = useState();
    useEffect(() => {
        const contentful = require('contentful')
        const client = contentful.createClient({
        space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
        accessToken: process.env.REACT_APP_CONTENTFUL_DELIVERY_TOKEN,
        })

        client
        .getEntries({
        content_type: "projectAsset",
        limit: 1,
        include: 10,
        "fields.name": "bell",
        })
        .then((file) => setAudio(file?.items?.[0].fields?.media))
        .catch(console.error);
    }, []);
    try {
        return new Audio(audio?.fields?.file?.url);
    } catch (Exception) {
        console.error("Can't play audio file");
    }
}

const Countdown = ({ minutes, timerEnded }) => {
    const [seconds, setSeconds] = useState(minutes * 60);

    useEffect(() => {
      const timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else {
          timerEnded();
          clearInterval(timer);
        }
      }, 1000);
  
      return () => clearInterval(timer);
    }, [seconds, timerEnded]);
  
    const displayTime = () => {
      const displayMinutes = Math.floor(seconds / 60);
      const displaySeconds = seconds % 60;
      return `${displayMinutes}:${displaySeconds < 10 ? '0' : ''}${displaySeconds}`;
    };
  
    return <div>Time remaining: {displayTime()}</div>;
  };

function Timer() {
    const [timerValue, setTimerValue] = useState(10);
    const [timerStarted, setTimerStarted] = useState(false);
    const audio = Bell();

    const startTimer = () => {
        audio?.pause();
        setTimerStarted(true);
    };

    const timerEnded = () => {
        audio?.play();
        setTimerStarted(false);
    }

    return (
        <div className="timer">
            {!timerStarted && 
            (<>
            <label htmlFor="numberSlider">Set the timer:</label>
            <input
                type="range"
                id="timer"
                name="timer"
                min={0}
                max={120}
                step={1}
                onChange={(e) => setTimerValue(Number(e.target.value))}
                />
            <span>{timerValue}</span>
            <button onClick={startTimer}>Begin</button>
            </>)}
            {timerStarted && (<Countdown minutes={timerValue} timerEnded={timerEnded}/>)}
        </div>
    );
}

function MeditationP5() {
  const {width} = useWindowDimensions();

  return <>
    <Timer />
    <ReactP5Wrapper sketch={sketch} width={width}/>
  </>;
}

const Meditation = new Project(
  'Meditation Timer', 
  'Visualize your breathing and time your meditations', 
  <p>

  </p>, 
  <MeditationP5 />,
  "https://github.com/katie-adamsky/katie-adamsky.github.io/blob/main/site/src/pages/projects/Meditation/sketch.js",
  "purple"
);

export default Meditation;
