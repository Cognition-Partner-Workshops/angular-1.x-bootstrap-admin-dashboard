import React, { useState, useEffect } from 'react';

function Panel({ title, panelClass, children }) {
  var [visible, setVisible] = useState(false);

  useEffect(function () {
    var timer = setTimeout(function () {
      setVisible(true);
    }, 100);
    return function () { clearTimeout(timer); };
  }, []);

  var panelClassName = 'panel full-invisible ' + (panelClass || '');
  if (visible) {
    panelClassName = 'panel animated zoomIn ' + (panelClass || '');
  }

  return (
    <div className={panelClassName}>
      {title ? (
        <div className="panel-heading clearfix">
          <h3 className="panel-title">{title}</h3>
        </div>
      ) : null}
      <div className="panel-body">
        {children}
      </div>
    </div>
  );
}

export default Panel;
