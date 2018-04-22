import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToUserDragons, clearRandomDragon, getRandomDragon } from '../actions';
import { generateRandomNumber } from '../helpers';
import DragonCard from '../containers/dragon_card.js';
import './get_random_dragon.css';

class GetRandomDragon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      randomMode: true,
    }

    this.addDragonToCollection = this.addDragonToCollection.bind(this);
    this.getNewDragon = this.getNewDragon.bind(this);
  }

  componentDidMount() {
    this.props.getRandomDragon(1);
  }

  componentWillUnmount() {
    this.props.clearRandomDragon();
  }

  /**
  * @function addDragonToCollection - assigns a unique ID to the dragon the random dragon the user selects and then calls the redux action creator that adds the random dragon to the dragons array.
  * @returns {undefined} - calls other functions, returns nothing.
  */

  addDragonToCollection() {
    this.props.randomDragon.dragonId = generateRandomNumber();
    this.props.addToUserDragons(this.props.randomDragon)
    this.props.acceptDragon();
  }

  /**
  * @function getNewDragon - grabs a new dragon from the database of the passed in level.
  * @returns {undefined} - function calls a redux store function and returns nothing.
  */

  getNewDragon() {
    this.props.getRandomDragon(1);
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

GetRandomDragon.propTypes = {
  addToUserDragons: PropTypes.func,
  acceptDragon: PropTypes.func,
  getRandomDragon: PropTypes.func,
  randomDragon: PropTypes.object,
}

function mapStateToProps({ dragons, randomDragon }) {
  return { dragons, randomDragon };
};

export default connect(mapStateToProps, { addToUserDragons, clearRandomDragon, getRandomDragon })(GetRandomDragon);
