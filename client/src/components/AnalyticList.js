import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, Paper } from '@material-ui/core';
import 'typeface-roboto';

import AnalyticItem from './AnalyticItem';

export default function AnalyticList({ history, data: { type, list } }) {
  return (
    <Paper elevation={0}>
      <List component="nav">
        <ListItem>
          <ListItemText primary={type} />
        </ListItem>
        {list.map((item) => (
          <AnalyticItem data={item} history={history} />
        ))}
      </List>
    </Paper>
  );
}

AnalyticList.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        issueId: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
