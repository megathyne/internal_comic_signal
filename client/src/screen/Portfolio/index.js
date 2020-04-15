import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Portfolio from '../../components/Portfolio';
import { APIGet } from '../../api/api';

const PortfolioScreen = ({ history }) => {
  const [data, setData] = useState({
    portfolioChartData: {
      value: '',
      hasGains: false,
      chartData: [],
    },
    valueAnalyticListData: {
      type: '',
      list: [],
    },
    reviewAnalyticListData: {
      type: '',
      list: [],
    },
    portfolioListData: [],
  });

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await APIGet('portfolio');
        if (!response) history.push('/login');
        setData(response);
      } catch (error) {
        history.push('/login');
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <Portfolio
      history={history}
      portfolioChartData={data.portfolioChartData}
      valueAnalyticListData={data.valueAnalyticListData}
      reviewAnalyticListData={data.reviewAnalyticListData}
      portfolioListData={data.portfolioListData}
    />
  );
};

export default withRouter(PortfolioScreen);
