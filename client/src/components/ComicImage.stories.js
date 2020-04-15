import React from 'react';
import ComicImage from './ComicImage';
import ASM121 from '../mockData/730623.jpg';

export default {
  component: ComicImage,
  title: 'ComicImage',
  excludeStories: /.*Data$/,
};

export const comicImageData = {
  image: ASM121,
};

export const Default = () => <ComicImage data={comicImageData} />;
