import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function PaymentForm(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Other info
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="age"
            label="Age"
            fullWidth
            onChange={props.handleChange('age')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="city"
            label="City"
            fullWidth
            onChange={props.handleChange('city')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="country"
            label="Country"
            fullWidth
            onChange={props.handleChange('country')}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default PaymentForm;