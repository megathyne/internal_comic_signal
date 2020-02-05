import React from "react";
import "./App.css";
import Login from "./screen/login";
import Inventory from "./screen/inventory";

class App extends React.Component {
  state = {
    username: null,
    password: null
  };

  handleChange = input => event => {
    this.setState({ [input]: event.target.value });
  };

  handleLogin = async () => {
    try {
      const { username, password } = this.state;
      const response = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
      const results = await response.json();
      localStorage.setItem("accessToken", results.accessToken);
      this.setState({
        password: null
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { username, password } = this.state;
    const values = { username, password };
    const user = localStorage.getItem("accessToken");
    return (
      <div className="App">
        {!user ? (
          <Login
            handleLogin={this.handleLogin}
            handleChange={this.handleChange}
            values={values}
          />
        ) : (
          <Inventory />
        )}
      </div>
    );
  }
}

export default App;
