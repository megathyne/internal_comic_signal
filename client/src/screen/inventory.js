import React from "react";
import AddInventory from "../components/addInventory";
import GetInventory from "../components/getInventory";
import Comics from "../components/comics";
import { APIGet } from "../api/api";

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
  }

  state = {
    inventory: [],
    comics: [],
    vendors: []
  };

  setInventory(inventory) {
    this.setState({ inventory });
  }

  updateInventory(item) {}

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

  getVendors = async () => {
    try {
      const results = await APIGet("vendor");
      this.setVendors(results);
    } catch (error) {
      console.log(error);
    }
  };

  setActiveVendor(event) {
    this.setState({ activeVendor: event.target.value });
  }

  setActiveComic(event) {
    this.setState({ activeComic: event.target.value });
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "50px" }}>
          <Comics
            getComics={this.getComics}
            activeComic={this.state.activeComic}
            setComics={this.setComics}
            comics={this.state.comics}
          />
          <AddInventory
            setActiveComic={this.setActiveComic}
            updateInventory={this.updateInventory}
            vendors={this.state.vendors}
            getVendors={this.getVendors}
            setActiveVendor={this.setActiveVendor}
          />
        </div>
        <div>
          <GetInventory
            setInventory={this.setInventory}
            inventory={this.state.inventory}
          />
        </div>
      </div>
    );
  }
}

export default Inventory;
