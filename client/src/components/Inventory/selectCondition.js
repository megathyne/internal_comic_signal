import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCondition } from '../../actions';
import { APIGet } from '../../api/api';

export default function SelectCondition(props) {
  const dispatch = useDispatch();
  const activeCondition = useSelector(state => state.addInventory.activeCondition);
  const handleChange = (event, data) => dispatch(setActiveCondition(data));
  const [data, setData] = useState({ conditions: [], isFetching: false });

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        //setData({ conditions: data.conditions, isFetching: true });
        const response = await APIGet('condition');
        setData({ conditions: response, isFetching: false });
      } catch (e) {
        console.log(e);
        //setData({ conditions: data.conditions, isFetching: false });
      }
    };

    fetchConditions();
  }, []);

  return (
    <Autocomplete
      id="select-condition"
      options={data.conditions}
      getOptionLabel={option => `${option.numerical.toFixed(1)} ${option.abbreviation} ${option.name}`}
      onChange={handleChange}
      value={activeCondition}
      style={{ width: 300 }}
      renderInput={params => <TextField {...params} label="Select Condition" variant="outlined" fullWidth />}
    />
  );
}
