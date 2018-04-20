import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToUserDragons, clearMergingDragons, clearNewDragon, getAllDragons, removeFromUserDragons, saveDragon } from '../actions';
import { chooseRandomFrom, generateRandomNumber, nextLevelStatValue } from '../helpers';
import MergingDragons from './mergingDragons';
import NewDragon from './newdragon';
import './merge_container.css';

class MergeContainer extends Component {
  constructor(props) {
    super(props);

    this.createDragonChoiceArray = this.createDragonChoiceArray.bind(this);
    this.createSuperDragon = this.createSuperDragon.bind(this);
    this.levelUpDragon = this.levelUpDragon.bind(this);
    this.returnToVillage = this.returnToVillage.bind(this);
    this.saveNewDragon = this.saveNewDragon.bind(this);
  }

  componentDidMount() {
    this.props.getAllDragons();
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
    const specialDragon = this.props.allDragons[dragonIndex];
    const specialDragonWithId = Object.assign({dragonId: generateRandomNumber()}, specialDragon);
    dragonArray.push(firstDragon, secondDragon, specialDragonWithId);
    const chosenDragon = chooseRandomFrom(dragonArray, dragonArray.length);
    this.saveNewDragon(chosenDragon);
  }

  /**
  * @function getDragonColors - pulls the colors off of the mergingDragons from the redux store.
  * @returns {array} - returns an array of dragon colors.
  */

  getDragonColors() {
    const colors = this.props.mergingDragons.map((dragon) => {
      return dragon.type;
    })
    return colors;
  }

  /**
  * @function createSuperDragon - creates an array of the dragon types passed in, and determines, based on that array, what kind of leveling options should happen. if two of the same color are passed in, the user is given just a leveled up version of that color. if multiple colors are passed in, the user has a one in three chance of getting a special combination color dragon.
  * @returns {undefined}
  */

  createSuperDragon() {
    // determine which of these is an appropriate color match.

    const colors = this.getDragonColors()
    // if the colors are the same, just level up the first dragon.
    if (colors[0] === colors[1]) {
      const leveledUpDragon = this.levelUpDragon(this.props.mergingDragons[0]);
      // add the dragon to the shinyNewDragon store so it can be displayed.
      this.saveNewDragon(leveledUpDragon);
      } else if (colors.includes('red') && colors.includes('blue')) {
        this.createDragonChoiceArray(3);
      } else if (colors.includes('blue') && colors.includes('yellow')) {
        this.createDragonChoiceArray(4);
      } else if (colors.includes('red') && colors.includes('yellow')) {
        this.createDragonChoiceArray(5);
      } else if (colors.includes('purple')) {
        this.createDragonChoiceArray(6);
      } else if (colors.includes('orange')) {
        this.createDragonChoiceArray(7);
      } else if (colors.includes('green')) {
        this.createDragonChoiceArray(8);
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
      dragonId: generateRandomNumber(),
      level: dragon.level + 1,
      currenthp: nextLevelStatValue(dragon.maxhp, .10),
      maxhp: nextLevelStatValue(dragon.maxhp, .10),
      strength: nextLevelStatValue(dragon.strength, .15),
      defense: nextLevelStatValue(dragon.defense, .15),
    }
    return newDragon;
  }

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
        // finds the dragon object to pass into the action creator.
        this.props.removeFromUserDragons(dragon);
      }
    })
    // add the chosen dragon to the dragons array. (addToUserDragons())
    this.props.addToUserDragons(newDragon);
  }

  render() {
    return (
      <div>
        <h3 className="merge-mode-title">Merge Mode</h3>
        <MergingDragons
          createSuperDragon={this.createSuperDragon}
          mergingDragons={this.props.mergingDragons}
          shinyNewDragon={this.props.shinyNewDragon}
        />
        <NewDragon
          returnToVillage={this.returnToVillage}
          shinyNewDragon={this.props.shinyNewDragon}
        />
      </div>
    );
  };
};

MergeContainer.propTypes = {
  allDragons: PropTypes.array,
  dragons: PropTypes.array,
  mergingDragons: PropTypes.array,
  shinyNewDragon: PropTypes.object,
  addToUserDragons: PropTypes.func,
  clearMergingDragons: PropTypes.func,
  clearNewDragon: PropTypes.func,
  getAllDragons: PropTypes.func,
  removeFromUserDragons: PropTypes.func,
  saveDragon: PropTypes.func,
  toggleMergeMode: PropTypes.func,
  toggleMergeContainer: PropTypes.func,
}

function mapStateToProps({ allDragons, dragons, mergingDragons, shinyNewDragon }) {
  return { allDragons, dragons, mergingDragons, shinyNewDragon }
};

export default connect(mapStateToProps, { addToUserDragons, clearMergingDragons, clearNewDragon, getAllDragons, removeFromUserDragons, saveDragon })(MergeContainer);
