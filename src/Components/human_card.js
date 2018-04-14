import React from 'react';
import PropTypes from 'prop-types';
import './human_card.css';

const HumanCard = (props) => {
  return (
    <div className="human-card">
      <img className="human-card-image" alt="guy in smiley t-shirt" src={props.imageurl} />
      <h4>Human</h4>
      <p>Level: {props.level}</p>
      <p>HP: {props.currenthp} / {props.maxhp}</p>
      <p>Strength: {props.strength}</p>
      <p>Defense: {props.defense}</p>
    </div>
  )
};

HumanCard.propTypes = {
  currenthp: PropTypes.number,
  defense: PropTypes.number,
  imageurl: PropTypes.string,
  level: PropTypes.number,
  maxhp: PropTypes.number,
  strength: PropTypes.number,
}

export default HumanCard;
