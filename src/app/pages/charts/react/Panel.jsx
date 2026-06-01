import React, { useState, useEffect } from 'react';

function Panel({ title, panelClass, children }) {
  var _panelClass = panelClass || '';
  var _title = title || '';
  var baseClass = 'panel panel-blur full-invisible ' + _panelClass;

  var ref = React.useRef(null);

  useEffect(function () {
    var timer = setTimeout(function () {
      if (ref.current) {
        ref.current.classList.remove('full-invisible');
        ref.current.classList.add('animated', 'zoomIn');
      }
    }, 100);
    return function () { clearTimeout(timer); };
  }, []);

  return (
    <div ref={ref} className={baseClass}>
      {_title && (
        <div className="panel-heading clearfix">
          <h3 className="panel-title">{_title}</h3>
        </div>
      )}
      <div className="panel-body">
        {children}
      </div>
    </div>
  );
}

export default Panel;
