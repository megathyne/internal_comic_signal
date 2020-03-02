import React from 'react';
import AddInventory from '../../components/Inventory/addInventory';
import GetInventory from '../../components/Inventory/getInventory';
import { APIGet, APIPatch, APIPost } from '../../api/api';

class Inventory extends React.Component {
  render() {
    return (
      <div>
        <AddInventory />
        <GetInventory />
      </div>
    );
  }
}

export default Inventory;
