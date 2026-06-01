import React, { useState, useEffect } from 'react';

function Panel({ title, panelClass, children }) {
  var extraClass = panelClass || '';
  var _s = useState(true);
  var invisible = _s[0];
  var setInvisible = _s[1];

  useEffect(function () {
    var timer = setTimeout(function () {
      setInvisible(false);
    }, 50);
    return function () { clearTimeout(timer); };
  }, []);

  var className = 'panel panel-blur ' + extraClass +
    (invisible ? ' full-invisible' : ' animated zoomIn');

  return (
    React.createElement('div', { className: className },
      React.createElement('div', { className: 'panel-heading clearfix' },
        React.createElement('h3', { className: 'panel-title' }, title)
      ),
      React.createElement('div', { className: 'panel-body' }, children)
    )
  );
}

module.exports = Panel;
