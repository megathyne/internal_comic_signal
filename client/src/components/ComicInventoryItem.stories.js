import React from 'react';
import ComicInventoryItem from './ComicInventoryItem';

export default {
  component: ComicInventoryItem,
  title: 'ComicInventoryItem',
  excludeStories: /.*Data$/,
};

export const comicInventoryItemData = {
  condition: '3.0 VG',
  cost: '$234.33',
  acquired: '2020-03-01',
  high: '$32.43',
  low: '$432.32',
  last: '$312.00',
  totalApproved: '10',
  value: '$122,00',
};

export const Default = () => <ComicInventoryItem data={comicInventoryItemData} />;
