import React from 'react';
import { action } from '@storybook/addon-actions';

import PortfolioList from './PortfolioList';
import { portfolioItemData, actionsData } from './PortfolioItem.stories';

export default {
  component: PortfolioList,
  title: 'PortfolioList',
  excludeStories: /.*Data$/,
};

export const historyData = {
  push: function () {},
};

export const portfolioListData = [
  {
    ...portfolioItemData.data,
    issueId: 1,
    description: 'The Amazing Spider-Man (1963) #121',
    copies: 1,
    value: '$123.34',
    hasGains: false,
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
  },
  {
    ...portfolioItemData.data,
    issueId: 2,
    description: 'The Amazing Spider-Man (1963) #122',
    copies: 2,
    value: '$22.34',
    hasGains: true,
    chartData: [
      {
        date: '2019-01-01',
        amt: 2400,
      },
      {
        date: '2019-02-01',
        amt: 2210,
      },
      {
        name: '2019-03-01',
        amt: 2290,
      },
      {
        name: '2019-04-01',
        amt: 2000,
      },
    ],
  },
  {
    ...portfolioItemData.data,
    issueId: 3,
    description: 'The Amazing Spider-Man (1963) #123',
    copies: 3,
    value: '$4.34',
  },
  {
    ...portfolioItemData.data,
    issueId: 4,
    description: 'The Amazing Spider-Man (1963) #124',
    copies: 4,
    value: '$1,212.11',
  },
  {
    ...portfolioItemData.data,
    issueId: 5,
    description: 'The Amazing Spider-Man (1963) #125',
    copies: 5,
    value: '$15.00',
    hasGains: true,
    chartData: [
      {
        date: '2019-01-01',
        amt: 400,
      },
      {
        date: '2019-02-01',
        amt: 210,
      },
      {
        name: '2019-03-01',
        amt: 290,
      },
      {
        name: '2019-04-01',
        amt: 100,
      },
      {
        name: '2019-05-01',
        amt: 181,
      },
      {
        name: '2019-06-01',
        amt: 500,
      },
      {
        name: '2019-07-01',
        amt: 100,
      },
    ],
  },
  {
    ...portfolioItemData.data,
    issueId: 6,
    description: 'The Amazing Spider-Man (1963) #126',
    copies: 6,
    value: '$20.99',
    hasGains: false,
    chartData: [
      {
        date: '2019-01-01',
        amt: 1400,
      },
      {
        date: '2019-02-01',
        amt: 1210,
      },
      {
        name: '2019-03-01',
        amt: 1290,
      },
      {
        name: '2019-04-01',
        amt: 1000,
      },
      {
        name: '2019-05-01',
        amt: 1181,
      },
      {
        name: '2019-06-01',
        amt: 1500,
      },
      {
        name: '2019-07-01',
        amt: 1100,
      },
    ],
  },
];

export const Default = () => <PortfolioList data={portfolioListData} history={historyData} />;
