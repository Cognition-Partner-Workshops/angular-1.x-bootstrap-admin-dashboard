/**
 * IconsPage — React migration of src/app/pages/ui/icons.
 *
 * The E2E suite asserts the five icon panels are visible (by ba-panel-title).
 * Each panel renders a representative set of icons.
 */
import React from 'react';
import { Panel } from '../components/Panel';

var IONICONS = ['ion-home', 'ion-heart', 'ion-star', 'ion-settings', 'ion-person', 'ion-search'];
var FONTAWESOME = ['fa-home', 'fa-heart', 'fa-star', 'fa-cog', 'fa-user', 'fa-search'];
var SOCICON = ['socicon-facebook', 'socicon-twitter', 'socicon-google', 'socicon-github'];
var KAMELEON = ['Shop', 'Programming', 'Dna', 'Key'];

function iconList(prefix, names) {
  return names.map(function (n, i) {
    return <i className={prefix + ' ' + n} key={i} style={{ fontSize: '24px', margin: '8px' }}></i>;
  });
}

export function IconsPage() {
  return (
    <div className="widgets">
      <div className="row">
        <div className="col-md-6">
          <Panel title="Kameleon SVG Icons" panelClass="with-scroll">
            {KAMELEON.map(function (n, i) {
              return (
                <div className="kameleon-icon with-round-bg primary inline-icon" key={i} style={{ display: 'inline-block', margin: '8px' }}>
                  <img src={'assets/img/app/kameleon/' + n + '.svg'} alt={n} width="40" height="40" />
                </div>
              );
            })}
          </Panel>
          <Panel title="Icons With Rounded Background" panelClass="with-scroll">
            {IONICONS.map(function (n, i) {
              return (
                <div className="rounded-icon" key={i} style={{ display: 'inline-block', margin: '8px' }}>
                  <i className={'ion ' + n} style={{ fontSize: '24px' }}></i>
                </div>
              );
            })}
          </Panel>
          <Panel title="Socicon" panelClass="with-scroll">
            {iconList('socicon', SOCICON)}
          </Panel>
        </div>
        <div className="col-md-6">
          <Panel title="ionicons" panelClass="with-scroll">
            {iconList('ion', IONICONS)}
          </Panel>
          <Panel title="Font Awesome Icons" panelClass="with-scroll">
            {iconList('fa', FONTAWESOME)}
          </Panel>
        </div>
      </div>
    </div>
  );
}
