import React from "react";
import { secondsToDuration } from "../utils/duration";
function BreakDuration({breakDuration, session, handleDecreaseBreakClick, handleIncreaseBreakClick}){
    return (
        <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {secondsToDuration(breakDuration)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  disabled={session? true:false}
                  onClick={handleDecreaseBreakClick}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  disabled={session? true:false}
                  onClick={handleIncreaseBreakClick}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
    )
}
export default BreakDuration;