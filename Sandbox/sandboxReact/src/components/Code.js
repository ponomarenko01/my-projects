import React from 'react';
import { connect } from 'react-redux';

const Code = ({ letter }) => <div>{letter.name}</div>;

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return {
    letter: state.letters.find(letter => letter.id === Number(ownProps.params.id))
  };
};

export default connect(mapStateToProps)(Code);