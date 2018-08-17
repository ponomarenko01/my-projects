import React, { Component } from 'react';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpened: false };
  }

  toggleState = () => {
    this.setState({ isOpened: !this.state.isOpened });
  }

  render() {
    console.log( 'isOpened', this.state.isOpened );
    
    const dropdownText = this.state.isOpened &&
        <div>
            <br />
            HTML <br />
            CSS <br />
            JS <br />
        </div>;
   
    return (
      <div>
        <button onClick={this.toggleState}>
          { this.state.isOpened ? 'Choose your files' : ' There are your files'}
        </button>
        {dropdownText}
      </div>
    );
  }
}

export default Menu;




// import React, { Component } from 'react'
// import '../App.css';
// import { Link } from 'react-router-dom';

// class Menu extends Component {
//     render(){
//         return(
//             <div>
//                 <Link to = "/">Your project</Link>
//             </div>
//         );
//     }
// }

// export default Menu;