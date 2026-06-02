/**
 * <RawHtml> — renders a static AngularJS template (as an HTML string) and then
 * compiles any `ba-panel` attribute directives into their panel DOM, mirroring
 * what the AngularJS baPanel directive produces at runtime.
 *
 * This lets presentational pages (typography, grid, alerts, etc.) reuse their
 * original markup verbatim while still producing the `.panel`, `.panel-heading`
 * and `.panel-body` structure that the rest of the theme + E2E tests expect.
 *
 * Props:
 *   html — the raw template HTML string (ng-include partials already inlined)
 */
import React from 'react';
import { useRef, useEffect } from 'react';

function compileBaPanels(root) {
  var panels = root.querySelectorAll('[ba-panel]');
  for (var i = 0; i < panels.length; i++) {
    var el = panels[i];
    if (el.getAttribute('data-ba-compiled') === 'true') {
      continue;
    }
    var title = el.getAttribute('ba-panel-title');
    var panelClass = el.getAttribute('ba-panel-class') || '';
    var bodyHtml = el.innerHTML;

    var heading = '';
    if (title != null) {
      heading = '<div class="panel-heading clearfix"><h3 class="panel-title">' + title + '</h3></div>';
    }

    el.innerHTML =
      '<div class="' + ('panel ' + panelClass).trim() + '">' +
        heading +
        '<div class="panel-body">' + bodyHtml + '</div>' +
      '</div>';
    el.setAttribute('data-ba-compiled', 'true');
  }
}

export function RawHtml({ html }) {
  var ref = useRef(null);

  useEffect(function () {
    if (ref.current) {
      compileBaPanels(ref.current);
    }
  }, [html]);

  return React.createElement('div', {
    ref: ref,
    dangerouslySetInnerHTML: { __html: html },
  });
}
