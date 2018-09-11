import React, { Component } from 'react'
import { render } from 'react-dom';
import FileComp from './FileComp';
import ConsoleList from './ConsoleList';
import comps from '../actions/codelist';
// import CodeComp from './CodeComp';
// import brace from 'brace';
import AceEditor from 'react-ace';
// import { Link } from 'react-router-dom';

import Menu from './Menu';

import 'brace/mode/java';
import 'brace/theme/github';

import '../App.css';
import { clearInterval } from 'timers';

function onChange(newValue) {
    console.log('change',newValue);
}

render(
    <AceEditor
      mode="java"
      theme="github"
      onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{$blockScrolling: true}}
    />,
    document.getElementById('root')
);



class FilesSand extends Component {
  render(){
      return (
        <div className="FilesApp AppLine">
          <h3 className="App">Files</h3>
          <FileComp />
            <div>
              <Menu />
              
            </div>
        </div>
      );
  }
}

class EditorSand extends Component {

  // onChange (){ function(event) {
  //   this.setState({typed: event.target.value});
  //   }
  // }
 
  render(){
    console.log(this.props.code)
    console.log(this.props.title)
      return (
        <div className="EditorApp AppLine">
          <p className="App">Editor</p>
          {/* <CodeComp /> */}
          <div>
            <AceEditor  className="AceContainer" value={this.props.code} />
            {/* onChange={this.onChange.bind(this)} */}
           
          </div>
        </div>
      );
  }
}

class ConsoleSand extends Component {
  state = {
    isOpen: false
  }

  render(){
    
    const newbody = this.state.isOpen && <ConsoleList comps={comps} />
      return (
        <div className="ConsoleApp AppLine">
          <h3 className="App">Console</h3>
            <button className="btn" onClick = {this.handleclick}>Change</button>
            <div>
              {newbody}
              {/* <ConsoleList comps={comps} /> */}
            </div>
        </div>
      );
  }
  handleclick = () => {
    this.setState({
      isOpen: !this.state.isOpen
  })
  }
}

class BodySand extends Component {
  constructor(props){
    super(props)
    console.log(props)
    // this.interval = setInterval(function() {
    //   this.AceEditor.onChange
    //   console.log(this.AceEditor.onChange)
    // }
    //   , 10000)
    // this.state = {loaded: false, data: null};
}
    render(){
      console.log(this.props.page.code)
      console.log(this.props.page.key)
        return (   
          <div>
            <section className="SectionApp ClearfixApp">
              <FilesSand ref={(input) => { this.fileInput = input }} />
              <EditorSand  code={this.props.page.code} />
              <ConsoleSand />
            </section>
          </div>   
        );
    }

    componentWillUnmount(){
      clearInterval(this.interval)
    }
  }

export default BodySand


