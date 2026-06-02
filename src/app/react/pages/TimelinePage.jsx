import React, { useEffect } from 'react';
import { Panel } from '../components/Panel';

var KAMELEON_ROOT = 'assets/img/theme/icon/kameleon/';

function kameleonImg(name) {
  return KAMELEON_ROOT + name + '.svg';
}

var timelineBlocks = [
  {
    icon: 'Euro-Coin', theme: 'warning', title: 'Title of section 1', date: 'Jan 14',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut.'
  },
  {
    icon: 'Laptop-Signal', theme: 'danger', title: 'Title of section 2', date: 'Jan 18',
    text: 'Donec dapibus at leo eget volutpat. Praesent dolor tellus, ultricies venenatis molestie eu, luctus eget nibh. Curabitur ullamcorper eleifend nisl.'
  },
  {
    icon: 'Checklist', theme: 'primary', title: 'Title of section 3', date: 'Feb 18',
    text: 'Phasellus auctor tellus eget lacinia condimentum. Cum sociis natoque penatibus et magnis dis parturient montes.'
  },
  {
    icon: 'Boss-3', theme: 'warning', title: 'Title of section 4', date: 'Feb 20',
    text: 'Morbi fringilla in massa ac posuere. Fusce non sagittis massa, id accumsan odio. Nullam eget tempor est. Etiam eu felis eu purus aliquam tristique id quis nisl. Nam eros nibh, consequat sed pulvinar eu, ultrices ornare ligula. Aenean interdum sed nunc sed hendrerit.'
  },
  {
    icon: 'Online-Shopping', theme: 'danger', title: 'Title of section 5', date: 'Feb 21',
    text: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur eget mattis metus. Nullam egestas eros metus, quis fringilla urna accumsan sed. Aliquam ultrices at arcu vitae tincidunt.'
  },
  {
    icon: 'Money-Increase', theme: 'primary', title: 'Title of section 6', date: 'Feb 23',
    text: 'Praesent bibendum ante mattis augue consectetur, ut commodo turpis consequat. Donec ligula eros, porta in iaculis vel, semper ac sem. Integer at mauris lorem.'
  },
  {
    icon: 'Vector', theme: 'warning', title: 'Title of section 7', date: 'Feb 24',
    text: 'Vivamus ut laoreet erat, vitae eleifend eros. Sed varius id tellus non lobortis. Sed dolor ante, cursus non scelerisque sed, euismod id eros.'
  }
];

export function TimelinePage() {
  useEffect(function () {
    var $ = window.jQuery;
    if (!$) return;
    var blocks = $('.cd-timeline-block');
    var offset = 0.8;

    function hideBlocks(bl, off) {
      bl.each(function () {
        if ($(this).offset().top > $(window).scrollTop() + $(window).height() * off) {
          $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
        }
      });
    }

    function showBlocks(bl, off) {
      bl.each(function () {
        if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * off && $(this).find('.cd-timeline-img').hasClass('is-hidden')) {
          $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
        }
      });
    }

    hideBlocks(blocks, offset);

    function onScroll() {
      if (!window.requestAnimationFrame) {
        setTimeout(function () { showBlocks(blocks, offset); }, 100);
      } else {
        window.requestAnimationFrame(function () { showBlocks(blocks, offset); });
      }
    }

    $(window).on('scroll', onScroll);
    return function () { $(window).off('scroll', onScroll); };
  }, []);

  return React.createElement('div', null,
    React.createElement(Panel, null,
      React.createElement('section', { id: 'cd-timeline', className: 'cd-container cssanimations' },
        timelineBlocks.map(function (block, i) {
          return React.createElement('div', { className: 'cd-timeline-block', key: i },
            React.createElement('div', { className: 'cd-timeline-img' },
              React.createElement('div', { className: 'kameleon-icon with-round-bg ' + block.theme },
                React.createElement('img', { src: kameleonImg(block.icon) })
              )
            ),
            React.createElement('div', { className: 'cd-timeline-content ' + block.theme },
              React.createElement('h5', null, block.title),
              React.createElement('p', null, block.text),
              React.createElement('span', { className: 'cd-date' }, block.date)
            )
          );
        })
      )
    )
  );
}
