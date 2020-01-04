import React from "react";
import { APIPost } from "../api/api";
import Button from "@material-ui/core/Button";
import Vendor from "../components/vendor";
import Grade from "../components/grade";
class AddInventory extends React.Component {
  state = {};

  handleSubmit = async () => {
    const { bin, tag, notes, cost, aquired } = this.state;
    const { activeComic, activeVendor, activeGrade } = this.props;
    const data = {
      bin,
      tag,
      notes,
      cost,
      aquired,
      comicId: activeComic,
      vendorId: activeVendor,
      gradeId: activeGrade
    };
    try {
      await APIPost("inventory", data);
      this.props.updateInventory();
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = input => event => {
    this.setState({ [input]: event.target.value });
  };

  render() {
    return (
      <div>
        <div>
          <p>bin</p>
          <input onChange={this.handleChange("bin")} />
        </div>
        <div>
          <p>tag</p>
          <input onChange={this.handleChange("tag")} />
        </div>
        <div>
          <p>notes</p>
          <input onChange={this.handleChange("notes")} />
        </div>
        <div>
          <p>cost</p>
          <input onChange={this.handleChange("cost")} />
        </div>
        <div>
          <p>aquired</p>
          <input onChange={this.handleChange("aquired")} />
        </div>
        <div style={{ marginTop: "20px" }}>
          <Grade
            grades={this.props.grades}
            setActiveGrade={this.props.setActiveGrade}
            getGrades={this.props.getGrades}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <Vendor
            vendors={this.props.vendors}
            setActiveVendor={this.props.setActiveVendor}
            getVendors={this.props.getVendors}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <Button variant="contained" onClick={this.handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default AddInventory;
