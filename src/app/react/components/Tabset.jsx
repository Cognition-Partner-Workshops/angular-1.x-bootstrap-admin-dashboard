/**
 * <Tabset> / <Accordion> — React equivalents of the angular-ui-bootstrap
 * `uib-tabset` / `uib-accordion` directives, reproducing the same compiled DOM
 * (nav-tabs / nav-link / tab-pane and panel / panel-heading / panel-collapse).
 */
import React from 'react';
import { useState } from 'react';

/**
 * tabs: array of { heading: node, content: node }
 * className: extra class on the wrapper (e.g. 'tabs-left', 'tabs-right')
 * initialActive: index of the initially active tab (default 0)
 */
export function Tabset({ tabs, className, initialActive }) {
  var [active, setActive] = useState(initialActive || 0);

  var navItems = tabs.map(function (tab, i) {
    var liClass = 'uib-tab nav-item' + (active === i ? ' active' : '');
    return React.createElement('li', { className: liClass, key: 'tab-' + i },
      React.createElement('a', {
        href: '#',
        className: 'nav-link',
        onClick: function (e) { e.preventDefault(); setActive(i); },
      }, tab.heading)
    );
  });

  var panes = tabs.map(function (tab, i) {
    var paneClass = 'tab-pane' + (active === i ? ' active' : '');
    return React.createElement('div', { className: paneClass, key: 'pane-' + i }, tab.content);
  });

  return React.createElement('div', { className: className || undefined },
    React.createElement('ul', { className: 'nav nav-tabs' }, navItems),
    React.createElement('div', { className: 'tab-content' }, panes)
  );
}

/**
 * groups: array of { heading: node, panelClass: string, content: node, open: bool }
 */
export function Accordion({ groups }) {
  var initialOpen = {};
  groups.forEach(function (g, i) { if (g.open) { initialOpen[i] = true; } });
  var [openMap, setOpenMap] = useState(initialOpen);

  var toggle = function (i) {
    setOpenMap(function (prev) {
      var next = {};
      for (var k in prev) { next[k] = prev[k]; }
      next[i] = !prev[i];
      return next;
    });
  };

  var children = groups.map(function (group, i) {
    var isOpen = !!openMap[i];
    var panelClass = 'panel ' + (group.panelClass || 'panel-default');
    var collapseClass = 'panel-collapse collapse' + (isOpen ? ' in' : '');

    return React.createElement('div', { className: panelClass, key: 'acc-' + i },
      React.createElement('div', { className: 'panel-heading', role: 'tab' },
        React.createElement('h4', { className: 'panel-title' },
          React.createElement('a', {
            href: '#',
            role: 'button',
            className: 'accordion-toggle',
            onClick: function (e) { e.preventDefault(); toggle(i); },
          }, group.heading)
        )
      ),
      React.createElement('div', { className: collapseClass, role: 'tabpanel' },
        React.createElement('div', { className: 'panel-body' }, group.content)
      )
    );
  });

  return React.createElement('div', { className: 'panel-group', role: 'tablist' }, children);
}
