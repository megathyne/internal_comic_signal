import React from 'react';
import SelectCondition from '../SelectCondition';
import SelectGrader from '../SelectGrader';
import SelectPage from '../SelectPage';

export default function StepFour(props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
      <div>
        <div style={{ marginBottom: '20px' }}>
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
