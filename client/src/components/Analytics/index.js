import React, { useEffect, useState } from 'react';
import { APIGet } from '../../api/api';
import { Typography, TextField } from '@material-ui/core';

export default function Analytics(props) {
  const [data, setData] = useState({ costsSum: '$150' });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await APIGet('analytics');
        setData({ costsSum: response.costsSum });
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <TextField
      id="outlined-read-only-input"
      size="small"
      label="Total Costs"
      value={data.costsSum}
      InputProps={{
        readOnly: true,
      }}
      variant="outlined"
    />
  );
}
