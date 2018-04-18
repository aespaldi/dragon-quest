import React from 'react';
import Fight from '../containers/fightMode';

export default function FightView(props) {
  if (props.fightMode) {
    return (
      <div className="fight-screen-container">
        <Fight
          toggleFightMode={props.toggleFightMode}
          fightMode={props.fightMode}
          mergeMode={props.mergeMode}
          gameOver={props.gameOver}
          declareGameOver={props.declareGameOver}
        />
      </div>
    );
  }
  return null;
}
