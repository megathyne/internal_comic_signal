import React from 'react';
import { action } from '@storybook/addon-actions';

import Portfolio from './Portfolio';
import { portfolioChartData } from './PortfolioChart.stories';
import { valueAnalyticListData, reviewAnalyticListData } from './AnalyticList.stories';
import { portfolioListData } from './PortfolioList.stories';

export default {
  component: Portfolio,
  title: 'Portfolio',
  excludeStories: /.*Data$/,
};

export const historyData = {
  push: function () {},
};

export const Default = () => (
  <Portfolio
    history={historyData}
    portfolioChartData={portfolioChartData}
    valueAnalyticListData={valueAnalyticListData}
    reviewAnalyticListData={reviewAnalyticListData}
    portfolioListData={portfolioListData}
  />
);
