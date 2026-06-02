import React from 'react';
import { Route } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';

export function AppRoutes({ baConfig, layoutPaths }) {
  return React.createElement(Route, {
    path: '/dashboard',
    element: React.createElement(DashboardPage, { baConfig: baConfig, layoutPaths: layoutPaths })
  });
}
