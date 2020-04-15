import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import Comic from '../../components/Comic';
import { APIGet } from '../../api/api';

const ComicScreen = ({ history }) => {
  const { issueId } = useParams();
  const [data, setData] = useState({
    comicDescriptionData: {
      description: '',
      hasGains: false,
      chartData: [],
    },
    comicImageData: {
      image: '',
    },
    comicStatsData: {
      copies: '',
      averageCost: '',
      totalCost: '',
      averageValue: '',
      totalValue: '',
    },
    comicInventoryData: [],
  });

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await APIGet(`portfolio/${issueId}`);
        if (!response) history.push('/login');
        setData(response);
      } catch (error) {
        history.push('/login');
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <Comic
      history={history}
      comicDescriptionData={data.comicDescriptionData}
      comicImageData={data.comicImageData}
      comicStatsData={data.comicStatsData}
      comicInventoryData={data.comicInventoryData}
    />
  );
};

export default withRouter(ComicScreen);
