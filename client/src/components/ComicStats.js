import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, List, ListItem, ListItemText, Divider } from '@material-ui/core';

export default function ComicStats({ data: { copies, averageCost, totalCost, averageValue, totalValue } }) {
  return (
    <Paper elevation={0}>
      <List>
        <ListItem>
          <ListItemText primary="Copies" secondary={copies} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Average Cost" secondary={averageCost} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Total Cost" secondary={totalCost} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Average Value" secondary={averageValue} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Total Value" secondary={totalValue} />
        </ListItem>
      </List>
    </Paper>
  );
}

ComicStats.propTypes = {
  data: PropTypes.shape({
    copies: PropTypes.string.isRequired,
    averageCost: PropTypes.string.isRequired,
    totalCost: PropTypes.string.isRequired,
    averageValue: PropTypes.string.isRequired,
    totalValue: PropTypes.string.isRequired,
  }),
};
