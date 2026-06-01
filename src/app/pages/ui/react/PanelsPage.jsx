import React from 'react';
import Panel from './Panel';

function PanelsPage() {
  return (
    <div>
      <h2>Blur Admin Panels</h2>

      <div className="row">
        <div className="col-md-4">
          <Panel title="Simple panel">
            <p>Panel content</p>
          </Panel>
        </div>
        <div className="col-md-4">
          <Panel title="Panel with long content" panelClass="with-scroll">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sodales orci ante, sed ornare eros vestibulum ut. Ut accumsan vitae eros sit amet tristique. Nullam scelerisque nunc enim, non dignissim nibh faucibus ullamcorper. Fusce pulvinar libero vel ligula iaculis facilisis.</p>
          </Panel>
        </div>
        <div className="col-md-4">
          <Panel title="Panel without border" panelClass="borderless-panel">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Panel>
        </div>
      </div>

      <h2>Bootstrap Panels</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="panel panel-default bootstrap-panel">
            <div className="panel-heading">Default</div>
            <div className="panel-body">Default Panel</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="panel panel-default bootstrap-panel">
            <div className="panel-heading">With Footer</div>
            <div className="panel-body">Panel with footer</div>
            <div className="panel-footer">Panel footer</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="panel panel-default bootstrap-panel">
            <div className="panel-body">No heading</div>
          </div>
        </div>
      </div>

      <h2>Panels with Contextual Classes</h2>
      <div className="row">
        <div className="col-md-6 col-lg-4">
          <div className="panel panel-default contextual-example-panel bootstrap-panel">
            <div className="panel-heading">Panel with panel-default class</div>
            <div className="panel-body">To color the panel, use contextual classes. This is sample <code>.panel-default</code> panel</div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="panel panel-primary contextual-example-panel bootstrap-panel">
            <div className="panel-heading">Panel with panel-primary class</div>
            <div className="panel-body">Sample <code>.panel-primary</code> panel</div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="panel panel-success contextual-example-panel bootstrap-panel">
            <div className="panel-heading">Panel with panel-success class</div>
            <div className="panel-body">Sample <code>.panel-success</code> panel</div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="panel panel-info contextual-example-panel bootstrap-panel">
            <div className="panel-heading">Panel with panel-info class</div>
            <div className="panel-body">Sample <code>.panel-info</code> panel</div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="panel panel-warning contextual-example-panel bootstrap-panel">
            <div className="panel-heading">Panel with panel-warning class</div>
            <div className="panel-body">Sample <code>.panel-warning</code> panel</div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="panel panel-danger contextual-example-panel bootstrap-panel">
            <div className="panel-heading">Panel with panel-danger class</div>
            <div className="panel-body">Sample <code>.panel-danger</code> panel</div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <h2>Panel Group</h2>
          <div className="panel-group">
            <div className="panel panel-default bootstrap-panel">
              <div className="panel-heading">Panel group 1</div>
              <div className="panel-body">
                <p>To group many panels together, wrap a <code>&lt;div&gt;</code> with class <code>.panel-group</code> around them.</p>
              </div>
            </div>
            <div className="panel panel-default bootstrap-panel">
              <div className="panel-heading">Panel group 2</div>
              <div className="panel-body">
                <p>The <code>.panel-group</code> class clears the bottom-margin of each panel.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelsPage;
