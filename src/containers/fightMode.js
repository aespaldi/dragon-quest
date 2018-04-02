import React, { Component } from 'react';
import { connect } from 'react-redux';
import DragonCard from './dragon_card';
import HumanCard from '../components/human_card';
import { callHuman, saveHuman, updateHumanHP, updateDragonHP } from '../actions'
import './fightMode.css';

class Fight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      borderClass: 'black',
    }

    // this.updateInitialStats = this.updateInitialStats.bind(this);
    this.updateHumanStats = this.updateHumanStats.bind(this);
    this.updateDragonStats = this.updateDragonStats.bind(this);
    this.enterBattle = this.enterBattle.bind(this);
    this.changeActiveCardBorder = this.changeActiveCardBorder.bind(this);
    this.levelUpHuman = this.levelUpHuman.bind(this);
    this.displayWinnerMessage = this.displayWinnerMessage.bind(this);
  }

  componentDidMount() {
    if (!this.props.human.type) {
      this.props.callHuman(1);
    }
  }

  updateHumanStats(hp) {
    const humanAfterDamage = Object.assign({currenthp: hp}, this.props.human);
    this.props.updateHumanHP(humanAfterDamage);
  }

  updateDragonStats(hp) {
    const dragonAfterDamage = Object.assign({currenthp: hp}, this.props.fightingDragon);
    this.props.updateDragonHP(dragonAfterDamage);
  }

  displayWinnerMessage(winner) {
    if (winner === 'dragon') {
      this.setState({
        winner: 'Dragon Wins!',
      })
    } else {
      this.setState({
        winner: 'Human Wins!',
      })
    }
  }

  // the actual fight logic.
  enterBattle() {

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

    // takes in damage stats and current hp of active character and makes recursive calls alternating between characters until the reaching the base case of one character's hit points dropping to zero.
    const battleTurn = (hp, damage, type) => {
      let turnDamageToFoe = hp - damage;
      let newHP = hp - turnDamageToFoe;
      if (type === 'dragon') {
        this.updateHumanStats(newHP);
      } else {
        this.updateDragonStats(newHP);
      }

      if (newHP > 0) {
        if (type === 'human') {
          battleTurn(this.props.fightingDragon.currenthp, damageToHuman, 'dragon');
        } else {
          battleTurn(this.props.human.currenthp, damageToDragon, 'human');
        }
      } else {
        this.displayWinnerMessage(type);
      }
        const leveledUpHuman = this.levelUpHuman(this.props.human);
        this.props.saveHuman(leveledUpHuman);
        this.props.toggleFightMode();
    };
    // we start with the dragon's turn, because... dragons.
    battleTurn(this.props.human.currenthp, damageToHuman, 'dragon');
  };

  // levels up the human character, regardless of battle outcome.
  levelUpHuman() {
    const newHuman = {
      type: this.props.human.type,
      level: this.props.human.level + 1,
      currenthp: Math.round(this.props.human.currenthp + (this.props.human.currenthp * .10)),
      maxhp: Math.round(this.props.human.maxhp + (this.props.human.maxhp * .10)),
      strength: Math.round(this.props.human.strength + (this.props.human.strength * .15)),
      defense: Math.round(this.props.human.defense + (this.props.human.strength * .15)),
      imageurl: this.props.human.imageurl,
    }
    return newHuman;
  };

  // render animation to show who has the active turn. In progress.
  changeActiveCardBorder() {
    if (this.state.class === 'black') {
      this.setState({
        class: 'green'
      })
    } else {
      this.setState({
        class: 'black',
      })
    }
  };

  render() {
    return (
      <div>
        <h2>Battle Screen</h2>
        <p className="fight-intro-text">This human is trying to get glory. If you win, you level up and you get to enjoy your picnic. If you lose, say goodbye to your HP and your peaceful afternoon.</p>
        <div className="fight-container">
          <div className="fight-card">
            <DragonCard
              imageurl={this.props.fightingDragon.imageurl}
              type={this.props.fightingDragon.type}
              level={this.props.fightingDragon.level}
              currenthp={this.props.fightingDragon.dragonHP}
              maxhp={this.props.fightingDragon.maxhp}
              strength={this.props.fightingDragon.strength}
              defense={this.props.fightingDragon.defense}
            />
          </div>
          <div className="fight-card">
            <HumanCard
              imageurl={this.props.human.imageurl}
              level={this.props.human.level}
              currenthp={this.props.human.currenthp}
              maxhp={this.props.human.maxhp}
              strength={this.props.human.strength}
              defense={this.props.human.defense}
            />
          </div>
        </div>
        <button className="enter-battle-btn btn btn-success" onClick={this.enterBattle}>
          Enter Battle!
        </button>
        <h4>{this.state.winner}</h4>
      </div>
    )
  }
}

function mapStateToProps({ fightingDragon, human}) {
  return { fightingDragon, human };
};

export default connect(mapStateToProps, { callHuman, saveHuman, updateDragonHP, updateHumanHP })(Fight);
