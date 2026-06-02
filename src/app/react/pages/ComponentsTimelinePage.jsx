/**
 * ComponentsTimelinePage — React migration of the AngularJS timeline page
 * (src/app/pages/components/timeline).
 *
 * Renders a static vertical timeline (#cd-timeline) with seven blocks, each
 * showing a kameleon icon, a colored content card, a title, body copy and a
 * date. Mirrors the DOM structure and CSS classes of the original
 * timeline.html so the existing styles and E2E selectors keep working.
 */
import React from 'react';
import { Panel } from '../components/Panel';

var KAMELEON_ROOT = 'assets/img/theme/icon/kameleon/';

function kameleonImg(name) {
  return KAMELEON_ROOT + name + '.svg';
}

var BLOCKS = [
  {
    icon: 'Euro-Coin',
    color: 'warning',
    title: 'Title of section 1',
    date: 'Jan 14',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut.',
  },
  {
    icon: 'Laptop-Signal',
    color: 'danger',
    title: 'Title of section 2',
    date: 'Jan 18',
    text: 'Donec dapibus at leo eget volutpat. Praesent dolor tellus, ultricies venenatis molestie eu, luctus eget nibh. Curabitur ullamcorper eleifend nisl.',
  },
  {
    icon: 'Checklist',
    color: 'primary',
    title: 'Title of section 3',
    date: 'Feb 18',
    text: 'Phasellus auctor tellus eget lacinia condimentum. Cum sociis natoque penatibus et magnis dis parturient montes.',
  },
  {
    icon: 'Boss-3',
    color: 'warning',
    title: 'Title of section 4',
    date: 'Feb 20',
    text: 'Morbi fringilla in massa ac posuere. Fusce non sagittis massa, id accumsan odio. Nullam eget tempor est. Etiam eu felis eu purus aliquam tristique id quis nisl. Nam eros nibh, consequat sed pulvinar eu, ultrices ornare ligula. Aenean interdum sed nunc sed hendrerit.',
  },
  {
    icon: 'Online-Shopping',
    color: 'danger',
    title: 'Title of section 5',
    date: 'Feb 21',
    text: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur eget mattis metus. Nullam egestas eros metus, quis fringilla urna accumsan sed. Aliquam ultrices at arcu vitae tincidunt.',
  },
  {
    icon: 'Money-Increase',
    color: 'primary',
    title: 'Title of section 6',
    date: 'Feb 23',
    text: 'Praesent bibendum ante mattis augue consectetur, ut commodo turpis consequat. Donec ligula eros, porta in iaculis vel, semper ac sem. Integer at mauris lorem.',
  },
  {
    icon: 'Vector',
    color: 'warning',
    title: 'Title of section 7',
    date: 'Feb 24',
    text: 'Vivamus ut laoreet erat, vitae eleifend eros. Sed varius id tellus non lobortis. Sed dolor ante, cursus non scelerisque sed, euismod id eros.',
  },
];

export function ComponentsTimelinePage() {
  return React.createElement(
    Panel,
    null,
    React.createElement(
      'section',
      { id: 'cd-timeline', className: 'cd-container cssanimations' },
      BLOCKS.map(function (block, index) {
        return React.createElement(
          'div',
          { className: 'cd-timeline-block', key: index },
          React.createElement(
            'div',
            { className: 'cd-timeline-img' },
            React.createElement(
              'div',
              { className: 'kameleon-icon with-round-bg ' + block.color },
              React.createElement('img', { src: kameleonImg(block.icon) })
            )
          ),
          React.createElement(
            'div',
            { className: 'cd-timeline-content ' + block.color },
            React.createElement('h5', null, block.title),
            React.createElement('p', null, block.text),
            React.createElement('span', { className: 'cd-date' }, block.date)
          )
        );
      })
    )
  );
}
