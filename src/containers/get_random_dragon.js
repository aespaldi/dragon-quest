import React, { Component} from 'react';
import { connect } from 'react-redux';
import DragonCard from '../containers/dragon_card.js';
import { getRandomDragon } from '../actions';
import { addToUserDragons } from '../actions';
import './get_random_dragon.css';

class GetRandomDragon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      randomMode: true,
    }

    this.getNewDragon = this.getNewDragon.bind(this);
    this.addDragonToCollection = this.addDragonToCollection.bind(this);
    this.generateDragonId = this.generateDragonId.bind(this);
  }

  componentDidMount() {
    this.props.getRandomDragon(1);
  }

  getNewDragon() {
    this.props.getRandomDragon(1);
  }

  generateDragonId() {
    const randomNum = Math.floor(Math.random() * 1000);
    return `${randomNum}_${new Date().getTime()}`
  }

  addDragonToCollection() {
    this.props.randomDragon.dragonId = this.generateDragonId();
    this.props.addToUserDragons(this.props.randomDragon)
    this.props.acceptDragon();
  }


  render() {
    return (
      <div>
        <DragonCard
          dragonId={this.generateDragonId}
          imageurl={this.props.randomDragon.imageurl}
          type={this.props.randomDragon.type}
          level={this.props.randomDragon.level}
          currenthp={this.props.randomDragon.currenthp}
          maxhp={this.props.randomDragon.maxhp}
          strength={this.props.randomDragon.strength}
          defense={this.props.randomDragon.defense}
        />
        <div className="random-dragon-choices">
          <button className="accept-dragon-btn btn btn-success" onClick={this.addDragonToCollection}>Accept This Dragon</button>
          <button className="get-new-dragon-btn btn btn-danger" onClick={this.getNewDragon}>Get New Dragon</button>
        </div>
      </div>
    );
  }
}


function mapStateToProps({ dragons, randomDragon }) {
  return { dragons, randomDragon };
};

export default connect(mapStateToProps, { getRandomDragon, addToUserDragons })(GetRandomDragon);
