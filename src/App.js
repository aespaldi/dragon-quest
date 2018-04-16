import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Fight from './containers/fightMode';
import CardCarousel from './containers/card_carousel';
import GetRandomDragon from './containers/get_random_dragon';
import MergeContainer from './containers/merge_container.js'
import { clearMergingDragons, mergingDragon } from './actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      randomDragonVisible: false,
      dragonCollectionVisible: true,
      fightMode: false,
      gameOver: false,
      mergeMode: false,
      mergeContainer: false,
    }

    this.acceptDragon = this.acceptDragon.bind(this);
    this.callDragon = this.callDragon.bind(this);
    this.declareGameOver = this.declareGameOver.bind(this);
    this.renderCallDragonBtn = this.renderCallDragonBtn.bind(this);
    this.renderFightView = this.renderFightView.bind(this);
    this.renderMainView = this.renderMainView.bind(this);
    this.renderMergeBtn = this.renderMergeBtn.bind(this);
    this.renderRandomDragonContainer = this.renderRandomDragonContainer.bind(this);
    this.toggleMergeContainer = this.toggleMergeContainer.bind(this);
    this.toggleFightMode = this.toggleFightMode.bind(this);
    this.toggleMergeMode = this.toggleMergeMode.bind(this);
  }

  acceptDragon() {
    this.setState({
      randomDragonVisible: false,
    });
  };

  callDragon() {
    this.setState({
      randomDragonVisible: true,
    });
  };

  declareGameOver() {
    this.setState({
      gameOver: true,
    })
  }

  // toggle functions for view.

  toggleFightMode() {
    if (this.state.fightMode) {
      this.setState({
        fightMode: false,
      });
    } else {
      this.setState({
        fightMode: true,
      });
    };
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

  renderCallDragonBtn() {
    if (!this.state.mergeMode) {
      return (
        <span>
          <button id="dragon-call-btn" className="btn btn-success" onClick={this.callDragon}>
            Call Dragon
          </button>
        </span>
      );
    };
  };
  renderFightView() {
    if (this.state.fightMode) {
      return (
        <div className="fight-screen-container">
          <Fight
            toggleFightMode={this.toggleFightMode}
            fightMode={this.state.fightMode}
            mergeMode={this.state.mergeMode}
            gameOver={this.state.gameOver}
            declareGameOver={this.declareGameOver}
          />
        </div>
      );
    };
  };

  renderHelpText() {
    if (this.state.mergeMode) {
      return (
        <p>
          Scroll through your cards and click 'Merge' to add a dragon to your mergelist. You can only merge two, and you cannot merge the same dragon twice. When you think you have your winning combination, click 'Prepare to Merge' to finalize your choice.
        </p>
      );
    } else {
      return (
        <p>
          Call a dragon and accept her to add her to your defense squad, or send her away to try for another type! You can only have ten at any given time. Click "fight" on a dragon's card to face off against a human that blunders into the village. Each successive human you face might be a little bit harder. You will level up after a successful battle, or you can merge two dragons for a chance to create a powerful new dragon.
        </p>
      );
    }
  };

  /**
  * @function renderGameOverMode - displays JSX with a victory message.
  * @returns {JSX}
  */

  renderGameOverMode() {
    if (this.state.gameOver) {
      return (
        <div className="game-over-message">
          <h1>You Won!</h1>
          <p>The humans have decided that maybe camping next to a village of dragons was a bad idea. Enjoy your peace and quiet!</p>
          {/* I will also put some cute picture here in the future. */}
        </div>
      );
    }
  }

  renderMergeBtn() {
    if(!this.state.mergeMode) {
      return (
        <span>
          <button id="dragon-merge-btn" className="btn btn-info" onClick={this.toggleMergeMode}>
            Merge Mode
          </button>
        </span>
      );
    } else {
      return (
        <span>
          <button id="dragon-merge-btn" className="btn btn-info" onClick={this.toggleMergeMode}>
            Return to Village
          </button>
        </span>
      );
    }
  };

  renderMainView() {
    if (!this.state.randomDragonVisible && !this.state.fightMode && !this.state.mergeContainer && !this.state.gameOver) {
      return (
        <div>
          <div className="dragon-collection-description">
            <div className="control-btns">
              {this.renderCallDragonBtn()}
              {this.renderMergeBtn()}
              {this.renderMergePossibleMode()}
            </div>
          </div>
          <div className="carousel">
            <CardCarousel
              toggleFightMode={this.toggleFightMode}
              mergeMode={this.state.mergeMode}
            />
          </div>
        </div>
      );
    }
  };

  renderMergePossibleMode() {
    if (this.props.mergingDragons && this.props.mergingDragons.length >= 2) {
      return (
        <button className="merge-mode-btn btn btn-danger" onClick={this.toggleMergeContainer}>
          Prepare To Merge
        </button>
      );
    }
  };

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
  };

  renderRandomDragonContainer() {
    if (this.state.randomDragonVisible) {
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
        {this.renderGameOverMode()}
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
