import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

export default function SelectGrade(props) {
  return (
    <Autocomplete
      id="select-grade"
      options={props.grades}
      getOptionLabel={option => `${option.grade}`}
      onChange={props.setActiveGrade}
      style={{ width: 300 }}
      renderInput={params => (
        <TextField
          {...params}
          label="Select Grade"
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
}
