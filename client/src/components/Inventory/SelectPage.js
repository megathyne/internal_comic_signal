import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePage } from '../../actions';
import { APIGet } from '../../api/api';

export default function SelectPage(props) {
  const dispatch = useDispatch();
  const activePage = useSelector(state => state.addInventory.activePage);
  const handleChange = (event, data) => dispatch(setActivePage(data));
  const [data, setData] = useState({ pages: [], isFetching: false });

  useEffect(() => {
    const fetchPages = async () => {
      try {
        // setData({ pages: data.pages, isFetching: true });
        const response = await APIGet('page');
        setData({ pages: response, isFetching: false });
      } catch (e) {
        console.log(e);
        // setData({ pages: data.pages, isFetching: false });
      }
    };
    fetchPages();
  }, []);

  return (
    <Autocomplete
      id="select-page"
      options={data.pages}
      getOptionLabel={option => `${option.name}`}
      onChange={handleChange}
      value={activePage}
      style={{ width: 250 }}
      renderInput={params => <TextField {...params} label="Select Page" variant="outlined" fullWidth />}
    />
  );
}
