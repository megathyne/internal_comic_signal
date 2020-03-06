import React from 'react';
import { TextField } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { setNotes } from '../../actions';

export default function SelectNotes(props) {
  const dispatch = useDispatch();
  const notes = useSelector(state => state.addInventory.notes);
  const handleChange = event => dispatch(setNotes(event.target.value));
  return (
    <TextField fullWidth id="outlined-notes" label="notes" variant="outlined" value={notes} onChange={handleChange} />
  );
}
