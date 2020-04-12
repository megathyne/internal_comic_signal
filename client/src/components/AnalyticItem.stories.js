import React from 'react';
import { action } from '@storybook/addon-actions';

import AnalyticItem from './AnalyticItem';

export default {
  component: AnalyticItem,
  title: 'AnalyticItem',
  // Our exports that end in "Data" are not stories
  excludeStories: /.*Data$/,
};

export const analyticItemData = {
  history: {},
  data: { issueId: 1, description: 'X-Men 53', value: '$21.00' },
};

export const actionsData = {
  onClick: action('handleOnClick'),
};

export const Default = () => <AnalyticItem data={{ ...analyticItemData.data }} history={analyticItemData.history} />;
