import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    this.renderFightIntroText = this.renderFightIntroText.bind(this);
    this.updateDragonStats = this.updateDragonStats.bind(this);
    this.updateHumanStats = this.updateHumanStats.bind(this);
  }

  componentDidMount() {
    if (!this.props.human.type) {
      this.props.callHuman(1);
    }
  }

  /**
  * @function checkForGameWin - checks the level of the human. if the level is at the pre-determined max, the function will return true.
  * @param {object} human - the object representing the human.
  * @returns {boolean} - returns true or false based on the level of the human passed in.
  */

  /* REVIEW COMMENT: To some degree this is personal preference
  so take this with a grain of salt
  (see some discussion here https://stackoverflow.com/questions/1370840/naming-conventions-what-to-name-a-method-that-returns-a-boolean )
  but generally, I find it helpful to name functions that check a boolean value
  something like gameIsOver. I find it makes the conditional statements 
  and other parts of the code a little more readable (e.g. "if gameIsOver"
  rather than "if checkForGameWin". */
  
  checkForGameWin(human) {
    if (human.level >= 20) {
      return true;
    }
    return false;
  }

  /**
  * @function enterBattle - sets the initial damage values for each player and then calls battleTurn.
  * @returns {undefined} - this is a higher order function that calls other functions.
  */

  // the actual fight logic.
  enterBattle() {
    this.setState({
      enterBattle: true, /* REVIEW COMMENT: Similar boolean naming feelings here. "battleHasStarted" or similar would be my preference .*/
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
        /*
          REVIEW COMMENT:
          This conditional seems to be essentially a duplicate of `if (player === 'dragon') {`
          above. Can you merge this logic to only need one conditional?
        */
        if (player === 'human') {
          this.changeActiveCard(player);
          battleTurn(this.props.human.currenthp, damageToHuman, 'dragon');
        } else {
          this.changeActiveCard(player);
          battleTurn(this.props.fightingDragon.currenthp, damageToDragon, 'human');
        }
      } else {
        this.displayWinnerMessage(player);
        if (this.checkForGameWin(this.props.human)) {
          this.props.declareGameOver(); 
        } else {
          const leveledUpHuman = this.levelUpHuman(this.props.human);
          this.props.saveHuman(leveledUpHuman);
        }
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
      /*
        REVIEW COMMENT:
      
        This value increasing functionality seems like it could be dried up
        with a small helper function. Smoething you could call like
        `nextLevelStatValue(currentStatValue, multiplier)`
      */
      currenthp: Math.round(this.props.human.maxhp + (this.props.human.maxhp * .10)),
      maxhp: Math.round(this.props.human.maxhp + (this.props.human.maxhp * .10)),
      strength: Math.round(this.props.human.strength + (this.props.human.strength * .15)),
      defense: Math.round(this.props.human.defense + (this.props.human.strength * .15)),
    })
    return newHuman;
  };

  /**
  * @function updateDragonStats - creates a new dragon object with updated hp and passes it to a redux action creator that updates those stats in the store.
  * @returns {undefined} - function calls another function and returns nothing.
  */

  updateDragonStats(hp) {
    const dragonAfterDamage = Object.assign(this.props.fightingDragon, {currenthp: hp});
    this.props.updateDragonHP(dragonAfterDamage);
  };

  /**
  * @function updateHumanStats - creates a new human object with updated hp and passes it to a redux action creator that updates those stats in the store.
  * @returns {undefined} - function calls another function and returns nothing.
  */

  updateHumanStats(hp) {
    const humanAfterDamage = Object.assign(this.props.human, {currenthp: hp});
    /*
      REVIEW COMMENT:
    
      This updateHumanHP function doesn't really update the HP,
      it updates the whole human object. I'd either rename it to updateHuman
      or change it so that it necessarily only takes HP and only updates HP.

      Same with the dragon HP function above.
    */
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

  /**
  * @function renderEnterBattleBtn - renders the button that the user clicks to enter the battle.
  * @returns {JSX}
  */
  /*
    REVIEW COMMENT:
  
    This could be a stateless functional component. I tend to prefer that
    over what you're doing here in most cases. Partly, I think it makes
    the main render function easier to read, and partly, making them
    stateless components makes it clear that they aren't doing any complex
    logic whatsoever, which I think makes the code overall easier to reason
    about.

    Related resource: https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc
  */
  renderEnterBattleBtn() {
    if (!this.state.enterBattle) {
      return (
        <div>
          <button className="enter-battle-btn btn btn-success" onClick={this.enterBattle}>
            Enter Battle!
          </button>
        </div>
      )
    }
  }

  /**
  * @function renderFightIntroText - renders instructions to the user if the battle is not yet won.
  * @returns {JSX}
  */
  /*
    REVIEW COMMENT:
  
    This could be a stateless functional component.
  */
  renderFightIntroText() {
    if (this.state.winner === null) {
      return (
        <p className="fight-intro-text">
          This human is trying to get glory, or just simply wandered in. Dispatch them quickly to go back to your peaceful afternoon. Warning - they keep getting stronger. If you find yourself losing, you may need to merge some dragons to become stronger!
        </p>
      );
    }
  };

  /**
  * @function renderHumanCard - renders the human card if the battle has not yet been won.
  * @returns {JSX}
  */

  /*
    REVIEW COMMENT:
  
    This could be a stateless functional component.
  */
  renderHumanCard() {
    if (this.state.winner === null) {
      return (
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
      );
    }
  };

  /**
  * @function renderReturnBtn - renders the button that allows a return to the main screen after a battle is finished.
  * @returns {JSX}
  */

  /*
    REVIEW COMMENT:
  
    This could be a stateless functional component.
  */
  renderReturnBtn() {
    if (this.state.winner !== null) {
      return (
        <div>
          <button className="return-btn btn btn-primary" onClick={this.props.toggleFightMode}>
            Return to Village
          </button>
        </div>
      );
    }
  };

  render() {

    let returnBtn = null;

    return (
      <div>
        {this.renderFightIntroText()}
        <h3>{this.state.winner}</h3>
        {this.renderReturnBtn()}
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
          {this.renderHumanCard()}
        </div>
        {this.renderEnterBattleBtn()}
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
  updateDragonHP: PropTypes.func,
  updateHumanHP: PropTypes.func,
}

function mapStateToProps({ fightingDragon, human}) {
  return { fightingDragon, human };
};

export default connect(mapStateToProps, { callHuman, saveHuman, updateDragonHP, updateHumanHP})(Fight);
