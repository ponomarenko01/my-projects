import React, { Component } from 'react'
import { render } from 'react-dom';
import FileComp from './FileComp';
// import CodeComp from './CodeComp';
// import brace from 'brace';
import AceEditor from 'react-ace';
// import { Link } from 'react-router-dom';

import Menu from './Menu';

import 'brace/mode/java';
import 'brace/theme/github';

import '../App.css';

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
  render(){
      return (
        <div className="EditorApp AppLine">
          <p className="App">Editor</p>
          {/* <CodeComp /> */}
          <div>
            <AceEditor className="AceContainer" value={this.props.code} />
          </div>
        </div>
      );
  }
}

class ConsoleSand extends Component {
  render(){
      return (
        <div className="ConsoleApp AppLine">
          <h3 className="App">Console</h3>
            <div>
              1 <br />
              2 <br />
              3 <br />
              4 <br />
            </div>
        </div>
      );
  }
}

class BodySand extends Component {
    render(){
      console.log(this.props)
        return (   
          <body>
            <section className="SectionApp ClearfixApp">
              <FilesSand />
              <EditorSand  code={this.props.page.code}/>
              <ConsoleSand />
            </section>
          </body>   
        );
    }
  }

export default BodySand


