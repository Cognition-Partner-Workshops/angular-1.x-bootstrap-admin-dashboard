/**
 * React Router routes for migrated UI page module.
 *
 * Mounted by the `ui-page-react` AngularJS bridge directive. Uses HashRouter so
 * it reads the same `#/ui/...` hash that AngularJS UI-Router uses, and renders
 * the matching React page component.
 */
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { TypographyPage } from './pages/TypographyPage';
import { ButtonsPage } from './pages/ButtonsPage';
import { IconsPage } from './pages/IconsPage';
import { ModalsPage } from './pages/ModalsPage';
import { GridPage } from './pages/GridPage';
import { AlertsPage } from './pages/AlertsPage';
import { ProgressBarsPage } from './pages/ProgressBarsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { TabsPage } from './pages/TabsPage';
import { SliderPage } from './pages/SliderPage';
import { PanelsPage } from './pages/PanelsPage';

export function UiRoutes() {
  return (
    React.createElement(HashRouter, null,
      React.createElement(Routes, null,
        React.createElement(Route, { path: '/ui/typography', element: React.createElement(TypographyPage) }),
        React.createElement(Route, { path: '/ui/buttons', element: React.createElement(ButtonsPage) }),
        React.createElement(Route, { path: '/ui/icons', element: React.createElement(IconsPage) }),
        React.createElement(Route, { path: '/ui/modals', element: React.createElement(ModalsPage) }),
        React.createElement(Route, { path: '/ui/grid', element: React.createElement(GridPage) }),
        React.createElement(Route, { path: '/ui/alerts', element: React.createElement(AlertsPage) }),
        React.createElement(Route, { path: '/ui/progressBars', element: React.createElement(ProgressBarsPage) }),
        React.createElement(Route, { path: '/ui/notifications', element: React.createElement(NotificationsPage) }),
        React.createElement(Route, { path: '/ui/tabs', element: React.createElement(TabsPage) }),
        React.createElement(Route, { path: '/ui/slider', element: React.createElement(SliderPage) }),
        React.createElement(Route, { path: '/ui/panels', element: React.createElement(PanelsPage) })
      )
    )
  );
}
