import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { APIGet } from '../../../api/api';

export default function Page(props) {
  const [data, setData] = useState({ pages: [], isFetching: false });

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await APIGet('page');
        setData({ pages: response, isFetching: false });
      } catch (e) {
        console.log(e);
      }
    };
    fetchPages();
  }, []);

  const handleChange = (event, data) => {
    props.handleChange('pageId')(data.id);
  };

  return (
    <Autocomplete
      id="select-page"
      options={data.pages}
      getOptionLabel={option => `${option.name}`}
      onChange={handleChange}
      renderInput={params => <TextField {...params} margin="dense" label="Select Page" fullWidth />}
    />
  );
}
