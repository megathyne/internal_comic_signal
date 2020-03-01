import React from 'react';
import { TextField } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { setCost } from '../../actions';

export default function Cost(props) {
  const dispatch = useDispatch();

  const handleChange = (event, data) => dispatch(setCost(data));

  return <TextField id="outlined-cost" label="cost" variant="outlined" onChange={handleChange('cost')} />;
}
