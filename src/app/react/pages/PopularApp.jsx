/**
 * PopularApp — React migration of the AngularJS `popularApp` directive.
 * Static "Most Popular App" widget. Keeps the original `<popular-app>` root tag
 * so existing selectors continue to match.
 */
import React from 'react';

export function PopularApp({ layoutPaths }) {
  var appImageRoot = layoutPaths.images.root;

  return React.createElement(
    'popular-app',
    null,
    React.createElement(
      'div',
      { className: 'popular-app-img-container' },
      React.createElement(
        'div',
        { className: 'popular-app-img' },
        React.createElement('img', { src: appImageRoot + 'app/my-app-logo.png' }),
        React.createElement('span', { className: 'logo-text' }, 'Super\u00a0App')
      )
    ),
    React.createElement(
      'div',
      { className: 'popular-app-cost row' },
      React.createElement('div', { className: 'col-xs-9' }, 'Most Popular App'),
      React.createElement('div', { className: 'col-xs-3 text-right' }, '175$')
    ),
    React.createElement(
      'div',
      { className: 'popular-app-info row' },
      React.createElement(
        'div',
        { className: 'col-xs-4 text-left' },
        React.createElement('div', { className: 'info-label' }, 'Total Visits'),
        React.createElement('div', null, '47,512')
      ),
      React.createElement(
        'div',
        { className: 'col-xs-4 text-center' },
        React.createElement('div', { className: 'info-label' }, 'New Visits'),
        React.createElement('div', null, '9,217')
      ),
      React.createElement(
        'div',
        { className: 'col-xs-4 text-right' },
        React.createElement('div', { className: 'info-label' }, 'Sales'),
        React.createElement('div', null, '2,928')
      )
    )
  );
}
