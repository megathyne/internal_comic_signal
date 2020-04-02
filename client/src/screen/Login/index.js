import React, { Component, useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { loginSaga } from '../../actions';
import styles from './styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '30vh',
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [data, setData] = useState({});

  useEffect(() => {
    const listener = event => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        dispatch(loginSaga(data));
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  const handleChange = input => event => {
    const d = data;
    d[input] = event.target.value;
    setData(d);
  };

  const handleBtnOnClick = () => {
    dispatch(loginSaga(data));
  };

  return (
    <div className={classes.root}>
      <div>
        <div style={{ marginBottom: '4%' }}>
          <TextField
            id="standard-username-input"
            label="username"
            variant="outlined"
            onChange={handleChange('username')}
          />
        </div>
        <div style={{ marginBottom: '4%' }}>
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            variant="outlined"
            autoComplete="current-password"
            onChange={handleChange('password')}
          />
        </div>
        <Button variant="contained" type="submit" fullWidth color="primary" onClick={handleBtnOnClick}>
          Login
        </Button>
      </div>
    </div>
  );
}
