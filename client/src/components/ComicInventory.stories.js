import React from 'react';
import ComicInventory from './ComicInventory';
import { comicInventoryItemData } from './ComicInventoryItem.stories';

export default {
  component: ComicInventory,
  title: 'ComicInventory',
  excludeStories: /.*Data$/,
};

export const comicInventoryData = [
  comicInventoryItemData,
  comicInventoryItemData,
  comicInventoryItemData,
  comicInventoryItemData,
  comicInventoryItemData,
];

export const Default = () => <ComicInventory data={comicInventoryData} />;
