import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { getInventorySaga } from '../../actions';
import UpdateInventory from './UpdateInventory';
import InventoryDetails from '../InventoryDetails';

export default function GetInventory(props) {
  const dispatch = useDispatch();
  const { inventory } = useSelector(state => ({
    inventory: state.addInventory.inventory,
  }));

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        dispatch(getInventorySaga());
      } catch (e) {
        console.log(e);
      }
    };
    fetchInventory();
  }, []);

  return (
    <div>
      <MaterialTable
        columns={[
          { title: 'Bin', field: 'bin' },
          { title: 'Tag', field: 'tag' },
          {
            title: 'Series',
            field: 'issue.series.name',
            width: 300,
          },
          { title: 'Volume', field: 'issue.series.volume' },
          { title: 'Issue', field: 'issue.issueNumber' },
          { title: 'Cost', field: 'cost' },
          { title: 'Condition', field: 'condition.abbreviation' },
          { title: 'Grader', field: 'grader.name' },
          { title: 'Page', field: 'page.name' },
          { title: 'Acquired', field: 'acquired' },
          { title: 'Vendor', field: 'vendor.name' },
          { render: data => <UpdateInventory data={data} /> },
          { render: data => <InventoryDetails data={data} /> },
        ]}
        options={{
          grouping: true,
          tableLayout: 'fixed',
          emptyRowsWhenPaging: true,
        }}
        data={inventory}
        title="Inventory"
      />
    </div>
  );
}
