import React from 'react';

export default function CallDragonBtn(props) {
  if (!props.mergeMode) {
    return (
      <span>
        <button id="dragon-call-btn" className="btn btn-success" onClick={props.callDragon}>
          Call Dragon
        </button>
      </span>
    );
  }
  return null;
}
