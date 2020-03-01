import React from 'react';
import { TextField } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { setTag } from '../../actions';

export default function Tag(props) {
  const dispatch = useDispatch();

  const handleChange = (event, data) => dispatch(setTag(data));

  return <TextField id="outlined-tag" label="tag" variant="outlined" onChange={handleChange('tag')} />;
}
