import React, { Component } from 'react';
import { connect, Provider} from 'react-redux';
import { createStore, combineReducers } from 'redux';
// import { Link } from 'react-router-dom';

import './App.css';
// import Menu from './components/Menu';
import HeaderSand from './components/HeaderSand';
import BodySand from './components/BodySand';
import { GraphQLClient } from 'graphql-request'

const gql = new GraphQLClient("http://localhost:4000/graphql", { headers: {} })

gql.request(`query getSnippet ($snippetId: Int!) {
  snippet (id: $snippetId) {
    title
    code
    key
  }
  
}`, {"snippetId":2}).then(data => store.dispatch({type: "DATA", data}))


const page = {
  nameAuthor: "nobody",
  link: "zZwrwdd45",
  code: "alert('hello world');"
};

function pageReducer(state, action){
  if (state === undefined){
      return page;
  }
  if (action.type === 'DATA'){
    console.log(action.data)
    return action.data.snippet;
}
  return state;
}

const reducers = combineReducers({
    page: pageReducer,
})

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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