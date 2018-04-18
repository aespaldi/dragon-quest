import React from 'react';

/**
* @function renderReturnBtn - renders the button that allows a return to the main screen after a battle is finished.
* @returns {JSX}
*/

export default function ReturnBtn(props) {
  if (props.winner !== null) {
    return (
      <div>
        <button className="return-btn btn btn-primary" onClick={props.toggleFightMode}>
          Return to Village
        </button>
      </div>
    );
  }
  return null;
};
