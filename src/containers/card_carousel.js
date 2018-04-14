import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Carousel from 'react-bootstrap/lib/Carousel';
import DragonCard from '../containers/dragon_card.js';
import { addToUserDragons } from '../actions/';
import generateRandomNumber from '../helpers';
import './card_carousel.css';

class ControlledCarousel extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null,
      carouselMode: true,
    };
  }

  /**
  * @function handleSelect - part of React Bootstrap, necessary for the carousel to function.
  * @param {number} selectedIndex - the index of the card currently being displayed on the screen.
  * @param {object} e - the event object.
  * @returns {undefined} - the function is calling this.setState and not returning any values.
  *
  */

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    const { index, direction } = this.state;
    let dragonList = null;

    if (this.props.dragons.length > 0) {
      dragonList = (
        <Carousel
          className="carousel-container"
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
          >
            {this.props.dragons.map((dragon, index) => {
              return (
              <Carousel.Item
                key={index}
                className="carousel-item">
                <DragonCard
                  key={generateRandomNumber}
                  carouselMode={this.state.carouselMode}
                  mergeMode={this.props.mergeMode}
                  dragon={dragon}
                  imageurl={dragon.imageurl}
                  type={dragon.type}
                  level={dragon.level}
                  currenthp={dragon.currenthp}
                  maxhp={dragon.maxhp}
                  strength={dragon.strength}
                  defense={dragon.defense}
                  toggleFightMode={this.props.toggleFightMode}
                />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
            )})}
          </Carousel>
      )
    } else {
      dragonList = (
        <div>
          <h4>No dragons here!</h4>
        </div>
      )
    }

    return (
      <div>
        {dragonList}
      </div>
        );
      }
}

ControlledCarousel.propTypes = {
  addToUserDragons: PropTypes.func,
  dragons: PropTypes.array,
  mergeMode: PropTypes.bool,
  toggleFightMode: PropTypes.func,
}

function mapStateToProps({ dragons }) {
  return { dragons };
};

export default connect(mapStateToProps, { addToUserDragons })(ControlledCarousel);
