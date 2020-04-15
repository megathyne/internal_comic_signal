import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, Paper } from '@material-ui/core';
import { XAxis, YAxis, CartesianGrid, LineChart, Line, ReferenceLine, ResponsiveContainer } from 'recharts';

export default function ComicDescription({ data: { chartData, description, hasGains } }) {
  return (
    <Paper elevation={0}>
      <List>
        <ListItem>
          <ListItemText primary={description} />
        </ListItem>

        <ListItem>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
              <LineChart
                data={chartData}
                margin={{
                  right: 30,
                }}
              >
                <YAxis />
                <XAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dot={true} dataKey="amt" stroke={hasGains ? 'green' : 'red'} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ListItem>
      </List>
    </Paper>
  );
}

ComicDescription.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string.isRequired,
    hasGains: PropTypes.bool.isRequired,
    chartData: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        amt: PropTypes.number.isRequired,
      }),
    ),
  }),
};
