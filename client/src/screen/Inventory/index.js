import React from 'react';
import AddInventory from '../../components/Inventory/AddInventory';
import GetInventory from '../../components/Inventory/GetInventory';

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
