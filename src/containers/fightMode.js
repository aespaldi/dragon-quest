import React, { Component } from 'react';
import { connect } from 'react-redux';
import { callHuman, saveHuman, updateHumanHP, updateDragonHP } from '../actions'
import DragonCard from './dragon_card';
import HumanCard from '../components/human_card';
import './fightMode.css';

class Fight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      battleEntered: false,
      battleMode: true,
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

  /**
  * @function enterBattle - sets the initial damage values for each player and then calls battleTurn.
  * @returns {undefined} - this is a higher order function that calls other functions.
  */

  // the actual fight logic.
  enterBattle() {
    this.setState({
      enterBattle: true,
    })
    const {
      strength: dragonStrength,
      defense: dragonDefense,
    } = this.props.fightingDragon;

    const {
      strength: humanStrength,
      defense: humanDefense,
    } = this.props.human;

    let damageToHuman = dragonStrength - humanDefense;
    if (damageToHuman < 0) {
      damageToHuman = 0;
    }

    let damageToDragon = humanStrength - dragonDefense;
    if (damageToDragon < 0) {
      damageToDragon = 0;
    }

    /**
    * @function battleTurn - applies damage to each player in a single turn. called recursively until one player's hit points drop to or below zero.
    *
    * @param {number} hp - current hit points of the opposing player.
    * @param {number} damage - the damage being dealt to the opposite player.
    * @param {string} player - the type of player - either dragon or human.
    * @returns {undefined} - the function either calls itself or redux action creators and never returns a value.
    */

    const battleTurn = (hp, damage, player) => {
      let newHP = hp - damage;
      if (player === 'dragon') {
        this.updateHumanStats(newHP);
      } else {
        this.updateDragonStats(newHP);
      }

      if (newHP > 0) {
        if (player === 'human') {
          this.changeActiveCard(player);
          battleTurn(this.props.human.currenthp, damageToHuman, 'dragon');
        } else {
          this.changeActiveCard(player);
          battleTurn(this.props.fightingDragon.currenthp, damageToDragon, 'human');
        }
      } else {
        this.displayWinnerMessage(player);
        const leveledUpHuman = this.levelUpHuman(this.props.human);
        this.props.saveHuman(leveledUpHuman);
      }
    };
    // we start with the dragon's turn, because... dragons.
    battleTurn(this.props.human.currenthp, damageToHuman, 'dragon');
  };

  // levels up the human character, regardless of battle outcome.

  /**
  * @function levelUpHuman - adds a percentage to the current human's stats and returns a new human.
  * @returns {object} - returns an object representing the new stats for the human player.
  *
  */

  levelUpHuman() {
    const newHuman = Object.assign(this.props.human, {
      level: this.props.human.level + 1,
      currenthp: Math.round(this.props.human.maxhp + (this.props.human.maxhp * .10)),
      maxhp: Math.round(this.props.human.maxhp + (this.props.human.maxhp * .10)),
      strength: Math.round(this.props.human.strength + (this.props.human.strength * .15)),
      defense: Math.round(this.props.human.defense + (this.props.human.strength * .15)),
    })
    return newHuman;
  };

  /**
  * @function updateDragonStats - creates a new dragon object with updated hp and passes it to a redux action creator that updates those stats in the store.
  *
  * @returns {undefined} - function calls another function and returns nothing.
  */

  updateDragonStats(hp) {
    const dragonAfterDamage = Object.assign(this.props.fightingDragon, {currenthp: hp});
    this.props.updateDragonHP(dragonAfterDamage);
  };

  /**
  * @function updateHumanStats - creates a new human object with updated hp and passes it to a redux action creator that updates those stats in the store.
  *
  * @returns {undefined} - function calls another function and returns nothing.
  */

  updateHumanStats(hp) {
    const humanAfterDamage = Object.assign(this.props.human, {currenthp: hp});
    this.props.updateHumanHP(humanAfterDamage);
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

    let enterBattleBtn = null;

    if (!this.state.enterBattle) {
      enterBattleBtn = (
        <div>
          <button className="enter-battle-btn btn btn-success" onClick={this.enterBattle}>
            Enter Battle!
          </button>
        </div>
      )
    }

    let returnBtn = null;

    if (this.state.winner !== null) {
      returnBtn = (
        <div>
          <button className="return-btn btn btn-primary" onClick={this.props.toggleFightMode}>
            Return to Village
          </button>
        </div>
      )
    }

    return (
      <div>
        <h2>Battle Screen</h2>
        <p className="fight-intro-text">This human is trying to get glory. If you win, you level up and you get to enjoy your picnic. If you lose, say goodbye to your HP and your peaceful afternoon.</p>
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
            />
          </div>
          <div className="fight-card">
            <HumanCard
              style={{backgroundColor: this.state.humanCardBackGround}}
              imageurl={this.props.human.imageurl}
              level={this.props.human.level}
              currenthp={this.props.human.currenthp}
              maxhp={this.props.human.maxhp}
              strength={this.props.human.strength}
              defense={this.props.human.defense}
            />
          </div>
        </div>
        <h4>{this.state.winner}</h4>
        {enterBattleBtn}
        {returnBtn}
      </div>
    )
  }
}

function mapStateToProps({ fightingDragon, human}) {
  return { fightingDragon, human };
};

export default connect(mapStateToProps, { callHuman, saveHuman, updateDragonHP, updateHumanHP})(Fight);
