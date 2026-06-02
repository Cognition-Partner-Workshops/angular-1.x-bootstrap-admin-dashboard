import React from 'react';

interface SwitchToggleProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  color?: string;
}

function SwitchToggle({ checked, onChange, color }: SwitchToggleProps) {
  return (
    <div className={'switch-container ' + (color || '')}>
      <div
        className={'bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-small bootstrap-switch-animate' +
          (checked ? ' bootstrap-switch-on' : ' bootstrap-switch-off')}
        style={{ width: '72px' }}
        onClick={() => onChange(!checked)}
      >
        <div className="bootstrap-switch-container" style={{ width: '105px', marginLeft: checked ? '0px' : '-35px' }}>
          <span className={'bootstrap-switch-handle-on bootstrap-switch-' + (color || 'primary')} style={{ width: '35px' }}>ON</span>
          <span className="bootstrap-switch-label" style={{ width: '35px' }}>&nbsp;</span>
          <span className="bootstrap-switch-handle-off bootstrap-switch-default" style={{ width: '35px' }}>OFF</span>
          <input type="checkbox" checked={checked} readOnly />
        </div>
      </div>
    </div>
  );
}

export default SwitchToggle;
