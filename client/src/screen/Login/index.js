import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Button, TextField, useMediaQuery, Link } from '@material-ui/core';
import { loginSaga } from '../../actions';
import Deadpool from '../../content/deadpool-venom.jpg';
import { useHistory, useLocation } from 'react-router-dom';

export default function Login(props) {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') handleBtnOnClick();
    };

    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  const handleChange = (input) => (event) => {
    const d = data;
    d[input] = event.target.value;
    setData(d);
  };

  const handleBtnOnClick = async () => {
    dispatch(loginSaga(data, history));
  };

  const matches = useMediaQuery('(max-resolution: 1dppx)');
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      {matches ? <img alt="" src={Deadpool} style={{ height: '100vh' }}></img> : null}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '20%',
          width: '100%',
          maxWidth: '550px',
          // minWidth: '30%',
        }}
      >
        <div style={{ width: '75%' }}>
          <Typography variant="h1">Login</Typography>
          <Typography variant="h4">Welcome to Comic Signal</Typography>
          <div style={{ marginBottom: '4%', marginTop: '4%' }}>
            <TextField
              id="standard-username-input"
              label="username"
              variant="outlined"
              fullWidth
              onChange={handleChange('username')}
            />
          </div>
          <div style={{ marginBottom: '4%' }}>
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              autoComplete="current-password"
              onChange={handleChange('password')}
            />
          </div>
          <Button
            style={{ marginBottom: '4%' }}
            variant="contained"
            type="submit"
            fullWidth
            color="primary"
            onClick={handleBtnOnClick}
          >
            Login
          </Button>
          <Typography>
            <Link href="/register">Need an account? Click here.</Link>
          </Typography>
        </div>
      </div>
    </div>
  );
}
