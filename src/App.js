import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import CardCarousel from './containers/card_carousel';
import GetRandomDragon from './containers/get_random_dragon';
import Fight from './containers/fightMode';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      randomDragonVisible: false,
      dragonCollectionVisible: true,
      fightMode: false,
    }

    this.callDragon = this.callDragon.bind(this);
    this.acceptDragon = this.acceptDragon.bind(this);
    this.toggleFightMode = this.toggleFightMode.bind(this);

  }

  callDragon() {
    this.setState({
      randomDragonVisible: true,
    })
  }

  acceptDragon() {
    this.setState({
      randomDragonVisible: false,
    })
  }

  toggleFightMode() {
    if (this.state.fightMode) {
      this.setState({
        fightMode: false,
      })
    } else {
      this.setState({
        fightMode: true,
      })
    }
  }

  render() {
    let mainView = null;
    let randomDragon = null;

    if (this.state.randomDragonVisible) {
      randomDragon = (
        <div className="dragon-selection-container">
          <GetRandomDragon
            acceptDragon={this.acceptDragon}
          />
            <div className="dragon-selection-description">
          </div>
        </div>
      )
    }

    if (this.state.fightMode) {
      mainView = (
        <div className="fight-screen-container">
          <Fight
            toggleFightMode={this.toggleFightMode}
            fightMode={this.state.fightMode}
          />
        </div>
      )
    } else {
      mainView = (
        <div>
          <h1>Dragon Quest</h1>
          <div className="dragon-collection-description">
            <p>Call a dragon and accept her to add her to your defense squad, or send her away to try for another type! You can only have ten at any given time. Click "fight" on a dragon's card to face off against a human that blunders into the village. Each successive human you face might be a little bit harder. You will level up after a successful battle, or you can merge two dragons for a chance to create a powerful new dragon.</p>
            <button id="dragon-call-btn" className="btn btn-success" onClick={this.callDragon}>
              Call Dragon
            </button>
            <button id="dragon-merge-btn" className="btn btn-info">
              Merge Dragons
            </button>
          </div>
          <div className="carousel">
            <CardCarousel
              toggleFightMode={this.toggleFightMode}
            />
          </div>
          {randomDragon}
        </div>
      )
    }

    return (
      <div className="App">
        {mainView}
      </div>
    );
  }
}

const mapStateToProps = ({ fightMode }) => {
  return { fightMode };
};

export default connect(mapStateToProps)(App);
