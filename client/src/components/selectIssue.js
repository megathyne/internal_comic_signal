import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
import { APIGet } from "../api/api";
import CircularProgress from "@material-ui/core/CircularProgress";

// const useStyles = makeStyles(theme => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2)
//   }
// }));

// function sleep(delay = 0) {
//   return new Promise(resolve => {
//     setTimeout(resolve, delay);
//   });
// }

export default function SelectIssue(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      console.log(props.activeSeries.id);
      const response = await APIGet("issue/" + props.activeSeries.id);
      const issues = response;
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
      onChange={props.setActiveIssue}
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
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
}
