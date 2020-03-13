import React from 'react';
import AddInventory from '../../components/Inventory/AddInventory';
import GetInventory from '../../components/Inventory/GetInventory';
import Analytics from '../../components/Analytics';

class Inventory extends React.Component {
  render() {
    return (
      <div style={{ marginLeft: '100px', marginRight: '100px' }}>
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
