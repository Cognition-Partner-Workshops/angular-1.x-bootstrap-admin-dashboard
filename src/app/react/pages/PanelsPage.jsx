import React from 'react';
import { Panel } from '../components/Panel';

export function PanelsPage() {
  return React.createElement('div', null,
    React.createElement('h2', null, 'Default panels'),
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-12 col-lg-4' },
        React.createElement(Panel, { panelClass: 'xsmall-panel light-text' },
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac mi erat. Phasellus placerat, elit a laoreet semper, enim ipsum ultricies orci, ac tincidunt tellus massa eu est. Nam non porta purus, sed facilisis justo. Nam pulvinar sagittis quam.'
        )
      ),
      React.createElement('div', { className: 'col-md-12 col-lg-4' },
        React.createElement(Panel, { title: 'Panel with header', panelClass: 'xsmall-panel light-text' },
          'Phasellus maximus venenatis augue, et vestibulum neque aliquam ut. Morbi mattis libero vitae vulputate dignissim. Praesent placerat, sem non dapibus cursus, lacus nisi blandit quam, vitae porttitor lectus lacus non turpis. Donec suscipit consequat tellus.'
        )
      ),
      React.createElement('div', { className: 'col-md-12 col-lg-4' },
        React.createElement(Panel, { title: 'Panel with header & scroll', panelClass: 'xsmall-panel with-scroll light-text' },
          React.createElement('p', null, 'Suspendisse nec tellus urna. Sed id est metus. Nullam sit amet dolor nec ipsum dictum suscipit. Mauris sed nisi mauris. Nulla iaculis nisl ut velit ornare imperdiet. Suspendisse potenti. In tempor leo sed sem malesuada pellentesque. Maecenas faucibus metus lacus, ac egestas diam vulputate vitae.'),
          React.createElement('p', null, 'Sed dapibus, purus vel hendrerit consectetur, lectus orci gravida massa, sed bibendum dui mauris et eros. Nulla dolor massa, posuere et dictum sit amet, dignissim quis odio. Fusce mollis finibus dignissim. Integer sodales augue erat. Pellentesque laoreet vestibulum urna at iaculis. Nulla libero augue, euismod at diam eget, aliquam condimentum ligula. Donec a leo eu est molestie lacinia hendrerit sed lorem. Duis id diam eu metus sodales consequat vel eu elit. Praesent dolor nibh, convallis eleifend feugiat a, finibus porttitor nibh. Ut non libero vel velit pulvinar scelerisque non vel lorem. Integer porta tempor nulla. Sed nibh erat, ultrices vel lorem eu, rutrum vehicula sem.'),
          React.createElement('p', null, 'Donec nec tellus urna. Sed id est metus. Nullam sit amet dolor nec ipsum dictum suscipit. Mauris sed nisi mauris. Nulla iaculis nisl ut velit ornare imperdiet. Suspendisse potenti. In tempor leo sed sem malesuada pellentesque. Maecenas faucibus metus lacus, ac egestas diam vulputate vitae.'),
          React.createElement('p', null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum nec ligula egestas rhoncus. Sed dignissim, augue vel scelerisque vulputate, nisi ante posuere lorem, quis iaculis eros dolor eu nisl. Etiam sagittis, ipsum ac tempor iaculis, justo neque mattis ante, ac maximus sapien risus eu sapien. Morbi erat urna, varius et lectus vel, porta dictum orci. Duis bibendum euismod elit, et lobortis purus venenatis in. Mauris eget lacus enim. Cras quis sem et magna fringilla convallis. Proin hendrerit nulla vel gravida mollis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum consectetur quis purus vel aliquam.')
        )
      )
    ),

    React.createElement('h2', null, 'Bootstrap panels'),
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-12 col-lg-4' },
        React.createElement('div', { className: 'panel panel-default bootstrap-panel xsmall-panel' },
          React.createElement('div', { className: 'panel-body' },
            React.createElement('p', null, 'A panel in bootstrap is a bordered box with some padding around its content.'),
            React.createElement('p', { className: 'p-with-code' }, 'Panels are created with the ', React.createElement('code', null, '.panel'), ' class, and content inside the panel has a ', React.createElement('code', null, '.panel-body'), ' class. The ', React.createElement('code', null, '.panel-default .panel-primary .panel-danger'), ' and other classes are used to style the color of the panel. See the next example on this page for more contextual classes.')
          )
        )
      ),
      React.createElement('div', { className: 'col-md-12 col-lg-4' },
        React.createElement('div', { className: 'panel panel-default bootstrap-panel xsmall-panel' },
          React.createElement('div', { className: 'panel-heading' }, 'Panel Heading'),
          React.createElement('div', { className: 'panel-body' },
            React.createElement('p', { className: 'p-with-code' }, 'The ', React.createElement('code', null, '.panel-heading'), ' class adds a heading to the panel.Easily add a heading container to your panel with .panel-heading. You may also include any ', React.createElement('code', null, 'h1-h6'), ' with a ', React.createElement('code', null, '.panel-title'), ' class to add a pre-styled heading.')
          )
        )
      ),
      React.createElement('div', { className: 'col-md-12 col-lg-4' },
        React.createElement('div', { className: 'panel panel-default bootstrap-panel' },
          React.createElement('div', { className: 'panel-body footer-panel' },
            React.createElement('p', { className: 'p-with-code' }, 'Wrap buttons or secondary text in ', React.createElement('code', null, '.panel-footer'), '. Note that panel footers do not inherit colors and borders when using contextual variations as they are not meant to be in the foreground.')
          ),
          React.createElement('div', { className: 'panel-footer' }, 'Panel Footer')
        )
      )
    ),

    React.createElement('h2', null, 'Panels with Contextual Classes'),
    React.createElement('div', { className: 'row' },
      ['default', 'primary', 'success', 'info', 'warning', 'danger'].map(function (ctx) {
        return React.createElement('div', { key: ctx, className: 'col-md-6 col-lg-4' },
          React.createElement('div', { className: 'panel panel-' + ctx + ' contextual-example-panel bootstrap-panel' },
            React.createElement('div', { className: 'panel-heading' }, 'Panel with panel-' + ctx + ' class'),
            React.createElement('div', { className: 'panel-body' },
              ctx === 'default'
                ? ['To color the panel, use contextual classes. This is sample ', React.createElement('code', { key: 'c' }, '.panel-default'), ' panel']
                : ['Sample ', React.createElement('code', { key: 'c' }, '.panel-' + ctx), ' panel']
            )
          )
        );
      })
    ),

    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-12' },
        React.createElement('h2', null, 'Panel Group'),
        React.createElement('div', { className: 'panel-group' },
          React.createElement('div', { className: 'panel panel-default bootstrap-panel' },
            React.createElement('div', { className: 'panel-heading' }, 'Panel group 1'),
            React.createElement('div', { className: 'panel-body' },
              React.createElement('p', null, 'To group many panels together, wrap a ', React.createElement('code', null, '<div>'), ' with class ', React.createElement('code', null, '.panel-group'), ' around them.')
            )
          ),
          React.createElement('div', { className: 'panel panel-default bootstrap-panel' },
            React.createElement('div', { className: 'panel-heading' }, 'Panel group 2'),
            React.createElement('div', { className: 'panel-body' },
              React.createElement('p', null, 'The ', React.createElement('code', null, '.panel-group'), ' class clears the bottom-margin of each panel.')
            )
          )
        )
      )
    )
  );
}
