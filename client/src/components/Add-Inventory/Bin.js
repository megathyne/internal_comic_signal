import React from 'react';
import { TextField } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { setBin } from '../../actions';

export default function Bin(props) {
  const dispatch = useDispatch();

  const handleChange = (event, data) => dispatch(setBin(data));

  return <TextField id="outlined-bin" label="bin" variant="outlined" onChange={handleChange('bin')} />;
}
