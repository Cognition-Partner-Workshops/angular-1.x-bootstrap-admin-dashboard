/**
 * <BaPanel> — React equivalent of the AngularJS `ba-panel` attribute directive.
 *
 * Reproduces the compiled DOM that ba-panel + the base baPanel factory emit:
 *
 *   <div ba-panel ba-panel-title="X" ba-panel-class="...">
 *     <div class="panel ...">
 *       <div class="panel-heading clearfix"><h3 class="panel-title">X</h3></div>
 *       <div class="panel-body">{children}</div>
 *     </div>
 *   </div>
 *
 * The `full-invisible` / `zoom-in` animation classes from the original directive
 * are intentionally omitted — they rely on the AngularJS zoomIn directive to
 * become visible and would otherwise leave the panel hidden in a pure-React
 * context.
 *
 * Props:
 *   title       — optional panel heading text (sets ba-panel-title + heading)
 *   panelClass  — extra classes applied to the inner .panel div (ba-panel-class)
 *   outerClass  — extra classes for the outer ba-panel element (e.g. grid cols)
 *   bodyClass   — extra classes for the inner .panel-body div
 *   children    — panel body content
 */
import React from 'react';

export function BaPanel({ title, panelClass, outerClass, bodyClass, children }) {
  var outerProps = { 'ba-panel': '', 'ba-panel-class': panelClass || '' };
  if (title != null) {
    outerProps['ba-panel-title'] = title;
  }
  if (outerClass) {
    outerProps.className = outerClass;
  }

  var heading = title != null
    ? React.createElement('div', { className: 'panel-heading clearfix' },
        React.createElement('h3', { className: 'panel-title' }, title))
    : null;

  return React.createElement('div', outerProps,
    React.createElement('div', { className: ('panel ' + (panelClass || '')).trim() },
      heading,
      React.createElement('div', { className: ('panel-body ' + (bodyClass || '')).trim() }, children)
    )
  );
}
