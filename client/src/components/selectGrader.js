import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

export default function SelectGrader(props) {
  return (
    <Autocomplete
      id="select-grade"
      options={props.graders}
      getOptionLabel={option =>
        `${option.name}`
      }
      onChange={props.setActiveGrade}
      style={{ width: 200 }}
      renderInput={params => (
        <TextField
          {...params}
          label="Select Grader"
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
}
