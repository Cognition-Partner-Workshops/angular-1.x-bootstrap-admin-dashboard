import React from 'react';
import { createRoot } from 'react-dom/client';
import ProfilePage from './ProfilePage';

function mountProfilePage(element: HTMLElement) {
  var root = createRoot(element);
  root.render(React.createElement(ProfilePage));
  return root;
}

if (typeof window !== 'undefined') {
  (window as any).__mountProfilePage = mountProfilePage;
}

export { ProfilePage, mountProfilePage };
