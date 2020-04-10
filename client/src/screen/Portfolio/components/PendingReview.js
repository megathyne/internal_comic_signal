import React from 'react';
import { Card, CardContent, Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import Item from './Item';

export default function PendingReview(props) {
  const { data, history } = props;
  return (
    <Card>
      <CardContent>
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem>
            <ListItemText primary={<Typography variant="h5">Pending Review</Typography>} />
          </ListItem>
          {data.map((item) => (
            <Item data={item} history={history}/>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
