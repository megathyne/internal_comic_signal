import React from 'react';
import { TextField } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { setCost } from '../../actions';

export default function Cost(props) {
  const dispatch = useDispatch();
  const handleChange = event => dispatch(setCost(event.target.value));
  return <TextField id="outlined-cost" label="cost" variant="outlined" onChange={handleChange} />;
}
