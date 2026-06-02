/**
 * PanelsPage — React migration of src/app/pages/ui/panels.
 * Static content; ba-panel directives pre-resolved into rendered DOM.
 */
import React from 'react';

var LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac mi erat. Phasellus placerat, elit a laoreet semper, enim ipsum ultricies orci.';

var HTML = ''
  + '<h2>Default panels</h2>'
  + '<div class="row">'
  + '  <div class="col-md-12 col-lg-4"><div><div class="panel xsmall-panel light-text"><div class="panel-body">' + LOREM + '</div></div></div></div>'
  + '  <div class="col-md-12 col-lg-4"><div ba-panel-title="Panel with header"><div class="panel xsmall-panel light-text"><div class="panel-heading clearfix"><h3 class="panel-title">Panel with header</h3></div><div class="panel-body">' + LOREM + '</div></div></div></div>'
  + '  <div class="col-md-12 col-lg-4"><div ba-panel-title="Panel with header &amp; scroll"><div class="panel xsmall-panel with-scroll light-text"><div class="panel-heading clearfix"><h3 class="panel-title">Panel with header &amp; scroll</h3></div><div class="panel-body"><p>' + LOREM + '</p><p>' + LOREM + '</p></div></div></div></div>'
  + '</div>'

  + '<h2>Bootstrap panels</h2>'
  + '<div class="row">'
  + '  <div class="col-md-12 col-lg-4"><div class="panel panel-default bootstrap-panel xsmall-panel"><div class="panel-body"><p>A panel in bootstrap is a bordered box with some padding around its content.</p><p class="p-with-code">Panels are created with the <code>.panel</code> class.</p></div></div></div>'
  + '  <div class="col-md-12 col-lg-4"><div class="panel panel-default bootstrap-panel xsmall-panel"><div class="panel-heading">Panel Heading</div><div class="panel-body"><p class="p-with-code">The <code>.panel-heading</code> class adds a heading to the panel.</p></div></div></div>'
  + '  <div class="col-md-12 col-lg-4"><div class="panel panel-default bootstrap-panel"><div class="panel-body footer-panel"><p class="p-with-code">Wrap buttons or secondary text in <code>.panel-footer</code>.</p></div><div class="panel-footer">Panel Footer</div></div></div>'
  + '</div>'

  + '<h2>Panels with Contextual Classes</h2>'
  + '<div class="row">'
  + '  <div class="col-md-6 col-lg-4"><div class="panel panel-default contextual-example-panel bootstrap-panel"><div class="panel-heading">Panel with panel-default class</div><div class="panel-body">To color the panel, use contextual classes. This is sample <code>.panel-default</code> panel</div></div></div>'
  + '  <div class="col-md-6 col-lg-4"><div class="panel panel-primary contextual-example-panel bootstrap-panel"><div class="panel-heading">Panel with panel-primary class</div><div class="panel-body">Sample <code>.panel-primary</code> panel</div></div></div>'
  + '  <div class="col-md-6 col-lg-4"><div class="panel panel-success contextual-example-panel bootstrap-panel"><div class="panel-heading">Panel with panel-success class</div><div class="panel-body">Sample <code>.panel-success</code> panel</div></div></div>'
  + '  <div class="col-md-6 col-lg-4"><div class="panel panel-info contextual-example-panel bootstrap-panel"><div class="panel-heading">Panel with panel-info class</div><div class="panel-body">Sample <code>.panel-info</code> panel</div></div></div>'
  + '  <div class="col-md-6 col-lg-4"><div class="panel panel-warning contextual-example-panel bootstrap-panel"><div class="panel-heading">Panel with panel-warning class</div><div class="panel-body">Sample <code>.panel-warning</code> panel</div></div></div>'
  + '  <div class="col-md-6 col-lg-4"><div class="panel panel-danger contextual-example-panel bootstrap-panel"><div class="panel-heading">Panel with panel-danger class</div><div class="panel-body">Sample <code>.panel-danger</code> panel</div></div></div>'
  + '</div>'

  + '<div class="row"><div class="col-md-12">'
  + '  <h2>Panel Group</h2>'
  + '  <div class="panel-group">'
  + '    <div class="panel panel-default bootstrap-panel"><div class="panel-heading">Panel group 1</div><div class="panel-body"><p>To group many panels together, wrap a <code>&lt;div&gt;</code> with class <code>.panel-group</code> around them.</p></div></div>'
  + '    <div class="panel panel-default bootstrap-panel"><div class="panel-heading">Panel group 2</div><div class="panel-body"><p>The <code>.panel-group</code> class clears the bottom-margin of each panel.</p></div></div>'
  + '  </div>'
  + '</div></div>';

export function PanelsPage() {
  return React.createElement('div', { dangerouslySetInnerHTML: { __html: HTML } });
}
