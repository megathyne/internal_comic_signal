import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, ReferenceLine, ResponsiveContainer } from 'recharts';
import { Button, Divider, ListItem, ListItemText } from '@material-ui/core';
import 'typeface-roboto';

export default function PortfolioItem({
  data: { chartData, issueId, cost, description, copies, value, hasGains },
  history,
}) {
  const handleOnClick = () => {
    history.push(`/comic/${issueId}`);
  };

  return (
    <React.Fragment key={issueId}>
      <ListItem button onClick={handleOnClick}>
        <div style={{ width: '25%', height: 75 }}>
          <ResponsiveContainer>
            <LineChart
              data={chartData}
              margin={{
                right: 30,
              }}
            >
              <ReferenceLine y={0} stroke="grey" strokeDasharray="3 3" />
              <Line type="monotone" dot={false} dataKey="amt" stroke={hasGains ? 'green' : 'red'} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <ListItemText
          primary={description}
          secondary={`${copies} ${copies > 1 ? 'Copies' : 'Copy'}`}
          secondaryTypographyProps={{ variant: 'subtitle1' }}
        />
        <Button variant="outlined" size="large" color={hasGains ? 'primary' : 'secondary'}>
          {value}
        </Button>
      </ListItem>
    </React.Fragment>
  );
}

PortfolioItem.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  data: PropTypes.shape({
    issueId: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    copies: PropTypes.number.isRequired,
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
