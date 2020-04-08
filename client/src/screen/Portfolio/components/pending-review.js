import React from 'react';
import { Card, CardContent, Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';

export default function PendingReview(props) {
  return (
    <Card>
      <CardContent>
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem>
            <ListItemText primary={<Typography variant="h5">Pending Review</Typography>} />
          </ListItem>
          {props.data.map((item, i) => {
            const title = `${item.comic.seriesName} (${item.comic.volume}) #${item.comic.number} `;
            return (
              <React.Fragment key={i}>
                <Divider />
                <ListItem button>
                  <ListItemText
                    primary={<Typography variant="body1">{title}</Typography>}
                    secondary={<Typography variant="body1">{item.inventory.pendingApprovalCount}</Typography>}
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
