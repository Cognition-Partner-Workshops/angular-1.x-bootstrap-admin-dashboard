import React, { useState } from 'react';
import Panel from './Panel';

var IMAGES_ROOT = 'assets/img/';

function kameleonImgPath(name) {
  return IMAGES_ROOT + 'theme/icon/kameleon/' + name + '.svg';
}

function TabSet({ children, className }) {
  var tabs = React.Children.toArray(children);
  var [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className={className || ''}>
      <ul className="nav nav-tabs">
        {tabs.map(function (tab, idx) {
          return (
            <li key={idx} className={idx === activeIdx ? 'active' : ''}>
              <a onClick={function () { setActiveIdx(idx); }} style={{ cursor: 'pointer' }}>
                {tab.props.heading}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="tab-content">
        {tabs.map(function (tab, idx) {
          return (
            <div key={idx} className={'tab-pane' + (idx === activeIdx ? ' active' : '')} style={{ display: idx === activeIdx ? 'block' : 'none' }}>
              {tab.props.children}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Tab({ heading, children }) {
  return <div>{children}</div>;
}

function Accordion({ children }) {
  var panels = React.Children.toArray(children);
  var [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="panel-group">
      {panels.map(function (panel, idx) {
        var isOpen = idx === openIdx;
        return (
          <div key={idx} className={'panel bootstrap-panel accordion-panel ' + (panel.props.panelClass || 'panel-default')}>
            <div className="panel-heading" style={{ cursor: 'pointer' }} onClick={function () { setOpenIdx(isOpen ? -1 : idx); }}>
              <h4 className="panel-title">{panel.props.heading}</h4>
            </div>
            {isOpen && <div className="panel-collapse collapse in"><div className="panel-body">{panel.props.children}</div></div>}
          </div>
        );
      })}
    </div>
  );
}

function AccordionPanel({ heading, panelClass, children }) {
  return <div>{children}</div>;
}

function Tabs() {
  return (
    <div className="widgets">
      <div className="row">
        <div className="col-md-6">
          <Panel title="Tabs" panelClass="tabs-panel with-scroll">
            <TabSet>
              <Tab heading="Start">
                <p>Take up one idea. Make that one idea your life--think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body, be full of that idea, and just leave every other idea alone. This is the way to success.</p>
                <p>People who succeed have momentum. The more they succeed, the more they want to succeed, and the more they find a way to succeed. Similarly, when someone is failing, the tendency is to get on a downward spiral that can even become a self-fulfilling prophecy.</p>
                <div className="text-center">
                  <div className="kameleon-icon with-round-bg primary inline-icon"><img src={kameleonImgPath('Shop')} /></div>
                  <div className="kameleon-icon with-round-bg primary inline-icon"><img src={kameleonImgPath('Programming')} /></div>
                  <div className="kameleon-icon with-round-bg primary inline-icon"><img src={kameleonImgPath('Dna')} /></div>
                </div>
                <p>The reason most people never reach their goals is that they don{"'"}t define them, or ever seriously consider them as believable or achievable. Winners can tell you where they are going, what they plan to do along the way, and who will be sharing the adventure with them.</p>
              </Tab>
              <Tab heading="Getting Done">
                <p>You can{"'"}t connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future. You have to trust in something--your gut, destiny, life, karma, whatever. This approach has never let me down, and it has made all the difference in my life.</p>
                <p>The reason most people never reach their goals is that they don{"'"}t define them, or ever seriously consider them as believable or achievable. Winners can tell you where they are going, what they plan to do along the way, and who will be sharing the adventure with them.</p>
              </Tab>
              <Tab heading="Dropdown tab">
                <p>Success is ... knowing your purpose in life, growing to reach your maximum potential, and sowing seeds that benefit others.</p>
                <p>Failure is the condiment that gives success its flavor.</p>
              </Tab>
            </TabSet>
          </Panel>
          <Panel title="Accordion" panelClass="with-scroll">
            <Accordion>
              <AccordionPanel heading="Static Header, initially expanded" panelClass="panel-default">
                This content is straight in the template.
              </AccordionPanel>
              <AccordionPanel heading="Dynamic Body Content" panelClass="panel-default">
                <p>The body of the accordion group grows to fit the contents</p>
                <button type="button" className="btn btn-primary btn-sm">Add Item</button>
              </AccordionPanel>
              <AccordionPanel heading="Custom template" panelClass="panel-default">
                Hello
              </AccordionPanel>
              <AccordionPanel heading={<span>I can have markup, too! <i className="fa pull-right ion-settings"></i></span>} panelClass="panel-default">
                This is just some content to illustrate fancy headings.
              </AccordionPanel>
            </Accordion>
          </Panel>
        </div>
        <div className="col-md-6">
          <Panel panelClass="tabs-panel xsmall-panel with-scroll" title="Side Tabs (Left)">
            <TabSet className="tabs-left">
              <Tab heading="Start">
                <p className="text-center">Take up one idea.</p>
                <div className="kameleon-icon-tabs kameleon-icon with-round-bg danger"><img src={kameleonImgPath('Key')} /></div>
                <p>People who succeed have momentum. The more they succeed, the more they want to succeed, and the more they find a way to succeed.</p>
              </Tab>
              <Tab heading="Get it done">
                <p>You can{"'"}t connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future. You have to trust in something--your gut, destiny, life, karma, whatever. This approach has never let me down, and it has made all the difference in my life.</p>
                <p>The reason most people never reach their goals is that they don{"'"}t define them, or ever seriously consider them as believable or achievable. Winners can tell you where they are going, what they plan to do along the way, and who will be sharing the adventure with them.</p>
              </Tab>
              <Tab heading="Achieve">
                <p>Success is ... knowing your purpose in life, growing to reach your maximum potential, and sowing seeds that benefit others.</p>
                <p>Failure is the condiment that gives success its flavor.</p>
              </Tab>
            </TabSet>
          </Panel>
          <Panel panelClass="tabs-panel xsmall-panel with-scroll" title="Side Tabs (Right)">
            <TabSet className="tabs-right">
              <Tab heading="Start">
                <p className="text-center">Take up one idea.</p>
                <div className="kameleon-icon-tabs kameleon-icon with-round-bg warning"><img src={kameleonImgPath('Phone-Booth')} /></div>
                <p>People who succeed have momentum. The more they succeed, the more they want to succeed, and the more they find a way to succeed.</p>
              </Tab>
              <Tab heading="Get it done">
                <p>You can{"'"}t connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future. You have to trust in something--your gut, destiny, life, karma, whatever. This approach has never let me down, and it has made all the difference in my life.</p>
                <p>The reason most people never reach their goals is that they don{"'"}t define them, or ever seriously consider them as believable or achievable. Winners can tell you where they are going, what they plan to do along the way, and who will be sharing the adventure with them.</p>
              </Tab>
              <Tab heading="Achieve">
                <p>Success is ... knowing your purpose in life, growing to reach your maximum potential, and sowing seeds that benefit others.</p>
                <p>Failure is the condiment that gives success its flavor.</p>
              </Tab>
            </TabSet>
          </Panel>
          <Panel title="Contextual Accordion" panelClass="with-scroll">
            <Accordion>
              <AccordionPanel heading="Primary" panelClass="panel-primary">Primary <i className="ion-heart"></i></AccordionPanel>
              <AccordionPanel heading="Success" panelClass="panel-success">Success <i className="ion-checkmark-round"></i></AccordionPanel>
              <AccordionPanel heading="Info" panelClass="panel-info">Info <i className="ion-information-circled"></i></AccordionPanel>
              <AccordionPanel heading="Warning" panelClass="panel-warning">Warning <i className="ion-alert"></i></AccordionPanel>
              <AccordionPanel heading="Danger" panelClass="panel-danger">Danger <i className="ion-nuclear"></i></AccordionPanel>
            </Accordion>
          </Panel>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
