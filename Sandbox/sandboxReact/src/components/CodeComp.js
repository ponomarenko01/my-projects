import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';

class CodeComp extends Component {
  addCode() {
      console.log('addCode', this.codeInput.value);
      this.props.onAddCode(this.codeInput.value);
      this.codeInput.value = '';
  }

  render() {
    console.log(this.props.letters);
    return (
    <div>
      <input type="text" ref={(input) => { this.codeInput = input }} />
      <button onClick={this.addCode.bind(this)}>Add code</button>
      <ul>
        {this.props.letters.map((letters, index) =>
          <li key={index}>{letters}</li>
        )}
      </ul>
    </div>
  );
  }
}


export default connect(
state => ({
  letters: state.letters
}),
dispatch => ({
  onAddCode: (codeName) => {
    dispatch({ type: 'ADD_CODE', payload: codeName });
  }
})
)(CodeComp);