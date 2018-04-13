import React, { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-bootstrap/lib/Carousel';
import DragonCard from '../containers/dragon_card.js';
import { addToUserDragons } from '../actions/index';
import './card_carousel.css';

class ControlledCarousel extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);
    this.generateKey = this.generateKey.bind(this);

    this.state = {
      index: 0,
      direction: null,
      carouselMode: true,
    };
  }

  /**
  * @function generateKey - creates unique key for each dragon added to the user dragons collection and rendered to the carousel, as the ids from the database are not unique enough.
  *
  * @returns {number}
  */

  generateKey() {
    const randomNum = Math.floor(Math.random() * 10000);
    return `${randomNum}_${new Date().getTime()}`;
  }

  /**
  * @function handleSelect - part of React Bootstrap, necessary for the carousel to function.
  *
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
                  key={this.generateKey}
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

function mapStateToProps({ dragons }) {
  return { dragons };
};

export default connect(mapStateToProps, { addToUserDragons })(ControlledCarousel);
