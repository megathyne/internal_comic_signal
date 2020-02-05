import React from "react";
import AddInventory from "../components/addInventory";
import GetInventory from "../components/getInventory";
import { APIGet } from "../api/api";
import { APIPost } from "../api/api";

class Inventory extends React.Component {
  constructor() {
    super();
    this.setActiveComic = this.setActiveComic.bind(this);
    this.setComics = this.setComics.bind(this);
    this.setInventory = this.setInventory.bind(this);
    this.updateInventory = this.updateInventory.bind(this);
    this.getComics = this.getComics.bind(this);
    this.getVendors = this.getVendors.bind(this);
    this.setActiveVendor = this.setActiveVendor.bind(this);
    this.setVendors = this.setVendors.bind(this);
    this.getGrades = this.getGrades.bind(this);
    this.setActiveGrade = this.setActiveGrade.bind(this);
    this.setGrades = this.setGrades.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    inventory: [],
    comics: [],
    vendors: [],
    grades: []
  };

  componentDidMount() {
    this.getComics();
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

  setInventory(inventory) {
    this.setState({ inventory });
  }

  updateInventory(item) {
    this.getComics();
  }

  setComics(comics) {
    this.setState({ comics });
  }

  getComics = async () => {
    try {
      const results = await APIGet("comic");
      this.setComics(results);
    } catch (error) {
      console.log(error);
    }
  };

  setVendors(vendors) {
    this.setState({ vendors });
  }

  setGrades(grades) {
    this.setState({ grades });
  }

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

  setActiveVendor(event) {
    console.log("setActiveVendor", event.target.value);
    this.setState({ activeVendor: event.target.value });
  }

  setActiveGrade(event) {
    console.log("setActiveGrade", event.target.value);
    this.setState({ activeGrade: event.target.value });
  }

  setActiveComic(event, value) {
    this.setState({ activeComic: value });
  }

  addNewInventory = async comic => {
    const { bin, tag, notes, cost, aquired } = this.state;
    const { activeComic, activeVendor, activeGrade } = this.state;
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
      this.updateInventory();
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
        <AddInventory
          setActiveComic={this.setActiveComic}
          activeComic={this.state.activeComic}
          updateInventory={this.updateInventory}
          vendors={this.state.vendors}
          getVendors={this.getVendors}
          setActiveVendor={this.setActiveVendor}
          activeVendor={this.state.activeVendor}
          grades={this.state.grades}
          getGrades={this.getGrades}
          setActiveGrade={this.setActiveGrade}
          activeGrade={this.state.activeGrade}
          handleChange={this.handleChange}
          getComics={this.getComics}
          setActiveComic={this.setActiveComic}
          activeComic={this.state.activeComic}
          setComics={this.setComics}
          comics={this.state.comics}
          addNewInventory={this.addNewInventory}
        />
        <GetInventory
          setInventory={this.setInventory}
          inventory={this.state.inventory}
        />
      </div>
    );
  }
}

export default Inventory;
