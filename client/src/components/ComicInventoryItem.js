import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText, Divider, List, Paper } from '@material-ui/core';

export default function ComicInventoryItem({
  data: { condition, cost, acquired, high, low, last, totalApproved, value },
}) {
  return (
    <Paper style={{ display: 'flex' }}>
      <List style={{ width: '50%' }}>
        <ListItem>
          <ListItemText primary="Condition" secondary={condition} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Cost" secondary={cost} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Acquired" secondary={acquired} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="52 Wk High" secondary={high} />
        </ListItem>
      </List>
      <List style={{ width: '50%' }}>
        <ListItem>
          <ListItemText primary="52 Wk Low" secondary={low} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Last" secondary={last} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Total Approved" secondary={totalApproved} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Value" secondary={value} />
        </ListItem>
      </List>
    </Paper>
  );
}

ComicInventoryItem.propTypes = {
  data: PropTypes.shape({
    condition: PropTypes.string.isRequired,
    cost: PropTypes.string.isRequired,
    acquired: PropTypes.string.isRequired,
    high: PropTypes.string.isRequired,
    low: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired,
    totalApproved: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
};
