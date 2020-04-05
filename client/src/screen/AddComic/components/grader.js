import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { APIGet } from '../../../api/api';

export default function Grader(props) {
  const [data, setData] = useState({ graders: [], isFetching: false });

  useEffect(() => {
    const fetchGraders = async () => {
      try {
        const response = await APIGet('grader');
        setData({ graders: response, isFetching: false });
      } catch (e) {
        console.log(e);
      }
    };
    fetchGraders();
  }, []);

  const handleChange = (event, data) => {
    props.handleChange('graderId')(data.id);
  };

  return (
    <Autocomplete
      id="select-grade"
      options={data.graders}
      getOptionLabel={option => `${option.name}`}
      onChange={handleChange}
      renderInput={params => <TextField {...params} margin="dense" label="Select Grader" fullWidth />}
    />
  );
}
