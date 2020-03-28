import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import Auth from './components/auth';
import Login from './screen/Login';
import Inventory from './screen/Inventory';
import Portfolio from './screen/Portfolio';
import Comic from './screen/Comic';
import AddComic from './screen/AddComic';
import Approval from './screen/Approval';
import ApprovalHistory from './screen/AppovalHistory';
import Register from './screen/Register';

import store, { history } from './store';

// import './App.css';
import 'typeface-roboto';
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Auth path="/oldhome" component={Inventory} />
            <Auth path="/addcomic" component={AddComic} />
            <Auth path="/comic" component={Comic} />
            <Auth path="/approvalhistory" component={ApprovalHistory} />
            <Auth path="/approval" component={Approval} />
            <Auth path="/" component={Portfolio} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}
