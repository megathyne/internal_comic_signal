import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Heading(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="white">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            COMIC SIGNAL
          </Typography>

          <Typography variant="button">Welcome megathyne</Typography>
          
          <div>
          <Button color="inherit">Settings</Button>
          <Button color="inherit">Signout</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
