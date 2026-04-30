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
    setup(p5, width);
  }
}

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

function sketch(p5) {
  let state = {
    width: 1000
  }

  p5.updateWithProps = props => {
    state = Object.assign(state, props)
  };

  p5.setup = setupBasedOnScreenSize(p5, state);
  p5.windowResized = handleResize(p5, state);
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

const Countdown = ({ minutes, timerEnded, intervalValue, intervalElapsed }) => {
    const [seconds, setSeconds] = useState(minutes * 60);
    const [intervalCountdown, setIntervalCountdown] = useState(intervalValue * 60);

    useEffect(() => {
      const timer = setInterval(() => {
        if (seconds > 0) {
          setIntervalCountdown((prevVal) => prevVal-1);
          setSeconds((prevSeconds) => prevSeconds - 1);
          if (intervalCountdown === 0) {
            
          }
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
    const [intervalValue, setIntervalValue] = useState(null);
    const [intervalStartValue, setIntervalStartValue] = useState(null);
    const audio = Bell();

    const startTimer = () => {
        setIntervalStartValue(intervalValue);
        audio?.pause();
        setTimerStarted(true);
    };

    const intervalElapsed = () => {
        setIntervalValue(intervalStartValue);
        audio?.play();
    }

    const timerEnded = () => {
        audio?.play();
        setTimerStarted(false);
    }

    return (
        <div className="timer">
            {!timerStarted && 
            (<>
            <label htmlFor="timer">Set the timer:</label>
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
            <label htmlFor="interval">Set an interval:</label>
            <input
                type="range"
                id="interval"
                name="interval"
                min={0}
                max={120}
                step={1}
                onChange={(e) => setIntervalValue(Number(e.target.value))}
                />
            <span>{intervalValue}</span>
            <button onClick={startTimer}>Begin</button>
            </>)}
            {timerStarted && (
                <Countdown 
                    minutes={timerValue}
                    timerEnded={timerEnded}
                    intervalValue={intervalValue}
                    intervalElapsed={intervalElapsed}
                />
            )}
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
  <>
  <p>
    This is a simple meditation timer, which I made to replace the core functionality of an app I was spending money on.
    You can set a timer and it will ring a bell at the intervals you specify - this is useful for if you have multiple 
    techniques you are learning and you want to compartmentalize your meditation without having to constantly check the time.
  </p>
  <p>
    The animation is a box breathing exercise - inhale while the circle is expanding, hold your breath while the circle is stopped,
    exhale while it's contracting, then hold again until it starts expanding. It's nice to do a couple rounds of this breathing 
    to start your meditation, to calm your nervous system and allow you to connect with your breath.
  </p>
  </>, 
  <MeditationP5 />,
  "https://github.com/katie-adamsky/katie-adamsky.github.io/blob/main/site/src/pages/projects/Meditation/sketch.js",
  "purple"
);

export default Meditation;
