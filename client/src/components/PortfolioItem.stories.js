import React from 'react';
import { action } from '@storybook/addon-actions';

import PortfolioItem from './PortfolioItem';
import { analyticItemData } from './AnalyticItem.stories';

export default {
  component: PortfolioItem,
  title: 'PortfolioItem',
  // Our exports that end in "Data" are not stories
  excludeStories: /.*Data$/,
};

export const portfolioItemData = {
  history: {},
  data: {
    issueId: 23,
    description: 'The Amazing Spider-Man (1963) #121',
    copies: 6,
    value: '$44.73',
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
      {
        name: '2019-05-01',
        amt: 2181,
      },
      {
        name: '2019-06-01',
        amt: 2500,
      },
      {
        name: '2019-07-01',
        amt: 2100,
      },
    ],
  },
};

export const actionsData = {
  onClick: action('handleOnClick'),
};

export const Default = () => <PortfolioItem data={{ ...portfolioItemData.data }} history={analyticItemData.history} />;
