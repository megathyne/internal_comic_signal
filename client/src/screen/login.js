import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: "30vh"
  }
}));

export default class Login extends React.Component {
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
    // const classes = useStyles(); need to undo the hooks
    //className={classes.root}>
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="username"
            variant="outlined"
            onChange={this.handleChange("username")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            variant="outlined"
            autoComplete="current-password"
            onChange={this.handleChange("password")}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleLogin}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    );
  }
}
