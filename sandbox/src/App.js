import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { connect, Provider} from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { Router, Route, Switch } from "react-router-dom"
import createHistory from "history/createBrowserHistory";
// import { Link } from 'react-router-dom';

import './App.css';
// import Menu from './components/Menu';
import files from './reducers/files';
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

function pageReducer(state = [], action){
  if (state === undefined){
      return page;
  }
  else if (action.type === 'DATA'){
    console.log(action.data)
    return action.data.snippet;
  }
  else if (action.type === 'ADD_FILE'){
    console.log('action.payload', action.payload)
    return [
      ...state,
      action.payload
    ];
  }
  return state;
}

// const initialState = [
//   'Smells like spirit',
//   'Enter Sandman'
// ];

const reducers = combineReducers({
    page: pageReducer,
    files
})

class Home extends Component {
    render(){
        // if (this.props.snippet.status === 'EMPTY'){
        //     return (
        //     <div >
        //         Loading.....
        //     </div>
        //     )
        // }
        return (
            <div >
                <HeaderSand />
              <BodySandConnected />
            </div>
        );
    }
}

class Code extends Component {
    render(){
        return (
            <div>
                one code with id = {this.props.id}
            </div>
        )
    }
}

let HomePage = (props) => <Home />

let CodePage = (props) => <Code id={props.match.params.id}/>

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const mapStateToProps = function(store) {
  return {
    page: store.page,
  };
}

// const addFileBtn = document.querySelectorAll('.addFile')[0];
// const fileInput = document.querySelectorAll('.fileInput')[0];
// const list = document.querySelectorAll('.list')[0];

// store.subscribe(() => {
//   list.innerHTML = '';
//   fileInput.value = '';
//   store.getState().forEach(simpleFile => {
//     const li = document.createElement('li');
//     li.textContent = simpleFile;
//     list.appendChild(li);
//   });
// })


// addFileBtn.addEventListener('click', () => {
//   const fileName = fileInput.value;
//   store.dispatch ({ type: 'ADD_FILE', payload: fileName });
// });

let BodySandConnected = connect(mapStateToProps)(BodySand)

class App extends Component {
    render() {
      return (
          <Provider store={store}>
              <Router history={createHistory()} >
                  <Switch>
                      <Route path='/' component={HomePage} exact />
                      <Route path='/code/:id' component={CodePage} />
                  </Switch>
              </Router>
          </Provider>
      );
    }
  }

// export default connect(
//   state => ({
//     testStore: state
//   }),
//   dispatch => ({})
// )(App);

export default App;