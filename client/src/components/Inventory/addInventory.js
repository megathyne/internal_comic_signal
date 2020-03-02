import React from 'react';
import SelectSeries from './selectSeries';
import SelectIssue from './selectIssue';
import Bin from './Bin';
import SelectGrader from './selectGrader';
import SelectCondition from './selectCondition';
import SelectVendor from './selectVendor';
import SelectPage from './selectPages';
import Tag from './Tag';
import Notes from './Notes';
import Cost from './Cost';
import Aquired from './Aquired';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createInventorySaga } from '../../actions';

export default function AddInventory(props) {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(createInventorySaga());

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
        <SelectCondition />
        <SelectGrader />
        <SelectPage />
        <SelectVendor />

        <Button style={{ width: '300px' }} variant="contained" color="primary" onClick={handleClick}>
          Submit
        </Button>
      </div>
    </div>
  );
}
