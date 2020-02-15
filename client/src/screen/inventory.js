import React from "react";
import AddInventory from "../components/addInventory";
import GetInventory from "../components/getInventory";
import { APIGet, APIPatch, APIPost } from "../api/api";

class Inventory extends React.Component {
  constructor() {
    super();
    this.addNewInventory = this.addNewInventory.bind(this);
    this.getGrades = this.getGrades.bind(this);
    this.getSeries = this.getSeries.bind(this);
    this.getVendors = this.getVendors.bind(this);
    this.setActiveGrade = this.setActiveGrade.bind(this);
    this.setActiveSeries = this.setActiveSeries.bind(this);
    this.setActiveIssue = this.setActiveIssue.bind(this);
    this.setActiveVendor = this.setActiveVendor.bind(this);
    this.setGrades = this.setGrades.bind(this);
    this.setInventory = this.setInventory.bind(this);
    this.setSeries = this.setSeries.bind(this);
    this.setVendors = this.setVendors.bind(this);
    this.updateInventory = this.updateInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    inventory: [],
    vendors: [],
    grades: [],
    series: []
  };

  componentDidMount() {
    this.getSeries();
    this.getGrades();
    this.getVendors();
    this.getInventory();
  }

  getInventory = async () => {
    try {
      const results = await APIGet("inventory");
      this.setState({ inventory: results });
    } catch (error) {
      console.log(error);
    }
  };

  getSeries = async () => {
    try {
      const results = await APIGet(
        `series?search=${this.state.activeSeries.id}`
      );
      this.setSeries(results);
    } catch (error) {
      console.log(error);
    }
  };

  getVendors = async () => {
    try {
      const results = await APIGet("vendor");
      this.setVendors(results);
    } catch (error) {
      console.log(error);
    }
  };

  getGrades = async () => {
    try {
      const results = await APIGet("grade");
      this.setGrades(results);
    } catch (error) {
      console.log(error);
    }
  };

  setSeries = series => this.setState({ series });

  setVendors = vendors => this.setState({ vendors });

  setGrades = grades => this.setState({ grades });

  setInventory = inventory => this.setState({ inventory });

  setActiveVendor = (event, value) => this.setState({ activeVendor: value });

  setActiveGrade = (event, value) => this.setState({ activeGrade: value });

  setActiveSeries = (event, value) => this.setState({ activeSeries: value });

  setActiveIssue = (event, value) => this.setState({ activeIssue: value });

  addNewInventory = async comic => {
    const { bin, tag, notes, cost, aquired } = this.state;
    const { activeIssue, activeVendor, activeGrade } = this.state;
    const data = {
      bin,
      tag,
      notes,
      cost,
      aquired,
      issueId: activeIssue,
      vendorId: activeVendor,
      gradeId: activeGrade
    };
    try {
      await APIPost("inventory", data);
      this.updateInventory();
    } catch (error) {
      console.log(error);
    }
  };

  updateInventory = async item => {
    try {
      const results = await APIPatch("inventory/" + item.id, item);
      this.getInventory();
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = input => event =>
    this.setState({ [input]: event.target.value });

  render() {
    return (
      <div>
        <AddInventory
          addNewInventory={this.addNewInventory}
          activeSeries={this.state.activeSeries}
          activeGrade={this.state.activeGrade}
          activeVendor={this.state.activeVendor}
          series={this.state.series}
          getVendors={this.getVendors}
          getGrades={this.getGrades}
          getSeries={this.getSeries}
          grades={this.state.grades}
          handleChange={this.handleChange}
          setActiveSeries={this.setActiveSeries}
          setActiveVendor={this.setActiveVendor}
          setActiveGrade={this.setActiveGrade}
          setActiveIssue={this.setActiveIssue}
          setSeries={this.setSeries}
          updateInventory={this.updateInventory}
          vendors={this.state.vendors}
        />
        <GetInventory
          setInventory={this.setInventory}
          inventory={this.state.inventory}
          updateInventory={this.updateInventory}
        />
      </div>
    );
  }
}

export default Inventory;
