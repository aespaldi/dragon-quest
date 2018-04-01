import React, { Component } from 'react';
import { connect } from 'react-redux';
import DragonCard from './dragon_card';
import Human from './human';
import { callHuman, saveHuman } from '../actions'
import './fightMode.css';

class Fight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dragonHP: this.props.fightingDragon.currenthp,
      humanHP: this.props.human.currenthp,
      winner: null,
      borderClass: 'black',
    }

    this.enterBattle = this.enterBattle.bind(this);
    this.changeActiveCardBorder = this.changeActiveCardBorder.bind(this);
    this.levelUpHuman = this.levelUpHuman.bind(this);
  }

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
  }

  enterBattle() {
    const {
      strength: dragonStrength,
      defense: dragonDefense,
    } = this.props.fightingDragon;

    let dragonHP = this.state.dragonHP;

    const {
      strength: humanStrength,
      defense: humanDefense,
    } = this.props.human;

    let humanHP = this.state.humanHP;

    let damageToHuman = dragonStrength - humanDefense;
    let damageToDragon = humanStrength - dragonDefense;

    const battleTurn = (hp, damage, type) => {
      console.log('type of player in battle', type);
      // if the damage being dealt is greater than 0:
      if (damage > 0) {
        // let the actual damage done to the opponent equal their hp minus the damage score.
        let turnDamageToFoe = hp - damage;
        console.log('turn damage', turnDamageToFoe)
        console.log('hp', hp);
        console.log('damage', damage);
        // modify the hp to equal their current hp minus the turn damage they received.
        hp = hp - turnDamageToFoe;
        console.log('human hp after damage', hp);
        // if the type of the player turn is 'dragon', set the state of the human hp to be the new hp above.
        if (type === 'dragon') {
          this.setState({
            humanHP: hp,
          })
          console.log('humanHP in state after changing state', humanHP);
          // otherwise, if the turn is 'human', set the state of the dragon hp to be the new hp above.
        } else {
          this.setState({
            dragonHP: hp,
          })
        }
      }
      // if the hp of the current foe is greater than 0, we want to change turns.
      if (hp > 0) {
        console.log('condition - hp greater than 0', hp);
        // if the current turn is the human's, change to the dragon's turn after 2 seconds by calling battleTurn with type dragon. otherwise, call the human's turn.
        setTimeout(() => {
          if (type === 'human') {
            battleTurn(humanHP, damageToHuman, 'dragon');
          } else {
            battleTurn(dragonHP, damageToDragon, 'human');
          }
        }, 2000);
        // however, if the current foe's hp is lower than 0, a win condition has occured.
      } else {
        console.log('condition - hp is less than 0', hp)
        if (type === 'dragon') {
          this.setState({
            winner: 'Dragons Wins!',
          })
        } else {
          this.setState({
            winner: 'Human wins!',
          })
        }
        // now, level up the human player and return to the main screen after 3 seconds.
        setTimeout(() => {
          const leveledUpHuman = this.levelUpHuman(this.props.human)
          this.props.saveHuman(leveledUpHuman);
          this.props.toggleFightMode();
        }, 3000);
      };
    };
    battleTurn(humanHP, damageToHuman, 'dragon');
  };


  //   const humanTurn = (hp, damage) => {
  //     this.changeActiveCardBorder();
  //     if (damage > 0) {
  //       let turnDamage = dragonHP - damageToDragon;
  //       dragonHP = dragonHP - turnDamage;
  //       this.setState({
  //         dragonHP: dragonHP,
  //       })
  //     }
  //
  //     if (dragonHP > 0) {
  //       setTimeout(() => {
  //         dragonTurn()
  //         this.changeActiveCardBorder();
  //       }, 2000);
  //     } else {
  //       const leveledUpHuman = this.levelUpHuman(this.props.human)
  //       this.props.saveHuman(leveledUpHuman);
  //       this.setState({
  //         winner: 'Human wins!'
  //       })
  //       setTimeout(() => {
  //         const leveledUpHuman = this.levelUpHuman(this.props.human)
  //         this.props.saveHuman(leveledUpHuman);
  //         this.props.toggleFightMode();
  //       }, 3000);
  //     }
  //   }
  //
  //   // give the dragon a turn.
  //   const dragonTurn = () => {
  //     this.changeActiveCardBorder();
  //     // the damage is the current hp of the human minus the calculated damaged.
  //     if (damageToHuman > 0) {
  //       humanHP = humanHP - damageToHuman;
  //       this.setState({
  //         humanHP: humanHP,
  //       })
  //     }
  //     // if the human hp minus the turn damage is greater than 0, call humanTurn.
  //     if (humanHP > 0) {
  //       setTimeout(() => {
  //         humanTurn();
  //         this.changeActiveCardBorder();
  //       }, 2000)
  //
  //     } else {
  //       this.setState({
  //         winner: 'Dragon wins!'
  //       })
  //       setTimeout(() => {
  //         const leveledUpHuman = this.levelUpHuman(this.props.human)
  //         this.props.saveHuman(leveledUpHuman);
  //         this.props.toggleFightMode();
  //       }, 3000);
  //     }
  //   }
  //   humanTurn();
  // }

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
  }

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
              currenthp={this.state.dragonHP}
              maxhp={this.props.fightingDragon.maxhp}
              strength={this.props.fightingDragon.strength}
              defense={this.props.fightingDragon.defense}
            />
          </div>
          <div className="fight-card">
            <Human
              imageurl={this.props.human.imageurl}
              level={this.props.human.level}
              currenthp={this.state.humanHP}
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
}

export default connect(mapStateToProps, { callHuman, saveHuman })(Fight);
