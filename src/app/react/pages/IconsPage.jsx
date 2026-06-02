import React from 'react';
import { Panel } from '../components/Panel';

var IMAGES_ROOT = 'assets/img/';

function kameleonImg(name) {
  return IMAGES_ROOT + 'theme/icon/kameleon/' + name + '.svg';
}

var kameleonIcons = ['Beach', 'Bus', 'Interrupted', 'Sunbathe', 'Shop', 'Programming', 'Stethoscope', 'Science', 'Dna', 'Settings'];
var kameleonRoundedIcons = ['Beach', 'Bus', 'Interrupted', 'Sunbathe', 'Shop', 'Programming', 'Stethoscope', 'Science', 'Dna', 'Settings'];
var ionicons = ['ion-ionic', 'ion-arrow-up-a', 'ion-arrow-right-a', 'ion-arrow-down-a', 'ion-arrow-left-a', 'ion-arrow-up-b', 'ion-arrow-right-b', 'ion-arrow-down-b', 'ion-arrow-left-b', 'ion-arrow-up-c', 'ion-arrow-right-c', 'ion-arrow-down-c'];
var fontAwesomeIcons = ['fa fa-adjust', 'fa fa-anchor', 'fa fa-archive', 'fa fa-area-chart', 'fa fa-arrows', 'fa fa-arrows-h', 'fa fa-arrows-v', 'fa fa-asterisk', 'fa fa-at', 'fa fa-automobile', 'fa fa-ban', 'fa fa-bank'];
var socicon = ['socicon-twitter', 'socicon-facebook', 'socicon-google', 'socicon-linkedin', 'socicon-pinterest', 'socicon-foursqare', 'socicon-youtube', 'socicon-vimeo', 'socicon-flickr', 'socicon-instagram', 'socicon-dribbble', 'socicon-tumblr'];

export function IconsPage() {
  return React.createElement('div', { className: 'widgets' },
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-6' },
        React.createElement('div', { 'ba-panel-title': 'Kameleon SVG Icons', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'Kameleon SVG Icons', panelClass: 'with-scroll' },
            React.createElement('p', null, 'Over 1200 icons in SVG format, ', React.createElement('a', { href: 'http://www.intridea.com/blog/2013/8/26/free-download-1800-icons-categorized' }, 'more icons')),
            kameleonIcons.map(function (icon) {
              return React.createElement('div', { key: icon, className: 'kameleon-icon' },
                React.createElement('img', { src: kameleonImg(icon) })
              );
            })
          )
        ),
        React.createElement('div', { 'ba-panel-title': 'Socicon', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'Socicon', panelClass: 'with-scroll' },
            React.createElement('p', null, 'Social icons font, ', React.createElement('a', { href: 'http://www.socicon.com' }, 'website')),
            socicon.map(function (icon) {
              return React.createElement('i', { key: icon, className: 'socicon ' + icon + ' icon-item' });
            })
          )
        )
      ),
      React.createElement('div', { className: 'col-md-6' },
        React.createElement('div', { 'ba-panel-title': 'Icons With Rounded Background', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'Icons With Rounded Background', panelClass: 'with-scroll' },
            React.createElement('p', null, 'Same icons but with nice round background:'),
            kameleonRoundedIcons.map(function (icon) {
              return React.createElement('div', { key: icon, className: 'kameleon-icon with-round-bg' },
                React.createElement('img', { src: kameleonImg(icon) })
              );
            })
          )
        ),
        React.createElement('div', { 'ba-panel-title': 'ionicons', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'ionicons', panelClass: 'with-scroll' },
            React.createElement('p', null, 'Over 700 icons, ', React.createElement('a', { href: 'http://ionicons.com/' }, 'more icons')),
            ionicons.map(function (icon) {
              return React.createElement('i', { key: icon, className: icon + ' icon-item' });
            })
          )
        ),
        React.createElement('div', { 'ba-panel-title': 'Font Awesome Icons', 'ba-panel-class': 'with-scroll' },
          React.createElement(Panel, { title: 'Font Awesome Icons', panelClass: 'with-scroll' },
            React.createElement('p', null, 'Over 600 icons, ', React.createElement('a', { href: 'https://fortawesome.github.io/Font-Awesome/icons/' }, 'more icons')),
            fontAwesomeIcons.map(function (icon) {
              return React.createElement('i', { key: icon, className: icon + ' icon-item' });
            })
          )
        )
      )
    )
  );
}
