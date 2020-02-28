import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`,
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing.unit * 2,
  },
});

function Review(props) {
  const { classes, values } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Account Review
      </Typography>
      <Grid container spacing={16}>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Info
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>First Name</Typography>
              <Typography gutterBottom>{props.values.firstName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Last Name</Typography>
              <Typography gutterBottom>{props.values.lastName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Email</Typography>
              <Typography gutterBottom>{props.values.email}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Details
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>{'Age'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{values.age}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{'City'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{values.city}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{'Age'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{values.age}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Review.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Review);