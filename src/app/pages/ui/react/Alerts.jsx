import React, { useState } from 'react';
import Panel from './Panel';

function DismissibleAlert({ bgClass, children }) {
  var [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className={'alert ' + bgClass + ' closeable'} role="alert">
      <button type="button" className="close" aria-label="Close" onClick={function () { setVisible(false); }}>
        <span aria-hidden="true">&times;</span>
      </button>
      {children}
    </div>
  );
}

function Alerts() {
  return (
    <div className="widgets">
      <div className="row">
        <div className="col-md-6">
          <Panel title="Basic" panelClass="with-scroll">
            <div>
              <div className="alert bg-success"><strong>Well done!</strong> You successfully read this important alert message.</div>
              <div className="alert bg-info"><strong>Heads up!</strong> This alert needs your attention, but it{"'"}s not super important.</div>
              <div className="alert bg-warning"><strong>Warning!</strong> Better check yourself, you{"'"}re not looking too good.</div>
              <div className="alert bg-danger"><strong>Oh snap!</strong> Change a few things up and try submitting again.</div>
            </div>
          </Panel>
        </div>
        <div className="col-md-6">
          <Panel title="Dismissible alerts" panelClass="with-scroll">
            <div>
              <DismissibleAlert bgClass="bg-success"><strong>Well done!</strong> You successfully read this important alert message.</DismissibleAlert>
              <DismissibleAlert bgClass="bg-info"><strong>Heads up!</strong> This alert needs your attention, but it{"'"}s not super important.</DismissibleAlert>
              <DismissibleAlert bgClass="bg-warning"><strong>Warning!</strong> Better check yourself, you{"'"}re not looking too good.</DismissibleAlert>
              <DismissibleAlert bgClass="bg-danger"><strong>Oh snap!</strong> Change a few things up and try submitting again.</DismissibleAlert>
            </div>
          </Panel>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Panel title="Links in alerts" panelClass="with-scroll">
            <div>
              <div className="alert bg-success"><strong>Well done!</strong> You successfully read <a href="#" className="alert-link">this important alert message</a>.</div>
              <div className="alert bg-info"><strong>Heads up!</strong> This <a href="#" className="alert-link">alert needs your attention</a>, but it{"'"}s not super important.</div>
              <div className="alert bg-warning"><strong>Warning!</strong> Better check yourself, you{"'"}re <a href="#" className="alert-link">not looking too good</a>.</div>
              <div className="alert bg-danger"><strong>Oh snap!</strong> <a href="#" className="alert-link">Change a few things up</a> and try submitting again.</div>
            </div>
          </Panel>
        </div>
        <div className="col-md-6">
          <Panel title="Composite alerts" panelClass="with-scroll">
            <div>
              <div className="alert bg-warning">
                <h4>Warning!</h4>
                <strong>Pay attention.</strong> Change a few things up and try submitting again.
                <div className="control-alert">
                  <button type="button" className="btn btn-danger">Pay Attention</button>
                  <button type="button" className="btn btn-primary">Ignore</button>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

export default Alerts;
