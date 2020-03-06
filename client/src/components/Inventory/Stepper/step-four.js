import React from 'react';
import SelectCondition from '../SelectCondition';
import SelectGrader from '../SelectGrader';
import SelectPage from '../SelectPage';

export default function StepFour(props) {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '20px', marginBottom: '20px' }}>
          <SelectCondition />
        </div>
        <div>
          <SelectGrader />
        </div>
      </div>
      <SelectPage />
    </div>
  );
}
