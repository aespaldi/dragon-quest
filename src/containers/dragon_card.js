import React, { Component } from 'react';
import { connect } from 'react-redux';
import { enterFightMode } from '../actions/index';

class DragonCard extends Component {
  constructor(props) {
    super(props);

    this.createFightMode = this.createFightMode.bind(this);
    this.renderFightButton = this.renderFightButton.bind(this);
  }

  createFightMode() {
    this.props.toggleFightMode()
    this.props.enterFightMode(this.props.dragon)
  }

  renderFightButton() {
    if (this.props.carouselMode) {
      return (
        <div>
          <button className="fight-btn btn btn-primary" onClick={this.createFightMode}>Fight</button>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="dragon-card-container">
        <img className="dragon-card-image" src={this.props.imageurl} alt="dragon" />
        <h4>{this.props.type}</h4>
        <p>Level: {this.props.level}</p>
        <p>HP: {this.props.currenthp} / {this.props.maxhp}</p>
        <p>Strength: {this.props.strength}</p>
        <p>Defense: {this.props.defense}</p>
        {this.renderFightButton()}
      </div>
    );
  }
}

function mapStateToProps({ fightMode }) {
  return { fightMode };
}

export default connect(mapStateToProps, { enterFightMode })(DragonCard);
