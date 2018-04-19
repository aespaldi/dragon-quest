import React from 'react';

export default function MergeBtn(props) {
  if (!props.mergeMode) {
    return (
      <span>
        <button id="dragon-merge-btn" className="btn btn-info" onClick={props.toggleMergeMode}>
          Merge Mode
        </button>
      </span>
    );
  } else {
    return (
      <span>
        <button id="dragon-merge-btn" className="btn btn-info" onClick={props.toggleMergeMode}>
          Return to Village
        </button>
      </span>
    );
  }
}
