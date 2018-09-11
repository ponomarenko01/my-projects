import React, { Component } from 'react';
import '../App.css';
// import SnipComp from '../App';
import { Link } from 'react-router-dom';
// import { GraphQLClient } from 'graphql-request';

// const gql = new GraphQLClient("http://localhost:4000/graphql", { headers: {} })

// class AddSnippetPage extends Component {
  // save(){
      
      // gql.request(
      //     `mutation createSnippet($userId: Int!, $title:String!, $code:String!) {
      //       createSnippet(userId: $userId, title: $title, code: $code) {     
      //          title
      //          code
      //          userId
      //       }
      //     }`,
      //     {title: this.title.value,
      //       code: this.code.value,
      //       userId: 3}

      // )
  // }
//   render (){
//       return (
//           <div>
//             <input ref={c => this.title = c}  />&nbsp;
//             <input ref={c => this.code = c}  />&nbsp;
//             {/* <input value = {3} ref={c => this.userId = c} />&nbsp; */}
//             <button onClick={this.save.bind(this)}>Save</button>
//           </div>
//       )
//   }
// }
// console.log(userId);
export default class HeaderSand extends Component {
    render(){
      console.log(this.props.userId);
      console.log(this.props);
      if(this.props.page===undefined){
        return <header className="App-header App">loading</header>
      }
        return (
          <header className="App-header App">
          <h1 className="App-title">Welcome to the Sandbox!</h1>
          {/* <SnipComp /><br /> */}
          {/* <AddSnippetPage /><br /> */}
          {/* <input type='text' placeholder='text' name="input" value='Type your name' />
          <button type='button'>Save</button><br /><br /> */}
          <span>Your Link there  	&nbsp; </span>
          <Link to={`/code/${this.props.page.key}`}>{`/code/${this.props.page.key}`}</Link> 
          
         
        </header>
        );
    }
  }