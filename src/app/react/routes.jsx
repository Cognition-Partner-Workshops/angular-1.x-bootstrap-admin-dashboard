/**
 * React Router route definitions for migrated pages.
 *
 * The Blur Admin app is a hybrid: AngularJS UI-Router still owns top-level
 * navigation and mounts each migrated page through a react2angular-style bridge
 * directive (see src/app/pages/<module>/<module>React.js). These routes mirror
 * the migrated URLs so the React tree can also be rendered standalone (e.g. in
 * tests or a future fully-React shell).
 */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BasicTablesPage } from './pages/BasicTablesPage';
import { SmartTablesPage } from './pages/SmartTablesPage';

export function AppRoutes() {
  return React.createElement(Routes, null,
    React.createElement(Route, { path: '/tables/basic', element: React.createElement(BasicTablesPage) }),
    React.createElement(Route, { path: '/tables/smart', element: React.createElement(SmartTablesPage) })
  );
}
