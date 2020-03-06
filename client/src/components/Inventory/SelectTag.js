import React from 'react';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setTag } from '../../actions';

export default function SelectTag(props) {
  const dispatch = useDispatch();
  const tag = useSelector(state => state.addInventory.tag);
  const handleChange = event => dispatch(setTag(event.target.value));
  return <TextField id="outlined-tag" label="tag" variant="outlined" value={tag} onChange={handleChange} />;
}
