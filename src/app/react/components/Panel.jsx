/**
 * <Panel> component — React equivalent of the ba-panel directive.
 *
 * The AngularJS baPanel directive is an attribute directive applied to an outer
 * element (e.g. a grid column). It keeps that outer element — including its
 * `ba-panel-title` attribute and layout classes — and injects an inner
 * `.panel` element built from `ba-panel-class`:
 *
 *   <div class="col-md-3" ba-panel-title="Flat Buttons">   <- outer (attribute kept)
 *     <div class="panel button-panel">                     <- inner (ba-panel-class)
 *       <div class="panel-heading clearfix">
 *         <h3 class="panel-title">Flat Buttons</h3>
 *       </div>
 *       <div class="panel-body">{children}</div>
 *     </div>
 *   </div>
 *
 * The E2E suite selects panels by the `[ba-panel-title="..."]` attribute on the
 * outer element and by the `ba-panel-class` value on the inner `.panel`, so both
 * are reproduced here. The original `full-invisible` / zoom-in animation classes
 * are intentionally omitted — there is no zoom-in directive in React, and the
 * panels must be visible immediately.
 *
 * Props:
 *   title      — panel heading text; also emitted as the `ba-panel-title` attribute
 *   panelClass — extra CSS classes for the inner `.panel` element
 *   outerClass — CSS classes for the outer wrapper (e.g. grid columns)
 *   html       — raw HTML string for the panel body (alternative to children)
 *   children   — panel body content
 */
import React from 'react';

export function Panel({ title, panelClass, outerClass, html, children }) {
  var outerProps = {};
  if (outerClass) {
    outerProps.className = outerClass;
  }
  if (title != null) {
    outerProps['ba-panel-title'] = title;
  }

  var innerClass = ('panel ' + (panelClass || '')).trim();

  var bodyProps = { className: 'panel-body' };
  if (html != null) {
    bodyProps.dangerouslySetInnerHTML = { __html: html };
  }

  return React.createElement('div', outerProps,
    React.createElement('div', { className: innerClass },
      title != null
        ? React.createElement('div', { className: 'panel-heading clearfix' },
            React.createElement('h3', { className: 'panel-title' }, title)
          )
        : null,
      React.createElement('div', bodyProps, html != null ? undefined : children)
    )
  );
}
