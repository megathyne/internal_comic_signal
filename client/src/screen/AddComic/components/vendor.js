import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { APIGet } from '../../../api/api';

export default function Vendor(props) {
  const [data, setData] = useState({ graders: [], isFetching: false });

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await APIGet('vendor');
        setData({ vendors: response, isFetching: false });
      } catch (e) {
        console.log(e);
      }
    };
    fetchVendors();
  }, []);

  const handleChange = (event, data) => {
    props.handleChange('vendorId')(data.id);
  };

  return (
    <Autocomplete
      id="select-vendor"
      options={data.vendors}
      getOptionLabel={option => `${option.name}`}
      onChange={handleChange}
      renderInput={params => <TextField margin="dense" {...params} label="Vendor" fullWidth />}
    />
  );
}
