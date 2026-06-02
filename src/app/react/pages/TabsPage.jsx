/**
 * TabsPage — migrated from src/app/pages/ui/tabs
 * (tabs.html + mainTabs/sideTabs/sampleAccordion/contextualAccordion partials).
 *
 * The original used angular-ui-bootstrap <uib-tabset>/<uib-accordion>. These
 * are reproduced with the <Tabset>/<Accordion> React components, preserving the
 * .horizontal-tabs / .tabs-left / .tabs-right / .accordion-panel structure the
 * E2E tests rely on.
 */
import React from 'react';
import { BaPanel } from '../components/BaPanel';
import { Tabset, Accordion } from '../components/Tabset';

var KAMELEON_ROOT = 'assets/img/theme/icon/kameleon/';
function kameleon(name) { return KAMELEON_ROOT + name + '.svg'; }

function P(text) { return React.createElement('p', null, text); }

function roundIcon(color, img, extra) {
  return React.createElement('div', { className: 'kameleon-icon with-round-bg ' + color + (extra ? ' ' + extra : '') },
    React.createElement('img', { src: kameleon(img) }));
}

var mainTabs = [
  {
    heading: 'Start',
    content: React.createElement(React.Fragment, null,
      P('Take up one idea. Make that one idea your life--think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body, be full of that idea, and just leave every other idea alone. This is the way to success.'),
      P('People who succeed have momentum. The more they succeed, the more they want to succeed, and the more they find a way to succeed. Similarly, when someone is failing, the tendency is to get on a downward spiral that can even become a self-fulfilling prophecy.'),
      React.createElement('div', { className: 'text-center' },
        roundIcon('primary', 'Shop', 'inline-icon'),
        roundIcon('primary', 'Programming', 'inline-icon'),
        roundIcon('primary', 'Dna', 'inline-icon')
      ),
      P("The reason most people never reach their goals is that they don't define them, or ever seriously consider them as believable or achievable. Winners can tell you where they are going, what they plan to do along the way, and who will be sharing the adventure with them.")
    ),
  },
  {
    heading: 'Getting Done',
    content: React.createElement(React.Fragment, null,
      P("You can't connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future. You have to trust in something--your gut, destiny, life, karma, whatever. This approach has never let me down, and it has made all the difference in my life."),
      P("The reason most people never reach their goals is that they don't define them, or ever seriously consider them as believable or achievable. Winners can tell you where they are going, what they plan to do along the way, and who will be sharing the adventure with them.")
    ),
  },
  {
    heading: React.createElement(React.Fragment, null, 'Dropdown tab ', React.createElement('i', { className: 'caret' })),
    content: React.createElement(React.Fragment, null,
      P('Success is ... knowing your purpose in life, growing to reach your maximum potential, and sowing seeds that benefit others.'),
      P('Failure is the condiment that gives success its flavor.')
    ),
  },
];

function sideTabs(iconColor, iconImg) {
  return [
    {
      heading: 'Start',
      content: React.createElement(React.Fragment, null,
        React.createElement('p', { className: 'text-center' }, 'Take up one idea.'),
        React.createElement('div', { className: 'kameleon-icon-tabs kameleon-icon with-round-bg ' + iconColor },
          React.createElement('img', { src: kameleon(iconImg) })),
        P('People who succeed have momentum. The more they succeed, the more they want to succeed, and the more they find a way to succeed. ')
      ),
    },
    {
      heading: 'Get it done',
      content: React.createElement(React.Fragment, null,
        P("You can't connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future. You have to trust in something--your gut, destiny, life, karma, whatever. This approach has never let me down, and it has made all the difference in my life."),
        P("The reason most people never reach their goals is that they don't define them, or ever seriously consider them as believable or achievable. Winners can tell you where they are going, what they plan to do along the way, and who will be sharing the adventure with them.")
      ),
    },
    {
      heading: 'Achieve',
      content: React.createElement(React.Fragment, null,
        P('Success is ... knowing your purpose in life, growing to reach your maximum potential, and sowing seeds that benefit others.'),
        P('Failure is the condiment that gives success its flavor.')
      ),
    },
  ];
}

var sampleGroups = [
  { heading: 'Static Header, initially expanded', panelClass: 'bootstrap-panel accordion-panel panel-default', open: true, content: 'This content is straight in the template.' },
  { heading: 'Dynamic Body Content', panelClass: 'bootstrap-panel accordion-panel panel-default', content: React.createElement(React.Fragment, null,
      P('The body of the uib-accordion group grows to fit the contents'),
      React.createElement('button', { type: 'button', className: 'btn btn-primary btn-sm' }, 'Add Item')) },
  { heading: 'Custom template', panelClass: 'bootstrap-panel accordion-panel panel-default', content: 'Hello' },
  { heading: React.createElement(React.Fragment, null, 'I can have markup, too! ', React.createElement('i', { className: 'fa pull-right ion-settings' })),
    panelClass: 'bootstrap-panel accordion-panel panel-default', content: 'This is just some content to illustrate fancy headings.' },
];

var contextualGroups = [
  { heading: 'Primary', panelClass: 'panel-primary bootstrap-panel accordion-panel', content: React.createElement(React.Fragment, null, 'Primary ', React.createElement('i', { className: 'ion-heart' })) },
  { heading: 'Success', panelClass: 'panel-success bootstrap-panel accordion-panel', content: React.createElement(React.Fragment, null, 'Success ', React.createElement('i', { className: 'ion-checkmark-round' })) },
  { heading: 'Info', panelClass: 'panel-info bootstrap-panel accordion-panel', content: React.createElement(React.Fragment, null, 'Info ', React.createElement('i', { className: 'ion-information-circled' })) },
  { heading: 'Warning', panelClass: 'panel-warning bootstrap-panel accordion-panel', content: React.createElement(React.Fragment, null, 'Warning ', React.createElement('i', { className: 'ion-alert' })) },
  { heading: 'Danger', panelClass: 'panel-danger bootstrap-panel accordion-panel', content: React.createElement(React.Fragment, null, 'Danger ', React.createElement('i', { className: 'ion-nuclear' })) },
];

export function TabsPage() {
  return React.createElement('div', null,
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-6' },
        React.createElement(BaPanel, { panelClass: 'with-scroll horizontal-tabs tabs-panel medium-panel' },
          React.createElement(Tabset, { tabs: mainTabs }))
      ),
      React.createElement('div', { className: 'col-md-6 tabset-group' },
        React.createElement(BaPanel, { panelClass: 'tabs-panel xsmall-panel with-scroll' },
          React.createElement(Tabset, { tabs: sideTabs('danger', 'Key'), className: 'tabs-left' })),
        React.createElement(BaPanel, { panelClass: 'tabs-panel xsmall-panel with-scroll' },
          React.createElement(Tabset, { tabs: sideTabs('warning', 'Phone-Booth'), className: 'tabs-right' }))
      )
    ),
    React.createElement('div', { className: 'row accordions-row' },
      React.createElement('div', { className: 'col-md-6' },
        React.createElement(Accordion, { groups: sampleGroups })),
      React.createElement('div', { className: 'col-md-6' },
        React.createElement(Accordion, { groups: contextualGroups }))
    )
  );
}
