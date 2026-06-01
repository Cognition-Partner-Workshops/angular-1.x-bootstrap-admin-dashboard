import React from 'react';

function Switch({ color, checked, onChange }) {
  return (
    React.createElement('div', { className: 'switch-container ' + (color || '') },
      React.createElement('input', {
        type: 'checkbox',
        checked: checked,
        onChange: function (e) { if (onChange) onChange(e.target.checked); }
      })
    )
  );
}

module.exports = Switch;
