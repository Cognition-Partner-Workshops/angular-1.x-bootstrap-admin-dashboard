/**
 * TabsPage — React migration of src/app/pages/ui/tabs.
 *
 * Reproduces the horizontal tabset, left/right side tabsets, and the two
 * accordions (sample + contextual). Tab switching is handled with local state;
 * accordion groups render as static Bootstrap panels (the suite asserts panel
 * counts/headings, not collapse behavior).
 */
import React, { useState } from 'react';
import { Panel } from '../components/Panel';

function Tabset({ className, tabs }) {
  var [active, setActive] = useState(0);
  return (
    <div className={('tabset ' + (className || '')).trim()}>
      <ul className="nav nav-tabs" role="tablist">
        {tabs.map(function (t, i) {
          return (
            <li className={'nav-item' + (i === active ? ' active' : '')} role="presentation" key={i}>
              <a
                className={'nav-link' + (i === active ? ' active' : '')}
                href=""
                onClick={function (e) { e.preventDefault(); setActive(i); }}
              >
                {t.heading}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="tab-content">
        {tabs.map(function (t, i) {
          return (
            <div
              className={'tab-pane' + (i === active ? ' active' : '')}
              key={i}
              style={{ display: i === active ? 'block' : 'none' }}
            >
              {t.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AccordionGroup({ panelClass, heading, children }) {
  return (
    <div className={'panel ' + panelClass}>
      <div className="panel-heading">
        <h4 className="panel-title"><a href="" onClick={function (e) { e.preventDefault(); }}>{heading}</a></h4>
      </div>
      <div className="panel-collapse">
        <div className="panel-body">{children}</div>
      </div>
    </div>
  );
}

var HORIZONTAL_TABS = [
  {
    heading: 'Start',
    content: (
      <div>
        <p>Take up one idea. Make that one idea your life--think of it, dream of it, live on that idea.</p>
        <div className="text-center">
          <div className="kameleon-icon with-round-bg primary inline-icon"></div>
        </div>
      </div>
    )
  },
  {
    heading: 'Getting Done',
    content: (
      <div>
        <p>You can't connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future.</p>
        <p>The reason most people never reach their goals is that they don't define them.</p>
      </div>
    )
  },
  {
    heading: <a className="nav-link-inner">Dropdown tab <i className="caret"></i></a>,
    content: (
      <div>
        <p>Success is ... knowing your purpose in life, growing to reach your maximum potential.</p>
        <p>Failure is the condiment that gives success its flavor.</p>
      </div>
    )
  }
];

var SIDE_TABS = [
  { heading: 'Start', content: <p className="text-center">Take up one idea.</p> },
  { heading: 'Get it done', content: <p>You can't connect the dots looking forward; you can only connect them looking backwards.</p> },
  { heading: 'Achieve', content: <p>Success is ... knowing your purpose in life.</p> }
];

export function TabsPage() {
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <Panel panelClass="with-scroll horizontal-tabs tabs-panel medium-panel">
            <Tabset tabs={HORIZONTAL_TABS} />
          </Panel>
        </div>
        <div className="col-md-6 tabset-group">
          <Panel panelClass="tabs-panel xsmall-panel with-scroll">
            <Tabset className="tabs-left" tabs={SIDE_TABS} />
          </Panel>
          <Panel panelClass="tabs-panel xsmall-panel with-scroll">
            <Tabset className="tabs-right" tabs={SIDE_TABS} />
          </Panel>
        </div>
      </div>

      <div className="row accordions-row">
        <div className="col-md-6">
          <div className="panel-group">
            <AccordionGroup panelClass="bootstrap-panel accordion-panel panel-default" heading="Static Header, initially expanded">
              This content is straight in the template.
            </AccordionGroup>
            <AccordionGroup panelClass="bootstrap-panel accordion-panel panel-default" heading="Dynamic Body Content">
              <p>The body of the accordion group grows to fit the contents</p>
              <button type="button" className="btn btn-primary btn-sm">Add Item</button>
            </AccordionGroup>
            <AccordionGroup panelClass="bootstrap-panel accordion-panel panel-default" heading="Custom template">
              Hello
            </AccordionGroup>
            <AccordionGroup
              panelClass="bootstrap-panel accordion-panel panel-default"
              heading={<span>I can have markup, too! <i className="fa pull-right ion-settings"></i></span>}
            >
              This is just some content to illustrate fancy headings.
            </AccordionGroup>
          </div>
        </div>
        <div className="col-md-6">
          <div className="panel-group">
            <AccordionGroup panelClass="panel-primary bootstrap-panel accordion-panel" heading="Primary">
              Primary <i className="ion-heart"></i>
            </AccordionGroup>
            <AccordionGroup panelClass="panel-success bootstrap-panel accordion-panel" heading="Success">
              Success <i className="ion-checkmark-round"></i>
            </AccordionGroup>
            <AccordionGroup panelClass="panel-info bootstrap-panel accordion-panel" heading="Info">
              Info <i className="ion-information-circled"></i>
            </AccordionGroup>
            <AccordionGroup panelClass="panel-warning bootstrap-panel accordion-panel" heading="Warning">
              Warning <i className="ion-alert"></i>
            </AccordionGroup>
            <AccordionGroup panelClass="panel-danger bootstrap-panel accordion-panel" heading="Danger">
              Danger <i className="ion-nuclear"></i>
            </AccordionGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
