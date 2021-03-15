import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import FocusDuration from "./FocusDuration";
import BreakDuration from "./BreakDuration";
import Timer from "./Timer";

function Pomodoro() {
  // Timer starts out paused
  const defaultState = {
    focusDuration: 1500,
    breakDuration: 300,
    remaining: 1500,
    focusing: false,
    breaking: false,
    session: false
  }
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [masterState, setMasterState] = useState({...defaultState})

  useInterval(
    () => {
      setMasterState({...masterState, remaining: masterState.remaining - 1});
      // ToDo: Implement what should happen when the timer is running
      if(masterState.remaining===0 && masterState.focusing===true){
        new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
        setMasterState({...masterState, remaining:masterState.breakDuration, focusing:false, breaking:true})
      } else if(masterState.remaining===0 && masterState.breaking===true){
        new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
        setMasterState({...masterState, remaining:masterState.focusDuration, focusing:true, breaking:false})
      }
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    if(!(masterState.focusing || masterState.breaking)) setMasterState({...masterState, remaining:masterState.focusDuration, focusing: true, session:true});
    setIsTimerRunning((prevState) => !prevState);
  }
  const handleStopClick = () =>{
    if(isTimerRunning) setIsTimerRunning((prevState) => !prevState)

    setMasterState({...masterState, focusing: false, breaking: false, session: false})
  }
  const handleIncreaseFocusClick = () =>{
    if(masterState.focusDuration < 3600) setMasterState({...masterState, focusDuration: masterState.focusDuration + 300})
  }
  const handleDecreaseFocusClick = () =>{
    if(masterState.focusDuration > 300) setMasterState({...masterState, focusDuration: masterState.focusDuration - 300})
  }
  const handleIncreaseBreakClick = () =>{
    setMasterState({...masterState, breakDuration: masterState.breakDuration + 60})
  }
  const handleDecreaseBreakClick = () =>{
    if(masterState.breakDuration > 60) setMasterState({...masterState, breakDuration: masterState.breakDuration - 60})
  }
  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <FocusDuration 
          focusDuration={masterState.focusDuration} 
          session={masterState.session} 
          handleDecreaseFocusClick={handleDecreaseFocusClick}
          handleIncreaseFocusClick={handleIncreaseFocusClick}
          />
        </div>
        <div className="col">
          <div className="float-right">
            <BreakDuration 
            breakDuration={masterState.breakDuration} 
            session={masterState.session} 
            handleDecreaseBreakClick={handleDecreaseBreakClick}
            handleIncreaseBreakClick={handleIncreaseBreakClick}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={handleStopClick}
              disabled={masterState.session}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <Timer 
      remaining={masterState.remaining} 
      focusDuration={masterState.focusDuration} 
      breakDuration={masterState.breakDuration}
      focusing={masterState.focusing}
      session={masterState.session}
       />
    </div>
  );
}

export default Pomodoro;
