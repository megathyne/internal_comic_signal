import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store, { history } from "./store";

import Auth from "./components/auth";
import Login from "./screen/Login";
import Inventory from "./screen/inventory";

import "./App.css";
class App extends React.Component {
  state = {
    username: null,
    password: null
  };

  handleChange = input => event => {
    this.setState({ [input]: event.target.value });
  };

  // handleLogin = async () => {
  //   try {
  //     const { username, password } = this.state;
  //     const response = await fetch("http://localhost:3000/auth/signin", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ username, password })
  //     });
  //     const results = await response.json();
  //     localStorage.setItem("accessToken", results.accessToken);
  //     this.setState({
  //       password: null
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  render() {
    // const { username, password } = this.state;
    // const values = { username, password };
    // const user = localStorage.getItem("accessToken");
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App">
            {/* <Router>
              <Switch> */}
            {/* {!user ? (
              <Login
              // handleLogin={this.handleLogin}
              // handleChange={this.handleChange}
              // values={values}
              />
            ) : (
              <Inventory />
            )} */}
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Auth(Inventory)} />
              {/* <Route exact path="/" component={Inventory} /> */}
            </Switch>
            {/* </Switch>
            </Router> */}
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
