import React from 'react';
import PropTypes from 'prop-types';
import PortfolioChart from './PortfolioChart';
import AnalyticList from './AnalyticList';
import PortfolioList from './PortfolioList';

export default function Portfolio({
  history,
  portfolioChartData,
  valueAnalyticListData,
  reviewAnalyticListData,
  portfolioListData,
}) {
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <PortfolioChart data={portfolioChartData} />
        <div style={{ display: 'flex' }}>
          <AnalyticList history={history} data={valueAnalyticListData} />
          <AnalyticList history={history} data={reviewAnalyticListData} />
        </div>
      </div>
      <PortfolioList history={history} data={portfolioListData} />
    </div>
  );
}

Portfolio.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  portfolioChartData: PropTypes.shape({
    value: PropTypes.string.isRequired,
    hasGains: PropTypes.bool.isRequired,
    chartData: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        amt: PropTypes.number.isRequired,
      }),
    ),
  }),
  valueAnalyticListData: PropTypes.shape({
    type: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        issueId: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ),
  }),
  reviewAnalyticListData: PropTypes.shape({
    type: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        issueId: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ),
  }),
  portfolioListData: PropTypes.arrayOf(
    PropTypes.shape({
      issueId: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      copies: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      hasGains: PropTypes.bool.isRequired,
      chartData: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.string.isRequired,
          amt: PropTypes.number.isRequired,
        }),
      ),
    }),
  ),
};
