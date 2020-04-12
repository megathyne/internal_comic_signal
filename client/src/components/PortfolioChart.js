import React from 'react';
import PropTypes from 'prop-types';
import { XAxis, YAxis, CartesianGrid, LineChart, Line, ReferenceLine, ResponsiveContainer } from 'recharts';
import { Button, Card, CardContent, Divider, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import 'typeface-roboto';

export default function PortfolioChart({ data: { value, hasGains, chartData } }) {
  return (
    <Paper elevation={0}>
      <ListItem>
        <ListItemText primary={`Portfolio Value: ${value}`} />
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
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line type="monotone" dot={true} dataKey="amt" stroke={hasGains ? 'green' : 'red'} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ListItem>
    </Paper>
  );
}

PortfolioChart.propTypes = {
  data: PropTypes.shape({
    value: PropTypes.string.isRequired,
    hasGains: PropTypes.bool.isRequired,
    chartData: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        amt: PropTypes.number.isRequired,
      }),
    ),
  }),
};
