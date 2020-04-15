import React from 'react';
import ComicDescription from './ComicDescription';

export default {
  component: ComicDescription,
  title: 'ComicDescription',
  excludeStories: /.*Data$/,
};

export const comicDescriptionData = {
  description: 'The Amazing Spider-Man (1963) #121',
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
      date: '2019-03-01',
      amt: 229,
    },
    {
      date: '2019-04-01',
      amt: 200,
    },
    {
      date: '2019-05-01',
      amt: 218,
    },
    {
      date: '2019-06-01',
      amt: 250,
    },
    {
      date: '2019-07-01',
      amt: 210,
    },
  ],
};

export const Default = () => <ComicDescription data={comicDescriptionData} />;
