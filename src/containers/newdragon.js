import React from 'react';
import DragonCard from './dragon_card';

/**
* @function NewDragon - displays JSX that shows new dragon that the user has received as a result of the merge, along with the button that allows the user to return to the main menu.
* @returns {JSX}
*/

export default function NewDragon (props) {
  if (props.shinyNewDragon.type) {
    return (
      <div className="new-dragon-container">
        <h4>A New Dragon Emerges!</h4>
        <DragonCard
          imageurl={props.shinyNewDragon.imageurl}
          type={props.shinyNewDragon.type}
          level={props.shinyNewDragon.level}
          currenthp={props.shinyNewDragon.currenthp}
          maxhp={props.shinyNewDragon.maxhp}
          strength={props.shinyNewDragon.strength}
          defense={props.shinyNewDragon.defense}
        />
        <button
          className="merge-success-return-btn btn btn-success"
          onClick={props.returnToVillage}
          >Return to Village</button>
        </div>
      );
    }
    return null;
}
