import React from 'react';
import { Panel } from '../components/Panel';

export function AlertsPage() {
  return React.createElement('div', { className: 'widgets' },
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-6', 'ba-panel-title': 'Basic', 'ba-panel-class': 'with-scroll' },
        React.createElement(Panel, { title: 'Basic', panelClass: 'with-scroll' },
          React.createElement('div', null,
            React.createElement('div', { className: 'alert bg-success' },
              React.createElement('strong', null, 'Well done!'), ' You successfully read this important alert message.'
            ),
            React.createElement('div', { className: 'alert bg-info' },
              React.createElement('strong', null, 'Heads up!'), " This alert needs your attention, but it's not super important."
            ),
            React.createElement('div', { className: 'alert bg-warning' },
              React.createElement('strong', null, 'Warning!'), " Better check yourself, you're not looking too good."
            ),
            React.createElement('div', { className: 'alert bg-danger' },
              React.createElement('strong', null, 'Oh snap!'), ' Change a few things up and try submitting again.'
            )
          )
        )
      ),
      React.createElement('div', { className: 'col-md-6', 'ba-panel-title': 'Dismissible alerts', 'ba-panel-class': 'with-scroll' },
        React.createElement(Panel, { title: 'Dismissible alerts', panelClass: 'with-scroll' },
          React.createElement('div', null,
            React.createElement('div', { className: 'alert bg-success closeable', role: 'alert' },
              React.createElement('button', { type: 'button', className: 'close', 'aria-label': 'Close' }, React.createElement('span', { 'aria-hidden': 'true' }, '\u00d7')),
              React.createElement('strong', null, 'Well done!'), ' You successfully read this important alert message.'
            ),
            React.createElement('div', { className: 'alert bg-info closeable', role: 'alert' },
              React.createElement('button', { type: 'button', className: 'close', 'aria-label': 'Close' }, React.createElement('span', { 'aria-hidden': 'true' }, '\u00d7')),
              React.createElement('strong', null, 'Heads up!'), " This alert needs your attention, but it's not super important."
            ),
            React.createElement('div', { className: 'alert bg-warning closeable', role: 'alert' },
              React.createElement('button', { type: 'button', className: 'close', 'aria-label': 'Close' }, React.createElement('span', { 'aria-hidden': 'true' }, '\u00d7')),
              React.createElement('strong', null, 'Warning!'), " Better check yourself, you're not looking too good."
            ),
            React.createElement('div', { className: 'alert bg-danger closeable', role: 'alert' },
              React.createElement('button', { type: 'button', className: 'close', 'aria-label': 'Close' }, React.createElement('span', { 'aria-hidden': 'true' }, '\u00d7')),
              React.createElement('strong', null, 'Oh snap!'), ' Change a few things up and try submitting again.'
            )
          )
        )
      )
    ),
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-6', 'ba-panel-title': 'Links in alerts', 'ba-panel-class': 'with-scroll' },
        React.createElement(Panel, { title: 'Links in alerts', panelClass: 'with-scroll' },
          React.createElement('div', null,
            React.createElement('div', { className: 'alert bg-success' },
              React.createElement('strong', null, 'Well done!'), ' You successfully read ', React.createElement('a', { href: '', className: 'alert-link' }, 'this important alert message'), '.'
            ),
            React.createElement('div', { className: 'alert bg-info' },
              React.createElement('strong', null, 'Heads up!'), ' This ', React.createElement('a', { href: '', className: 'alert-link' }, 'alert needs your attention'), ", but it's not super important."
            ),
            React.createElement('div', { className: 'alert bg-warning' },
              React.createElement('strong', null, 'Warning!'), " Better check yourself, you're ", React.createElement('a', { href: '', className: 'alert-link' }, 'not looking too good'), '.'
            ),
            React.createElement('div', { className: 'alert bg-danger' },
              React.createElement('strong', null, 'Oh snap!'), ' ', React.createElement('a', { href: '', className: 'alert-link' }, 'Change a few things up'), ' and try submitting again.'
            )
          )
        )
      ),
      React.createElement('div', { className: 'col-md-6', 'ba-panel-title': 'Composite alerts', 'ba-panel-class': 'with-scroll' },
        React.createElement(Panel, { title: 'Composite alerts', panelClass: 'with-scroll' },
          React.createElement('div', null,
            React.createElement('div', { className: 'alert bg-warning' },
              React.createElement('h4', null, 'Warning!'),
              React.createElement('strong', null, 'Pay attention.'), ' Change a few things up and try submitting again.',
              React.createElement('div', { className: 'control-alert' },
                React.createElement('button', { type: 'button', className: 'btn btn-danger' }, 'Pay Attention'),
                React.createElement('button', { type: 'button', className: 'btn btn-primary' }, 'Ignore')
              )
            )
          )
        )
      )
    )
  );
}
