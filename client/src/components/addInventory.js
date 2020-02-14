import React from "react";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/core/styles";
import { APIGet } from "../api/api";
// import CircularProgress from "@material-ui/core/CircularProgress";
import SelectSeries from "./selectSeries";
import SelectIssue from "./selectIssue";
import SelectGrade from "./selectGrade";
import SelectVendor from "./selectVendor";

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

export default function AddInventory(props) {
  const [open] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  // const classes = useStyles();

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await APIGet("comic");
      // await sleep(1e3); // For demo purposes.
      // const comics = await response.json();
      const comics = response;
      if (active) {
        setOptions(Object.keys(comics).map(key => comics[key]));
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
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          marginBottom: "20px",
          justifyContent: "space-around"
        }}
      >
        <SelectSeries setActiveSeries={props.setActiveSeries} />
        <SelectIssue
          setActiveIssue={props.setActiveIssue}
          activeSeries={props.activeSeries}
        />
      </div>

      <div
        style={{
          display: "flex",
          marginBottom: "20px",
          justifyContent: "space-around"
        }}
      >
        <TextField
          id="outlined-basic"
          label="bin"
          variant="outlined"
          onChange={props.handleChange("bin")}
        />

        <TextField
          id="outlined-basic"
          label="tag"
          variant="outlined"
          onChange={props.handleChange("tag")}
        />

        <TextField
          id="outlined-basic"
          label="notes"
          variant="outlined"
          onChange={props.handleChange("notes")}
        />

        <TextField
          id="outlined-basic"
          label="cost"
          variant="outlined"
          onChange={props.handleChange("cost")}
        />

        <TextField
          id="outlined-basic"
          label="aquired"
          variant="outlined"
          onChange={props.handleChange("aquired")}
        />
      </div>

      <div
        style={{
          display: "flex",
          marginBottom: "20px",
          justifyContent: "space-around"
        }}
      >
        <SelectGrade
          activeGrade={props.activeGrade}
          setActiveGrade={props.setActiveGrade}
          grades={props.grades}
        />

        <SelectVendor
          activeVendor={props.activeVendor}
          setActiveVendor={props.setActiveVendor}
          vendors={props.vendors}
        />
        <Button
          style={{ width: "300px" }}
          variant="contained"
          color="primary"
          onClick={props.addNewInventory}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
