import React from 'react';
import { Divider, ListItem, ListItemText, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function AnalyticItem({ history, data: { issueId, description, value } }) {
  const handleOnClick = () => {
    history.push(`/comic/${issueId}`);
  };

  return (
    <React.Fragment key={issueId}>
      <Divider />
      <ListItem button onClick={handleOnClick}>
        <ListItemText primary={description} secondary={value} secondaryTypographyProps={{ variant: 'subtitle1' }} />
      </ListItem>
    </React.Fragment>
  );
}

AnalyticItem.propTypes = {
  data: PropTypes.shape({
    issueId: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
