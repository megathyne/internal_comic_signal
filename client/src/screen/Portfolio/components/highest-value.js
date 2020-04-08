import React from 'react';
import { Card, CardContent, Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';

export default function HighestValue(props) {
  return (
    <Card>
      <CardContent>
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem>
            <ListItemText primary={<Typography variant="h5">Highest Value</Typography>} />
          </ListItem>
          {props.data.map((item) => {
            const title = `${item.comic.seriesName} (${item.comic.volume}) #${item.comic.number} `;
            return (
              <React.Fragment key={item.id}>
                <Divider />
                <ListItem button>
                  <ListItemText
                    primary={<Typography variant="body1">{title}</Typography>}
                    secondary={<Typography variant="body1">{item.inventory.value}</Typography>}
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
