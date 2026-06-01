import React from 'react';

function Switch({ checked, onChange }) {
  return (
    <div className={'switch-container primary'}>
      <input
        type="checkbox"
        checked={checked}
        onChange={function (e) { onChange(e.target.checked); }}
      />
    </div>
  );
}

export default Switch;
