import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

export default function SelectCondition(props) {
  return (
    <Autocomplete
      id="select-condition"
      options={props.conditions}
      getOptionLabel={option =>
        `${option.numerical.toFixed(1)} ${option.abbreviation} ${option.name}`
      }
      onChange={props.setActiveCondition}
      style={{ width: 300 }}
      renderInput={params => (
        <TextField
          {...params}
          label="Select Condition"
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
}
