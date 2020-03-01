import React from 'react';
import AddInventory from '../../components/addInventory';
import GetInventory from '../../components/getInventory';
import { APIGet, APIPatch, APIPost } from '../../api/api';

class Inventory extends React.Component {
  constructor() {
    super();
    this.updateInventory = this.updateInventory.bind(this);
  }

  updateInventory = async item => {
    try {
      const results = await APIPatch('inventory/' + item.id, item);
      this.getInventory();
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <AddInventory />
        <GetInventory updateInventory={this.updateInventory} />
      </div>
    );
  }
}

export default Inventory;
