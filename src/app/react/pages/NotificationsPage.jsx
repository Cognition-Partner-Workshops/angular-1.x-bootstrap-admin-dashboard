/**
 * NotificationsPage — migrated from src/app/pages/ui/notifications
 * (NotificationsPageCtrl.js + notifications.html).
 *
 * Reproduces the full toastr playground. The real angular-toastr `toastr`
 * service and `toastrConfig` are injected through the AngularJS bridge and
 * passed as props, so every option (positions incl. full-width, html, progress
 * bar, prevent-duplicates, newest-on-top, timeouts, etc.) behaves identically.
 */
import React from 'react';
import { useState, useRef } from 'react';
import { BaPanel } from '../components/BaPanel';

var TYPES = ['success', 'error', 'info', 'warning'];

var QUOTES = [
  { title: 'Come to Freenode', message: 'We rock at <em>#angularjs</em>', options: { allowHtml: true } },
  { title: 'Looking for bootstrap?', message: 'Try ui-bootstrap out!' },
  { title: 'Wants a better router?', message: 'We have you covered with ui-router' },
  { title: 'Angular 2', message: 'Is gonna rock the world' },
  { title: null, message: 'Titles are not always needed' },
  { title: null, message: 'Toastr rock!' },
  { title: 'What about nice html?', message: '<strong>Sure you <em>can!</em></strong>', options: { allowHtml: true } },
  { title: 'Ionic is <em>cool</em>', message: 'Best mobile framework ever', options: { allowHtml: true } },
];

var POSITIONS = [
  { value: 'toast-top-right', label: 'Top Right' },
  { value: 'toast-bottom-right', label: 'Bottom Right' },
  { value: 'toast-bottom-left', label: 'Bottom Left' },
  { value: 'toast-top-left', label: 'Top Left' },
  { value: 'toast-top-full-width', label: 'Top Full Width' },
  { value: 'toast-bottom-full-width', label: 'Bottom Full Width' },
  { value: 'toast-top-center', label: 'Top Center' },
  { value: 'toast-bottom-center', label: 'Bottom Center' },
];

var DEFAULT_OPTIONS = {
  autoDismiss: false,
  positionClass: 'toast-top-right',
  type: 'info',
  timeOut: '5000',
  extendedTimeOut: '2000',
  allowHtml: false,
  closeButton: false,
  tapToDismiss: true,
  progressBar: false,
  newestOnTop: true,
  maxOpened: 0,
  preventDuplicates: false,
  preventOpenDuplicates: false,
  title: 'Some title here',
  msg: 'Type your message here',
};

export function NotificationsPage({ toastr, toastrConfig, $rootScope }) {
  var [options, setOptions] = useState(DEFAULT_OPTIONS);
  var [optionsStr, setOptionsStr] = useState('');
  var openedToasts = useRef([]);

  var setOpt = function (key, value) {
    setOptions(function (prev) {
      var next = {};
      for (var k in prev) { next[k] = prev[k]; }
      next[key] = value;
      return next;
    });
  };

  var applyDigest = function (fn) {
    if ($rootScope && typeof $rootScope.$apply === 'function') {
      $rootScope.$apply(fn);
    } else {
      fn();
    }
  };

  var openToast = function () {
    applyDigest(function () {
      if (toastrConfig) {
        for (var k in options) {
          if (k !== 'msg' && k !== 'title') { toastrConfig[k] = options[k]; }
        }
        // toastrConfig also accepts these directly
        toastrConfig.positionClass = options.positionClass;
      }
      if (toastr) {
        openedToasts.current.push(toastr[options.type](options.msg, options.title));
      }
    });
    var strOptions = {};
    for (var o in options) { if (o !== 'msg' && o !== 'title') { strOptions[o] = options[o]; } }
    setOptionsStr("toastr." + options.type + "('" + options.msg + "', '" + options.title + "', " + JSON.stringify(strOptions, null, 2) + ")");
  };

  var openRandomToast = function () {
    var type = TYPES[Math.floor(Math.random() * TYPES.length)];
    var quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    applyDigest(function () {
      if (toastr) {
        openedToasts.current.push(toastr[type](quote.message, quote.title, quote.options));
      }
    });
    setOptionsStr("toastr." + type + "('" + quote.message + "', '" + quote.title + "', " + JSON.stringify(quote.options || {}, null, 2) + ")");
  };

  var clearToasts = function () {
    applyDigest(function () { if (toastr) { toastr.clear(); } });
  };

  var clearLastToast = function () {
    var toast = openedToasts.current.pop();
    applyDigest(function () { if (toastr) { toastr.clear(toast); } });
  };

  function checkbox(id, key, label) {
    return React.createElement('div', { className: 'control' },
      React.createElement('label', { className: 'checkbox-inline custom-checkbox nowrap' },
        React.createElement('input', {
          type: 'checkbox', id: id, checked: !!options[key],
          onChange: function (e) { setOpt(key, e.target.checked); },
        }),
        React.createElement('span', null, label)
      )
    );
  }

  function radio(name, key, value, label) {
    return React.createElement('label', { className: 'radio custom-radio' },
      React.createElement('input', {
        type: 'radio', name: name, value: value, checked: options[key] === value,
        onChange: function () { setOpt(key, value); },
      }),
      React.createElement('span', null, label)
    );
  }

  var titleCol = React.createElement('div', { className: 'col-md-3 col-sm-4' },
    React.createElement('div', { className: 'control' },
      React.createElement('label', { htmlFor: 'title' }, 'Title'),
      React.createElement('input', {
        type: 'text', className: 'form-control', id: 'title', placeholder: 'Enter a title ...',
        value: options.title, onChange: function (e) { setOpt('title', e.target.value); },
      })
    ),
    React.createElement('div', { className: 'control' },
      React.createElement('label', { htmlFor: 'message' }, 'Message'),
      React.createElement('textarea', {
        className: 'form-control', id: 'message', rows: 3, placeholder: 'Enter a message ...',
        value: options.msg, onChange: function (e) { setOpt('msg', e.target.value); },
      })
    ),
    React.createElement('div', { className: 'control-group' },
      checkbox('closeButton', 'closeButton', 'Close Button'),
      checkbox('html', 'allowHtml', 'Allow html'),
      checkbox('progressBar', 'progressBar', 'Progress bar'),
      checkbox('preventDuplicates', 'preventDuplicates', 'Prevent duplicates'),
      checkbox('preventOpenDuplicates', 'preventOpenDuplicates', 'Prevent open duplicates'),
      checkbox('tapToDismiss', 'tapToDismiss', 'Tap to dismiss'),
      checkbox('newestOnTop', 'newestOnTop', 'Newest on top')
    )
  );

  var radioCol = React.createElement('div', { className: 'col-md-2 col-sm-3 toastr-radio-setup' },
    React.createElement('div', { id: 'toastTypeGroup' },
      React.createElement('div', { className: 'controls radio-controls' },
        React.createElement('label', { className: 'radio-header' }, 'Toast Type'),
        radio('toasts', 'type', 'success', 'Success'),
        radio('toasts', 'type', 'info', 'Info'),
        radio('toasts', 'type', 'warning', 'Warning'),
        radio('toasts', 'type', 'error', 'Error')
      )
    ),
    React.createElement('div', { id: 'positionGroup' },
      React.createElement('div', { className: 'controls radio-controls' },
        React.createElement('label', { className: 'radio-header position-header' }, 'Position'),
        POSITIONS.map(function (p) {
          return React.createElement('span', { key: p.value }, radio('positions', 'positionClass', p.value, p.label));
        })
      )
    )
  );

  var timeoutCol = React.createElement('div', { className: 'col-md-2 col-sm-3' },
    React.createElement('div', { className: 'control' },
      React.createElement('label', { htmlFor: 'timeOut' }, 'Time out'),
      React.createElement('input', {
        type: 'text', className: 'form-control', id: 'timeOut', placeholder: 'ms',
        value: options.timeOut, onChange: function (e) { setOpt('timeOut', e.target.value); },
      }),
      React.createElement('label', { className: 'sub-label', htmlFor: 'timeOut' }, 'If you set it to 0, it will stick')
    ),
    React.createElement('div', { className: 'control' },
      React.createElement('label', { htmlFor: 'extendedTimeOut' }, 'Extended time out'),
      React.createElement('input', {
        type: 'text', className: 'form-control', id: 'extendedTimeOut', placeholder: 'ms',
        value: options.extendedTimeOut, onChange: function (e) { setOpt('extendedTimeOut', e.target.value); },
      })
    ),
    React.createElement('div', { className: 'control' },
      React.createElement('label', { htmlFor: 'maxOpened' }, 'Maximum number of toasts'),
      React.createElement('input', {
        type: 'text', className: 'form-control', id: 'maxOpened',
        value: options.maxOpened, onChange: function (e) { setOpt('maxOpened', e.target.value); },
      }),
      React.createElement('label', { htmlFor: 'maxOpened', className: 'sub-label' }, '0 means no limit')
    ),
    React.createElement('div', { className: 'control' },
      React.createElement('label', { className: 'checkbox-inline custom-checkbox nowrap' },
        React.createElement('input', {
          type: 'checkbox', id: 'autoDismiss', checked: !!options.autoDismiss,
          onChange: function (e) { setOpt('autoDismiss', e.target.checked); },
        }),
        React.createElement('span', null, 'Auto dismiss')
      )
    )
  );

  var resultCol = React.createElement('div', { className: 'col-md-5 col-sm-12' },
    React.createElement('label', null, 'Result:'),
    React.createElement('pre', { className: 'result-toastr', id: 'toastrOptions' }, optionsStr)
  );

  var buttonRow = React.createElement('div', { className: 'row' },
    React.createElement('div', { className: 'col-md-12 button-row' },
      React.createElement('button', { className: 'btn btn-primary', onClick: openToast }, 'Open Toast'),
      React.createElement('button', { className: 'btn btn-primary', onClick: openRandomToast }, 'Random Toast'),
      React.createElement('button', { className: 'btn btn-danger', onClick: clearToasts }, 'Clear Toasts'),
      React.createElement('button', { className: 'btn btn-danger', onClick: clearLastToast }, 'Clear Last Toast')
    )
  );

  return React.createElement(BaPanel, { panelClass: 'with-scroll notification-panel' },
    React.createElement('div', { className: 'row' }, titleCol, radioCol, timeoutCol, resultCol),
    buttonRow
  );
}
