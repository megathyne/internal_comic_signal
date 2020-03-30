import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { APIGet } from '../../../api/api';

export default function Condition(props) {
  const [data, setData] = useState({ conditions: [], isFetching: false });

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await APIGet('condition');
        setData({ conditions: response, isFetching: false });
      } catch (e) {
        console.log(e);
      }
    };

    fetchConditions();
  }, []);

  const handleChange = (event, data) => {
    props.handleChange('conditionId')(data.id);
  };

  return (
    <Autocomplete
      id="select-condition"
      options={data.conditions}
      getOptionLabel={option => `${option.numerical.toFixed(1)} ${option.abbreviation} ${option.name}`}
      onChange={handleChange}
      renderInput={params => <TextField {...params} margin="dense" label="Select Condition" fullWidth />}
    />
  );
}
