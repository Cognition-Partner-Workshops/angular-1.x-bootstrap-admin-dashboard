import React, { useState, useEffect } from 'react';

function Panel({ title, panelClass, children }) {
  var extraClass = panelClass || '';
  var [animClass, setAnimClass] = useState('full-invisible');

  useEffect(function () {
    var timer = setTimeout(function () {
      setAnimClass('animated zoomIn');
    }, 0);
    return function () { clearTimeout(timer); };
  }, []);

  return (
    <div className={'panel panel-blur ' + animClass + ' ' + extraClass}>
      <div className="panel-heading clearfix">
        <h3 className="panel-title">{title}</h3>
      </div>
      <div className="panel-body">
        {children}
      </div>
    </div>
  );
}

export default Panel;
