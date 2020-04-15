import React from 'react';
import Comic from './Comic';
import { comicImageData } from './ComicImage.stories';
import { comicDescriptionData } from './ComicDescription.stories';
import { comicStatsData } from './ComicStats.stories';
import { comicInventoryData } from './ComicInventory.stories';

export default {
  component: Comic,
  title: 'Comic',
  excludeStories: /.*Data$/,
};

export const historyData = {
  push: function () {},
};

export const Default = () => (
  <Comic
    history={historyData}
    comicDescriptionData={comicDescriptionData}
    comicImageData={comicImageData}
    comicStatsData={comicStatsData}
    comicInventoryData={comicInventoryData}
  />
);
