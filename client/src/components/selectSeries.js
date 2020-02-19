import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
import { APIGet } from "../api/api";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function SelectSeries(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  // const classes = useStyles();

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await APIGet("series");
      // await sleep(1e3); // For demo purposes.
      // const comics = await response.json();
      const series = response;
      if (active) {
        setOptions(Object.keys(series).map(key => series[key]));
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
      id="select-series"
      style={{ width: 510 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.series === value.series}
      getOptionLabel={option => `${option.name} (${option.volume})`}
      options={options}
      loading={loading}
      onChange={props.setActiveSeries}
      renderInput={params => {
        return (
          <TextField
            {...params}
            fullWidth
            label="Select Series"
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
        );
      }}
    />
  );
}
