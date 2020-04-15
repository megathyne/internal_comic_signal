import React from 'react';
import ComicStats from './ComicStats';

export default {
  component: ComicStats,
  title: 'ComicStats',
  excludeStories: /.*Data$/,
};

export const comicStatsData = {
  copies: '1',
  averageCost: '$324.32',
  totalCost: '$700.44',
  averageValue: '$1324.32',
  totalValue: '$1700.44',
};

export const Default = () => <ComicStats data={comicStatsData} />;
