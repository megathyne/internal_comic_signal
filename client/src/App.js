import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import Auth from './components/auth';
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
              <Route path="/login" component={Login} />
              <Auth path="/" component={Inventory} />
            </Switch>
          </ConnectedRouter>
        </Provider>
      </div>
    );
  }
}
