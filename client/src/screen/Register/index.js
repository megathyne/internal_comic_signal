import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Button, TextField, useMediaQuery } from '@material-ui/core';
import { registerSaga } from '../../actions';
import Marvel from '../../content/marvel-girls.jpg';

export default function Register(props) {
  const dispatch = useDispatch();

  const [data, setData] = useState({});

  useEffect(() => {
    const listener = event => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        dispatch(registerSaga(data));
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
    dispatch(registerSaga(data));
  };

  const matches = useMediaQuery('(max-resolution: 1dppx)');
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '15vh',
          marginLeft: '20%',
          marginRight: '20%',
          // width: '100%',
          // maxWidth: '550px',
          // minWidth: '30%',
        }}
      >
        <div>
          <Typography variant="h1">Register</Typography>
          <Typography variant="h4">Use Comic Signal to take the guessing out of your portfolio's value.</Typography>
          <div style={{ marginBottom: '4%', marginTop: '4%' }}>
            <TextField
              id="standard-username-input"
              label="Username"
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
            Rigister
          </Button>
        </div>
      </div>
      {matches ? <img alt="" src={Marvel} style={{ height: '100vh' }}></img> : null}
    </div>
  );
}
