import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

class SimpleRouter extends React.Component {
    render() {
        return (
            <Router history={createHistory()}>
                <div>
                    <Route path="/" component={Next} />
                </div>
            </Router>
        );
    }
}
    

class Next extends React.Component {
    render() {
        return <App />;
        }
    }

ReactDOM.render(
    <SimpleRouter />
    
    // <App /> 

,document.getElementById('root'));
registerServiceWorker();
