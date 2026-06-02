/**
 * PanelBox — wraps the shared <Panel> in an outer element that preserves the
 * `ba-panel-title` / `ba-panel-class` attributes emitted by the original
 * AngularJS baPanel directive (restrict: 'A'). E2E selectors such as
 * `[ba-panel-title="Selects"]` target this outer element.
 */
import React from 'react';
import { Panel } from '../components/Panel';

export function PanelBox({ title, panelClass, outerClass, children }) {
  var attrs = {
    'ba-panel-title': title,
    'ba-panel-class': panelClass || 'with-scroll',
  };
  if (outerClass) {
    attrs.className = outerClass;
  }
  return React.createElement(
    'div',
    attrs,
    React.createElement(Panel, { title: title, panelClass: panelClass || 'with-scroll' }, children)
  );
}
