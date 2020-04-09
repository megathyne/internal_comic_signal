import React from 'react';
import { Divider, Typography } from '@material-ui/core';

export default function Description(props) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Copies</Typography>
        <Typography variant="body1">{props.data.length}</Typography>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Average Cost</Typography>
        <Typography variant="body1">
          {`$${props.data.reduce((prev, curr) => (prev += parseInt(curr.cost.split('$')[1])), 0).toFixed(2)}`}
        </Typography>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1" color="primary">
          Total Return
        </Typography>
        <Typography variant="body1" color="primary">
          +$600.00 (+17.51%)
        </Typography>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1" color="primary">
          Total Value
        </Typography>
        <Typography variant="body1" color="primary">
          $1,300.00
        </Typography>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1" color="primary">
          Portfolio Diversity
        </Typography>
        <Typography variant="body1" color="primary">
          22%
        </Typography>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1" color="primary">
          30 Day Return
        </Typography>
        <Typography variant="body1" color="primary">
          +100.00 (+4.22%)
        </Typography>
      </div>
    </div>
  );
}
