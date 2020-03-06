import React from 'react';
import SelectCost from '../SelectCost';
import SelectAcquired from '../SelectAcquired';
import SelectNotes from '../SelectNotes';
import SelectVendor from '../SelectVendor';

export default function StepThree(props) {
  return (
    <div>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <div style={{ marginRight: '10px' }}>
          <SelectCost />
        </div>
        <div style={{ marginRight: '10px' }}>
          <SelectAcquired />
        </div>
        <div>
          <SelectVendor />
        </div>
      </div>
      <SelectNotes />
    </div>
  );
}
