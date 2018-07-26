import React, { Component } from 'react';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpened: false };
  }

  toggleState() {
    this.setState({ isOpened: !this.state.isOpened });
  }

  render() {
    console.log( 'isOpened', this.state.isOpened );
    let dropdownText;
    if (this.state.isOpened) {
      dropdownText = 
        <div>
            <br />
            HTML <br />
            CSS <br />
            JS <br />
        </div>;
    }
    return (
      <div className="Underline" onClick={this.toggleState.bind(this)}>
        There are your files
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