import React from 'react';

export default function ReturnBtn(props) {
  return (
    <div>
      <button className="return-btn btn btn-primary" onClick={props.toggleFightMode}>
        Return to Village
      </button>
    </div>
  )
};
