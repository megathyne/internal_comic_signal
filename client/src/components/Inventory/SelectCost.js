import React from 'react';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setCost } from '../../actions';

export default function SelectCost(props) {
  const dispatch = useDispatch();
  const cost = useSelector(state => state.addInventory.cost);
  const handleChange = event => dispatch(setCost(event.target.value));
  return <TextField id="outlined-cost" label="cost" variant="outlined" value={cost} onChange={handleChange} />;
}
