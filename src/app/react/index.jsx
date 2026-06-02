/**
 * React entry point for hybrid AngularJS/React application.
 *
 * During migration, individual page modules are rewritten as React components
 * and bridged into the AngularJS app via react2angular. This file bootstraps
 * the React root and re-exports shared utilities for migrated modules.
 */
import React from 'react';
import { createRoot } from 'react-dom/client';

// Shared components and utilities
export { Panel } from './components/Panel';
export { GlobeLoader } from './components/GlobeLoader';
export { useFileReader } from './hooks/useFileReader';
export { profilePicture, PROFILE_IMAGES_ROOT } from './utils/profilePicture';
export { colorHelper } from './utils/colorHelper';

// Migrated page components
export { GoogleMapsPage } from './pages/GoogleMapsPage';
export { LeafletPage } from './pages/LeafletPage';
export { MapBubblesPage } from './pages/MapBubblesPage';
export { MapLinesPage } from './pages/MapLinesPage';

/**
 * Mount a React component tree into a DOM element.
 * Used by react2angular bridges and standalone React pages.
 */
export function mountReactApp(Component, container, props) {
  var root = createRoot(container);
  root.render(React.createElement(Component, props));
  return root;
}
