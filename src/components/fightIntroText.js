import React from 'react';

/**
* @function renderFightIntroText - renders instructions to the user if the battle is not yet won.
* @returns {JSX}
*/

export default function FightIntroText(props) {
  if (props.winner === null) {
    return (
      <p className="fight-intro-text">
        This human is trying to get glory, or just simply wandered in. Dispatch them quickly to go back to your peaceful afternoon. Warning - they keep getting stronger. If you find yourself losing, you may need to merge some dragons to become stronger!
      </p>
    )
  }
  else {
    return null;
  }
};
