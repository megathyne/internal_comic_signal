import React from 'react';
import { Divider, ListItem, ListItemText, Typography } from '@material-ui/core';

export default function Item(props) {
  const {
    history,
    data: { issueId, title, data },
  } = props;

  const handleListItemClick = () => {
    console.log(issueId);
    console.log('3333');
    history.push(`/comic/${issueId}`);
  };

  return (
    <React.Fragment key={issueId}>
      <Divider />
      <ListItem button onClick={(event) => handleListItemClick(event, 0)}>
        <ListItemText
          primary={<Typography variant="body1">{title}</Typography>}
          secondary={<Typography variant="body1">{'$' + data}</Typography>}
        />
      </ListItem>
    </React.Fragment>
  );
}
