import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { setActiveCondition, getConditionsSaga } from '../actions';
import { APIGet } from '../api/api';

export default function SelectCondition(props) {
  const dispatch = useDispatch();
  const conditions = useSelector(state => state.addInventory.conditions, shallowEqual);
  const handleChange = (event, data) => dispatch(setActiveCondition(data));

  // https://blog.logrocket.com/patterns-for-data-fetching-in-react-981ced7e5c56/
  const [data, setData] = useState({ conditions: [], isFetching: false });

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        setData({ conditions: data.conditions, isFetching: true });
        const response = await APIGet('condition');
        setData({ conditions: response, isFetching: false });
      } catch (e) {
        console.log('conditions error', e);
        setData({ conditions: data.conditions, isFetching: false });
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
      style={{ width: 300 }}
      renderInput={params => <TextField {...params} label="Select Condition" variant="outlined" fullWidth />}
    />
  );
}
