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
  const handleChange = event => dispatch(setAquired(event.target.value));

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'))
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <TextField
          id="outlined-acquired"
          label="acquired"
          variant="outlined"
          value={acquired}
          onChange={handleChange}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
