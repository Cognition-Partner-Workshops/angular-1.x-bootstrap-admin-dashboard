import React, { useState, useEffect } from 'react';

function Panel({ panelClass, children }) {
  var visibleState = useState(false);
  var visible = visibleState[0];
  var setVisible = visibleState[1];

  useEffect(function () {
    var timer = setTimeout(function () {
      setVisible(true);
    }, 100);
    return function () { clearTimeout(timer); };
  }, []);

  var className = 'panel';
  if (!visible) {
    className += ' full-invisible';
  } else {
    className += ' animated zoomIn';
  }
  className += ' ' + (panelClass || '');

  return (
    <div className={className}>
      <div className="panel-body">
        {children}
      </div>
    </div>
  );
}

export default Panel;
