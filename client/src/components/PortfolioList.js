import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardContent, Divider, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import 'typeface-roboto';
import PortfolioItem from './PortfolioItem';

export default function PortfolioList({ data, history }) {
  return (
    <Paper elevation={0}>
      <List component="nav">
        <ListItem key="porfoliolistheadeing">
          <ListItemText primary="Portfolio" />
          <Button variant="outlined" href="/addcomic">
            Add comic
          </Button>
        </ListItem>
        <Divider />
        {data.map((item, i) => (
          <PortfolioItem key={item.issueId} data={item} history={history} />
        ))}
      </List>
    </Paper>
  );
}

PortfolioList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      issueId: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      copies: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      hasGains: PropTypes.bool.isRequired,
      chartData: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.string.isRequired,
          amt: PropTypes.number.isRequired,
        }),
      ),
    }),
  ),
};
