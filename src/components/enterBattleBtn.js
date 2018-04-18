import React from 'react';

export default function EnterBattleBtn(props) {
  if (!props.battleHasStarted) {
    return (
      <div>
        <button className="enter-battle-btn btn btn-success" onClick={props.enterBattle}>
          Enter Battle!
        </button>
      </div>
    )
  } else {
    return null;
  }
};
