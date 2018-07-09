import React, { Component } from 'react';
import { connect, Provider} from 'react-redux';
import { createStore, combineReducers } from 'redux';
// import { Link } from 'react-router-dom';

import './App.css';
import HeaderSand from './components/HeaderSand';
import BodySand from './components/BodySand';

const page = {
  nameAuthor: "nobody",
  link: "zZwrwdd45",
  code: "alert('hello world');"
};

function pageReducer(state, action){
  if (state === undefined){
      return page;
  }
}

const reducers = combineReducers({
    page: pageReducer,
})

const store = createStore(reducers);

const mapStateToProps = function(store) {
  return {
    page: store.page,
  };
}

let BodySandConnected = connect(mapStateToProps)(BodySand)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <div>
              <HeaderSand />
              <BodySandConnected />
          </div>
      </Provider>
    );
  }
}

export default App;