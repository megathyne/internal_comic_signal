import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setActiveGrader } from '../../actions';
import { APIGet } from '../../api/api';

export default function SelectGrader(props) {
  const dispatch = useDispatch();
  const handleChange = (event, data) => dispatch(setActiveGrader(data));
  const [data, setData] = useState({ graders: [], isFetching: false });

  useEffect(() => {
    const fetchGraders = async () => {
      try {
        setData({ graders: data.graders, isFetching: true });
        const response = await APIGet('grader');
        setData({ graders: response, isFetching: false });
      } catch (e) {
        console.log(e);
        setData({ graders: data.graders, isFetching: false });
      }
    };
    fetchGraders();
  }, []);

  return (
    <Autocomplete
      id="select-grade"
      options={data.graders}
      getOptionLabel={option => `${option.name}`}
      onChange={handleChange}
      style={{ width: 200 }}
      renderInput={params => <TextField {...params} label="Select Grader" variant="outlined" fullWidth />}
    />
  );
}
