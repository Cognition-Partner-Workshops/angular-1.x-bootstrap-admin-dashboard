/**
 * ProgressBarsPage — React migration of src/app/pages/ui/progressBars.
 * Static Bootstrap progress bar markup; ba-panel directives pre-resolved.
 */
import React from 'react';

function bar(extraClass, valuenow, label) {
  return '<div class="progress">'
    + '<div class="progress-bar ' + extraClass + '" role="progressbar" aria-valuenow="' + valuenow
    + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + valuenow + '%">' + label + '</div>'
    + '</div>';
}

function srBar(extraClass, valuenow, text) {
  return bar(extraClass, valuenow, '<span class="sr-only">' + text + '</span>');
}

var BASIC = ''
  + srBar('progress-bar-success', 40, '40% Complete (success)')
  + srBar('progress-bar-info', 20, '20% Complete')
  + srBar('progress-bar-warning', 60, '60% Complete (warning)')
  + srBar('progress-bar-danger', 80, '80% Complete (danger)');

var STRIPED = ''
  + srBar('progress-bar-success progress-bar-striped', 40, '40% Complete (success)')
  + srBar('progress-bar-info progress-bar-striped', 20, '20% Complete')
  + srBar('progress-bar-warning progress-bar-striped', 60, '60% Complete (warning)')
  + srBar('progress-bar-danger progress-bar-striped', 80, '80% Complete (danger)');

var LABEL = ''
  + bar('progress-bar-success', 40, '40% Complete (success)')
  + bar('progress-bar-info', 20, '20% Complete')
  + bar('progress-bar-warning', 60, '60% Complete (warning)')
  + bar('progress-bar-danger', 80, '80% Complete (danger)');

var ANIMATED = ''
  + srBar('progress-bar-success progress-bar-striped active', 40, '40% Complete (success)')
  + srBar('progress-bar-info progress-bar-striped active', 20, '20% Complete')
  + srBar('progress-bar-warning progress-bar-striped active', 60, '60% Complete (warning)')
  + srBar('progress-bar-danger progress-bar-striped active', 80, '80% Complete (danger)');

var STACKED = '<div class="progress">'
  + '<div class="progress-bar progress-bar-success" style="width: 35%"><span class="sr-only">35% Complete (success)</span></div>'
  + '<div class="progress-bar progress-bar-warning progress-bar-striped" style="width: 20%"><span class="sr-only">20% Complete (warning)</span></div>'
  + '<div class="progress-bar progress-bar-danger" style="width: 10%"><span class="sr-only">10% Complete (danger)</span></div>'
  + '<div class="progress-bar progress-bar-info progress-bar-striped active" style="width: 20%"><span class="sr-only">20% Complete (warning)</span></div>'
  + '</div>';

function panel(title, body, outerClass) {
  return ''
    + '<div class="' + outerClass + '" ba-panel-title="' + title + '">'
    + '  <div class="panel with-scroll">'
    + '    <div class="panel-heading clearfix"><h3 class="panel-title">' + title + '</h3></div>'
    + '    <div class="panel-body"><div>' + body + '</div></div>'
    + '  </div>'
    + '</div>';
}

var HTML = ''
  + '<div class="widgets">'
  + '  <div class="row">'
  + '    <div class="col-md-6">' + panel('Basic', BASIC, '') + panel('Striped', STRIPED, '') + '</div>'
  + '    <div class="col-md-6">' + panel('With label', LABEL, '') + panel('Animated', ANIMATED, '') + '</div>'
  + '  </div>'
  + '  <div class="row">' + panel('Stacked', STACKED, 'col-md-12') + '</div>'
  + '</div>';

export function ProgressBarsPage() {
  return React.createElement('div', { dangerouslySetInnerHTML: { __html: HTML } });
}
