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

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      randomDragonIsVisible: false,
      fightMode: false,
      gameOver: false,
      mergeMode: false,
      mergeContainerIsVisible: false,
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

  toggleMergeContainer() {
    if (this.state.mergeContainerIsVisible) {
      this.setState({
        mergeContainerIsVisible: false,
      });
    } else {
      this.setState({
        mergeContainerIsVisible: true,
      });
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

  // all of the render view functions.

  /**
  * @function renderFightView - renders the fightview jsx if the game is in fightmode.
  * @returns {JSX Component}
  */

  renderFightView() {
    if (this.state.fightMode) {
      return (
        <FightView
          declareGameOver={this.declareGameOver}
          fightMode={this.state.fightMode}
          gameOver={this.state.gameOver}
          mergeMode={this.state.mergeMode}
          toggleFightMode={this.toggleFightMode}
        />
      );
    }
  }

  /**
  * @function renderGameOverScreen - renders the gameover jsx if the game victory condition has been met.
  * @returns {JSX Component}
  */

  renderGameOverScreen() {
    if (this.state.gameOver) {
      return (
        <GameOverScreen
          gameOver={this.state.gameOver}
        />
      );
    }
  };

  /**
  * @function renderMainView - renders the mainview jsx if the game is not in any special modes.
  * @returns {JSX Component}
  */

  renderMainView() {
    if (!this.state.randomDragonIsVisible && !this.state.fightMode && !this.state.mergeContainerIsVisible && !this.state.gameOver) {
      return (
        <MainView
          store={this.props.store}
          callDragon={this.callDragon}
          randomDragonIsVisible={this.state.randomDragonIsVisible}
          fightMode={this.state.fightMode}
          mergeContainerIsVisible={this.state.mergeContainerIsVisible}
          mergingDragons={this.props.mergingDragons}
          mergeMode={this.state.mergeMode}
          gameOver={this.state.gameOver}
          toggleMergeContainer={this.toggleMergeContainer}
          toggleMergeMode={this.toggleMergeMode}
          toggleFightMode={this.toggleFightMode}
        />
      );
    }
  }

  /**
  * @function renderMergeView - renders the mergeview jsx if the game is in mergemode.
  * @returns {JSX Component}
  */

  renderMergeView() {
    if (this.state.mergeContainerIsVisible) {
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

  /**
  * @function renderRandomDragonContainer - renders the random dragon choice jsx if the player selects "call new dragon".
  * @returns {JSX Component}
  */

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

  render() {
    return (
      <div className="App">
        <h1 className="main-title">Dragon Quest</h1>
        {this.renderGameOverScreen()}
        {this.renderFightView()}
        {this.renderMergeView()}
        {this.renderRandomDragonContainer()}
        {this.renderMainView()}
      </div>
    );
  };
};

const mapStateToProps = ({ fightMode, mergingDragons }) => {
  return { fightMode, mergingDragons };
};

export default connect(mapStateToProps, { clearMergingDragons, mergingDragon })(App);
