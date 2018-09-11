import React, { Component } from 'react';
import { connect, Provider} from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { Router, Route, Switch } from "react-router-dom"
import createHistory from "history/createBrowserHistory";
// import { Link } from 'react-router-dom';
import './App.css';
import files from './reducers/files';
import HeaderSand from './components/HeaderSand';
import BodySand from './components/BodySand';
import { GraphQLClient } from 'graphql-request'

const gql = new GraphQLClient("http://localhost:4000/graphql", { headers: {} })



const page = {
  login: "somebody",
  nameAuthor: "nobody",
  link: "zZwrwdd45",
  code: "alert('hello world');",
  key: "unickey"
};

function pageReducer(state, action){
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


const reducers = combineReducers({
    page: pageReducer,
    files
})

class Home extends Component {
    render(){
        return (
            <div >
              <SnipComp />
                <HeaderSandConnected />
              <BodySandConnected />
              
            </div>
        );
    }
}

class Code extends Component {
    render(){
        console.log(this.props);
        gql.request(`query getSnippet ($snippetId: String!, $userId: Int!) {
            snippet (id: $snippetId, userId: $userId) {
              id
              title
              code
              userId
              key
            }
            
          }`, {snippetId: this.props.id
          ,"userId": 6}).then(data => store.dispatch({type: "DATA", data}))
              
        return (
            <div>
                <Home />
                one code with id = {this.props.id},
                and key = {this.props.id}
            </div>
        )
    }
}

class SnipComp extends Component {
  addSnippet() {

    gql.request(
      `mutation createSnippet($userId: Int!, $title:String!, $code:String!) {
        createSnippet(userId: $userId, title: $title, code: $code) {     
           title
           code
           userId
          key
        }
      }`,
      {title: this.title.value,
        code: this.code.value,
        userId: 6}
  )
  .then(data => store.dispatch({type: "DATA", data: {snippet:data.createSnippet}}))

      console.log(this.code.value);
      this.title.value = '';
      this.code.value = '';
  }

  render() {
    console.log(this.props.code);
    return (
    <div>
      <input type="text" ref={(input) => { this.title = input }} />
      <textarea ref={c => this.code = c}></textarea>
      <button onClick={this.addSnippet.bind(this)}>Add snippet</button>
    
    </div>
  );
  }
}


let HomePage = () => <Home />

let CodePage = (props) => <Code id={props.match.params.key}/>

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const mapStateToProps = function(store) {
  return {
    page: store.page,
  };
}



let HeaderSandConnected = connect(mapStateToProps)(HeaderSand)

let BodySandConnected = connect(mapStateToProps)(BodySand)



class App extends Component {
    render() {
      return (
          <Provider store={store}>
              <Router history={createHistory()} >
                  <Switch>
                    {/* <Route path='/' component={FeedPage} exact /> */}
                    <Route path='/' component={HomePage} exact />
                    <Route path='/code/:key' component={CodePage} />
                    {/* <Route path='/addUser' component={AddUserPage} exact /> */}
                  </Switch>
              </Router>
          </Provider>
      );
    }
  }



export default App;









// gql.request(
        //   `mutation createSnippet($userId: Int!, $title:String!, $code:String!) {
        //     createSnippet(userId: $userId, title: $title, code: $code) {     
        //        title
        //        code
        //        userId
        //       key
        //     }
        //   }`,
        //   {key: this.props.id
        //       ,"userId": 3}).then(data => store.dispatch({type: "ADD_SNIPPET", data}))
          


 // else if (action.type === 'ADD_SNIPPET'){
  //   console.log(action.data)
  //   return {data: action.data.snippet, status: 'DATA'};
  // }

  // else if (action.type === 'ADD_SNIPPET'){
  //   console.log('action.payload', action.payload)
  //   return [
  //     ...state,
  //     action.payload
  //   ];
  // }

// gql.request(
//     `query getSnippet ($snippetId: Int!) {
//   snippet (id: $snippetId) {
//     title
//     code
//   }
  
// }`, {"snippetId":2}).then(data => store.dispatch({type: "DATA", data}))


// function getFeed() {
//     store.dispatch({type: 'EMPTY'})
//     gql.request(`query getUsers  {
//         users   {
//           id
//           login
//           mail
//           password
          
//         }
        
//       }`).then(data => store.dispatch({type: "DATA", data}))}

// function usersReducer(state, action)
// {
//     if (state === undefined || action.type === 'EMPTY'){
//         return {data: [], status: 'EMPTY'}
//     }
//     if (action.type === 'DATA'){
//         return {data: action.data.users, status: 'DATA'}
//     }
//     return state
// }

// function userReducer(state, action){
//     if (state === undefined){
//         return {data: {}, status: 'EMPTY'}
//     }
//     if (action.type === 'USER'){
//         return {data: action.data.user, status: 'DATA'}
//     }
//     return state;
// }

// function pageReducer(state, action){
//     // debugger;
//     if (state === undefined){
//       return page;
//   }
//   else if (action.type === 'DATA_SNIPPET'){
//     console.log(action.data)
//     return action.data.snippet;
//   }
//   else if (action.type === 'ADD_FILE'){
//     console.log('action.payload', action.payload)
//     return [
//       ...state,
//       action.payload
//     ];
//   }
//   return state;
// }


// const reducers = combineReducers({
//     users: usersReducer,
//     user:  userReducer,
//     page: pageReducer,
//     // files

// })

// var store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// class FeedPost extends Component {
//     render(){
//         console.log(this.props)

//         // gql.request(`query getSnippet ($snippetId: String!) {
//         //     snippet (id: $snippetId) {
//         //       id
//         //       title
//         //       code
//         //       userId
//         //       key
//         //     }
            
//         //   }`, {"snippetId": "139cd3681117e48bd548cb5f51e44a7ee469890b72b644f07bcb5ddfe8f26138"})
//         //     // .then(data => store.dispatch({type: 'USER', data}))
//         //     .then(data => store.dispatch({type: "DATA_SNIPPET", data}))

//         return (
//             <div className='user'>
//                 <h3>{this.props.user.login}</h3>
//                 <h3>{this.props.user.mail}</h3>
//                 <Link to={`/code/${this.props.user.mail}`}>more...</Link>
//             </div>
//         );
//     }
// }

// class Feed extends Component {
//     render(){
//         if (this.props.users.status === 'EMPTY'){
//             return (
//             <div className='feedContainer'>
//                 Loading.....
//             </div>
//             )
//         }
//         return (
//             <div className='feedContainer'>
//                 {this.props.users.data.map(item => <FeedPost user={item} id={item.id} />)}
//             </div>
//         );
//     }
// }

// const mapStateToProps = function(store) {
//     return {
//       users: store.users,
//       user: store.user,
//       page: store.page
//     };
//   }

// Feed = connect(mapStateToProps)(Feed)

// class FeedPage extends Component {
//     render (){
//         getFeed();
//         return (
//             <div>
//               {/* <Link to='/addPost'>Add post...</Link> */}
//               <Feed />
//             </div>
//         )
//     }
// }

// class User extends Component {
//     render(){

//         console.log(this.props)
//         // if (this.props.user.data.status === 'EMPTY'){
//         //     return (
//         //         <div className='user'>
//         //             Loading...
//         //         </div>
//         //     )
//         // }
//         return (
//             <div className='user'>
//                 <h3>{this.props.page.id}</h3>
//                 <h3>{this.props.page.userId}</h3>
//                 <h3>{this.props.page.title}</h3>
//                 <h3>{this.props.page.code}</h3>
//                 <h3>{this.props.page.key}</h3>
//                 {/* <h3>{this.props.snippet.data.code}</h3>
//                 <h3>{this.props.snippet.data.key}</h3> */}
//                 {/* <h3>{this.props.user.data.key}</h3> */}
//                 {/* < TreeSnippet2 /> */}
//                 {/* <CommentList comments={this.props.post.data.comments} /> */}
//             </div>
//         )
//     }
// }
// User = connect(mapStateToProps)(User)

// class CodePage extends Component {
//     render(){
//         console.log(this.props)
//         console.log(this.props.match.params.key)
//         gql.request(`query getSnippet ($snippetId: String!) {
//             snippet (id: $snippetId) {
//               id
//               title
//               code
//               userId
//               key
//             }
            
//           }`, {"snippetId": "139cd3681117e48bd548cb5f51e44a7ee469890b72b644f07bcb5ddfe8f26138"})
//             // .then(data => store.dispatch({type: 'USER', data}))
//             .then(data => store.dispatch({type: "DATA_SNIPPET", data}))
//         return (
//             <div>
//                 <User id={this.props.match.params.key} />
//                 {/* id={this.props.match.params.id}  */}
//             </div>
//         );
//     }
// }