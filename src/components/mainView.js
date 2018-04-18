import React from 'react';
import CardCarousel from '../containers/card_carousel';
import CallDragonBtn from './callDragonBtn';
import MergeBtn from './mergeBtn';
import PrepareToMergeBtn from './prepareToMergeBtn';

export default function MainView(props) {
  if (!props.randomDragonIsVisible && !props.fightMode && !props.mergeContainer && !props.gameOver) {
    return (
      <div>
        <div className="dragon-collection-description">
          <div className="control-btns">
            <CallDragonBtn
              callDragon={props.callDragon}
              mergeMode={props.mergeMode}
            />
            <MergeBtn
              mergeMode={props.mergeMode}
              toggleMergeMode={props.toggleMergeMode}
            />
            <PrepareToMergeBtn
              mergingDragons={props.mergingDragons}
              toggleMergeContainer={props.toggleMergeContainer}
            />
          </div>
        </div>
        <div className="carousel">
          <CardCarousel
            toggleFightMode={props.toggleFightMode}
            mergeMode={props.mergeMode}
          />
        </div>
      </div>
    );
  }
  return null;
}
