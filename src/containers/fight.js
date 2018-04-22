import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { callHuman, clearFightingDragon, saveHuman, updateHuman, updateDragon } from '../actions'
import { nextLevelStatValue } from '../helpers';
import DragonCard from './dragon_card';
import EnterBattleBtn from '../components/enterBattleBtn';
import FightIntroText from '../components/fightIntroText';
import HumanCard from '../components/human_card';
import ReturnBtn from '../components/returnBtn';
import './fightMode.css';

class Fight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      battleHasStarted: false,
      dragonCardBackGround: 'black',
      humanCardBackGround: 'black',
      winner: null,
    }

    this.changeActiveCard = this.changeActiveCard.bind(this);
    this.displayWinnerMessage = this.displayWinnerMessage.bind(this);
    this.enterBattle = this.enterBattle.bind(this);
    this.levelUpHuman = this.levelUpHuman.bind(this);
    this.updateDragonStats = this.updateDragonStats.bind(this);
    this.updateHumanStats = this.updateHumanStats.bind(this);
  }

  componentDidMount() {
    if (!this.props.human.type) {
      this.props.callHuman(1);
    }
  }

  componentWillUnmount() {
    this.props.clearFightingDragon();
  }

  /**
  * @function gameIsOver - checks the level of the human. if the level is at the pre-determined max, the function will return true.
  * @param {object} human - the object representing the human.
  * @returns {boolean} - returns true or false based on the level of the human passed in.
  */

  gameIsOver(human) {
    if (human.level >= 20) {
      return true;
    }
    return false;
  }

  /**
  * @function battleTurn - applies damage to each player in a single turn. called recursively until one player's hit points drop to or below zero.
  * @param {number} hp - current hit points of the opposing player.
  * @param {number} damage - the damage being dealt to the opposite player.
  * @param {string} player - the type of player - either dragon or human.
  * @returns {undefined} - the function either calls itself or redux action creators and never returns a value.
  */

  battleTurn (hp, damage, player) {
    const damageToHuman = this.setDamageToHuman();
    const damageToDragon = this.setDamageToDragon();
    let newHP = hp - damage;
    // if the player is the dragon, take the hit points off the human.
    if (player === 'dragon') {
      this.updateHumanStats(newHP);
      // if the new hp of the human is greater than zero, change the turn to the human's.
      if (newHP > 0) {
        this.battleTurn(this.props.fightingDragon.currenthp, damageToDragon, 'human');
        // if the hp of the human is zero or less, call battle is won with the dragon.
      } else {
        this.battleIsWon('dragon');
      }
    } else {
      // if the player is the human, update the dragon's hp.
      this.updateDragonStats(newHP);
      if (newHP > 0) {
        this.battleTurn(this.props.human.currenthp, damageToHuman, 'dragon');
      } else {
        this.battleIsWon('human');
      }
    }
  };

  /**
  * @function battleIsWon
  * @param {string} player - the player type, dragon or human.
  * @returns {undefined}
  */

  battleIsWon(player) {
    this.displayWinnerMessage(player);
    if (this.gameIsOver(this.props.human)) {
      this.props.declareGameOver();
    } else {
      if (player === 'dragon') {
        const leveledUpHuman = this.levelUpHuman(this.props.human);
        this.props.saveHuman(leveledUpHuman);
      }
      const dragonRestoredHP = this.props.fightingDragon.maxhp;
      this.props.fightingDragon.currenthp = dragonRestoredHP;
      let restoredHumanHP = this.props.human.maxhp;
      this.updateHumanStats(restoredHumanHP);
    }
  };

  /**
  * @function enterBattle - sets the initial damage values for each player and then calls battleTurn.
  * @returns {undefined} - this is a higher order function that calls other functions.
  */

  enterBattle() {
    const damageToHuman = this.setDamageToHuman();
    const damageToDragon = this.setDamageToDragon();
    this.setState({
      battleHasStarted: true,
    })
    // we start with the dragon's turn, because... dragons.
    this.battleTurn(this.props.human.currenthp, damageToHuman, 'dragon');
  };

  /**
  * @function setDamageToHuman - calculates damage dealt to human from strength and defense in props.
  * @returns {number}
  */

  setDamageToHuman() {
    let damageToHuman = this.props.fightingDragon.strength - this.props.human.defense;
    if (damageToHuman < 0) {
      damageToHuman = 2;
    }
    return damageToHuman;
  }

  /**
  * @function setDamageToDragon - calculates damage dealt to dragon from strength and defense in props.
  * @returns {number}
  */

  setDamageToDragon() {
    let damageToDragon = this.props.human.strength - this.props.fightingDragon.defense;
    if (damageToDragon < 0) {
      damageToDragon = 1;
    }
    return damageToDragon;
  }

  // levels up the human character, regardless of battle outcome.

  /**
  * @function levelUpHuman - adds a percentage to the current human's stats and returns a new human.
  * @returns {object} - returns an object representing the new stats for the human player.
  *
  */

  levelUpHuman() {
    const newHuman = Object.assign(this.props.human, {
      level: this.props.human.level + 1,
      currenthp: nextLevelStatValue(this.props.human.maxhp, .10),
      maxhp: nextLevelStatValue(this.props.human.maxhp, .10),
      strength: nextLevelStatValue(this.props.human.strength, .10),
      defense: nextLevelStatValue(this.props.human.defense, .10),
    })
    return newHuman;
  };


  /**
  * @function updateDragonStats - creates a new dragon object with updated hp and passes it to a redux action creator that updates those stats in the store.
  * @returns {undefined} - function calls another function and returns nothing.
  */

  updateDragonStats(hp) {
    const dragonAfterDamage = Object.assign(this.props.fightingDragon, {currenthp: hp});
    this.props.updateDragon(dragonAfterDamage);
  };


  /**
  * @function updateHumanStats - creates a new human object with updated hp and passes it to a redux action creator that updates those stats in the store.
  * @returns {undefined} - function calls another function and returns nothing.
  */

  updateHumanStats(hp) {
    const humanAfterDamage = Object.assign(this.props.human, {currenthp: hp});
    this.props.updateHuman(humanAfterDamage);
  };

  // View functions:

  /**
  * @function changeActiveCard - changes background of active card to green.
  * @param {string} type - the type of player, either dragon or human.
  * @returns {undefined} - function calls two react functions and returns nothing.
  */

  changeActiveCard(type) {
    if (type === 'dragon') {
      this.setState({
        dragonCardBackGround: 'green'
      })
    } else {
      this.setState({
        humanCardBackGround: 'green',
      })
    }
  };

  /**
  * @function displayWinnerMessage - displays a different message in the DOM based on which player reaches the win condition.
  * @param {object} player - an object representing the player (dragon or human) that wins.
  * @returns {undefined} - function calls react method setState and does not return anything.
  */

  // displays a winner message in the DOM
  displayWinnerMessage(player) {
    if (player === 'dragon') {
      this.setState({
        winner: 'Dragon Wins!',
      })
    } else {
      this.setState({
        winner: 'Human Wins!',
      })
    }
  }

  render() {
    return (
      <div>
        <FightIntroText
          winner={this.state.winner}
        />
        <h3>{this.state.winner}</h3>
        <ReturnBtn
          winner={this.state.winner}
          toggleFightMode={this.props.toggleFightMode}
        />
        <div className="fight-container">
          <div className="fight-card">
            <DragonCard
              style={{backgroundColor: this.state.dragonCardBackGround}}
              imageurl={this.props.fightingDragon.imageurl}
              type={this.props.fightingDragon.type}
              level={this.props.fightingDragon.level}
              currenthp={this.props.fightingDragon.currenthp}
              maxhp={this.props.fightingDragon.maxhp}
              strength={this.props.fightingDragon.strength}
              defense={this.props.fightingDragon.defense}
              toggleFightMode={this.props.toggleFightMode}
            />
          </div>
          <HumanCard
            winner={this.state.winner}
            style={{backgroundColor: this.state.humanCardBackGround}}
            imageurl={this.props.human.imageurl}
            level={this.props.human.level}
            currenthp={this.props.human.currenthp}
            maxhp={this.props.human.maxhp}
            strength={this.props.human.strength}
            defense={this.props.human.defense}
          />
        </div>
        <EnterBattleBtn
          battleHasStarted={this.state.battleHasStarted}
          enterBattle={this.enterBattle}
        />
      </div>
    )
  }
}

Fight.propTypes = {
  callHuman: PropTypes.func,
  declareGameOver: PropTypes.func,
  fightingDragon: PropTypes.object,
  gameOver: PropTypes.bool,
  human: PropTypes.object,
  saveHuman: PropTypes.func,
  updateDragon: PropTypes.func,
  updateHuman: PropTypes.func,
}

function mapStateToProps({ fightingDragon, human}) {
  return { fightingDragon, human };
};

export default connect(mapStateToProps, { callHuman, clearFightingDragon, saveHuman, updateDragon, updateHuman})(Fight);
