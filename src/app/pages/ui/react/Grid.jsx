import React from 'react';
import Panel from './Panel';

function Grid() {
  return (
    <div className="widgets">
      <div className="row">
        <div className="col-md-12">
          <Panel title="Inline Form" panelClass="with-scroll">
            <h4 className="grid-h">Stacked to horizontal</h4>
            <div className="row show-grid">
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(function (n) {
                return <div className="col-md-1" key={n}><div>.col-md-1</div></div>;
              })}
            </div>
            <div className="row show-grid">
              <div className="col-md-8"><div>.col-md-8</div></div>
              <div className="col-md-4"><div>.col-md-4</div></div>
            </div>
            <div className="row show-grid">
              <div className="col-md-4"><div>.col-md-4</div></div>
              <div className="col-md-4"><div>.col-md-4</div></div>
              <div className="col-md-4"><div>.col-md-4</div></div>
            </div>
            <div className="row show-grid">
              <div className="col-md-6"><div>.col-md-6</div></div>
              <div className="col-md-6"><div>.col-md-6</div></div>
            </div>

            <h4 className="grid-h">Mobile and desktop</h4>
            <div className="row show-grid">
              <div className="col-xs-12 col-md-8"><div>xs-12 .col-md-8</div></div>
              <div className="col-xs-6 col-md-4"><div>xs-6 .col-md-4</div></div>
            </div>
            <div className="row show-grid">
              <div className="col-xs-6 col-md-4"><div>xs-6 .col-md-4</div></div>
              <div className="col-xs-6 col-md-4"><div>xs-6 .col-md-4</div></div>
              <div className="col-xs-6 col-md-4"><div>xs-6 .col-md-4</div></div>
            </div>
            <div className="row show-grid">
              <div className="col-xs-6"><div>.col-xs-6</div></div>
              <div className="col-xs-6"><div>.col-xs-6</div></div>
            </div>

            <h4 className="grid-h">Mobile, tablet, desktop</h4>
            <div className="row show-grid">
              <div className="col-xs-12 col-sm-6 col-md-8"><div>.col-xs-12 .col-sm-6 .col-md-8</div></div>
              <div className="col-xs-6 col-md-4"><div>.col-xs-6 .col-md-4</div></div>
            </div>
            <div className="row show-grid">
              <div className="col-xs-6 col-sm-4"><div>.col-xs-6 .col-sm-4</div></div>
              <div className="col-xs-6 col-sm-4"><div>.col-xs-6 .col-sm-4</div></div>
              <div className="clearfix visible-xs-block"></div>
              <div className="col-xs-6 col-sm-4"><div>.col-xs-6 .col-sm-4</div></div>
            </div>

            <h4 className="grid-h">Column wrapping</h4>
            <div className="row show-grid">
              <div className="col-xs-9"><div>.col-xs-9</div></div>
              <div className="col-xs-4"><div>.col-xs-4<br />Since 9 + 4 = 13 &gt; 12, this 4-column-wide div gets wrapped onto a new line as one contiguous unit.</div></div>
              <div className="col-xs-6"><div>.col-xs-6<br />Subsequent columns continue along the new line.</div></div>
            </div>

            <h4 className="grid-h">Responsive column resets</h4>
            <div className="row show-grid">
              <div className="col-xs-6 col-sm-3"><div>.col-xs-6 .col-sm-3 <p>Resize your viewport or check it out on your phone for an example.</p></div></div>
              <div className="col-xs-6 col-sm-3"><div>.col-xs-6 .col-sm-3</div></div>
              <div className="clearfix visible-xs-block"></div>
              <div className="col-xs-6 col-sm-3"><div>.col-xs-6 .col-sm-3</div></div>
              <div className="col-xs-6 col-sm-3"><div>.col-xs-6 .col-sm-3</div></div>
            </div>

            <h4 className="grid-h">Offsetting columns</h4>
            <div className="row show-grid">
              <div className="col-md-4"><div>.col-md-4</div></div>
              <div className="col-md-4 col-md-offset-4"><div>.col-md-4 .col-md-offset-4</div></div>
            </div>
            <div className="row show-grid">
              <div className="col-md-3 col-md-offset-3"><div>.col-md-3 .col-md-offset-3</div></div>
              <div className="col-md-3 col-md-offset-3"><div>.col-md-3 .col-md-offset-3</div></div>
            </div>
            <div className="row show-grid">
              <div className="col-md-6 col-md-offset-3"><div>.col-md-6 .col-md-offset-3</div></div>
            </div>

            <h4 className="grid-h">Grid options</h4>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th></th>
                    <th>Extra small devices <small>Phones (&lt;768px)</small></th>
                    <th>Small devices <small>Tablets (&ge;768px)</small></th>
                    <th>Medium devices <small>Desktops (&ge;992px)</small></th>
                    <th>Large devices <small>Desktops (&ge;1200px)</small></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="text-nowrap">Grid behavior</th>
                    <td>Horizontal at all times</td>
                    <td colSpan="3">Collapsed to start, horizontal above breakpoints</td>
                  </tr>
                  <tr>
                    <th className="text-nowrap">Container width</th>
                    <td>None (auto)</td><td>750px</td><td>970px</td><td>1170px</td>
                  </tr>
                  <tr>
                    <th className="text-nowrap">Class prefix</th>
                    <td><code>.col-xs-</code></td><td><code>.col-sm-</code></td><td><code>.col-md-</code></td><td><code>.col-lg-</code></td>
                  </tr>
                  <tr>
                    <th className="text-nowrap"># of columns</th>
                    <td colSpan="4">12</td>
                  </tr>
                  <tr>
                    <th className="text-nowrap">Column width</th>
                    <td>Auto</td><td>~62px</td><td>~81px</td><td>~97px</td>
                  </tr>
                  <tr>
                    <th className="text-nowrap">Gutter width</th>
                    <td colSpan="4">30px (15px on each side of a column)</td>
                  </tr>
                  <tr>
                    <th className="text-nowrap">Nestable</th>
                    <td colSpan="4">Yes</td>
                  </tr>
                  <tr>
                    <th className="text-nowrap">Offsets</th>
                    <td colSpan="4">Yes</td>
                  </tr>
                  <tr>
                    <th className="text-nowrap">Column ordering</th>
                    <td colSpan="4">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

export default Grid;
