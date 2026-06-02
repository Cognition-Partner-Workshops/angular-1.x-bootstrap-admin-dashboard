/**
 * DashboardPage — React migration of the AngularJS dashboard page
 * (app/pages/dashboard/dashboard.html). Composes the dashboard widgets and
 * their ba-panel wrappers, mirroring the original Bootstrap grid layout.
 *
 * Theme configuration (baConfig), colorHelper, layoutPaths and baUtil are
 * injected by the AngularJS bridge directive (never read from window).
 */
import React from 'react';
import { Panel } from '../components/Panel';
import { DashboardPieCharts } from './DashboardPieCharts';
import { TrafficChart } from './TrafficChart';
import { DashboardMap } from './DashboardMap';
import { DashboardLineChart } from './DashboardLineChart';
import { PopularApp } from './PopularApp';
import { BlurFeed } from './BlurFeed';
import { DashboardTodo } from './DashboardTodo';
import { DashboardCalendar } from './DashboardCalendar';

export function DashboardPage({ baConfig, colorHelper, layoutPaths, baUtil }) {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(DashboardPieCharts, { baConfig: baConfig, baUtil: baUtil }),

    // Row 1: Acquisition Channels + Users by Country
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement(
        'div',
        { className: 'col-lg-6 col-md-12 col-sm-12' },
        React.createElement(
          Panel,
          { title: 'Acquisition Channels', panelClass: 'medium-panel traffic-panel' },
          React.createElement(TrafficChart, { baConfig: baConfig, colorHelper: colorHelper })
        )
      ),
      React.createElement(
        'div',
        { className: 'col-lg-6 col-md-12 col-sm-12' },
        React.createElement(
          Panel,
          { title: 'Users by Country', panelClass: 'medium-panel' },
          React.createElement(DashboardMap, { baConfig: baConfig, layoutPaths: layoutPaths })
        )
      )
    ),

    // Row 2: Revenue + Popular App + Feed
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement(
        'div',
        { className: 'col-xlg-9 col-lg-6 col-md-6 col-sm-12 col-xs-12' },
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-xlg-8 col-lg-12 col-md-12 col-sm-7 col-xs-12' },
            React.createElement(
              Panel,
              { title: 'Revenue', panelClass: 'medium-panel' },
              React.createElement(DashboardLineChart, { baConfig: baConfig, layoutPaths: layoutPaths, baUtil: baUtil })
            )
          ),
          React.createElement(
            'div',
            { className: 'col-xlg-4 col-lg-12 col-md-12 col-sm-5 col-xs-12' },
            React.createElement(
              Panel,
              { panelClass: 'popular-app medium-panel' },
              React.createElement(PopularApp, { layoutPaths: layoutPaths })
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'col-xlg-3 col-lg-6 col-md-6 col-sm-12 col-xs-12' },
        React.createElement(
          Panel,
          { title: 'Feed', panelClass: 'large-panel with-scroll feed-panel' },
          React.createElement(BlurFeed, { layoutPaths: layoutPaths })
        )
      )
    ),

    // Row 3: To Do List + Calendar
    React.createElement(
      'div',
      { className: 'row shift-up' },
      React.createElement(
        'div',
        { className: 'col-xlg-3 col-lg-6 col-md-6 col-xs-12' },
        React.createElement(
          Panel,
          { title: 'To Do List', panelClass: 'xmedium-panel feed-comply-panel with-scroll todo-panel' },
          React.createElement(DashboardTodo, { baConfig: baConfig })
        )
      ),
      React.createElement(
        'div',
        { className: 'col-xlg-6 col-lg-6 col-md-6 col-xs-12' },
        React.createElement(
          Panel,
          { title: 'Calendar', panelClass: 'xmedium-panel feed-comply-panel with-scroll calendar-panel' },
          React.createElement(DashboardCalendar, { baConfig: baConfig })
        )
      )
    )
  );
}
