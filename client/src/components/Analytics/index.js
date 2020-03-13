import React, { useEffect, useState } from 'react';
import { APIGet } from '../../api/api';
import { Typography, TextField } from '@material-ui/core';

export default function Analytics(props) {
  const [data, setData] = useState({ costsSum: 0, valueSum: 0 });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const costsResponse = await APIGet('analytics/costs');
        const valueResponse = await APIGet('analytics/value');
        setData({ valueSum: valueResponse.valueSum, costsSum: costsResponse.costsSum });
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div>
      <TextField
        id="outlined-read-only-input-costs"
        size="small"
        label="Total Costs"
        value={data.costsSum}
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
      />
      <TextField
        id="outlined-read-only-input-costs"
        size="small"
        label="Total Value"
        value={data.valueSum}
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
      />
    </div>
  );
}
