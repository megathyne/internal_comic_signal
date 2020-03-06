import React from 'react';
import SelectSeries from '../SelectSeries';
import SelectIssue from '../SelectIssue';

export default function StepOne(props) {
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <SelectSeries />
      </div>
      <div>
        <SelectIssue />
      </div>
    </div>
  );
}
