import React, { PureComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import PortfolioChart from '../../components/portfolio-chart';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PortfolioItemChart from '../../components/portfolio-item-chart';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function Register(props) {
  return (
    <div style={{ marginTop: '50px', marginLeft: '50px', marginRight: '50px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6">COMICSIGNAL</Typography>
        <Typography variant="h6">WELCOME MEGATHYNE | SETTINGS | SIGNOUT</Typography>
      </div>
    </div>
  );
}
