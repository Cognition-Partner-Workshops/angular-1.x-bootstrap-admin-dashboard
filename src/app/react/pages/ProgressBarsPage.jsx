import React from 'react';
import { Panel } from '../components/Panel';

function ProgressBar(props) {
  var cls = 'progress-bar progress-bar-' + props.type;
  if (props.striped) cls += ' progress-bar-striped';
  if (props.active) cls += ' active';
  var style = { width: props.value + '%' };
  var attrs = {
    className: cls,
    role: 'progressbar',
    style: style
  };
  if (props.ariaValuenow !== false) {
    attrs['aria-valuenow'] = String(props.value);
    attrs['aria-valuemin'] = '0';
    attrs['aria-valuemax'] = '100';
  }
  return React.createElement('div', { className: 'progress' },
    React.createElement('div', attrs,
      props.showLabel
        ? props.label
        : React.createElement('span', { className: 'sr-only' }, props.label)
    )
  );
}

export function ProgressBarsPage() {
  var bars = [
    { type: 'success', value: 40, label: '40% Complete (success)' },
    { type: 'info', value: 20, label: '20% Complete' },
    { type: 'warning', value: 60, label: '60% Complete (warning)' },
    { type: 'danger', value: 80, label: '80% Complete (danger)' }
  ];

  return React.createElement('div', { className: 'widgets' },
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-6' },
        React.createElement('div', { 'ba-panel-title': 'Basic', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'Basic', panelClass: 'with-scroll' },
            bars.map(function (b, i) {
              return React.createElement(ProgressBar, { key: 'basic-' + i, type: b.type, value: b.value, label: b.label });
            })
          )
        ),
        React.createElement('div', { 'ba-panel-title': 'Striped', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'Striped', panelClass: 'with-scroll' },
            bars.map(function (b, i) {
              return React.createElement(ProgressBar, { key: 'striped-' + i, type: b.type, value: b.value, label: b.label, striped: true });
            })
          )
        )
      ),
      React.createElement('div', { className: 'col-md-6' },
        React.createElement('div', { 'ba-panel-title': 'With label', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'With label', panelClass: 'with-scroll' },
            bars.map(function (b, i) {
              return React.createElement(ProgressBar, { key: 'label-' + i, type: b.type, value: b.value, label: b.label, showLabel: true });
            })
          )
        ),
        React.createElement('div', { 'ba-panel-title': 'Animated', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'Animated', panelClass: 'with-scroll' },
            bars.map(function (b, i) {
              return React.createElement(ProgressBar, { key: 'animated-' + i, type: b.type, value: b.value, label: b.label, striped: true, active: true });
            })
          )
        )
      )
    ),
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-12', 'ba-panel-title': 'Stacked', 'ba-panel-class': 'with-scroll' },
        React.createElement(Panel, { title: 'Stacked', panelClass: 'with-scroll' },
          React.createElement('div', { className: 'progress' },
            React.createElement('div', { className: 'progress-bar progress-bar-success', style: { width: '35%' } },
              React.createElement('span', { className: 'sr-only' }, '35% Complete (success)')
            ),
            React.createElement('div', { className: 'progress-bar progress-bar-warning progress-bar-striped', style: { width: '20%' } },
              React.createElement('span', { className: 'sr-only' }, '20% Complete (warning)')
            ),
            React.createElement('div', { className: 'progress-bar progress-bar-danger', style: { width: '10%' } },
              React.createElement('span', { className: 'sr-only' }, '10% Complete (danger)')
            ),
            React.createElement('div', { className: 'progress-bar progress-bar-info progress-bar-striped active', style: { width: '20%' } },
              React.createElement('span', { className: 'sr-only' }, '20% Complete (warning)')
            )
          )
        )
      )
    )
  );
}
