import React from 'react';
import { action } from '@storybook/addon-actions';

import PortfolioChart from './PortfolioChart';

export default {
  component: PortfolioChart,
  title: 'PortfolioChart',
  excludeStories: /.*Data$/,
};

export const portfolioChartData = {
  value: '$23,522.03',
  hasGains: true,
  chartData: [
    {
        date: '2019-01-01',
        amt: 240,
      },
      {
        date: '2019-02-01',
        amt: 221,
      },
      {
        name: '2019-03-01',
        amt: 229,
      },
      {
        name: '2019-04-01',
        amt: 200,
      },
      {
        name: '2019-05-01',
        amt: 218,
      },
      {
        name: '2019-06-01',
        amt: 250,
      },
      {
        name: '2019-07-01',
        amt: 210,
      },
  ],
};

export const Default = () => <PortfolioChart data={{ ...portfolioChartData }} />;
