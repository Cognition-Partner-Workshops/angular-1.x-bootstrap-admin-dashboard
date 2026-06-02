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
export { useFileReader } from './hooks/useFileReader';
export { profilePicture, PROFILE_IMAGES_ROOT } from './utils/profilePicture';
export { colorHelper } from './utils/colorHelper';

// UI page components
export { TypographyPage } from './pages/TypographyPage';
export { ButtonsPage } from './pages/ButtonsPage';
export { IconsPage } from './pages/IconsPage';
export { ModalsPage } from './pages/ModalsPage';
export { GridPage } from './pages/GridPage';
export { AlertsPage } from './pages/AlertsPage';
export { ProgressBarsPage } from './pages/ProgressBarsPage';
export { NotificationsPage } from './pages/NotificationsPage';
export { TabsPage } from './pages/TabsPage';
export { SliderPage } from './pages/SliderPage';
export { PanelsPage } from './pages/PanelsPage';

/**
 * Mount a React component tree into a DOM element.
 * Used by react2angular bridges and standalone React pages.
 */
export function mountReactApp(Component, container, props) {
  var root = createRoot(container);
  root.render(React.createElement(Component, props));
  return root;
}
