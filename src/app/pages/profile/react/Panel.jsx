import React from 'react';

function Panel({ panelClass, children }) {
  return (
    <div className={'panel full-invisible ' + (panelClass || '')}>
      <div className="panel-body">
        {children}
      </div>
    </div>
  );
}

export default Panel;
