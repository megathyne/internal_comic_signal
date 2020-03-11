import React from 'react';
import SelectBin from '../SelectBin';
import SelectTag from '../SelectTag';

export default function StepTwo(props) {
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <SelectBin />
      </div>
      <div>
        <SelectTag />
      </div>
    </div>
  );
}
