/**
 * GridPage — React migration of src/app/pages/ui/grid.
 * Static Bootstrap grid examples (baseGrid.html) inside one panel.
 */
import React from 'react';

function showGrid(cols) {
  var inner = cols.map(function (c) {
    return '<div class="' + c.cls + '"><div>' + c.label + '</div></div>';
  }).join('');
  return '<div class="row show-grid">' + inner + '</div>';
}

function cols(cls, label, n) {
  var arr = [];
  for (var i = 0; i < n; i++) { arr.push({ cls: cls, label: label }); }
  return arr;
}

var BASEGRID = ''
  + '<h4 class="grid-h">Stacked to horizontal</h4>'
  + showGrid(cols('col-md-1', '.col-md-1', 12))
  + showGrid([{ cls: 'col-md-8', label: '.col-md-8' }, { cls: 'col-md-4', label: '.col-md-4' }])
  + showGrid(cols('col-md-4', '.col-md-4', 3))
  + showGrid(cols('col-md-6', '.col-md-6', 2))

  + '<h4 class="grid-h">Mobile and desktop</h4>'
  + showGrid([{ cls: 'col-xs-12 col-md-8', label: 'xs-12 .col-md-8' }, { cls: 'col-xs-6 col-md-4', label: 'xs-6 .col-md-4' }])
  + showGrid(cols('col-xs-6 col-md-4', 'xs-6 .col-md-4', 3))
  + showGrid(cols('col-xs-6', '.col-xs-6', 2))

  + '<h4 class="grid-h">Mobile, tablet, desktop</h4>'
  + showGrid([{ cls: 'col-xs-12 col-sm-6 col-md-8', label: '.col-xs-12 .col-sm-6 .col-md-8' }, { cls: 'col-xs-6 col-md-4', label: '.col-xs-6 .col-md-4' }])
  + '<div class="row show-grid"><div class="col-xs-6 col-sm-4"><div>.col-xs-6 .col-sm-4</div></div><div class="col-xs-6 col-sm-4"><div>.col-xs-6 .col-sm-4</div></div><div class="clearfix visible-xs-block"></div><div class="col-xs-6 col-sm-4"><div>.col-xs-6 .col-sm-4</div></div></div>'

  + '<h4 class="grid-h">Column wrapping</h4>'
  + '<div class="row show-grid"><div class="col-xs-9"><div>.col-xs-9</div></div><div class="col-xs-4"><div>.col-xs-4<br>Since 9 + 4 = 13 &gt; 12, this 4-column-wide div gets wrapped onto a new line.</div></div><div class="col-xs-6"><div>.col-xs-6<br>Subsequent columns continue along the new line.</div></div></div>'

  + '<h4 class="grid-h">Responsive column resets</h4>'
  + '<div class="row show-grid"><div class="col-xs-6 col-sm-3"><div>.col-xs-6 .col-sm-3 <p>Resize your viewport or check it out on your phone for an example.</p></div></div><div class="col-xs-6 col-sm-3"><div>.col-xs-6 .col-sm-3</div></div><div class="clearfix visible-xs-block"></div><div class="col-xs-6 col-sm-3"><div>.col-xs-6 .col-sm-3</div></div><div class="col-xs-6 col-sm-3"><div>.col-xs-6 .col-sm-3</div></div></div>'

  + '<h4 class="grid-h">Offsetting columns</h4>'
  + showGrid([{ cls: 'col-md-4', label: '.col-md-4' }, { cls: 'col-md-4 col-md-offset-4', label: '.col-md-4 .col-md-offset-4' }])
  + showGrid([{ cls: 'col-md-3 col-md-offset-3', label: '.col-md-3 .col-md-offset-3' }, { cls: 'col-md-3 col-md-offset-3', label: '.col-md-3 .col-md-offset-3' }])
  + showGrid([{ cls: 'col-md-6 col-md-offset-3', label: '.col-md-6 .col-md-offset-3' }])

  + '<h4 class="grid-h">Grid options</h4>'
  + '<div class="table-responsive"><table class="table table-bordered table-striped">'
  + '<thead><tr><th></th>'
  + '<th> Extra small devices <small>Phones (&lt;768px)</small></th>'
  + '<th> Small devices <small>Tablets (≥768px)</small></th>'
  + '<th> Medium devices <small>Desktops (≥992px)</small></th>'
  + '<th> Large devices <small>Desktops (≥1200px)</small></th></tr></thead>'
  + '<tbody>'
  + '<tr><th class="text-nowrap" scope="row">Grid behavior</th><td>Horizontal at all times</td><td colspan="3">Collapsed to start, horizontal above breakpoints</td></tr>'
  + '<tr><th class="text-nowrap" scope="row">Container width</th><td>None (auto)</td><td>750px</td><td>970px</td><td>1170px</td></tr>'
  + '<tr><th class="text-nowrap" scope="row">Class prefix</th><td><code>.col-xs-</code></td><td><code>.col-sm-</code></td><td><code>.col-md-</code></td><td><code>.col-lg-</code></td></tr>'
  + '<tr><th class="text-nowrap" scope="row"># of columns</th><td colspan="4">12</td></tr>'
  + '<tr><th class="text-nowrap" scope="row">Column width</th><td class="text-muted">Auto</td><td>~62px</td><td>~81px</td><td>~97px</td></tr>'
  + '<tr><th class="text-nowrap" scope="row">Gutter width</th><td colspan="4">30px (15px on each side of a column)</td></tr>'
  + '<tr><th class="text-nowrap" scope="row">Nestable</th><td colspan="4">Yes</td></tr>'
  + '<tr><th class="text-nowrap" scope="row">Offsets</th><td colspan="4">Yes</td></tr>'
  + '<tr><th class="text-nowrap" scope="row">Column ordering</th><td colspan="4">Yes</td></tr>'
  + '</tbody></table></div>';

var HTML = ''
  + '<div class="widgets">'
  + '  <div class="row">'
  + '    <div class="col-md-12" ba-panel-title="Inline Form">'
  + '      <div class="panel with-scroll">'
  + '        <div class="panel-heading clearfix"><h3 class="panel-title">Inline Form</h3></div>'
  + '        <div class="panel-body"><div>' + BASEGRID + '</div></div>'
  + '      </div>'
  + '    </div>'
  + '  </div>'
  + '</div>';

export function GridPage() {
  return React.createElement('div', { dangerouslySetInnerHTML: { __html: HTML } });
}
