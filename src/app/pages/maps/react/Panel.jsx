import React, { useState, useEffect } from 'react';

function Panel({ title, className, children }) {
  var panelClass = className || '';
  var _s = useState(true), isInvisible = _s[0], setIsInvisible = _s[1];

  useEffect(function () {
    var timer = setTimeout(function () {
      setIsInvisible(false);
    }, 100);
    return function () { clearTimeout(timer); };
  }, []);

  var classes = 'panel full-invisible ' + panelClass;
  if (!isInvisible) {
    classes = 'panel animated zoomIn ' + panelClass;
  }

  return (
    <div className={classes}>
      {title && (
        <div className="panel-heading clearfix">
          <h3 className="panel-title">{title}</h3>
        </div>
      )}
      <div className="panel-body">
        {children}
      </div>
    </div>
  );
}

export default Panel;
