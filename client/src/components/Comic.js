import React from 'react';
import PropTypes from 'prop-types';
import ComicDescription from './ComicDescription';
import ComicImage from './ComicImage';
import ComicStats from './ComicStats';
import ComicInventory from './ComicInventory';

export default function Comic({ comicDescriptionData, comicImageData, comicStatsData, comicInventoryData }) {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <ComicDescription data={comicDescriptionData} />
        <div style={{ display: 'flex' }}>
          <ComicImage data={comicImageData} />
          <ComicStats data={comicStatsData} />
        </div>
      </div>
      <div style={{ width: '50%' }}>
        <ComicInventory data={comicInventoryData} />
      </div>
    </div>
  );
}

ComicDescription.propTypes = {
  comicDescriptionData: PropTypes.shape({
    description: PropTypes.string.isRequired,
    hasGains: PropTypes.bool.isRequired,
    chartData: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        amt: PropTypes.number.isRequired,
      }),
    ),
  }),
  comicImageData: PropTypes.shape({
    image: PropTypes.string.isRequired,
  }),
  comicStatsData: PropTypes.shape({
    copies: PropTypes.string.isRequired,
    averageCost: PropTypes.string.isRequired,
    totalCost: PropTypes.string.isRequired,
    averageValue: PropTypes.string.isRequired,
    totalValue: PropTypes.string.isRequired,
  }),
  comicInventoryData: PropTypes.arrayOf(
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
