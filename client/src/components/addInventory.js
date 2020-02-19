import React from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { APIGet } from "../api/api";
import SelectSeries from "./selectSeries";
import SelectIssue from "./selectIssue";
import SelectGrader from "./selectGrader";
import SelectCondition from "./selectCondition";
import SelectVendor from "./selectVendor";
import SelectPage from "./selectPages";

export default function AddInventory(props) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          marginBottom: "20px",
          justifyContent: "space-around"
        }}
      >
        <SelectSeries
          getSeries={props.getSeries}
          series={props.series}
          setActiveSeries={props.setActiveSeries}
        />
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
          id="outlined-bin"
          label="bin"
          variant="outlined"
          onChange={props.handleChange("bin")}
        />

        <TextField
          id="outlined-tag"
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
        <SelectCondition
          activeCondition={props.activeCondition}
          setActiveCondition={props.setActiveCondition}
          conditions={props.conditions}
        />

        <SelectGrader
          activeGrade={props.activeGrade}
          setActiveGrade={props.setActiveGrade}
          graders={props.graders}
        />

        <SelectPage
          activePage={props.activePage}
          setActivePage={props.setActivePage}
          pages={props.pages}
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
