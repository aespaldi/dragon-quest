import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearMergingDragons, getAllDragonsForLevel } from '../actions';
import DragonCard from './dragon_card';
import './merge_container.css';

class MergeContainer extends Component {
  constructor(props) {
    super(props);

    this.createSuperDragon = this.createSuperDragon.bind(this);
    this.levelUpDragon = this.levelUpDragon.bind(this);
  }

  levelUpDragon(dragon) {
    const newDragon = Object.assign(this.props.fightingDragon, {
      level: this.props.fightingDragon.level + 1,
      currenthp: Math.round(this.props.fightingDragon.maxhp + (this.props.fightingDragon.maxhp * .10)),
      maxhp: Math.round(this.props.fightingDragon.maxhp + (this.props.fightingDragon.maxhp * .10)),
      strength: Math.round(this.props.fightingDragon.strength + (this.props.fightingDragon.strength * .15)),
      defense: Math.round(this.props.fightingDragon.defense + (this.props.fightingDragon.defense * .15)),
    })
    return newDragon;
  }

  createSuperDragon() {
    // first, call all new dragons from the appropriate level.
    this.props.getAllDragonsForLevel(2)
    // determine which of these is an appropriate color match.
    const colors = this.props.mergingDragons.map((dragon) => {
      return dragon.type;
    })
    if (colors[0] === colors[1]) {
      const leveledUpDragon = this.levelUpDragon(this.props.mergingDragons[0]);
    }
    // add the chosen dragon to the dragons array. (addToUserDragons())
  }

  render() {
    console.log('this.props', this.props);
    return (
      <div className="merge-container">
        <h1>Merge Mode</h1>
        <p>Merging dragons is an irreversible and slightly unpredictable action. The two dragons you have selected will disappear forever and be replaced with one new dragon whose level will be guaranteed to be at least one level higher than your LOWEST LEVEL dragon. You may simply get a stronger version of what you already have, or if you're lucky, you may get a special dragon with the combined powers of the previous two!</p>
        <button className="btn btn-success" onClick={this.createSuperDragon}>Let's Do This!</button>
        <button className="btn btn-danger">Changed My Mind!</button>
        <div className="dragons-to-merge">
          {this.props.mergingDragons.map(dragon =>
            <DragonCard
              key={dragon.id}
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
  };
};

function mapStateToProps({ dragons, mergingDragons }) {
  return { dragons, mergingDragons }
};

export default connect(mapStateToProps, { clearMergingDragons, getAllDragonsForLevel })(MergeContainer);
