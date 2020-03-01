import React from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SelectSeries from './selectSeries';
import SelectIssue from './selectIssue';
import Bin from './Add-Inventory/Bin';
import SelectGrader from './selectGrader';
import SelectCondition from './selectCondition';
import SelectVendor from './selectVendor';
import SelectPage from './selectPages';
import Tag from './Add-Inventory/Tag';
import Notes from './Add-Inventory/Notes';
import Cost from './Add-Inventory/Cost';
import Aquired from './Add-Inventory/Aquired';

export default function AddInventory(props) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div
        style={{
          display: 'flex',
          marginBottom: '20px',
          justifyContent: 'space-around',
        }}
      >
        <SelectSeries />
        <SelectIssue />
      </div>

      <div
        style={{
          display: 'flex',
          marginBottom: '20px',
          justifyContent: 'space-around',
        }}
      >
        <Bin />
        <Tag />
        <Notes />
        <Cost />
        <Aquired />
      </div>

      <div
        style={{
          display: 'flex',
          marginBottom: '20px',
          justifyContent: 'space-around',
        }}
      >
        <SelectCondition
          activeCondition={props.activeCondition}
          setActiveCondition={props.setActiveCondition}
          conditions={props.conditions}
        />

        <SelectGrader activeGrade={props.activeGrade} setActiveGrade={props.setActiveGrade} graders={props.graders} />

        <SelectPage activePage={props.activePage} setActivePage={props.setActivePage} pages={props.pages} />

        <SelectVendor
          activeVendor={props.activeVendor}
          setActiveVendor={props.setActiveVendor}
          vendors={props.vendors}
        />
        <Button style={{ width: '300px' }} variant="contained" color="primary" onClick={props.addNewInventory}>
          Submit
        </Button>
      </div>
    </div>
  );
}
