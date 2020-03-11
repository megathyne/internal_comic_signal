import React from 'react';
import AddInventory from '../../components/Inventory/AddInventory';
import GetInventory from '../../components/Inventory/GetInventory';
import Analytics from '../../components/Analytics';

class Inventory extends React.Component {
  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <AddInventory />
          <Analytics />
        </div>
        <GetInventory />
      </div>
    );
  }
}

export default Inventory;
