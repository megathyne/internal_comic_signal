import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

import { APIGet } from '../api/api';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { setActiveIssue } from '../actions';

export default function SelectIssue(props) {
  const activeSeries = useSelector(state => state.addInventory.activeSeries, shallowEqual);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const handleChange = (event, data) => dispatch(setActiveIssue(data));

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const issues = await APIGet('issue/' + activeSeries.id);
      if (active) {
        setOptions(Object.keys(issues).map(key => issues[key]));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="select-issue"
      style={{ width: 510 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.issue === value.issue}
      getOptionLabel={option => `${option.issueNumber} ${option.memo}`}
      options={options}
      loading={loading}
      onChange={handleChange}
      renderInput={params => (
        <TextField
          {...params}
          fullWidth
          value={params.id}
          label="Select Issue"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
