/**
 * NotificationsPage — React migration of src/app/pages/ui/notifications.
 *
 * Toastr configuration form. State mirrors the original controller's
 * `$scope.options`. Toast creation uses the global angular-toastr instance when
 * available; the form/markup is the part exercised by the E2E suite.
 */
import React, { useState, useCallback } from 'react';

var TYPES = ['success', 'error', 'info', 'warning'];

var QUOTES = [
  { title: 'Come to Freenode', message: 'We rock at #angularjs', options: { allowHtml: true } },
  { title: 'Looking for bootstrap?', message: 'Try ui-bootstrap out!' },
  { title: 'Wants a better router?', message: 'We have you covered with ui-router' },
  { title: 'Angular 2', message: 'Is gonna rock the world' },
  { title: null, message: 'Titles are not always needed' },
  { title: null, message: 'Toastr rock!' },
  { title: 'What about nice html?', message: 'Sure you can!', options: { allowHtml: true } },
  { title: 'Ionic is cool', message: 'Best mobile framework ever', options: { allowHtml: true } }
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
  msg: 'Type your message here'
};

var POSITIONS = [
  { value: 'toast-top-right', label: 'Top Right' },
  { value: 'toast-bottom-right', label: 'Bottom Right' },
  { value: 'toast-bottom-left', label: 'Bottom Left' },
  { value: 'toast-top-left', label: 'Top Left' },
  { value: 'toast-top-full-width', label: 'Top Full Width' },
  { value: 'toast-bottom-full-width', label: 'Bottom Full Width' },
  { value: 'toast-top-center', label: 'Top Center' },
  { value: 'toast-bottom-center', label: 'Bottom Center' }
];

var RADIO_TYPES = [
  { value: 'success', label: 'Success' },
  { value: 'info', label: 'Info' },
  { value: 'warning', label: 'Warning' },
  { value: 'error', label: 'Error' }
];

var CHECKBOXES = [
  { id: 'closeButton', key: 'closeButton', label: 'Close Button' },
  { id: 'html', key: 'allowHtml', label: 'Allow html' },
  { id: 'progressBar', key: 'progressBar', label: 'Progress bar' },
  { id: 'preventDuplicates', key: 'preventDuplicates', label: 'Prevent duplicates' },
  { id: 'preventOpenDuplicates', key: 'preventOpenDuplicates', label: 'Prevent open duplicates' },
  { id: 'tapToDismiss', key: 'tapToDismiss', label: 'Tap to dismiss' },
  { id: 'newestOnTop', key: 'newestOnTop', label: 'Newest on top' }
];

export function NotificationsPage() {
  var [options, setOptions] = useState(DEFAULT_OPTIONS);
  var [optionsStr, setOptionsStr] = useState('');
  // openedToasts kept newest-first when newestOnTop is true (matches insertion order)
  var [openedToasts, setOpenedToasts] = useState([]);

  var setOption = useCallback(function (key, value) {
    setOptions(function (prev) {
      var next = {};
      for (var k in prev) { if (prev.hasOwnProperty(k)) { next[k] = prev[k]; } }
      next[key] = value;
      return next;
    });
  }, []);

  var getToastr = function () {
    return window.toastr || null;
  };

  var pushToast = function (toast) {
    setOpenedToasts(function (prev) {
      return options.newestOnTop ? [toast].concat(prev) : prev.concat([toast]);
    });
  };

  var openToast = useCallback(function () {
    var t = getToastr();
    var toast = t ? t[options.type](options.msg, options.title) : {};
    pushToast(toast);
    var strOptions = {};
    for (var o in options) {
      if (options.hasOwnProperty(o) && o !== 'msg' && o !== 'title') { strOptions[o] = options[o]; }
    }
    setOptionsStr("toastr." + options.type + "('" + options.msg + "', '" + options.title + "', "
      + JSON.stringify(strOptions, null, 2) + ")");
  }, [options]);

  var openRandomToast = useCallback(function () {
    var type = Math.floor(Math.random() * TYPES.length);
    var quote = Math.floor(Math.random() * QUOTES.length);
    var toastType = TYPES[type];
    var toastQuote = QUOTES[quote];
    var t = getToastr();
    var toast = t ? t[toastType](toastQuote.message, toastQuote.title, toastQuote.options) : {};
    pushToast(toast);
    setOptionsStr("toastr." + toastType + "('" + toastQuote.message + "', '" + toastQuote.title + "', "
      + JSON.stringify(toastQuote.options || {}, null, 2) + ")");
  }, [options.newestOnTop]);

  var clearToasts = useCallback(function () {
    var t = getToastr();
    if (t) { t.clear(); }
    setOpenedToasts([]);
  }, []);

  var clearLastToast = useCallback(function () {
    setOpenedToasts(function (prev) {
      if (!prev.length) { return prev; }
      // newest-first array → the last opened toast is at the front
      var toast = options.newestOnTop ? prev[0] : prev[prev.length - 1];
      var t = getToastr();
      if (t) { t.clear(toast); }
      return options.newestOnTop ? prev.slice(1) : prev.slice(0, prev.length - 1);
    });
  }, [options.newestOnTop]);

  function checkbox(cb) {
    return (
      <div className="control" key={cb.id}>
        <label className="checkbox-inline custom-checkbox nowrap">
          <input
            type="checkbox"
            id={cb.id}
            checked={!!options[cb.key]}
            onChange={function (e) { setOption(cb.key, e.target.checked); }}
          />
          <span>{cb.label}</span>
        </label>
      </div>
    );
  }

  return (
    <div>
      <div className="panel with-scroll notification-panel">
        <div className="panel-body">
          <div className="row">
            <div className="col-md-3 col-sm-4">
              <div className="control">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter a title ..."
                  value={options.title}
                  onChange={function (e) { setOption('title', e.target.value); }}
                />
              </div>
              <div className="control">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="3"
                  placeholder="Enter a message ..."
                  value={options.msg}
                  onChange={function (e) { setOption('msg', e.target.value); }}
                />
              </div>
              <div className="control-group">
                {CHECKBOXES.map(checkbox)}
              </div>
            </div>

            <div className="col-md-2 col-sm-3 toastr-radio-setup">
              <div id="toastTypeGroup">
                <div className="controls radio-controls">
                  <label className="radio-header">Toast Type</label>
                  {RADIO_TYPES.map(function (rt) {
                    return (
                      <label className="radio custom-radio" key={rt.value}>
                        <input
                          type="radio"
                          name="toasts"
                          value={rt.value}
                          checked={options.type === rt.value}
                          onChange={function () { setOption('type', rt.value); }}
                        />
                        <span>{rt.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div id="positionGroup">
                <div className="controls radio-controls">
                  <label className="radio-header position-header">Position</label>
                  {POSITIONS.map(function (p) {
                    return (
                      <label className="radio custom-radio" key={p.value}>
                        <input
                          type="radio"
                          name="positions"
                          value={p.value}
                          checked={options.positionClass === p.value}
                          onChange={function () { setOption('positionClass', p.value); }}
                        />
                        <span>{p.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="col-md-2 col-sm-3">
              <div className="control">
                <label htmlFor="timeOut">Time out</label>
                <input
                  type="text"
                  className="form-control"
                  id="timeOut"
                  placeholder="ms"
                  value={options.timeOut}
                  onChange={function (e) { setOption('timeOut', e.target.value); }}
                />
                <label className="sub-label" htmlFor="timeOut">If you set it to 0, it will stick</label>
              </div>
              <div className="control">
                <label htmlFor="extendedTimeOut">Extended time out</label>
                <input
                  type="text"
                  className="form-control"
                  id="extendedTimeOut"
                  placeholder="ms"
                  value={options.extendedTimeOut}
                  onChange={function (e) { setOption('extendedTimeOut', e.target.value); }}
                />
              </div>
              <div className="control">
                <label htmlFor="maxOpened">Maximum number of toasts</label>
                <input
                  type="text"
                  className="form-control"
                  id="maxOpened"
                  value={options.maxOpened}
                  onChange={function (e) { setOption('maxOpened', e.target.value); }}
                />
                <label htmlFor="maxOpened" className="sub-label">0 means no limit</label>
              </div>
              <div className="control">
                <label className="checkbox-inline custom-checkbox nowrap">
                  <input
                    type="checkbox"
                    id="autoDismiss"
                    checked={!!options.autoDismiss}
                    onChange={function (e) { setOption('autoDismiss', e.target.checked); }}
                  />
                  <span>Auto dismiss</span>
                </label>
              </div>
            </div>

            <div className="col-md-5 col-sm-12">
              <label>Result:</label>
              <pre className="result-toastr" id="toastrOptions">{optionsStr}</pre>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 button-row">
              <button onClick={openToast} className="btn btn-primary">Open Toast</button>
              <button onClick={openRandomToast} className="btn btn-primary">Random Toast</button>
              <button onClick={clearToasts} className="btn btn-danger">Clear Toasts</button>
              <button onClick={clearLastToast} className="btn btn-danger">Clear Last Toast</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
