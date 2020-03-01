import React from 'react';
import { TextField } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { setNotes } from '../../actions';

export default function Notes(props) {
  const dispatch = useDispatch();
  const handleChange = event => dispatch(setNotes(event.target.value));
  return <TextField id="outlined-notes" label="notes" variant="outlined" onChange={handleChange} />;
}
