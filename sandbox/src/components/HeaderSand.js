import React, { Component } from 'react'
import '../App.css';
import { Link } from 'react-router-dom';


export default class HeaderSand extends Component {
    render(){
        return (
          <header className="App-header App">
          <h1 className="App-title">Welcome to the Sandbox!</h1>
          <input type='text' placeholder='text' name="input" value='Type your name' />
          <button type='button'>Save</button><br /><br />
          <span>Your Link there  	&nbsp; </span>
          <Link to="http://localhost:3001/">http://localhost:3001/</Link> 
        </header>
        );
    }
  }