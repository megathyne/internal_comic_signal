import React from 'react';
import { Card, CardContent, Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';

export default function HighestValue(props) {
  const data = {
    highestValueList: [
      { id: 1, name: 'Incredible Hulk (1963) #181 (1.0)', amount: '$750.33' },
      { id: 2, name: 'Avengers Annual (1963) #10 (9.8)', amount: '$650.25' },
      { id: 3, name: 'Amazing Spider-Man (1963) #121', amount: '$500.15' },
    ],
  };
  return (
    <Card>
      <CardContent>
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem>
            <ListItemText primary={<Typography variant="h5">Highest Value</Typography>} />
          </ListItem>
          {data.highestValueList.map((item) => {
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
