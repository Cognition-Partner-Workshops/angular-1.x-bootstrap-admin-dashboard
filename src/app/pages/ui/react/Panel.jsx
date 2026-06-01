import React, { useState, useEffect } from 'react';

function Panel({ title, panelClass, children }) {
  const [animated, setAnimated] = useState(false);

  useEffect(function () {
    var timer = setTimeout(function () {
      setAnimated(true);
    }, 0);
    return function () { clearTimeout(timer); };
  }, []);

  var cls = 'panel ba-panel ' + (panelClass || '');
  if (!animated) {
    cls += ' full-invisible';
  } else {
    cls += ' animated zoomIn';
  }

  return (
    <div className={cls}>
      {title && (
        <div className="panel-heading clearfix">
          <div className="panel-title">{title}</div>
        </div>
      )}
      <div className="panel-body">{children}</div>
    </div>
  );
}

export default Panel;
