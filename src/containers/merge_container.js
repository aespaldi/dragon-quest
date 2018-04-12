import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToUserDragons, clearMergingDragons, clearNewDragon, getAllDragonsForLevel, removeFromUserDragons, saveDragon } from '../actions';
import DragonCard from './dragon_card';
import './merge_container.css';

class MergeContainer extends Component {
  constructor(props) {
    super(props);

    this.createSuperDragon = this.createSuperDragon.bind(this);
    this.levelUpDragon = this.levelUpDragon.bind(this);
    this.renderMergingDragons = this.renderMergingDragons.bind(this);
    this.renderNewDragon = this.renderNewDragon.bind(this);
    this.returnToVillage = this.returnToVillage.bind(this);
    this.saveNewDragon = this.saveNewDragon.bind(this);
    this.createDragonChoiceArray = this.createDragonChoiceArray.bind(this);
  }

  componentDidMount() {
    this.props.getAllDragonsForLevel(2)
  }

  componentWillUnmount() {
    this.props.clearNewDragon();
  }

  levelUpDragon(dragon) {
    const newDragon = {
      id: dragon.id,
      type: dragon.type,
      imageurl: dragon.imageurl,
      dragonId: dragon.dragonId,
      level: dragon.level + 1,
      currenthp: Math.round(dragon.maxhp + (dragon.maxhp * .10)),
      maxhp: Math.round(dragon.maxhp + (dragon.maxhp * .10)),
      strength: Math.round(dragon.strength + (dragon.strength * .15)),
      defense: Math.round(dragon.defense + (dragon.defense * .15)),
    }
    return newDragon;
  }


  saveNewDragon(newDragon) {
    const dragonIds = this.props.mergingDragons.map((dragon) => {
      return dragon.dragonId;
    })
    this.props.saveDragon(newDragon);
    this.props.dragons.forEach((dragon) => {
      // if the dragonId of the dragons match the dragonId of a mergingDragon, remove it.
      if (dragonIds.includes(dragon.dragonId)) {
        // finds the index to pass into the action creator.
        const index = this.props.dragons.indexOf(dragon);
        this.props.removeFromUserDragons(index);
      }
    })
    // add the chosen dragon to the dragons array. (addToUserDragons())
    this.props.addToUserDragons(newDragon);
  }

  createDragonChoiceArray(dragonIndex) {
    const dragonArray = [];
    const firstDragon = this.levelUpDragon(this.props.mergingDragons[0]);
    const secondDragon = this.levelUpDragon(this.props.mergingDragons[1]);
    const specialDragon = this.props.allDragonsForLevel[dragonIndex];
    dragonArray.push(firstDragon, secondDragon, specialDragon);
    const index = Math.floor(Math.random() * 3);
    const chosenDragon = dragonArray[index];
    this.saveNewDragon(chosenDragon);
  }

  createSuperDragon() {
    // determine which of these is an appropriate color match.
    const colors = this.props.mergingDragons.map((dragon) => {
      return dragon.type;
    })
    // if the colors are the same, just level up the first dragon.
    if (colors[0] === colors[1]) {
      const leveledUpDragon = this.levelUpDragon(this.props.mergingDragons[0]);
      // add the dragon to the shinyNewDragon store so it can be displayed.
      this.saveNewDragon(leveledUpDragon);
      } else if (colors.includes('red') && colors.includes('blue')) {
        this.createDragonChoiceArray(0);
      } else if (colors.includes('blue') && colors.includes('yellow')) {
        this.createDragonChoiceArray(1);
      } else if (colors.includes('red') && colors.includes('yellow')) {
        this.createDragonChoiceArray(2);
      } else {
        throw new Error('invalid color inputs');
      }
    }

  renderMergingDragons() {
    if (!this.props.shinyNewDragon.type) {
      return (
        <div className="merge-container">
          <p>Merging dragons is an irreversible and slightly unpredictable action. The two dragons you have selected will disappear forever and be replaced with one new dragon whose level will be guaranteed to be at least one level higher than your LOWEST LEVEL dragon. You may simply get a stronger version of what you already have, or if you're lucky, you may get a special dragon with the combined powers of the previous two!</p>
          <button className="btn btn-success" onClick={this.createSuperDragon}>Let's Do This!</button>
          <button className="btn btn-danger">Changed My Mind!</button>
          <div className="dragons-to-merge">
            {this.props.mergingDragons.map(dragon =>
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
  }

  renderNewDragon() {
    if (this.props.shinyNewDragon.type) {
      return (
        <div className="new-dragon-container">
          <h4>A New Dragon Emerges!</h4>
          <DragonCard
            imageurl={this.props.shinyNewDragon.imageurl}
            type={this.props.shinyNewDragon.type}
            level={this.props.shinyNewDragon.level}
            currenthp={this.props.shinyNewDragon.currenthp}
            maxhp={this.props.shinyNewDragon.maxhp}
            strength={this.props.shinyNewDragon.strength}
            defense={this.props.shinyNewDragon.defense}
          />
          <button
            className="merge-success-return-btn"
            onClick={this.returnToVillage}
            >Return to Village</button>
        </div>
      );
    };
  };

  returnToVillage() {
    this.props.toggleMergeMode();
    this.props.toggleMergeContainer();
  }

  render() {
    return (
      <div>
        <h1>Merge Mode</h1>
        {this.renderMergingDragons()}
        {this.renderNewDragon()}
      </div>
    );
  };
};

function mapStateToProps({ allDragonsForLevel, dragons, mergingDragons, shinyNewDragon }) {
  return { allDragonsForLevel, dragons, mergingDragons, shinyNewDragon }
};

export default connect(mapStateToProps, { addToUserDragons, clearMergingDragons, clearNewDragon, getAllDragonsForLevel, removeFromUserDragons, saveDragon })(MergeContainer);
