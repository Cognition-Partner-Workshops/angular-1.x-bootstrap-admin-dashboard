import React, { useCallback, useRef } from 'react';
import { Panel } from '../components/Panel';

function ProgressButton(props) {
  var ref = useRef(null);

  var handleClick = useCallback(function () {
    if (!ref.current) return;
    var btn = ref.current;
    btn.classList.add('in-progress');
    setTimeout(function () {
      btn.classList.remove('in-progress');
      btn.classList.add('progress-success');
      setTimeout(function () {
        btn.classList.remove('progress-success');
      }, 1500);
    }, 3000);
  }, []);

  return React.createElement('button', {
    ref: ref,
    type: 'button',
    className: 'btn progress-button btn-' + props.type,
    onClick: handleClick
  },
    React.createElement('span', null, props.label),
    React.createElement('span', { className: 'progress' },
      React.createElement('span', { className: 'bar' })
    )
  );
}

export function ButtonsPage() {
  var btnTypes = ['default', 'primary', 'success', 'info', 'warning', 'danger'];

  return React.createElement('div', { className: 'widgets' },
    React.createElement('div', { className: 'row' },
      // Flat Buttons
      React.createElement('div', { className: 'col-md-3', 'ba-panel-title': 'Flat Buttons', 'ba-panel-class': 'with-scroll button-panel' },
        React.createElement(Panel, { title: 'Flat Buttons', panelClass: 'with-scroll button-panel' },
          btnTypes.map(function (type) {
            return React.createElement('div', { key: type, className: 'button-wrapper' },
              React.createElement('button', { type: 'button', className: 'btn btn-' + type },
                type.charAt(0).toUpperCase() + type.slice(1)
              )
            );
          })
        )
      ),
      // Raised Buttons
      React.createElement('div', { className: 'col-md-3', 'ba-panel-title': 'Raised Buttons', 'ba-panel-class': 'with-scroll button-panel' },
        React.createElement(Panel, { title: 'Raised Buttons', panelClass: 'with-scroll button-panel' },
          btnTypes.map(function (type) {
            return React.createElement('div', { key: type, className: 'button-wrapper' },
              React.createElement('button', { type: 'button', className: 'btn btn-' + type + ' btn-raised' },
                type.charAt(0).toUpperCase() + type.slice(1)
              )
            );
          })
        )
      ),
      // Different sizes
      React.createElement('div', { className: 'col-md-3', 'ba-panel-title': 'Different sizes', 'ba-panel-class': 'with-scroll button-panel df-size-button-panel' },
        React.createElement(Panel, { title: 'Different sizes', panelClass: 'with-scroll button-panel df-size-button-panel' },
          React.createElement('div', { className: 'button-wrapper' },
            React.createElement('button', { type: 'button', className: 'btn btn-default btn-xs' }, 'Default')
          ),
          React.createElement('div', { className: 'button-wrapper' },
            React.createElement('button', { type: 'button', className: 'btn btn-primary btn-sm' }, 'Primary')
          ),
          React.createElement('div', { className: 'button-wrapper' },
            React.createElement('button', { type: 'button', className: 'btn btn-success btn-mm' }, 'Success')
          ),
          React.createElement('div', { className: 'button-wrapper' },
            React.createElement('button', { type: 'button', className: 'btn btn-info btn-md' }, 'Info')
          ),
          React.createElement('div', { className: 'button-wrapper' },
            React.createElement('button', { type: 'button', className: 'btn btn-warning btn-xm' }, 'Warning')
          ),
          React.createElement('div', { className: 'button-wrapper' },
            React.createElement('button', { type: 'button', className: 'btn btn-danger btn-lg' }, 'Danger')
          )
        )
      ),
      // Disabled
      React.createElement('div', { className: 'col-md-3', 'ba-panel-title': 'Disabled', 'ba-panel-class': 'with-scroll button-panel' },
        React.createElement(Panel, { title: 'Disabled', panelClass: 'with-scroll button-panel' },
          btnTypes.map(function (type) {
            return React.createElement('div', { key: type, className: 'button-wrapper' },
              React.createElement('button', { type: 'button', className: 'btn btn-' + type, disabled: true },
                type.charAt(0).toUpperCase() + type.slice(1)
              )
            );
          })
        )
      )
    ),

    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-6' },
        // Icon Buttons
        React.createElement('div', { 'ba-panel-title': 'Icon Buttons', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'Icon Buttons', panelClass: 'with-scroll' },
            React.createElement('ul', { className: 'btn-list clearfix' },
              React.createElement('li', null, React.createElement('button', { type: 'button', className: 'btn btn-primary btn-icon' }, React.createElement('i', { className: 'ion-android-download' }))),
              React.createElement('li', null, React.createElement('button', { type: 'button', className: 'btn btn-default btn-icon' }, React.createElement('i', { className: 'ion-stats-bars' }))),
              React.createElement('li', null, React.createElement('button', { type: 'button', className: 'btn btn-success btn-icon' }, React.createElement('i', { className: 'ion-android-checkmark-circle' }))),
              React.createElement('li', null, React.createElement('button', { type: 'button', className: 'btn btn-info btn-icon' }, React.createElement('i', { className: 'ion-information' }))),
              React.createElement('li', null, React.createElement('button', { type: 'button', className: 'btn btn-warning btn-icon' }, React.createElement('i', { className: 'ion-android-warning' }))),
              React.createElement('li', null, React.createElement('button', { type: 'button', className: 'btn btn-danger btn-icon' }, React.createElement('i', { className: 'ion-nuclear' })))
            ),
            React.createElement('h5', { className: 'panel-subtitle' }, 'Buttons with icons'),
            React.createElement('ul', { className: 'btn-list clearfix' },
              React.createElement('li', null, React.createElement('button', { type: 'button', className: 'btn btn-primary btn-with-icon' }, React.createElement('i', { className: 'ion-android-download' }), 'Primary')),
              React.createElement('li', null, React.createElement('button', { type: 'button', className: 'btn btn-default btn-with-icon' }, React.createElement('i', { className: 'ion-stats-bars' }), 'Default')),
              React.createElement('li', null, React.createElement('button', { type: 'button', className: 'btn btn-success btn-with-icon' }, React.createElement('i', { className: 'ion-android-checkmark-circle' }), 'Success')),
              React.createElement('li', null, React.createElement('button', { type: 'button', className: 'btn btn-info btn-with-icon' }, React.createElement('i', { className: 'ion-information' }), 'Info')),
              React.createElement('li', null, React.createElement('button', { type: 'button', className: 'btn btn-warning btn-with-icon' }, React.createElement('i', { className: 'ion-android-warning' }), 'Warning')),
              React.createElement('li', null, React.createElement('button', { type: 'button', className: 'btn btn-danger btn-with-icon' }, React.createElement('i', { className: 'ion-nuclear' }), 'Danger'))
            )
          )
        ),
        // Large Buttons
        React.createElement('div', { 'ba-panel-title': 'Large Buttons', 'ba-panel-class': 'with-scroll large-buttons-panel' },
          React.createElement(Panel, { title: 'Large Buttons', panelClass: 'with-scroll large-buttons-panel' },
            React.createElement('button', { type: 'button', className: 'btn btn-primary large-btn' }, React.createElement('i', { className: 'ion-ios-compose large-btn-icon' }), React.createElement('div', null, 'Compose')),
            React.createElement('button', { type: 'button', className: 'btn btn-success large-btn' }, React.createElement('i', { className: 'ion-ios-cloud-upload large-btn-icon' }), React.createElement('div', null, 'Upload')),
            React.createElement('button', { type: 'button', className: 'btn btn-danger large-btn' }, React.createElement('i', { className: 'ion-ios-trash large-btn-icon' }), React.createElement('div', null, 'Remove')),
            React.createElement('button', { type: 'button', className: 'btn btn-warning large-btn' }, React.createElement('i', { className: 'ion-ios-star large-btn-icon' }), React.createElement('div', null, 'Favorites')),
            React.createElement('button', { type: 'button', className: 'btn btn-info large-btn' }, React.createElement('i', { className: 'ion-ios-locked large-btn-icon' }), React.createElement('div', null, 'Lock'))
          )
        )
      ),
      React.createElement('div', { className: 'col-md-6' },
        // Button Dropdowns
        React.createElement('div', { 'ba-panel-title': 'Button Dropdowns', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'Button Dropdowns', panelClass: 'with-scroll' },
            React.createElement('div', { className: 'row btns-row' },
              ['primary', 'success', 'info', 'default', 'warning', 'danger'].map(function (type) {
                var label = type.charAt(0).toUpperCase() + type.slice(1);
                return React.createElement('div', { key: type, className: 'col-sm-4 col-xs-6' },
                  React.createElement('div', { className: 'btn-group' },
                    React.createElement('button', { type: 'button', className: 'btn btn-' + type + ' dropdown-toggle', 'data-toggle': 'dropdown', 'aria-haspopup': 'true', 'aria-expanded': 'false' },
                      label + ' ', React.createElement('span', { className: 'caret' })
                    ),
                    React.createElement('ul', { className: 'dropdown-menu' },
                      React.createElement('li', null, React.createElement('a', { href: '#' }, 'Action')),
                      React.createElement('li', null, React.createElement('a', { href: '#' }, 'Another action')),
                      React.createElement('li', null, React.createElement('a', { href: '#' }, 'Something else here')),
                      React.createElement('li', { role: 'separator', className: 'divider' }),
                      React.createElement('li', null, React.createElement('a', { href: '#' }, 'Separated link'))
                    )
                  )
                );
              })
            ),
            React.createElement('h5', { className: 'panel-subtitle' }, 'Split button dropdowns'),
            React.createElement('div', { className: 'row btns-row' },
              ['primary', 'success', 'info', 'default', 'warning', 'danger'].map(function (type) {
                var label = type.charAt(0).toUpperCase() + type.slice(1);
                return React.createElement('div', { key: 'split-' + type, className: 'col-sm-4 col-xs-6' },
                  React.createElement('div', { className: 'btn-group' },
                    React.createElement('button', { type: 'button', className: 'btn btn-' + type }, label),
                    React.createElement('button', { type: 'button', className: 'btn btn-' + type + ' dropdown-toggle', 'data-toggle': 'dropdown', 'aria-haspopup': 'true', 'aria-expanded': 'false' },
                      React.createElement('span', { className: 'caret' }),
                      React.createElement('span', { className: 'sr-only' }, 'Toggle Dropdown')
                    ),
                    React.createElement('ul', { className: 'dropdown-menu' },
                      React.createElement('li', null, React.createElement('a', { href: '#' }, 'Action')),
                      React.createElement('li', null, React.createElement('a', { href: '#' }, 'Another action')),
                      React.createElement('li', null, React.createElement('a', { href: '#' }, 'Something else here')),
                      React.createElement('li', { role: 'separator', className: 'divider' }),
                      React.createElement('li', null, React.createElement('a', { href: '#' }, 'Separated link'))
                    )
                  )
                );
              })
            )
          )
        ),
        // Button Groups
        React.createElement('div', { 'ba-panel-title': 'Button Groups', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'Button Groups', panelClass: 'with-scroll' },
            React.createElement('div', { className: 'btn-toolbar', role: 'toolbar' },
              React.createElement('div', { className: 'btn-group', role: 'group' },
                React.createElement('button', { type: 'button', className: 'btn btn-default' }, '1'),
                React.createElement('button', { type: 'button', className: 'btn btn-default' }, '2'),
                React.createElement('button', { type: 'button', className: 'btn btn-default' }, '3'),
                React.createElement('button', { type: 'button', className: 'btn btn-default' }, '4')
              ),
              React.createElement('div', { className: 'btn-group', role: 'group' },
                React.createElement('button', { type: 'button', className: 'btn btn-default' }, '5'),
                React.createElement('button', { type: 'button', className: 'btn btn-default' }, '6'),
                React.createElement('button', { type: 'button', className: 'btn btn-default' }, '7')
              ),
              React.createElement('div', { className: 'btn-group', role: 'group' },
                React.createElement('button', { type: 'button', className: 'btn btn-default' }, '8')
              )
            )
          )
        )
      )
    ),

    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-12', 'ba-panel-title': 'Progress Buttons', 'ba-panel-class': 'with-scroll' },
        React.createElement(Panel, { title: 'Progress Buttons', panelClass: 'with-scroll' },
          React.createElement(ProgressButton, { type: 'primary', label: 'Primary' }),
          React.createElement(ProgressButton, { type: 'default', label: 'Default' }),
          React.createElement(ProgressButton, { type: 'success', label: 'Success' }),
          React.createElement(ProgressButton, { type: 'info', label: 'Info' }),
          React.createElement(ProgressButton, { type: 'warning', label: 'Warning' }),
          React.createElement(ProgressButton, { type: 'danger', label: 'Danger' })
        )
      )
    )
  );
}
