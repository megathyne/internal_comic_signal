import React from 'react';

import AnalyticList from './AnalyticList';
import { analyticItemData, actionsData } from './AnalyticItem.stories';

export default {
  component: AnalyticList,
  title: 'AnalyticList',
  excludeStories: /.*Data$/,
};

export const valueAnalyticListData = {
  type: 'Highest Value',
  list: [
    { ...analyticItemData, issueId: 4, description: 'The Amazing Spider-Man (1963) #124', value: '$3,495.21' },
    { ...analyticItemData, issueId: 2, description: 'The Amazing Spider-Man (1963) #122', value: '$143.00' },
    { ...analyticItemData, issueId: 3, description: 'The Amazing Spider-Man (1963) #123', value: '$78.34' },
    { ...analyticItemData, issueId: 1, description: 'The Amazing Spider-Man (1963) #121', value: '$22.50' },
  ],
};

export const reviewAnalyticListData = {
  type: 'Waiting Review',
  list: [
    { ...analyticItemData, issueId: 4, description: 'The Amazing Spider-Man (1963) #124', value: '12' },
    { ...analyticItemData, issueId: 2, description: 'The Amazing Spider-Man (1963) #122', value: '9' },
    { ...analyticItemData, issueId: 3, description: 'The Amazing Spider-Man (1963) #123', value: '6' },
    { ...analyticItemData, issueId: 1, description: 'The Amazing Spider-Man (1963) #121', value: '2' },
  ],
};

export const historyData = {
  push: function () {},
};

export const defaultAnalyticTypeData = 'Highest Value';

export const MaxValue = () => <AnalyticList history={historyData} data={valueAnalyticListData} />;

export const MaxReview = () => <AnalyticList history={historyData} data={reviewAnalyticListData} />;
