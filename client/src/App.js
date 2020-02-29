import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import Auth from './components/Auth';
import Login from './screen/Login';
import Inventory from './screen/Inventory';
import store, { history } from './store';

import './App.css';
export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Auth(Inventory)} />
            </Switch>
          </ConnectedRouter>
        </Provider>
      </div>
    );
  }
}
