import React from "react";
import AddInventory from "../components/addInventory";
import GetInventory from "../components/getInventory";
import Comics from "../components/comics";

class Inventory extends React.Component {
  constructor() {
    super();
    this.setActiveComic = this.setActiveComic.bind(this);
    this.setComics = this.setComics.bind(this);
    this.setInventory = this.setInventory.bind(this);
    this.updateInventory = this.updateInventory.bind(this);
  }

  state = {
    inventory: [],
    comics: []
  };

  setInventory(inventory) {
    this.setState({ inventory });
  }

  updateInventory(item) {}

  setComics(comics) {
    this.setState({ comics });
  }

  setActiveComic(event) {
    this.setState({ activeComic: event.target.value });
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "50px" }}>
          <Comics
            activeComic={this.state.activeComic}
            setActiveComic={this.setActiveComic}
            setComics={this.setComics}
            comics={this.state.comics}
          />
          <AddInventory updateInventory={this.updateInventory} />
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
