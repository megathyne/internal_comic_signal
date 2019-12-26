import React from "react";

class Login extends React.Component {
  render() {
    return (
      <div>
        <p>username</p>
        <input onChange={this.props.handleChange("username")} />
        <p>password</p>
        <input onChange={this.props.handleChange("password")} />
        <br />
        <button onClick={this.props.handleLogin}>Submit</button>
      </div>
    );
  }
}

export default Login;
