import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Card, CardMedia } from '@material-ui/core';

export default function ComicImage({ data: { image } }) {
  return (
    <Card >
      <CardMedia component="img" src={image}></CardMedia>
    </Card>
  );
}

ComicImage.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string.isRequired,
  }),
};
