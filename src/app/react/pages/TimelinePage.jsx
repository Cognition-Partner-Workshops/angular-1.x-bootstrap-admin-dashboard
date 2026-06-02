import React, { useEffect } from 'react';
import { Panel } from '../components/Panel';

var KAMELEON_ROOT = 'assets/img/theme/icon/kameleon/';

function kameleonImg(name) {
  return KAMELEON_ROOT + name + '.svg';
}

var timelineData = [
  { icon: 'Euro-Coin', theme: 'warning', title: 'Title of section 1', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut.', date: 'Jan 14' },
  { icon: 'Laptop-Signal', theme: 'danger', title: 'Title of section 2', text: 'Donec dapibus at leo eget volutpat. Praesent dolor tellus, ultricies venenatis molestie eu, luctus eget nibh. Curabitur ullamcorper eleifend nisl.', date: 'Jan 18' },
  { icon: 'Checklist', theme: 'primary', title: 'Title of section 3', text: 'Phasellus auctor tellus eget lacinia condimentum. Cum sociis natoque penatibus et magnis dis parturient montes.', date: 'Feb 18' },
  { icon: 'Boss-3', theme: 'warning', title: 'Title of section 4', text: 'Morbi fringilla in massa ac posuere. Fusce non sagittis massa, id accumsan odio. Nullam eget tempor est. Etiam eu felis eu purus aliquam tristique id quis nisl. Nam eros nibh, consequat sed pulvinar eu, ultrices ornare ligula. Aenean interdum sed nunc sed hendrerit.', date: 'Feb 20' },
  { icon: 'Online-Shopping', theme: 'danger', title: 'Title of section 5', text: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur eget mattis metus. Nullam egestas eros metus, quis fringilla urna accumsan sed. Aliquam ultrices at arcu vitae tincidunt.', date: 'Feb 21' },
  { icon: 'Money-Increase', theme: 'primary', title: 'Title of section 6', text: 'Praesent bibendum ante mattis augue consectetur, ut commodo turpis consequat. Donec ligula eros, porta in iaculis vel, semper ac sem. Integer at mauris lorem.', date: 'Feb 23' },
  { icon: 'Vector', theme: 'warning', title: 'Title of section 7', text: 'Vivamus ut laoreet erat, vitae eleifend eros. Sed varius id tellus non lobortis. Sed dolor ante, cursus non scelerisque sed, euismod id eros.', date: 'Feb 24' },
];

export function TimelinePage() {
  useEffect(function () {
    var $ = window.jQuery;
    var offset = 0.8;
    var blocks = $('.cd-timeline-block');

    function hideBlocks() {
      blocks.each(function () {
        if ($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) {
          $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
        }
      });
    }

    function showBlocks() {
      blocks.each(function () {
        if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * offset &&
            $(this).find('.cd-timeline-img').hasClass('is-hidden')) {
          $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
        }
      });
    }

    hideBlocks();

    function onScroll() {
      if (!window.requestAnimationFrame) {
        setTimeout(function () { showBlocks(); }, 100);
      } else {
        window.requestAnimationFrame(function () { showBlocks(); });
      }
    }

    $(window).on('scroll', onScroll);
    return function () { $(window).off('scroll', onScroll); };
  }, []);

  return React.createElement(Panel, null,
    React.createElement('section', { id: 'cd-timeline', className: 'cd-container cssanimations' },
      timelineData.map(function (item, i) {
        return React.createElement('div', { key: i, className: 'cd-timeline-block' },
          React.createElement('div', { className: 'cd-timeline-img' },
            React.createElement('div', { className: 'kameleon-icon with-round-bg ' + item.theme },
              React.createElement('img', { src: kameleonImg(item.icon) })
            )
          ),
          React.createElement('div', { className: 'cd-timeline-content ' + item.theme },
            React.createElement('h5', null, item.title),
            React.createElement('p', null, item.text),
            React.createElement('span', { className: 'cd-date' }, item.date)
          )
        );
      })
    )
  );
}
