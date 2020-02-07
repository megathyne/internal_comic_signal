import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

export default function SelectVendor(props) {
  return (
    <Autocomplete
      id="select-vendor"
      options={props.vendors}
      getOptionLabel={option => `${option.name}`}
      onChange={props.setActiveVendor}
      style={{ width: 300 }}
      renderInput={params => (
        <TextField
          {...params}
          label="Select Vendor"
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
}
