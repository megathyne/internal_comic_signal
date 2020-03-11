import React from 'react';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setAquired } from '../../actions';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

export default function SelectAcquired(props) {
  const dispatch = useDispatch();
  const acquired = useSelector(state => state.addInventory.acquired);

  const handleChange = event => {
    console.log(event);
    dispatch(setAquired(event));
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="dense"
          id="date-picker-acquired"
          label="acquired"
          value={acquired}
          onChange={handleChange}
          style={{ width: 225 }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
