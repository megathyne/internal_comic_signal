import React from 'react';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setAquired } from '../../actions';

export default function SelectAcquired(props) {
  const dispatch = useDispatch();
  const acquired = useSelector(state => state.addInventory.acquired);
  const handleChange = event => dispatch(setAquired(event.target.value));
  return (
    <TextField id="outlined-acquired" label="acquired" variant="outlined" value={acquired} onChange={handleChange} />
  );
}
