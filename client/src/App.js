import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Auth from './components/auth';
import Login from './screen/Login';
import Portfolio from './screen/Portfolio';
import Comic from './screen/Comic';
import AddComic from './screen/AddComic';
import Approval from './screen/Approval';
import ApprovalHistory from './screen/AppovalHistory';
import Register from './screen/Register';

import store from './store';

// import './App.css';
import 'typeface-roboto';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>

            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>

            <Auth path="/addcomic">
              <AddComic />
            </Auth>

            <Auth path="/comic/:id">
              <Comic />
            </Auth>

            <Auth path="/approvalhistory/:inventoryId">
              <ApprovalHistory />
            </Auth>

            <Auth path="/approval/:inventoryId">
              <Approval />
            </Auth>

            <Auth path="/">
              <Portfolio />
            </Auth>
          </Switch>
        </Router>
      </Provider>
    );
  }
}
