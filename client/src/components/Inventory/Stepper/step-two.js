import React from 'react';
import SelectBin from '../SelectBin';
import SelectTag from '../SelectTag';

export default function StepTwo(props) {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '30px' }}>
        <SelectBin />
      </div>
      <div>
        <SelectTag />
      </div>
    </div>
  );
}
