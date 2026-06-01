import React from 'react';
import Panel from './Panel';

var IMAGES_ROOT = 'assets/img/';

function kameleonImgPath(name) {
  return IMAGES_ROOT + 'theme/icon/kameleon/' + name + '.svg';
}

var kameleonIcons = [
  { name: 'Beach', img: 'Beach' }, { name: 'Bus', img: 'Bus' }, { name: 'Cheese', img: 'Cheese' },
  { name: 'Desert', img: 'Desert' }, { name: 'Images', img: 'Images' }, { name: 'Magician', img: 'Magician' },
  { name: 'Makeup', img: 'Makeup' }, { name: 'Programming', img: 'Programming' }, { name: 'Shop', img: 'Shop' },
  { name: 'Surfer', img: 'Surfer' }, { name: 'Phone Booth', img: 'Phone-Booth' }, { name: 'Ninja', img: 'Ninja' },
  { name: 'Apartment', img: 'Apartment' }, { name: 'Batman', img: 'Batman' }, { name: 'Medal', img: 'Medal-2' },
  { name: 'Money', img: 'Money-Increase' }, { name: 'Street View', img: 'Street-View' },
  { name: 'Student', img: 'Student-3' }, { name: 'Bell', img: 'Bell' }, { name: 'Woman', img: 'Boss-5' },
  { name: 'Euro', img: 'Euro-Coin' }, { name: 'Chessboard', img: 'Chessboard' },
  { name: 'Burglar', img: 'Burglar' }, { name: 'Dna', img: 'Dna' },
  { name: 'Clipboard Plan', img: 'Clipboard-Plan' }, { name: 'Boss', img: 'Boss-3' },
  { name: 'Key', img: 'Key' }, { name: 'Surgeon', img: 'Surgeon' },
  { name: 'Hacker', img: 'Hacker' }, { name: 'Santa', img: 'Santa' }
];

var kameleonRoundedIcons = [
  { color: 'success', img: 'Apartment', name: 'Apartment' },
  { color: 'warning', img: 'Bus', name: 'Bus' },
  { color: 'primary', img: 'Checklist', name: 'Checklist' },
  { color: 'warning', img: 'Desert', name: 'Desert' },
  { color: 'danger', img: 'Laptop-Signal', name: 'Laptop Signal' },
  { color: 'info', img: 'Love-Letter', name: 'Love Letter' },
  { color: 'success', img: 'Makeup', name: 'Makeup' },
  { color: 'primary', img: 'Santa', name: 'Santa' },
  { color: 'success', img: 'Surfer', name: 'Surfer' },
  { color: 'info', img: 'Vector', name: 'Vector' },
  { color: 'warning', img: 'Money-Increase', name: 'Money Increase' },
  { color: 'info', img: 'Alien', name: 'Alien' },
  { color: 'danger', img: 'Online-Shopping', name: 'Online Shopping' },
  { color: 'warning', img: 'Euro-Coin', name: 'Euro' },
  { color: 'info', img: 'Boss-3', name: 'Boss' }
];

var ionicons = ['ion-ionic', 'ion-arrow-right-b', 'ion-arrow-down-b', 'ion-arrow-left-b', 'ion-arrow-up-c', 'ion-arrow-right-c', 'ion-arrow-down-c', 'ion-arrow-left-c', 'ion-arrow-return-right', 'ion-arrow-return-left', 'ion-arrow-swap', 'ion-arrow-shrink', 'ion-arrow-expand', 'ion-arrow-move', 'ion-arrow-resize', 'ion-chevron-up', 'ion-chevron-right', 'ion-chevron-down', 'ion-chevron-left', 'ion-navicon-round', 'ion-navicon', 'ion-drag', 'ion-log-in', 'ion-log-out', 'ion-checkmark-round', 'ion-checkmark', 'ion-checkmark-circled', 'ion-close-round', 'ion-plus-round', 'ion-minus-round', 'ion-information', 'ion-help', 'ion-backspace-outline', 'ion-help-buoy', 'ion-asterisk', 'ion-alert', 'ion-alert-circled', 'ion-refresh', 'ion-loop', 'ion-shuffle', 'ion-home', 'ion-search', 'ion-flag', 'ion-star', 'ion-heart', 'ion-heart-broken', 'ion-gear-a', 'ion-gear-b', 'ion-toggle-filled', 'ion-toggle', 'ion-settings', 'ion-wrench', 'ion-hammer', 'ion-edit', 'ion-trash-a', 'ion-trash-b', 'ion-document', 'ion-document-text', 'ion-clipboard', 'ion-scissors', 'ion-funnel', 'ion-bookmark', 'ion-email', 'ion-email-unread', 'ion-folder', 'ion-filing', 'ion-archive', 'ion-reply', 'ion-reply-all', 'ion-forward'];

var fontAwesomeIcons = ['fa fa-adjust', 'fa fa-anchor', 'fa fa-archive', 'fa fa-area-chart', 'fa fa-arrows', 'fa fa-arrows-h', 'fa fa-arrows-v', 'fa fa-asterisk', 'fa fa-at', 'fa fa-automobile', 'fa fa-ban', 'fa fa-bank', 'fa fa-bar-chart', 'fa fa-bar-chart-o', 'fa fa-barcode', 'fa fa-bars', 'fa fa-bed', 'fa fa-beer', 'fa fa-bell', 'fa fa-bell-o', 'fa fa-bell-slash', 'fa fa-bell-slash-o', 'fa fa-bicycle', 'fa fa-binoculars', 'fa fa-birthday-cake', 'fa fa-bolt', 'fa fa-bomb', 'fa fa-book', 'fa fa-bookmark', 'fa fa-bookmark-o', 'fa fa-briefcase', 'fa fa-bug', 'fa fa-building', 'fa fa-building-o', 'fa fa-bullhorn'];

var socicon = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', ',', ';', ':', '+', '@', '=', '-', '^', '?', '$', '*', '&', '(', '#', '.', '_', ']', ')', '\'', '"', '}', '{'];

function Icons() {
  return (
    <div className="widgets">
      <div className="row">
        <div className="col-md-6">
          <Panel title="Kameleon SVG Icons" panelClass="with-scroll">
            <div className="row clearfix">
              {kameleonIcons.map(function (icon) {
                return (
                  <div className="kameleon-row" key={icon.img}>
                    <div className="kameleon-icon">
                      <img src={kameleonImgPath(icon.img)} />
                      <span>{icon.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <a href="http://www.kameleon.pics/" target="_blank" className="see-all-icons">See all Kamaleon icons</a>
          </Panel>
          <Panel title="Socicon" panelClass="with-scroll">
            <div className="row icons-list danger">
              {socicon.map(function (icon, idx) {
                return <div className="col-xs-2" key={idx}><i className="socicon">{icon}</i></div>;
              })}
            </div>
            <a href="http://www.socicon.com/chart.php" target="_blank" className="see-all-icons">See all Socicon icons</a>
          </Panel>
        </div>
        <div className="col-md-6">
          <Panel title="Icons With Rounded Background" panelClass="with-scroll">
            <div className="row clearfix">
              {kameleonRoundedIcons.map(function (icon) {
                return (
                  <div className="kameleon-row" key={icon.img}>
                    <div className={'kameleon-icon with-round-bg ' + icon.color}>
                      <img src={kameleonImgPath(icon.img)} />
                      <span>{icon.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <a href="http://www.kameleon.pics/" target="_blank" className="see-all-icons">See all Kamaleon icons</a>
          </Panel>
          <Panel title="ionicons" panelClass="with-scroll">
            <div className="row icons-list primary">
              {ionicons.map(function (icon) {
                return <div className="col-xs-2" key={icon}><i className={icon}></i></div>;
              })}
            </div>
            <a href="http://ionicons.com/" target="_blank" className="see-all-icons">See all ionicons icons</a>
          </Panel>
          <Panel title="Font Awesome Icons" panelClass="with-scroll">
            <div className="row icons-list success awesomeIcons">
              {fontAwesomeIcons.map(function (icon) {
                return <div className="col-xs-2" key={icon}><i className={'fa ' + icon}></i></div>;
              })}
            </div>
            <a href="http://fortawesome.github.io/Font-Awesome/icons/" target="_blank" className="see-all-icons">See all Font Awesome icons</a>
          </Panel>
        </div>
      </div>
    </div>
  );
}

export default Icons;
