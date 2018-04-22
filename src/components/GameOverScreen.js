import React from 'react';

/**
* @function renderGameOverMode - displays JSX with a victory message.
* @returns {JSX}
*/

export default function GameOverScreen(props) {
  return (
    <div className="game-over-message">
      <h1>You Won!</h1>
      <p>The humans have decided that maybe camping next to a village of dragons was a bad idea. Enjoy your peace and quiet!</p>
      {/* I will also put some cute picture here in the future. */}
    </div>
  );
}
