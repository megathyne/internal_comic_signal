import React from "react";
import AddInventory from "../components/addInventory";
import GetInventory from "../components/getInventory";

class Inventory extends React.Component {
  constructor() {
    super();

    this.setInventory = this.setInventory.bind(this);
    this.updateInventory = this.updateInventory.bind(this);
  }

  state = {
    inventory: []
  };

  setInventory(inventory) {
    this.setState({ inventory });
  }

  updateInventory(item) {
    let inventory = this.state.inventory;
    inventory.push(item);
    this.setState({ inventory });
  }

  render() {
    return (
      <div>
        <AddInventory updateInventory={this.updateInventory} />
        <GetInventory
          setInventory={this.setInventory}
          inventory={this.state.inventory}
        />
      </div>
    );
  }
}

export default Inventory;
