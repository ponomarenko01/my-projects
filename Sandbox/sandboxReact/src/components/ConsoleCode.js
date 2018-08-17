import React, { Component } from 'react';

 class ConsoleCode extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: props.defaultOpen
        }
    }
componentWillMount(){
    console.log('---', 'mounting')
}

componentWillReceiveProps(nextProps) {
    if (nextProps.defaultOpen !== this.props.defaultOpen) this.setState({
        isOpen:nextProps.defaultOpen
    })
}
    

    render() {
        const {comp} = this.props
        const bodyplace = this.state.isOpen && <section>{comp.text}</section>
        return (
            <div>
                <h4>
                    {comp.title}
                    <button onClick={this.handleClick}>
                        {this.state.isOpen ? 'close' : 'open'}
                    </button>
                </h4>
                {bodyplace}
                <h4>creation date: {(new Date(comp.date)).toDateString()}</h4>
            </div>
        )
    }

    handleClick = () => {
        console.log('---', 'clicked')
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}


export default ConsoleCode