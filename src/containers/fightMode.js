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
      winner: null,
      dragonCardBackGround: 'black',
      humanCardBackGround: 'black',
      battleEntered: false,
      battleMode: true,
    }

    this.updateHumanStats = this.updateHumanStats.bind(this);
    this.updateDragonStats = this.updateDragonStats.bind(this);
    this.enterBattle = this.enterBattle.bind(this);
    this.changeActiveCard = this.changeActiveCard.bind(this);
    this.levelUpHuman = this.levelUpHuman.bind(this);
    this.displayWinnerMessage = this.displayWinnerMessage.bind(this);
  }

  componentDidMount() {
    if (!this.props.human.type) {
      this.props.callHuman(1);
    }
  }

  updateHumanStats(hp) {
    const humanAfterDamage = Object.assign(this.props.human, {currenthp: hp});
    this.props.updateHumanHP(humanAfterDamage);
  }

  updateDragonStats(hp) {
    const dragonAfterDamage = Object.assign(this.props.fightingDragon, {currenthp: hp});
    this.props.updateDragonHP(dragonAfterDamage);
  }

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
    console.log('base level damageToDragon', damageToDragon);

    // takes in damage stats and current hp of active character and makes recursive calls alternating between characters until the reaching the base case of one character's hit points dropping to zero.
    const battleTurn = (hp, damage, player) => {
      let newHP = hp - damage;
      if (player === 'dragon') {
        this.updateHumanStats(newHP);
      } else {
        this.updateDragonStats(newHP);
      }

      console.log('current player', player);

      if (newHP > 0) {
        console.log('newHP after update', newHP);
        if (player === 'human') {
          console.log('player is human and newHP is greater than zero');
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
  levelUpHuman() {
    console.log('the levelUpHuman function is being called');
    const newHuman = Object.assign(this.props.human, {
      level: this.props.human.level + 1,
      currenthp: Math.round(this.props.human.maxhp + (this.props.human.maxhp * .10)),
      maxhp: Math.round(this.props.human.maxhp + (this.props.human.maxhp * .10)),
      strength: Math.round(this.props.human.strength + (this.props.human.strength * .15)),
      defense: Math.round(this.props.human.defense + (this.props.human.strength * .15)),
    })
    return newHuman;
  };

  // View functions:

  // displays a winner message in the DOM
  displayWinnerMessage(player) {
    console.log('player inside of winner message', player);
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

  // render animation to show who has the active turn. In progress.
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
