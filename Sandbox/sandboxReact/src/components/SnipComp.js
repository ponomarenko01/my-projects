// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { GraphQLClient } from 'graphql-request';
// // import { createStore, combineReducers } from 'redux';
// // import store from '../App';
// import '../App.css';

// const gql = new GraphQLClient("http://localhost:4000/graphql", { headers: {} })

// class SnipComp extends Component {
//   addSnippet() {

//     gql.request(
//       `mutation createSnippet($userId: Int!, $title:String!, $code:String!) {
//         createSnippet(userId: $userId, title: $title, code: $code) {     
//            title
//            code
//            userId
//           key
//         }
//       }`,
//       {title: this.title.value,
//         code: this.code.value,
//         userId: 6}
//   )
//   // .then(data => store.dispatch({type: "DATA", data}))


//       console.log('addSnippet', this.title.value);
//       this.props.onAddSnippet(this.title.value);
//       this.props.onAddSnippet(this.code.value);
//       this.title.value = '';
//       this.code.value = '';
//       this.userId.value = '';
//   }

//   // getSnipName(){
//   //   console.log('getSnipName', this.title.value);
//   //   return this.title.value;
//   // }

  

//   render() {
//     console.log(this.props.id);
//     // console.log(this.data)
//     return (
//     <div>
//       <input type="text" ref={(input) => { this.title = input }} />
//       <input type="text" ref={(input) => { this.code = input }} />
//       <input type="text" ref={(input) => { this.userId = input }} />
//       <button onClick={this.addSnippet.bind(this)}>Add snippet</button>
//       <ul>
//         {this.props.snippets.map((snippets, index) =>
//           <li key={index}>
//             <Link to={`/code/${snippets.id}`}>{snippets}</Link> 
//           </li>
//         )}
//       </ul>

//     </div>
//   );
//   }
// }


// export default connect(
// state => ({
//   snippets: state.snippets
// }),
// dispatch => ({
//   onAddSnippet: (title) => {
//     dispatch({ type: 'ADD_SNIPPET', payload: title});
    
//   }
// })

// )(SnipComp);