import React from 'react';
import { TextField } from '@material-ui/core';

export default function Cost(props) {
  const handleChange = event => {
    props.handleChange('cost')(event.target.value);
  };

  return <TextField id="outlined-cost" label="Amount Paid" onChange={handleChange} fullWidth />;
}
