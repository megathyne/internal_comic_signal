import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { loginSaga } from '../../actions';
import styles from './styles';

class Login extends Component {
  constructor() {
    super();
    this.handleBtnOnClick = this.handleBtnOnClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = input => event => {
    this.setState({ [input]: event.target.value });
  };

  handleBtnOnClick() {
    this.props.loginSaga({
      username: this.state.username,
      password: this.state.password,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="standard-username-input"
              label="username"
              variant="outlined"
              onChange={this.handleChange('username')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              variant="outlined"
              autoComplete="current-password"
              onChange={this.handleChange('password')}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={this.handleBtnOnClick}>
              Login
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginSaga: user => dispatch(loginSaga(user)),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(Login));
