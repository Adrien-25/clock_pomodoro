import React, { useState, useEffect } from "react";
import "./App.css";
import beepSound from "./assets/beep.mp3";

const App = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);

  const [beep] = useState(new Audio(beepSound));

  useEffect(() => {
    if (isRunning) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => {
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
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="container">
      <h1>Pomodoro Timer</h1>
      <div className="timer-controls">
        <div className="break-container">
          <div id="break-label">Break Length</div>
          <div className="container-setting">
            <button
              id="break-decrement"
              onClick={() => {
                if (!isRunning) {
                  // setBreakLength((prev) => {
                  //   const newSessionLength = Math.max(1, prev - 1);
                  //   setTimeLeft(newSessionLength * 60);
                  //   return newSessionLength;
                  // });
                  setBreakLength((prev) => Math.max(1, prev - 1));
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="25px"
                height="25px"
                fill="white"
              >
                <path d="M1 10L1 6L15 6V10L1 10Z" fill="#000000" />
              </svg>
            </button>

            <div id="break-length">{breakLength}</div>
            <button
              id="break-increment"
              onClick={() => {
                if (!isRunning) {
                  // setBreakLength((prev) => {
                  //   const newSessionLength = Math.min(60, prev + 1);
                  //   setTimeLeft(newSessionLength * 60);
                  //   return newSessionLength;
                  // });
                  setBreakLength((prev) => Math.min(60, prev + 1));
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="25px"
                height="25px"
                fill="black"
              >
                <path
                  d="M10 1H6V6L1 6V10H6V15H10V10H15V6L10 6V1Z"
                  fill="#000000"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="session-container">
          <div id="session-label">Session Length</div>
          <div className="container-setting">
            <button
              id="session-decrement"
              onClick={() => {
                if (!isRunning) {
                  setSessionLength((prev) => {
                    const newSessionLength = Math.max(1, prev - 1);
                    setTimeLeft(newSessionLength * 60);
                    return newSessionLength;
                  });
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="25px"
                height="25px"
                fill="black"
              >
                <path d="M1 10L1 6L15 6V10L1 10Z" fill="#000000" />
              </svg>
            </button>

            <div id="session-length">{sessionLength}</div>
            <button
              id="session-increment"
              onClick={() => {
                if (!isRunning) {
                  setSessionLength((prev) => {
                    const newSessionLength = Math.min(60, prev + 1);
                    setTimeLeft(newSessionLength * 60);
                    return newSessionLength;
                  });
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="25px"
                height="25px"
                fill="black"
              >
                <path
                  d="M10 1H6V6L1 6V10H6V15H10V10H15V6L10 6V1Z"
                  fill="#000000"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="circle " id="break-circle">
        <div id="timer">
          <div id="timer-label">{isSession ? "Session" : "Break"}</div>
          <div id="time-left">{formatTime(timeLeft)}</div>
        </div>
      </div>
      <div className="control-buttons">
        <button
          id="start_stop"
          onClick={() => setIsRunning(!isRunning)}
          className="round-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="black"
            width="25px"
            height="25px"
          >
            <path d="M1 14H3L9 8L3 2H1V14Z" fill="#000000" />
            <path d="M15 2H13V14H15V2Z" fill="#000000" />
            <path d="M9 2H11V14H9V2Z" fill="#000000" />
          </svg>
        </button>
        <button id="reset" onClick={resetTimer} className="round-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="black"
            width="25px"
            height="25px"
          >
            <path
              d="M10 7L9 6L11.2929 3.70711L10.7071 3.12132C9.98914 2.40335 9.01536 2 8 2C6.98464 2 6.01086 2.40335 5.29289 3.12132L5.20711 3.20711C4.43421 3.98 4 5.02828 4 6.12132L4 7L2 7V6.12132C2 4.49785 2.64492 2.94086 3.79289 1.79289L3.87868 1.70711C4.97172 0.614064 6.4542 0 8 0C9.54579 0 11.0283 0.614064 12.1213 1.70711L12.7071 2.29289L15 0L16 1V7H10Z"
              fill="#000000"
            />
            <path
              d="M5.29289 12.8787C6.01086 13.5966 6.98464 14 8 14C9.01536 14 9.98914 13.5967 10.7071 12.8787L10.7929 12.7929C11.5658 12.02 12 10.9717 12 9.87868V9L14 9V9.87868C14 11.5022 13.3551 13.0591 12.2071 14.2071L12.1213 14.2929C11.0283 15.3859 9.5458 16 8 16C6.45421 16 4.97172 15.3859 3.87868 14.2929L3.29289 13.7071L1 16L0 15L9.53674e-07 9L6 9L7 10L4.70711 12.2929L5.29289 12.8787Z"
              fill="#000000"
            />
          </svg>
        </button>
      </div>
      <audio id="beep" src={beepSound} preload="auto"></audio>
    </div>
  );
};

export default App;
