import React from 'react';

export default function PrepareToMergeBtn(props) {
  console.log('props in prepareToMergeBtn', props);
  if (props.mergingDragons && props.mergingDragons.length >= 2) {
    return (
      <button className="merge-mode-btn btn btn-danger" onClick={props.toggleMergeContainer}>
        Prepare To Merge
      </button>
    );
  }
  return null;
}
