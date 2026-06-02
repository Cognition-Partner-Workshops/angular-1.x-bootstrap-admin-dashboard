import React, { useState, useEffect } from 'react';
import { TimelinePage } from './TimelinePage';
import { TreeViewPage } from './TreeViewPage';
import { MailPage } from './MailPage';

function getPage() {
  var hash = window.location.hash || '';
  if (hash.indexOf('/components/timeline') !== -1) return 'timeline';
  if (hash.indexOf('/components/tree') !== -1) return 'tree';
  if (hash.indexOf('/components/mail') !== -1) return 'mail';
  return null;
}

export function ComponentsPage() {
  var _page = useState(getPage);
  var page = _page[0]; var setPage = _page[1];

  useEffect(function () {
    function onHashChange() {
      setPage(getPage());
    }
    window.addEventListener('hashchange', onHashChange);
    return function () { window.removeEventListener('hashchange', onHashChange); };
  }, []);

  if (page === 'timeline') return React.createElement(TimelinePage);
  if (page === 'tree') return React.createElement(TreeViewPage);
  if (page === 'mail') return React.createElement(MailPage);
  return null;
}
