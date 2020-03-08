import React from 'react';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setBin } from '../../actions';

export default function SelectBin(props) {
  const dispatch = useDispatch();
  const bin = useSelector(state => state.addInventory.bin);

  const handleChange = event => dispatch(setBin(event.target.value));
  return <TextField id="outlined-bin" label="bin" variant="outlined" value={bin} onChange={handleChange} />;
}
