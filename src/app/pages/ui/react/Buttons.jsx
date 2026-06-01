import React, { useState, useCallback } from 'react';
import Panel from './Panel';

function ProgressButton({ className, style, direction, children }) {
  var [loading, setLoading] = useState(false);

  var handleClick = useCallback(function () {
    setLoading(true);
    setTimeout(function () { setLoading(false); }, 3000);
  }, []);

  var cls = 'progress-button'
    + (style ? ' progress-button-style-' + style : '')
    + (direction ? ' progress-button-dir-' + direction : '')
    + (className ? ' ' + className : '')
    + (loading ? ' state-loading' : '');

  return (
    <button
      type="button"
      className={cls}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

function DropdownButton({ label, btnClass }) {
  var [open, setOpen] = useState(false);

  return (
    <div className={'btn-group' + (open ? ' open' : '')}>
      <button type="button" className={'btn ' + btnClass} onClick={function () { setOpen(!open); }}>
        {label} <span className="caret"></span>
      </button>
      {open && (
        <ul className="dropdown-menu" style={{ display: 'block' }}>
          <li><a href="#">Action</a></li>
          <li><a href="#">Another action</a></li>
          <li><a href="#">Something else here</a></li>
          <li role="separator" className="divider"></li>
          <li><a href="#">Separated link</a></li>
        </ul>
      )}
    </div>
  );
}

function SplitDropdownButton({ label, btnClass }) {
  var [open, setOpen] = useState(false);

  return (
    <div className={'btn-group' + (open ? ' open' : '')}>
      <button type="button" className={'btn ' + btnClass}>{label}</button>
      <button type="button" className={'btn ' + btnClass} onClick={function () { setOpen(!open); }}>
        <span className="caret"></span>
        <span className="sr-only">Toggle Dropdown</span>
      </button>
      {open && (
        <ul className="dropdown-menu" style={{ display: 'block' }}>
          <li><a href="#">Action</a></li>
          <li><a href="#">Another action</a></li>
          <li><a href="#">Something else here</a></li>
          <li role="separator" className="divider"></li>
          <li><a href="#">Separated link</a></li>
        </ul>
      )}
    </div>
  );
}

var progressStyles = [
  { title: 'fill horizontal', style: '', btnClass: 'btn-success' },
  { title: 'fill vertical', style: '', direction: 'vertical', btnClass: 'btn-danger' },
  { title: 'shrink horizontal', style: 'shrink', btnClass: 'btn-warning' },
  { title: 'shrink vertical', style: 'shrink', direction: 'vertical', btnClass: 'btn-info' },
  { title: 'rotate-angle-bottom perspective', style: 'rotate-angle-bottom', btnClass: 'btn-success' },
  { title: 'rotate-angle-top perspective', style: 'rotate-angle-top', btnClass: 'btn-danger' },
  { title: 'rotate-angle-left perspective', style: 'rotate-angle-left', btnClass: 'btn-warning' },
  { title: 'rotate-angle-right perspective', style: 'rotate-angle-right', btnClass: 'btn-info' },
  { title: 'rotate-side-down perspective', style: 'rotate-side-down', btnClass: 'btn-success' },
  { title: 'rotate-side-up perspective', style: 'rotate-side-up', btnClass: 'btn-danger' },
  { title: 'rotate-side-left perspective', style: 'rotate-side-left', btnClass: 'btn-warning' },
  { title: 'rotate-side-right perspective', style: 'rotate-side-right', btnClass: 'btn-info' },
  { title: 'rotate-back perspective', style: 'rotate-back', btnClass: 'btn-success' },
  { title: 'flip-open perspective', style: 'flip-open', btnClass: 'btn-danger' },
  { title: 'slide-down horizontal', style: 'slide-down', btnClass: 'btn-warning' },
  { title: 'move-up horizontal', style: 'move-up', btnClass: 'btn-info' },
];

var progressLastRow = [
  { title: 'top-line horizontal', style: 'top-line', btnClass: 'btn-success' },
  { title: 'lateral-lines vertical', style: 'lateral-lines', direction: 'vertical', btnClass: 'btn-info' },
];

function Buttons() {
  return (
    <div className="widgets">
      <div className="row">
        <div className="col-md-3">
          <Panel title="Flat Buttons" panelClass="with-scroll button-panel">
            <div className="button-wrapper"><button type="button" className="btn btn-default">Default</button></div>
            <div className="button-wrapper"><button type="button" className="btn btn-primary">Primary</button></div>
            <div className="button-wrapper"><button type="button" className="btn btn-success">Success</button></div>
            <div className="button-wrapper"><button type="button" className="btn btn-info">Info</button></div>
            <div className="button-wrapper"><button type="button" className="btn btn-warning">Warning</button></div>
            <div className="button-wrapper"><button type="button" className="btn btn-danger">Danger</button></div>
          </Panel>
        </div>
        <div className="col-md-3">
          <Panel title="Raised Buttons" panelClass="with-scroll button-panel">
            <div className="button-wrapper"><button type="button" className="btn btn-default btn-raised">Default</button></div>
            <div className="button-wrapper"><button type="button" className="btn btn-primary btn-raised">Primary</button></div>
            <div className="button-wrapper"><button type="button" className="btn btn-success btn-raised">Success</button></div>
            <div className="button-wrapper"><button type="button" className="btn btn-info btn-raised">Info</button></div>
            <div className="button-wrapper"><button type="button" className="btn btn-warning btn-raised">Warning</button></div>
            <div className="button-wrapper"><button type="button" className="btn btn-danger btn-raised">Danger</button></div>
          </Panel>
        </div>
        <div className="col-md-3">
          <Panel title="Different sizes" panelClass="with-scroll button-panel df-size-button-panel">
            <div className="button-wrapper"><button type="button" className="btn btn-default btn-xs">Default</button></div>
            <div className="button-wrapper"><button type="button" className="btn btn-primary btn-sm">Primary</button></div>
            <div className="button-wrapper"><button type="button" className="btn btn-success btn-mm">Success</button></div>
            <div className="button-wrapper"><button type="button" className="btn btn-info btn-md">Info</button></div>
            <div className="button-wrapper"><button type="button" className="btn btn-warning btn-xm">Warning</button></div>
            <div className="button-wrapper"><button type="button" className="btn btn-danger btn-lg">Danger</button></div>
          </Panel>
        </div>
        <div className="col-md-3">
          <Panel title="Disabled" panelClass="with-scroll button-panel">
            <div className="button-wrapper"><button type="button" className="btn btn-default" disabled>Default</button></div>
            <div className="button-wrapper"><button type="button" className="btn btn-primary" disabled>Primary</button></div>
            <div className="button-wrapper"><button type="button" className="btn btn-success" disabled>Success</button></div>
            <div className="button-wrapper"><button type="button" className="btn btn-info" disabled>Info</button></div>
            <div className="button-wrapper"><button type="button" className="btn btn-warning" disabled>Warning</button></div>
            <div className="button-wrapper"><button type="button" className="btn btn-danger" disabled>Danger</button></div>
          </Panel>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Panel title="Icon Buttons" panelClass="with-scroll">
            <ul className="btn-list clearfix">
              <li><button type="button" className="btn btn-primary btn-icon"><i className="ion-android-download"></i></button></li>
              <li><button type="button" className="btn btn-default btn-icon"><i className="ion-stats-bars"></i></button></li>
              <li><button type="button" className="btn btn-success btn-icon"><i className="ion-android-checkmark-circle"></i></button></li>
              <li><button type="button" className="btn btn-info btn-icon"><i className="ion-information"></i></button></li>
              <li><button type="button" className="btn btn-warning btn-icon"><i className="ion-android-warning"></i></button></li>
              <li><button type="button" className="btn btn-danger btn-icon"><i className="ion-nuclear"></i></button></li>
            </ul>
            <h5 className="panel-subtitle">Buttons with icons</h5>
            <ul className="btn-list clearfix">
              <li><button type="button" className="btn btn-primary btn-with-icon"><i className="ion-android-download"></i>Primary</button></li>
              <li><button type="button" className="btn btn-default btn-with-icon"><i className="ion-stats-bars"></i>Default</button></li>
              <li><button type="button" className="btn btn-success btn-with-icon"><i className="ion-android-checkmark-circle"></i>Success</button></li>
              <li><button type="button" className="btn btn-info btn-with-icon"><i className="ion-information"></i>Info</button></li>
              <li><button type="button" className="btn btn-warning btn-with-icon"><i className="ion-android-warning"></i>Warning</button></li>
              <li><button type="button" className="btn btn-danger btn-with-icon"><i className="ion-nuclear"></i>Danger</button></li>
            </ul>
          </Panel>
          <Panel title="Large Buttons" panelClass="with-scroll large-buttons-panel">
            <div className="row btns-row btns-same-width-lg">
              <div className="col-sm-4 col-xs-6"><button type="button" className="btn btn-primary btn-lg">Primary</button></div>
              <div className="col-sm-4 col-xs-6"><button type="button" className="btn btn-success btn-lg">Success</button></div>
              <div className="col-sm-4 col-xs-6"><button type="button" className="btn btn-info btn-lg">Info</button></div>
              <div className="col-sm-4 col-xs-6"><button type="button" className="btn btn-default btn-lg">Default</button></div>
              <div className="col-sm-4 col-xs-6"><button type="button" className="btn btn-warning btn-lg">Warning</button></div>
              <div className="col-sm-4 col-xs-6"><button type="button" className="btn btn-danger btn-lg">Danger</button></div>
            </div>
          </Panel>
        </div>
        <div className="col-md-6">
          <Panel title="Button Dropdowns" panelClass="with-scroll">
            <div className="row btns-row">
              <div className="col-sm-4 col-xs-6"><DropdownButton label="Primary" btnClass="btn-primary" /></div>
              <div className="col-sm-4 col-xs-6"><DropdownButton label="Success" btnClass="btn-success" /></div>
              <div className="col-sm-4 col-xs-6"><DropdownButton label="Info" btnClass="btn-info" /></div>
              <div className="col-sm-4 col-xs-6"><DropdownButton label="Default" btnClass="btn-default" /></div>
              <div className="col-sm-4 col-xs-6"><DropdownButton label="Warning" btnClass="btn-warning" /></div>
              <div className="col-sm-4 col-xs-6"><DropdownButton label="Danger" btnClass="btn-danger" /></div>
            </div>
            <h5 className="panel-subtitle">Split button dropdowns</h5>
            <div className="row btns-row">
              <div className="col-sm-4 col-xs-6"><SplitDropdownButton label="Primary" btnClass="btn-primary" /></div>
              <div className="col-sm-4 col-xs-6"><SplitDropdownButton label="Success" btnClass="btn-success" /></div>
              <div className="col-sm-4 col-xs-6"><SplitDropdownButton label="Info" btnClass="btn-info" /></div>
              <div className="col-sm-4 col-xs-6"><SplitDropdownButton label="Default" btnClass="btn-default" /></div>
              <div className="col-sm-4 col-xs-6"><SplitDropdownButton label="Warning" btnClass="btn-warning" /></div>
              <div className="col-sm-4 col-xs-6"><SplitDropdownButton label="Danger" btnClass="btn-danger" /></div>
            </div>
          </Panel>
          <Panel title="Button Groups" panelClass="with-scroll">
            <div className="btn-group-example">
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-danger">Left</button>
                <button type="button" className="btn btn-danger">Middle</button>
                <button type="button" className="btn btn-danger">Right</button>
              </div>
            </div>
            <div className="btn-toolbar-example">
              <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group" role="group" aria-label="First group">
                  <button type="button" className="btn btn-primary">1</button>
                  <button type="button" className="btn btn-primary">2</button>
                  <button type="button" className="btn btn-primary">3</button>
                  <button type="button" className="btn btn-primary">4</button>
                </div>
                <div className="btn-group" role="group" aria-label="Second group">
                  <button type="button" className="btn btn-primary">5</button>
                  <button type="button" className="btn btn-primary">6</button>
                  <button type="button" className="btn btn-primary">7</button>
                </div>
                <div className="btn-group" role="group" aria-label="Third group">
                  <button type="button" className="btn btn-primary">8</button>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <Panel title="Progress Buttons" panelClass="with-scroll">
            <div className="progress-buttons-container text-center default-text">
              {[0, 1, 2, 3].map(function (rowIdx) {
                return (
                  <div className="row" key={rowIdx}>
                    {progressStyles.slice(rowIdx * 4, rowIdx * 4 + 4).map(function (item) {
                      return (
                        <section className="col-md-6 col-lg-3" key={item.title}>
                          <span className="button-title" dangerouslySetInnerHTML={{ __html: item.title.replace(' perspective', ' <br/>perspective').replace(' horizontal', ' <br/>horizontal').replace(' vertical', ' <br/>vertical') }}></span>
                          <ProgressButton className={'btn ' + item.btnClass} style={item.style} direction={item.direction}>Submit</ProgressButton>
                        </section>
                      );
                    })}
                  </div>
                );
              })}
              <div className="row">
                {progressLastRow.map(function (item) {
                  return (
                    <section className="col-md-6" key={item.title}>
                      <span className="button-title" dangerouslySetInnerHTML={{ __html: item.title.replace(' horizontal', ' <br/>horizontal').replace(' vertical', ' <br/>vertical') }}></span>
                      <ProgressButton className={'btn ' + item.btnClass} style={item.style} direction={item.direction}>Submit</ProgressButton>
                    </section>
                  );
                })}
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

export default Buttons;
