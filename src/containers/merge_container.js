import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToUserDragons, clearMergingDragons, getAllDragonsForLevel, removeFromUserDragons, saveDragon } from '../actions';
import DragonCard from './dragon_card';
import './merge_container.css';

class MergeContainer extends Component {
  constructor(props) {
    super(props);

    this.createSuperDragon = this.createSuperDragon.bind(this);
    this.levelUpDragon = this.levelUpDragon.bind(this);
    this.renderMergingDragons = this.renderMergingDragons.bind(this);
    this.renderNewDragon = this.renderNewDragon.bind(this);
    this.returnToVillage = this.returnToVillage.bind(this);
  }

  levelUpDragon(dragon) {
    const newDragon = {
      id: this.props.mergingDragons[0].id,
      type: this.props.mergingDragons[0].type,
      imageurl: this.props.mergingDragons[0].imageurl,
      dragonId: this.props.mergingDragons[0].dragonId,
      level: this.props.mergingDragons[0].level + 1,
      currenthp: Math.round(this.props.mergingDragons[0].maxhp + (this.props.mergingDragons[0].maxhp * .10)),
      maxhp: Math.round(this.props.mergingDragons[0].maxhp + (this.props.mergingDragons[0].maxhp * .10)),
      strength: Math.round(this.props.mergingDragons[0].strength + (this.props.mergingDragons[0].strength * .15)),
      defense: Math.round(this.props.mergingDragons[0].defense + (this.props.mergingDragons[0].defense * .15)),
    }
    return newDragon;
  }

  componentDidMount() {
    // first, call all new dragons from the appropriate level.
    this.props.getAllDragonsForLevel(2)
  }

  createSuperDragon() {
    // determine which of these is an appropriate color match.
    const colors = this.props.mergingDragons.map((dragon) => {
      return dragon.type;
    })
    const dragonIds = this.props.mergingDragons.map((dragon) => {
      return dragon.dragonId;
    })
    if (colors[0] === colors[1]) {
      const leveledUpDragon = this.levelUpDragon(this.props.mergingDragons[0]);
      // add the dragon to the shinyNewDragon store so it can be displayed.
      this.props.saveDragon(leveledUpDragon);

      this.props.dragons.forEach((dragon) => {
        // if the dragonId of the dragons match the dragonId of a mergingDragon, remove it.
        if (dragonIds.includes(dragon.dragonId)) {
          // we need to find the index of the dragon before doing splice.
          const index = this.props.dragons.indexOf(dragon);
          this.props.removeFromUserDragons(index);
        }
      })
      // add the chosen dragon to the dragons array. (addToUserDragons())
      this.props.addToUserDragons(leveledUpDragon);
    }
  }

  renderMergingDragons() {
    if (!this.props.shinyNewDragon.type) {
      return (
        <div className="merge-container">
          <p>Merging dragons is an irreversible and slightly unpredictable action. The two dragons you have selected will disappear forever and be replaced with one new dragon whose level will be guaranteed to be at least one level higher than your LOWEST LEVEL dragon. You may simply get a stronger version of what you already have, or if you're lucky, you may get a special dragon with the combined powers of the previous two!</p>
          <button className="btn btn-success" onClick={this.createSuperDragon}>Let's Do This!</button>
          <button className="btn btn-danger">Changed My Mind!</button>
          {this.props.mergingDragons.map(dragon =>
            <DragonCard
              key={dragon.id}
              imageurl={dragon.imageurl}
              type={dragon.type}
              level={dragon.level}
              currenthp={dragon.currenthp}
              maxhp={dragon.maxhp}
              strength={dragon.strength}
              defense={dragon.defense}
            />
          )}
        </div>
      );
    }
  }

  renderNewDragon() {
    if (this.props.shinyNewDragon.type) {
      return (
        <div className="new-dragon-container">
          <h4>A New Dragon Emerges!</h4>
          <DragonCard
            imageurl={this.props.shinyNewDragon.imageurl}
            type={this.props.shinyNewDragon.type}
            level={this.props.shinyNewDragon.level}
            currenthp={this.props.shinyNewDragon.currenthp}
            maxhp={this.props.shinyNewDragon.maxhp}
            strength={this.props.shinyNewDragon.strength}
            defense={this.props.shinyNewDragon.defense}
          />
          <button
            className="merge-success-return-btn"
            onClick={this.returnToVillage}
            >Return to Village</button>
        </div>
      );
    };
  };

  returnToVillage() {
    this.props.toggleMergeMode();
    this.props.toggleMergeContainer();
  }

  render() {
    return (
      <div>
        <h1>Merge Mode</h1>
        {this.renderMergingDragons()}
        {this.renderNewDragon()}
      </div>
    );
  };
};

function mapStateToProps({ dragons, mergingDragons, shinyNewDragon }) {
  return { dragons, mergingDragons, shinyNewDragon }
};

export default connect(mapStateToProps, { addToUserDragons, clearMergingDragons, getAllDragonsForLevel, removeFromUserDragons, saveDragon })(MergeContainer);
