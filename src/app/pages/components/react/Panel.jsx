import React, { useState, useEffect } from 'react';

function Panel({ title, className, children }) {
  var [visible, setVisible] = useState(false);

  useEffect(function () {
    var timer = setTimeout(function () {
      setVisible(true);
    }, 0);
    return function () { clearTimeout(timer); };
  }, []);

  var panelClass = 'panel ' + (className || '');
  var animClass = visible ? 'animated zoomIn' : 'full-invisible';

  return (
    <div className={panelClass + ' ' + animClass}>
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
