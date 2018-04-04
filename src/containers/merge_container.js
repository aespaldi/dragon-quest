import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearMergingDragons } from '../actions';

class MergeContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="merge-container">
        <h1>Merge Container</h1>
        <p>placeholder text</p>
      </div>
    );
  };
};

function mapStateToProps({ dragons, mergingDragons }) {
  return { dragons, mergingDragons }
};

export default connect(mapStateToProps, { clearMergingDragons })(MergeContainer);
