import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import FightView from './components/fightView';
import GameOverScreen from './components/GameOverScreen';
import HelpText from './components/helpText';
import GetRandomDragon from './containers/get_random_dragon';
import MainView from './components/mainView';
import MergeContainer from './containers/merge_container.js'
import { clearMergingDragons, mergingDragon } from './actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      randomDragonIsVisible: false,
      fightMode: false,
      gameOver: false,
      mergeMode: false,
      mergeContainer: false,
    }

    this.acceptDragon = this.acceptDragon.bind(this);
    this.callDragon = this.callDragon.bind(this);
    this.declareGameOver = this.declareGameOver.bind(this);
    this.renderRandomDragonContainer = this.renderRandomDragonContainer.bind(this);
    this.toggleMergeContainer = this.toggleMergeContainer.bind(this);
    this.toggleFightMode = this.toggleFightMode.bind(this);
    this.toggleMergeMode = this.toggleMergeMode.bind(this);
  }

  acceptDragon() {
    this.setState({
      randomDragonIsVisible: false,
    });
  };

  callDragon() {
    this.setState({
      randomDragonIsVisible: true,
    });
  };

  declareGameOver() {
    this.setState({
      gameOver: true,
    })
  }

  // toggle functions for view.

  toggleFightMode() {
    if (!this.state.fightMode) {
      this.setState({
        fightMode: true,
      });
    } else {
      this.setState({
        fightMode: false,
      })
    }
  };

  toggleMergeMode() {
    if (this.state.mergeMode) {
      const data = [];
      this.props.clearMergingDragons(data);
      this.setState({
        mergeMode: false,
      });
    } else {
      this.setState({
        mergeMode: true,
      });
    };
  };

  // all of the view functions.

  renderMergeView() {
    if (this.state.mergeContainer) {
      return (
        <div>
          <MergeContainer
            toggleMergeContainer={this.toggleMergeContainer}
            toggleMergeMode={this.toggleMergeMode}
           />
        </div>
      );
    }
    return null;
  };

  renderRandomDragonContainer() {
    if (this.state.randomDragonIsVisible) {
      return (
        <div className="dragon-selection-container">
          <GetRandomDragon
            acceptDragon={this.acceptDragon}
          />
        </div>
      );
    }
  };

  toggleMergeContainer() {
    if (this.state.mergeContainer) {
      this.setState({
        mergeContainer: false,
      });
    } else {
      this.setState({
        mergeContainer: true,
      });
    }
  };

  render() {
    return (
      <div className="App">
        <h1 className="main-title">Dragon Quest</h1>
        <GameOverScreen
          gameOver={this.state.gameOver}
        />
        <FightView
          declareGameOver={this.declareGameOver}
          fightMode={this.state.fightMode}
          gameOver={this.state.gameOver}
          mergeMode={this.state.mergeMode}
          toggleFightMode={this.toggleFightMode}
        />
        {this.renderMergeView()}
        {this.renderRandomDragonContainer()}
        <MainView
          callDragon={this.callDragon}
          randomDragonIsVisible={this.state.randomDragonIsVisible}
          fightMode={this.state.fightMode}
          mergeContainer={this.state.mergeContainer}
          mergeMode={this.state.mergeMode}
          gameOver={this.state.gameOver}
          toggleMergeMode={this.toggleMergeMode}
          toggleFightMode={this.toggleFightMode}
        />
      </div>
    );
  };
};

const mapStateToProps = ({ fightMode, mergingDragons }) => {
  return { fightMode, mergingDragons };
};

export default connect(mapStateToProps, { clearMergingDragons, mergingDragon })(App);
