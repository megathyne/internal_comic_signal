import React from 'react';
import { Card, CardContent, Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';

export default function PendingReview(props) {
  const data = {
    pendingReviewList: [
      { id: 1, name: 'Amazing Spider-Man (1963) #121', amount: '16' },
      { id: 2, name: 'Spawn (1992) #1', amount: '7' },
      { id: 3, name: 'Uncanny X-Men (1963) #266', amount: '5' },
    ],
  };

  return (
    <Card>
      <CardContent>
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem>
            <ListItemText primary={<Typography variant="h5">Pending Review</Typography>} />
          </ListItem>
          {data.pendingReviewList.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <Divider />
                <ListItem button>
                  <ListItemText
                    primary={<Typography variant="body1">{item.name}</Typography>}
                    secondary={<Typography variant="body1">{item.amount}</Typography>}
                  />
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}
