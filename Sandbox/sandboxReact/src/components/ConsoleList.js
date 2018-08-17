import React from 'react';
import ConsoleCode from './ConsoleCode';

export default function ConsoleList({ comps }) {
    const compElements = comps.map(comp =>
        <li key = {comp.id}><ConsoleCode comp = {comp} /></li>
    )
    console.log(compElements)
    return (
        <ul>
            {compElements}
        </ul>
        
    )
    
}

// import React, { Component } from 'react';
// import ConsoleCode from './ConsoleCode';

// function ConsoleList2({ comps }) {
//     const compElements = comps.map(comp =>
//         <li key = {comp.id}><ConsoleCode comp = {comp}/></li>
//     )
//     console.log(compElements)
//     return (
//         <ul>
//             {compElements}
//         </ul>
        
//     )
    
// }


 

// class ConsoleList extends Component {
//     state = {
//         isOpen: false
//     }

//     render() {
//         const {comp} = this.props
//         const bodyplace2 = this.state.isOpen && <section>{ConsoleList2}</section>
//         return (
//             <div>
//                 <h4>
                    
//                     <button onClick={this.handleClick2}>
//                         {this.state.isOpen ? 'close' : 'open'}
//                     </button>
//                 </h4>
//                 {bodyplace2}
                
//             </div>
//         )
//     }

//     handleClick2 = () => {
//         console.log('---', 'clicked')
//         this.setState({
//             isOpen: !this.state.isOpen
//         })
//     }
// }

// export default ConsoleList