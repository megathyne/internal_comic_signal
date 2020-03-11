import React from 'react';
import SelectCost from '../SelectCost';
import SelectAcquired from '../SelectAcquired';
import SelectNotes from '../SelectNotes';
import SelectVendor from '../SelectVendor';

export default function StepThree(props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
      <div>
        <div style={{ marginBottom: '20px' }}>
          <SelectCost />
        </div>
        <div>
          <SelectAcquired />
        </div>
      </div>
      <div>
        <div style={{ marginBottom: '20px' }}>
          <SelectVendor />
        </div>
        <div>
          <SelectNotes />
        </div>
      </div>
    </div>
  );
}
