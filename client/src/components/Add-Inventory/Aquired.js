import React from 'react';
import { TextField } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { setAquired } from '../../actions';

export default function Aquired(props) {
  const dispatch = useDispatch();
  const handleChange = event => dispatch(setAquired(event.target.value));
  return <TextField id="outlined-aquired" label="aquired" variant="outlined" onChange={handleChange} />;
}
