/**
 * AlertsPage — React migration of src/app/pages/ui/alerts.
 * Static content; ba-panel directives pre-resolved into rendered DOM.
 */
import React from 'react';

function panel(title, body) {
  return ''
    + '<div class="col-md-6" ba-panel-title="' + title + '">'
    + '  <div class="panel with-scroll">'
    + '    <div class="panel-heading clearfix"><h3 class="panel-title">' + title + '</h3></div>'
    + '    <div class="panel-body"><div>' + body + '</div></div>'
    + '  </div>'
    + '</div>';
}

var BASIC = ''
  + '<div class="alert bg-success"><strong>Well done!</strong> You successfully read this important alert message.</div>'
  + '<div class="alert bg-info"><strong>Heads up!</strong> This alert needs your attention, but it\'s not super important.</div>'
  + '<div class="alert bg-warning"><strong>Warning!</strong> Better check yourself, you\'re not looking too good.</div>'
  + '<div class="alert bg-danger"><strong>Oh snap!</strong> Change a few things up and try submitting again.</div>';

function dismissible(type, lead, rest) {
  return '<div class="alert bg-' + type + ' closeable" role="alert">'
    + '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
    + '<strong>' + lead + '</strong> ' + rest + '</div>';
}

var DISMISS = ''
  + dismissible('success', 'Well done!', 'You successfully read this important alert message.')
  + dismissible('info', 'Heads up!', 'This alert needs your attention, but it\'s not super important.')
  + dismissible('warning', 'Warning!', 'Better check yourself, you\'re not looking too good.')
  + dismissible('danger', 'Oh snap!', 'Change a few things up and try submitting again.');

var LINKS = ''
  + '<div class="alert bg-success"><strong>Well done!</strong> You successfully read <a href class="alert-link">this important alert message</a>.</div>'
  + '<div class="alert bg-info"><strong>Heads up!</strong> This <a href class="alert-link">alert needs your attention</a>, but it\'s not super important.</div>'
  + '<div class="alert bg-warning"><strong>Warning!</strong> Better check yourself, you\'re <a href class="alert-link">not looking too good</a>.</div>'
  + '<div class="alert bg-danger"><strong>Oh snap!</strong> <a href class="alert-link">Change a few things up</a> and try submitting again.</div>';

var COMPOSITE = ''
  + '<div class="alert bg-warning"><h4>Warning!</h4><strong>Pay attention.</strong> Change a few things up and try submitting again.'
  + '<div class="control-alert"><button type="button" class="btn btn-danger">Pay Attention</button> <button type="button" class="btn btn-primary">Ignore</button></div></div>';

var HTML = ''
  + '<div class="widgets">'
  + '  <div class="row">' + panel('Basic', BASIC) + panel('Dismissible alerts', DISMISS) + '</div>'
  + '  <div class="row">' + panel('Links in alerts', LINKS) + panel('Composite alerts', COMPOSITE) + '</div>'
  + '</div>';

export function AlertsPage() {
  return React.createElement('div', { dangerouslySetInnerHTML: { __html: HTML } });
}
