import React from 'react';
import Panel from './Panel';

function ProgressBar({ variant, width, label, striped, animated }) {
  var cls = 'progress-bar progress-bar-' + variant;
  if (striped) cls += ' progress-bar-striped';
  if (animated) cls += ' active';

  return (
    <div className="progress">
      <div className={cls} role="progressbar" aria-valuenow={width} aria-valuemin="0" aria-valuemax="100" style={{ width: width + '%' }}>
        {label ? label : <span className="sr-only">{width}% Complete</span>}
      </div>
    </div>
  );
}

function ProgressBars() {
  return (
    <div className="widgets">
      <div className="row">
        <div className="col-md-6">
          <Panel title="Basic" panelClass="with-scroll">
            <ProgressBar variant="success" width={40} />
            <ProgressBar variant="info" width={20} />
            <ProgressBar variant="warning" width={60} />
            <ProgressBar variant="danger" width={80} />
          </Panel>
          <Panel title="Striped" panelClass="with-scroll">
            <ProgressBar variant="success" width={40} striped />
            <ProgressBar variant="info" width={20} striped />
            <ProgressBar variant="warning" width={60} striped />
            <ProgressBar variant="danger" width={80} striped />
          </Panel>
        </div>
        <div className="col-md-6">
          <Panel title="With label" panelClass="with-scroll">
            <ProgressBar variant="success" width={40} label="40% Complete (success)" />
            <ProgressBar variant="info" width={20} label="20% Complete" />
            <ProgressBar variant="warning" width={60} label="60% Complete (warning)" />
            <ProgressBar variant="danger" width={80} label="80% Complete (danger)" />
          </Panel>
          <Panel title="Animated" panelClass="with-scroll">
            <ProgressBar variant="success" width={40} striped animated />
            <ProgressBar variant="info" width={20} striped animated />
            <ProgressBar variant="warning" width={60} striped animated />
            <ProgressBar variant="danger" width={80} striped animated />
          </Panel>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <Panel title="Stacked" panelClass="with-scroll">
            <div className="progress">
              <div className="progress-bar progress-bar-success" style={{ width: '35%' }}>
                <span className="sr-only">35% Complete (success)</span>
              </div>
              <div className="progress-bar progress-bar-warning progress-bar-striped" style={{ width: '20%' }}>
                <span className="sr-only">20% Complete (warning)</span>
              </div>
              <div className="progress-bar progress-bar-danger" style={{ width: '10%' }}>
                <span className="sr-only">10% Complete (danger)</span>
              </div>
              <div className="progress-bar progress-bar-info progress-bar-striped active" style={{ width: '20%' }}>
                <span className="sr-only">20% Complete (warning)</span>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

export default ProgressBars;
