import React, { useState, useEffect } from 'react';
import './App.css'; // Add your styles here

const App = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [beep] = useState(new Audio("https://www.soundjay.com/button/sounds/beep-07.wav"));

  useEffect(() => {
    if (isRunning) {
      const timerId = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            beep.play();
            if (isSession) {
              setIsSession(false);
              return breakLength * 60; // Switch to break
            } else {
              setIsSession(true);
              return sessionLength * 60; // Switch to session
            }
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [isRunning, isSession, breakLength, sessionLength, beep]);

  const resetTimer = () => {
    setIsRunning(false);
    setSessionLength(25);
    setBreakLength(5);
    setTimeLeft(25 * 60);
    beep.pause();
    beep.currentTime = 0; // Reset the beep sound
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="container">
      <h1>Pomodoro Timer</h1>
      <div>
        <div id="break-label">Break Length</div>
        <div id="break-length">{breakLength}</div>
        <button id="break-decrement" onClick={() => setBreakLength(prev => Math.max(1, prev - 1))}>-</button>
        <button id="break-increment" onClick={() => setBreakLength(prev => Math.min(60, prev + 1))}>+</button>
      </div>
      <div>
        <div id="session-label">Session Length</div>
        <div id="session-length">{sessionLength}</div>
        <button id="session-decrement" onClick={() => setSessionLength(prev => Math.max(1, prev - 1))}>-</button>
        <button id="session-increment" onClick={() => setSessionLength(prev => Math.min(60, prev + 1))}>+</button>
      </div>
      <div>
        <div id="timer-label">{isSession ? "Session" : "Break"}</div>
        <div id="time-left">{formatTime(timeLeft)}</div>
      </div>
      <button id="start_stop" onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <button id="reset" onClick={resetTimer}>Reset</button>
      <audio id="beep" src="https://www.soundjay.com/button/sounds/beep-07.wav" preload="auto"></audio>
    </div>
  );
};

export default App;
