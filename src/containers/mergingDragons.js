import React from 'react';
import DragonCard from './dragon_card';

/**
* @function renderMergingDragons - displays JSX that shows the two dragons that the user has chosen to merge, along with buttons that allow the user to either proceed or return to the main menu.
* @returns {JSX}
*/


export default function MergingDragons(props) {
  if (!props.shinyNewDragon.type) {
    return (
      <div className="merge-container">
        <p>Merging dragons is an irreversible and slightly unpredictable action. The two dragons you have selected will disappear forever and be replaced with one new dragon whose level will be guaranteed to be at least one level higher than your LOWEST LEVEL dragon. You may simply get a stronger version of what you already have, or if you're lucky, you may get a special dragon with the combined powers of the previous two!</p>
        <button className="btn btn-success" onClick={props.createSuperDragon}>Let's Do This!</button>
        <button className="btn btn-danger">Changed My Mind!</button>
        <div className="dragons-to-merge">
          {props.mergingDragons.map(dragon =>
            <DragonCard
              key={dragon.dragonId}
              imageurl={dragon.imageurl}
              type={dragon.type}
              level={dragon.level}
              currenthp={dragon.currenthp}
              maxhp={dragon.maxhp}
              strength={dragon.strength}
              defense={dragon.defense}
            />
          )}
        </div>
      </div>
    );
  }
  return null;
}
