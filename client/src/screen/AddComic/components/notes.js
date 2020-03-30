import React from 'react';
import { TextField } from '@material-ui/core';

export default function Notes(props) {
  const handleChange = event => {
    props.handleChange('notes')(event.target.value);
  };

  return <TextField id="outlined-cost" label="notes" onChange={handleChange} fullWidth />;
}
