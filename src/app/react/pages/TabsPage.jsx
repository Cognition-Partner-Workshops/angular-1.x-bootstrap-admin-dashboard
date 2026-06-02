import React, { useState, useCallback } from 'react';
import { Panel } from '../components/Panel';

var IMAGES_ROOT = 'assets/img/';

function kameleonImg(name) {
  return IMAGES_ROOT + 'theme/icon/kameleon/' + name + '.svg';
}

function HorizontalTabs() {
  var activeState = useState(0);
  var active = activeState[0], setActive = activeState[1];

  var dropdownState = useState(1);
  var dropdownTab = dropdownState[0], setDropdownTab = dropdownState[1];

  var dropdownOpenState = useState(false);
  var dropdownOpen = dropdownOpenState[0], setDropdownOpen = dropdownOpenState[1];

  return React.createElement('div', { className: 'horizontal-tabs' },
    React.createElement('ul', { className: 'nav nav-tabs', role: 'tablist' },
      React.createElement('li', { role: 'presentation', className: active === 0 ? 'active' : '' },
        React.createElement('a', { href: '#', className: 'nav-link', onClick: function (e) { e.preventDefault(); setActive(0); } }, 'Start')
      ),
      React.createElement('li', { role: 'presentation', className: active === 1 ? 'active' : '' },
        React.createElement('a', { href: '#', className: 'nav-link', onClick: function (e) { e.preventDefault(); setActive(1); } }, 'Getting Done')
      ),
      React.createElement('li', { role: 'presentation', className: 'with-dropdown' + (active === 2 ? ' active' : '') },
        React.createElement('a', {
          href: '#',
          className: 'nav-link dropdown-toggle',
          onClick: function (e) {
            e.preventDefault();
            e.stopPropagation();
            setDropdownOpen(!dropdownOpen);
          }
        }, 'Dropdown tab ', React.createElement('i', { className: 'caret' })),
        dropdownOpen ? React.createElement('ul', { className: 'dropdown-menu', style: { display: 'block' } },
          React.createElement('li', null, React.createElement('a', { href: '#', onClick: function (e) { e.preventDefault(); setDropdownTab(1); setActive(2); setDropdownOpen(false); } }, 'Tab 1')),
          React.createElement('li', null, React.createElement('a', { href: '#', onClick: function (e) { e.preventDefault(); setDropdownTab(2); setActive(2); setDropdownOpen(false); } }, 'Tab 2'))
        ) : null
      )
    ),
    React.createElement('div', { className: 'tab-content' },
      React.createElement('div', { className: 'tab-pane' + (active === 0 ? ' active' : ''), role: 'tabpanel' },
        React.createElement('p', null, 'Take up one idea. Make that one idea your life--think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body, be full of that idea, and just leave every other idea alone. This is the way to success.'),
        React.createElement('p', null, 'People who succeed have momentum. The more they succeed, the more they want to succeed, and the more they find a way to succeed. Similarly, when someone is failing, the tendency is to get on a downward spiral that can even become a self-fulfilling prophecy.'),
        React.createElement('div', { className: 'text-center' },
          React.createElement('div', { className: 'kameleon-icon with-round-bg primary inline-icon' }, React.createElement('img', { src: kameleonImg('Shop') })),
          React.createElement('div', { className: 'kameleon-icon with-round-bg primary inline-icon' }, React.createElement('img', { src: kameleonImg('Programming') })),
          React.createElement('div', { className: 'kameleon-icon with-round-bg primary inline-icon' }, React.createElement('img', { src: kameleonImg('Dna') }))
        ),
        React.createElement('p', null, "The reason most people never reach their goals is that they don't define them, or ever seriously consider them as believable or achievable. Winners can tell you where they are going, what they plan to do along the way, and who will be sharing the adventure with them.")
      ),
      React.createElement('div', { className: 'tab-pane' + (active === 1 ? ' active' : ''), role: 'tabpanel' },
        React.createElement('p', null, "You can't connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future. You have to trust in something--your gut, destiny, life, karma, whatever. This approach has never let me down, and it has made all the difference in my life."),
        React.createElement('p', null, "The reason most people never reach their goals is that they don't define them, or ever seriously consider them as believable or achievable. Winners can tell you where they are going, what they plan to do along the way, and who will be sharing the adventure with them.")
      ),
      React.createElement('div', { className: 'tab-pane' + (active === 2 ? ' active' : ''), role: 'tabpanel' },
        React.createElement('div', { style: { display: dropdownTab === 1 ? 'block' : 'none' } },
          React.createElement('p', null, 'Success is ... knowing your purpose in life, growing to reach your maximum potential, and sowing seeds that benefit others.'),
          React.createElement('p', null, 'Failure is the condiment that gives success its flavor.')
        ),
        React.createElement('div', { style: { display: dropdownTab === 2 ? 'block' : 'none' } },
          React.createElement('p', { className: 'text-center' },
            React.createElement('button', { className: 'btn btn-danger' }, "I'm just a dummy button")
          )
        )
      )
    )
  );
}

function SideTabs(props) {
  var activeState = useState(0);
  var active = activeState[0], setActive = activeState[1];

  var direction = props.direction || 'left';
  var iconName = props.icon;
  var iconBgClass = props.iconBg;

  return React.createElement(Panel, { panelClass: 'tabs-panel xsmall-panel with-scroll' },
    React.createElement('div', { className: 'tabs-' + direction },
      React.createElement('ul', { className: 'nav nav-tabs' },
        ['Start', 'Get it done', 'Achieve'].map(function (label, i) {
          return React.createElement('li', { key: label, className: active === i ? 'active' : '' },
            React.createElement('a', { href: '#', onClick: function (e) { e.preventDefault(); setActive(i); } }, label)
          );
        })
      ),
      React.createElement('div', { className: 'tab-content' },
        React.createElement('div', { className: 'tab-pane' + (active === 0 ? ' active' : '') },
          React.createElement('p', { className: 'text-center' }, 'Take up one idea.'),
          React.createElement('div', { className: 'kameleon-icon-tabs kameleon-icon with-round-bg ' + iconBgClass }, React.createElement('img', { src: kameleonImg(iconName) })),
          React.createElement('p', null, 'People who succeed have momentum. The more they succeed, the more they want to succeed, and the more they find a way to succeed. ')
        ),
        React.createElement('div', { className: 'tab-pane' + (active === 1 ? ' active' : '') },
          React.createElement('p', null, "You can't connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future. You have to trust in something--your gut, destiny, life, karma, whatever. This approach has never let me down, and it has made all the difference in my life."),
          React.createElement('p', null, "The reason most people never reach their goals is that they don't define them, or ever seriously consider them as believable or achievable. Winners can tell you where they are going, what they plan to do along the way, and who will be sharing the adventure with them.")
        ),
        React.createElement('div', { className: 'tab-pane' + (active === 2 ? ' active' : '') },
          React.createElement('p', null, 'Success is ... knowing your purpose in life, growing to reach your maximum potential, and sowing seeds that benefit others.'),
          React.createElement('p', null, 'Failure is the condiment that gives success its flavor.')
        )
      )
    )
  );
}

function SampleAccordion() {
  var openState = useState({ 0: true, 1: false, 2: false, 3: false });
  var open = openState[0], setOpen = openState[1];

  var toggle = useCallback(function (index) {
    setOpen(function (prev) {
      var next = {};
      for (var k in prev) next[k] = prev[k];
      next[index] = !prev[index];
      return next;
    });
  }, []);

  var panels = [
    { heading: 'Static Header, initially expanded', content: 'This content is straight in the template.' },
    { heading: 'Dynamic Body Content', content: React.createElement('div', null, React.createElement('p', null, 'The body of the uib-accordion group grows to fit the contents'), React.createElement('button', { type: 'button', className: 'btn btn-primary btn-sm' }, 'Add Item')) },
    { heading: 'Custom template', content: 'Hello' },
    { heading: null, customHeading: React.createElement('span', null, 'I can have markup, too! ', React.createElement('i', { className: 'fa pull-right ion-settings' })), content: 'This is just some content to illustrate fancy headings.' }
  ];

  return React.createElement('div', null,
    panels.map(function (p, i) {
      return React.createElement('div', { key: i, className: 'panel bootstrap-panel accordion-panel panel-default' },
        React.createElement('div', { className: 'panel-heading', onClick: function () { toggle(i); }, style: { cursor: 'pointer' } },
          React.createElement('h4', { className: 'panel-title' },
            React.createElement('a', null, p.heading || p.customHeading)
          )
        ),
        open[i] ? React.createElement('div', { className: 'panel-collapse collapse in' },
          React.createElement('div', { className: 'panel-body' }, p.content)
        ) : null
      );
    })
  );
}

function ContextualAccordion() {
  var openState = useState({});
  var open = openState[0], setOpen = openState[1];

  var toggle = useCallback(function (index) {
    setOpen(function (prev) {
      var next = {};
      for (var k in prev) next[k] = prev[k];
      next[index] = !prev[index];
      return next;
    });
  }, []);

  var panels = [
    { heading: 'Primary', cls: 'panel-primary', content: React.createElement('span', null, 'Primary ', React.createElement('i', { className: 'ion-heart' })) },
    { heading: 'Success', cls: 'panel-success', content: React.createElement('span', null, 'Success ', React.createElement('i', { className: 'ion-checkmark-round' })) },
    { heading: 'Info', cls: 'panel-info', content: React.createElement('span', null, 'Info ', React.createElement('i', { className: 'ion-information-circled' })) },
    { heading: 'Warning', cls: 'panel-warning', content: React.createElement('span', null, 'Warning ', React.createElement('i', { className: 'ion-alert' })) },
    { heading: 'Danger', cls: 'panel-danger', content: React.createElement('span', null, 'Danger ', React.createElement('i', { className: 'ion-nuclear' })) }
  ];

  return React.createElement('div', null,
    panels.map(function (p, i) {
      return React.createElement('div', { key: i, className: 'panel ' + p.cls + ' bootstrap-panel accordion-panel' },
        React.createElement('div', { className: 'panel-heading', onClick: function () { toggle(i); }, style: { cursor: 'pointer' } },
          React.createElement('h4', { className: 'panel-title' },
            React.createElement('a', null, p.heading)
          )
        ),
        open[i] ? React.createElement('div', { className: 'panel-collapse collapse in' },
          React.createElement('div', { className: 'panel-body' }, p.content)
        ) : null
      );
    })
  );
}

export function TabsPage() {
  return React.createElement('div', null,
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-12' },
        React.createElement(HorizontalTabs, null)
      )
    ),
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-6' },
        React.createElement(SideTabs, { direction: 'left', icon: 'Key', iconBg: 'danger' })
      ),
      React.createElement('div', { className: 'col-md-6' },
        React.createElement(SideTabs, { direction: 'right', icon: 'Phone-Booth', iconBg: 'warning' })
      )
    ),
    React.createElement('div', { className: 'row accordions-row' },
      React.createElement('div', { className: 'col-md-6' },
        React.createElement(SampleAccordion, null)
      ),
      React.createElement('div', { className: 'col-md-6' },
        React.createElement(ContextualAccordion, null)
      )
    )
  );
}
