import React from 'react';
import PropTypes from 'prop-types';
import ComicInventoryItem from './ComicInventoryItem';

export default function ComicInventory({ data }) {
  return data.map((item, i) => <ComicInventoryItem key={i} data={item} />);
}

ComicInventory.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      condition: PropTypes.string.isRequired,
      cost: PropTypes.string.isRequired,
      acquired: PropTypes.string.isRequired,
      high: PropTypes.string.isRequired,
      low: PropTypes.string.isRequired,
      last: PropTypes.string.isRequired,
      totalApproved: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
};
