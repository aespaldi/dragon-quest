import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToUserDragons, clearMergingDragons, clearNewDragon, getAllDragonsForLevel, removeFromUserDragons, saveDragon } from '../actions';
import DragonCard from './dragon_card';
import './merge_container.css';

class MergeContainer extends Component {
  constructor(props) {
    super(props);

    this.createDragonChoiceArray = this.createDragonChoiceArray.bind(this);
    this.createSuperDragon = this.createSuperDragon.bind(this);
    this.levelUpDragon = this.levelUpDragon.bind(this);
    this.renderMergingDragons = this.renderMergingDragons.bind(this);
    this.renderNewDragon = this.renderNewDragon.bind(this);
    this.returnToVillage = this.returnToVillage.bind(this);
    this.saveNewDragon = this.saveNewDragon.bind(this);
  }

  componentDidMount() {
    this.props.getAllDragonsForLevel(2)
  }

  componentWillUnmount() {
    this.props.clearNewDragon();
  }

  /**
  * @function createDragonChoiceArray - levels up the two passed in dragons and calls the specific dragon from the database that would result from the combination of the two (so purple for red and blue), pushes those three options into an array, and then randomly selects one of the three to be the final result.
  * @param {number} dragonIndex - the index in the array of fetched dragons from the database that is being passed in for this particular color combination.
  * @returns {undefined} - function calls a redux action creator and returns nothing.
  */

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

  /**
  * @function createSuperDragon - creates an array of the dragon types passed in, and determines, based on that array, what kind of leveling options should happen. if two of the same color are passed in, the user is given just a leveled up version of that color. if multiple colors are passed in, the user has a one in three chance of getting a special combination color dragon.
  * @returns {undefined}
  */

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

  /**
  * @function levelUpDragon - creates a new dragon object based on a percentage of stats from the passed in dragon and returns it.
  * @param {object} dragon - represents the dragon card being passed in.
  * @returns {object} - a dragon object with new stats
  */

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

  /**
  * @function renderMergingDragons - displays JSX that shows the two dragons that the user has chosen to merge, along with buttons that allow the user to either proceed or return to the main menu.
  * @returns {JSX}
  */

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

  /**
  * @function renderNewDragon - displays JSX that shows new dragon that the user has received as a result of the merge, along with the button that allows the user to return to the main menu.
  * @returns {JSX}
  */

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
            className="merge-success-return-btn btn btn-success"
            onClick={this.returnToVillage}
            >Return to Village</button>
        </div>
      );
    };
  };

  /**
  * @function returnToVillage - returns the user to the main screen.
  * @returns {undefined} - toggles variables passed down from the app component to re-render components.
  */

  returnToVillage() {
    this.props.toggleMergeMode();
    this.props.toggleMergeContainer();
  }

  /**
  * @function saveNewDragon - takes in the new dragon from the merge, adds it to the user's collection, and then wipes the two dragons they chose to merge from their collection.
  * @param {object} newDragon - represents the new dragon created from the merge.
  * @returns {undefined} - calls multiple redux action creators and returns nothing.
  */

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
