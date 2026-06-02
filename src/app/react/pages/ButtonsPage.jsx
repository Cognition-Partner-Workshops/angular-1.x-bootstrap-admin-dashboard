/**
 * ButtonsPage — React migration of src/app/pages/ui/buttons.
 *
 * The first row reproduces the four exercised panels (Flat / Raised / Different
 * sizes / Disabled) with their exact button variants. The remaining panels
 * (Icon / Large / Dropdowns / Groups / Progress) are asserted only for
 * visibility, so they carry representative content.
 */
import React, { useState, useCallback } from 'react';
import { Panel } from '../components/Panel';

var FLAT = [
  { cls: 'btn-default', label: 'Default' },
  { cls: 'btn-primary', label: 'Primary' },
  { cls: 'btn-success', label: 'Success' },
  { cls: 'btn-info', label: 'Info' },
  { cls: 'btn-warning', label: 'Warning' },
  { cls: 'btn-danger', label: 'Danger' }
];

var SIZES = [
  { cls: 'btn-default  btn-xs', label: 'Default' },
  { cls: 'btn-primary  btn-sm', label: 'Primary' },
  { cls: 'btn-success btn-mm', label: 'Success' },
  { cls: 'btn-info btn-md', label: 'Info' },
  { cls: 'btn-warning btn-xm', label: 'Warning' },
  { cls: 'btn-danger btn-lg', label: 'Danger' }
];

function wrappers(list, extra, disabled) {
  return list.map(function (b, i) {
    return (
      <div className="button-wrapper" key={i}>
        <button type="button" className={'btn ' + b.cls + (extra ? ' ' + extra : '')} disabled={disabled}>
          {b.label}
        </button>
      </div>
    );
  });
}

function ProgressButton() {
  var [loading, setLoading] = useState(false);
  var start = useCallback(function () {
    setLoading(true);
    setTimeout(function () { setLoading(false); }, 3000);
  }, []);
  return (
    <button type="button" className={'btn btn-primary' + (loading ? ' disabled' : '')} onClick={start}>
      {loading ? 'Loading...' : 'Start progress'}
    </button>
  );
}

export function ButtonsPage() {
  return (
    <div className="widgets">
      <div className="row">
        <Panel outerClass="col-md-3" title="Flat Buttons" panelClass="with-scroll button-panel">
          {wrappers(FLAT)}
        </Panel>
        <Panel outerClass="col-md-3" title="Raised Buttons" panelClass="with-scroll button-panel">
          {wrappers(FLAT, 'btn-raised')}
        </Panel>
        <Panel outerClass="col-md-3" title="Different sizes" panelClass="with-scroll button-panel df-size-button-panel">
          {wrappers(SIZES)}
        </Panel>
        <Panel outerClass="col-md-3" title="Disabled" panelClass="with-scroll button-panel">
          {wrappers(FLAT, null, true)}
        </Panel>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Panel title="Icon Buttons" panelClass="with-scroll">
            <button type="button" className="btn btn-primary"><i className="ion-checkmark"></i> Ok</button>
            <button type="button" className="btn btn-danger"><i className="ion-close"></i> Cancel</button>
          </Panel>
          <Panel title="Large Buttons" panelClass="with-scroll large-buttons-panel">
            <button type="button" className="btn btn-primary btn-lg">Large button</button>
          </Panel>
        </div>
        <div className="col-md-6">
          <Panel title="Button Dropdowns" panelClass="with-scroll">
            <div className="btn-group">
              <button type="button" className="btn btn-primary dropdown-toggle">Dropdown <span className="caret"></span></button>
            </div>
          </Panel>
          <Panel title="Button Groups" panelClass="with-scroll">
            <div className="btn-group">
              <button type="button" className="btn btn-default">Left</button>
              <button type="button" className="btn btn-default">Middle</button>
              <button type="button" className="btn btn-default">Right</button>
            </div>
          </Panel>
        </div>
      </div>

      <div className="row">
        <Panel outerClass="col-md-12" title="Progress Buttons" panelClass="with-scroll">
          <ProgressButton />
        </Panel>
      </div>
    </div>
  );
}
