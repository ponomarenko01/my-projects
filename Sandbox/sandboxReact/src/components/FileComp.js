import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../App.css';

class FileComp extends Component {
  addFile() {
      console.log('addFile', this.fileInput.value);
      this.props.onAddFile(this.fileInput.value);
      this.fileInput.value = '';
  }

  getFileName(){
    console.log('getFileName', this.fileInput.value);
    return this.fileInput.value;
  }

  render() {
    console.log(this.props.files);
    return (
    <div>
      <input type="text" ref={(input) => { this.fileInput = input }} />
      <button onClick={this.addFile.bind(this)}>Add file</button>
      <ul>
        {this.props.files.map((files, index) =>
          <li key={index}>
            <Link to={`/code/${files.id}`}>{files}</Link> 
          </li>
        )}
      </ul>
    </div>
  );
  }
}


export default connect(
state => ({
  files: state.files
}),
dispatch => ({
  onAddFile: (fileName) => {
    dispatch({ type: 'ADD_FILE', payload: fileName });
  }
})
)(FileComp);