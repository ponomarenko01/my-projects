import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import {Router, Route} from "react-router-dom";
// import createHistory from "history/createBrowserHistory";

import './index.css';
import App from './App';
// import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    // <SimpleRouter />
    
    // <Provider store={store}>
        <App />
    // {/* </Provider> */}

,document.getElementById('root'));
registerServiceWorker();

// function pageReducer(state = initialState, action){
//     if (state === undefined){
//         return page;
//     }
//     if (action.type === 'DATA'){
//       console.log(action.data)
//       return action.data.snippet;
//     }
//     if (action.type === 'ADD_FILE'){
//       console.log('action.payload', action.payload)
//       return [
//         ...state,
//         action.payload
//       ];
//     }
//     return state;
//   }
  
//   const initialState = [
//     'Smells like spirit',
//     'Enter Sandman'
//   ];



// class SimpleRouter extends React.Component {
//     render() {
//         return (
//             <Router history={createHistory()}>
//                 <div>
//                     <Route path="/" component={Home} />
//                 </div>
//             </Router>
//         );
//     }
// }
    

// class Home extends React.Component {
//     render() {
//         return <App />;
//         }
//     }


