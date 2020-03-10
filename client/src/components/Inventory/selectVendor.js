import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveVendor } from '../../actions';
import { APIGet } from '../../api/api';

export default function SelectVendor(props) {
  const dispatch = useDispatch();
  const activeVendor = useSelector(state => state.addInventory.activeVendor);
  const handleChange = (event, data) => dispatch(setActiveVendor(data));
  const [data, setData] = useState({ graders: [], isFetching: false });

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        // setData({ vendors: data.vendors, isFetching: true });
        const response = await APIGet('vendor');
        setData({ vendors: response, isFetching: false });
      } catch (e) {
        console.log(e);
        // setData({ vendors: data.vendors, isFetching: false });
      }
    };
    fetchVendors();
  }, []);

  return (
    <Autocomplete
      id="select-vendor"
      options={data.vendors}
      getOptionLabel={option => `${option.name}`}
      onChange={handleChange}
      style={{ width: 250 }}
      value={activeVendor}
      renderInput={params => <TextField {...params} label="Select Vendor" variant="outlined" fullWidth />}
    />
  );
}
