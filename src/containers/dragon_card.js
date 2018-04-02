import React, { Component } from 'react';
import { connect } from 'react-redux';
import { enterFightMode } from '../actions/index';

class DragonCard extends Component {
  constructor(props) {
    super(props);

    this.createFightMode = this.createFightMode.bind(this);
  }

  createFightMode() {
    this.props.toggleFightMode()
    this.props.enterFightMode(this.props.dragon)
  }

  render() {
    let card = null;
    if (this.props.randomMode) {
      card = (
        <div className="dragon-card-container">
          <img className="dragon-card-image" src={this.props.imageurl} alt="dragon" />
          <h4>{this.props.type}</h4>
          <p>Level: {this.props.level}</p>
          <p>HP: {this.props.currenthp} / {this.props.maxhp}</p>
          <p>Strength: {this.props.strength}</p>
          <p>Defense: {this.props.defense}</p>
        </div>
      )
    } else {
      card = (
        <div className="dragon-card-container">
          <img className="dragon-card-image" src={this.props.imageurl} alt="dragon" />
          <h4>{this.props.type}</h4>
          <p>Level: {this.props.level}</p>
          <p>HP: {this.props.currenthp} / {this.props.maxhp}</p>
          <p>Strength: {this.props.strength}</p>
          <p>Defense: {this.props.defense}</p>
          <button className="fight-btn btn btn-primary" onClick={this.createFightMode}>Fight</button>
        </div>
      )
    }
    return (
      <div>
        {card}
      </div>
    );
  }
}

function mapStateToProps({ fightMode }) {
  return { fightMode };
}

export default connect(mapStateToProps, { enterFightMode })(DragonCard);
