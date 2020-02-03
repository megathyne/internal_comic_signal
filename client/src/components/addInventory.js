import React from "react";
import { APIPost } from "../api/api";
import Button from "@material-ui/core/Button";
import Vendor from "../components/vendor";
import Grade from "../components/grade";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

// const classes = useStyles();

export default function AddInventory(props) {
  const classes = useStyles();

  const inputLabel = React.useRef(null);
  // const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  return (
    <div>
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

          <FormControl className={classes.formControl}>
            <InputLabel id="select-comic-label">Comic</InputLabel>
            <Select
              labelId="select-comic-label"
              id="select-comic"
              value={props.activeComic}
              onChange={props.setActiveComic}
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
          </FormControl>
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
