import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import CardCarousel from './containers/card_carousel';
import GetRandomDragon from './containers/get_random_dragon';
import MergeContainer from './containers/merge_container.js'
import Fight from './containers/fightMode';
import { mergingDragon, clearMergingDragons } from './actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      randomDragonVisible: false,
      dragonCollectionVisible: true,
      fightMode: false,
      mergeMode: false,
      mergeContainer: false,
    }

    this.acceptDragon = this.acceptDragon.bind(this);
    this.callDragon = this.callDragon.bind(this);
    this.renderCallDragonBtn = this.renderCallDragonBtn.bind(this);
    this.renderMergeBtn = this.renderMergeBtn.bind(this);
    this.renderMergeContainer = this.renderMergeContainer.bind(this);
    this.toggleFightMode = this.toggleFightMode.bind(this);
    this.toggleMergeMode = this.toggleMergeMode.bind(this);
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

  // toggle functions for view.

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

  toggleMergeMode() {
    if (this.state.mergeMode) {
      const data = [];
      this.props.clearMergingDragons(data);
      this.setState({
        mergeMode: false,
      })
    } else {
      this.setState({
        mergeMode: true,
      })
    }
  }

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
  }

  renderMergePossibleMode() {
    if (this.props.mergingDragons && this.props.mergingDragons.length >= 2) {
      return (
        <div>
          <button className="merge-mode-btn btn btn-danger" onClick={this.renderMergeContainer}>Prepare To Merge</button>
        </div>
      );
    }
  }

  renderMergeContainer() {
    this.setState({
      mergeContainer: true,
    })
  }

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
  }

  render() {
    console.log('this.props', this.props);
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
            mergeMode={this.state.mergeMode}
          />
        </div>
      )
    } else if (this.state.mergeContainer) {
      mainView = <div>
        <MergeContainer />
      </div>
    } else {
      mainView = (
        <div>
          <h1>Dragon Quest</h1>
          <div className="dragon-collection-description">
            {this.renderHelpText()}
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

const mapStateToProps = ({ fightMode, mergingDragons }) => {
  return { fightMode, mergingDragons };
};

export default connect(mapStateToProps, { clearMergingDragons, mergingDragon })(App);
