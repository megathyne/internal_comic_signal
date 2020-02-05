import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { APIGet } from "../api/api";
import CircularProgress from "@material-ui/core/CircularProgress";
import SelectComic from "./selectComic";
import SelectIssue from "./selectIssue";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export default function AddInventory(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const classes = useStyles();

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
      console.log(comics);
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
    <div>
      <SelectComic setActiveComic={props.setActiveComic} />
      <SelectIssue
        activeComic={props.activeComic}
      />
      <div>
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
      <div style={{ marginTop: "20px" }}>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="select-grade-label">Grade</InputLabel>
            <Select
              labelId="select-grade-label"
              id="select-grade"
              value={props.activeGrade}
              onChange={props.setActiveGrade}
            >
              {props.grades
                .sort((a, b) => a.grade - b.grade)
                .map((item, i) => {
                  const { id, grade, grader } = item;
                  return (
                    <option key={i} value={id}>{`${grade.toFixed(
                      1
                    )} - ${grader}`}</option>
                  );
                })}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="select-vendor-label">Vendor</InputLabel>
            <Select
              labelId="select-vendor-label"
              id="select-vendor"
              value={props.activeVendor}
              onChange={props.setActiveVendor}
            >
              {props.vendors.map((item, i) => {
                const { id, name } = item;
                return <MenuItem key={i} value={id}>{`${name} `}</MenuItem>;
              })}
            </Select>
          </FormControl>

          {/* <FormControl className={classes.formControl}>
            <InputLabel id="select-comic-label">Comic</InputLabel>
            <Select
              labelId="select-comic-label"
              id="select-comic"
              value={props.activeComic}
              onChange={props.setActiveComic}
              autoWidth
            >
              {props.comics.map((item, i) => {
                const { id, issue, notes, series, volume } = item;
                return (
                  <MenuItem
                    key={i}
                    value={id}
                  >{`${series} (${volume}) ${issue} ${notes}`}</MenuItem>
                );
              })}
            </Select>
          </FormControl> */}
        </div>

        <div>
          <Button variant="contained" onClick={props.addNewInventory}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
