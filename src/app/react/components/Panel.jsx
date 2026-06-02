/**
 * <Panel> component — React equivalent of the ba-panel / ba-panel-self directives.
 *
 * Renders a Bootstrap 3 panel with optional title and custom CSS class,
 * matching the DOM structure produced by the AngularJS baPanel directive:
 *
 *   <div class="panel [panelClass]">
 *     <div class="panel-heading clearfix">
 *       <h3 class="panel-title">Title</h3>
 *     </div>
 *     <div class="panel-body">
 *       {children}
 *     </div>
 *   </div>
 *
 * Props:
 *   title      — optional panel heading text
 *   panelClass — additional CSS classes for the outer panel div
 *   children   — panel body content
 */
import React from 'react';

export function Panel({ title, panelClass, baPanelTitle, children }) {
  var classes = 'panel ' + (panelClass || '');
  var outerProps = { className: classes.trim() };
  if (baPanelTitle) {
    outerProps['ba-panel-title'] = baPanelTitle;
  }

  return React.createElement('div', outerProps,
    title
      ? React.createElement('div', { className: 'panel-heading clearfix' },
          React.createElement('h3', { className: 'panel-title' }, title)
        )
      : null,
    React.createElement('div', { className: 'panel-body' }, children)
  );
}
