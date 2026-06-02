/**
 * React Router configuration for migrated pages.
 *
 * During migration, routes are added here as pages move from AngularJS to React.
 * The HashRouter is used to match the existing AngularJS hash-based routing.
 */
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ProfilePage } from './pages/ProfilePage';

export function AppRoutes() {
  return React.createElement(HashRouter, null,
    React.createElement(Routes, null,
      React.createElement(Route, { path: '/profile', element: React.createElement(ProfilePage) })
    )
  );
}
