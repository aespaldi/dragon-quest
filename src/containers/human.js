import React, { Component } from 'react';
import { connect } from 'react-redux';
import { callHuman } from '../actions';
import HumanCard from '../Components/human_card';

class Human extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.callHuman(1);
  }

  render() {
    return (
      <div>
        <HumanCard
          imageurl={this.props.human.imageurl}
          level={this.props.human.level}
          currenthp={this.props.human.currenthp}
          maxhp={this.props.human.maxhp}
          strength={this.props.human.strength}
          defense={this.props.human.defense}
        />
      </div>
    )
  }
}

function mapStateToProps({ human }) {
  return { human };
};

export default connect(mapStateToProps, { callHuman })(Human);
