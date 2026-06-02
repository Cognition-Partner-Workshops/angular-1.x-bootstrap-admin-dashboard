import React, { useState, useCallback, useRef, useEffect } from 'react';

var quotes = [
  { title: 'Come to Fry', message: "I love you more than the moon and the stars and the... POETIC IMAGE NUMBER 37 NOT FOUND" },
  { title: 'Not Sure', message: "Not sure if new or just repainted" },
  { title: 'Bender', message: "Well, I'll go build my own theme park... with blackjack and hookers. In fact, forget the park!" },
  { title: 'Amy Wong', message: "Hi Hermes, just FYI I'm not going to be at work tomorrow. This fog is so thick I can't see where I'm going. Oh no..." },
  { title: 'Leela', message: "Fry, we have a crate to deliver." },
  { title: 'Zapp Brannigan', message: "I am the man with no name, Zapp Brannigan!" }
];

export function NotificationsPage() {
  var titleState = useState('Some title here');
  var title = titleState[0], setTitle = titleState[1];

  var messageState = useState('Type your message here');
  var message = messageState[0], setMessage = messageState[1];

  var closeButtonState = useState(true);
  var closeButton = closeButtonState[0], setCloseButton = closeButtonState[1];

  var allowHtmlState = useState(true);
  var allowHtml = allowHtmlState[0], setAllowHtml = allowHtmlState[1];

  var progressBarState = useState(true);
  var progressBar = progressBarState[0], setProgressBar = progressBarState[1];

  var preventDuplicatesState = useState(false);
  var preventDuplicates = preventDuplicatesState[0], setPreventDuplicates = preventDuplicatesState[1];

  var preventOpenDuplicatesState = useState(false);
  var preventOpenDuplicates = preventOpenDuplicatesState[0], setPreventOpenDuplicates = preventOpenDuplicatesState[1];

  var tapToDismissState = useState(true);
  var tapToDismiss = tapToDismissState[0], setTapToDismiss = tapToDismissState[1];

  var newestOnTopState = useState(true);
  var newestOnTop = newestOnTopState[0], setNewestOnTop = newestOnTopState[1];

  var autoDismissState = useState(false);
  var autoDismiss = autoDismissState[0], setAutoDismiss = autoDismissState[1];

  var toastTypeState = useState('success');
  var toastType = toastTypeState[0], setToastType = toastTypeState[1];

  var positionState = useState('toast-top-right');
  var position = positionState[0], setPosition = positionState[1];

  var timeOutState = useState('5000');
  var timeOut = timeOutState[0], setTimeOut = timeOutState[1];

  var extendedTimeOutState = useState('2000');
  var extendedTimeOut = extendedTimeOutState[0], setExtendedTimeOut = extendedTimeOutState[1];

  var openedToastsRef = useRef([]);

  var openToast = useCallback(function () {
    var toastr = window.toastr;
    if (!toastr) return;
    var opts = {
      closeButton: closeButton,
      progressBar: progressBar,
      preventDuplicates: preventDuplicates,
      preventOpenDuplicates: preventOpenDuplicates,
      tapToDismiss: tapToDismiss,
      newestOnTop: newestOnTop,
      autoDismiss: autoDismiss,
      positionClass: position,
      timeOut: timeOut,
      extendedTimeOut: extendedTimeOut
    };
    if (allowHtml) opts.allowHtml = true;
    var toast = toastr[toastType](message, title, opts);
    if (toast) {
      if (newestOnTop) {
        openedToastsRef.current.unshift(toast);
      } else {
        openedToastsRef.current.push(toast);
      }
    }
  }, [title, message, closeButton, allowHtml, progressBar, preventDuplicates, preventOpenDuplicates, tapToDismiss, newestOnTop, autoDismiss, toastType, position, timeOut, extendedTimeOut]);

  var openRandomToast = useCallback(function () {
    var toastr = window.toastr;
    if (!toastr) return;
    var types = ['success', 'info', 'warning', 'error'];
    var rndType = types[Math.floor(Math.random() * types.length)];
    var quote = quotes[Math.floor(Math.random() * quotes.length)];
    var opts = {
      closeButton: closeButton,
      progressBar: progressBar,
      preventDuplicates: preventDuplicates,
      preventOpenDuplicates: preventOpenDuplicates,
      tapToDismiss: tapToDismiss,
      newestOnTop: newestOnTop,
      autoDismiss: autoDismiss,
      positionClass: position,
      timeOut: timeOut,
      extendedTimeOut: extendedTimeOut
    };
    if (allowHtml) opts.allowHtml = true;
    var toast = toastr[rndType](quote.message, quote.title, opts);
    if (toast) {
      if (newestOnTop) {
        openedToastsRef.current.unshift(toast);
      } else {
        openedToastsRef.current.push(toast);
      }
    }
  }, [closeButton, allowHtml, progressBar, preventDuplicates, preventOpenDuplicates, tapToDismiss, newestOnTop, autoDismiss, position, timeOut, extendedTimeOut]);

  var clearLastToast = useCallback(function () {
    var toastr = window.toastr;
    if (!toastr) return;
    var toasts = openedToastsRef.current;
    if (toasts.length > 0) {
      var toast = toasts.shift();
      toastr.clear(toast);
    }
  }, []);

  var clearToasts = useCallback(function () {
    var toastr = window.toastr;
    if (!toastr) return;
    toastr.clear();
    openedToastsRef.current = [];
  }, []);

  var checkboxes = [
    { id: 'closeButton', label: 'Close Button', checked: closeButton, onChange: function () { setCloseButton(function (v) { return !v; }); } },
    { id: 'html', label: 'Allow HTML', checked: allowHtml, onChange: function () { setAllowHtml(function (v) { return !v; }); } },
    { id: 'progressBar', label: 'Progress Bar', checked: progressBar, onChange: function () { setProgressBar(function (v) { return !v; }); } },
    { id: 'preventDuplicates', label: 'Prevent Duplicates', checked: preventDuplicates, onChange: function () { setPreventDuplicates(function (v) { return !v; }); } },
    { id: 'preventOpenDuplicates', label: 'Prevent Open Duplicates', checked: preventOpenDuplicates, onChange: function () { setPreventOpenDuplicates(function (v) { return !v; }); } },
    { id: 'tapToDismiss', label: 'Tap To Dismiss', checked: tapToDismiss, onChange: function () { setTapToDismiss(function (v) { return !v; }); } },
    { id: 'newestOnTop', label: 'Newest On Top', checked: newestOnTop, onChange: function () { setNewestOnTop(function (v) { return !v; }); } },
    { id: 'autoDismiss', label: 'Auto Dismiss', checked: autoDismiss, onChange: function () { setAutoDismiss(function (v) { return !v; }); } }
  ];

  var toastTypes = ['success', 'info', 'warning', 'error'];
  var positions = [
    { value: 'toast-top-right', label: 'Top Right' },
    { value: 'toast-bottom-right', label: 'Bottom Right' },
    { value: 'toast-bottom-left', label: 'Bottom Left' },
    { value: 'toast-top-left', label: 'Top Left' },
    { value: 'toast-top-full-width', label: 'Top Full Width' },
    { value: 'toast-bottom-full-width', label: 'Bottom Full Width' },
    { value: 'toast-top-center', label: 'Top Center' },
    { value: 'toast-bottom-center', label: 'Bottom Center' }
  ];

  return React.createElement('div', { className: 'notification-panel' },
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-12' },
        React.createElement('div', { className: 'row' },
          React.createElement('div', { className: 'col-md-3' },
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { htmlFor: 'title' }, 'Title'),
              React.createElement('input', { type: 'text', className: 'form-control', id: 'title', value: title, onChange: function (e) { setTitle(e.target.value); } })
            ),
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { htmlFor: 'message' }, 'Message'),
              React.createElement('textarea', { className: 'form-control', id: 'message', rows: '3', value: message, onChange: function (e) { setMessage(e.target.value); } })
            )
          ),
          React.createElement('div', { className: 'col-md-3' },
            checkboxes.map(function (cb) {
              return React.createElement('div', { key: cb.id, className: 'checkbox' },
                React.createElement('label', null,
                  React.createElement('input', { type: 'checkbox', id: cb.id, checked: cb.checked, onChange: cb.onChange }),
                  ' ' + cb.label
                )
              );
            })
          ),
          React.createElement('div', { className: 'col-md-3' },
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', null, 'Toast Type'),
              toastTypes.map(function (t) {
                return React.createElement('div', { key: t, className: 'radio' },
                  React.createElement('label', null,
                    React.createElement('input', { type: 'radio', name: 'toasts', value: t, checked: toastType === t, onChange: function () { setToastType(t); } }),
                    ' ' + t.charAt(0).toUpperCase() + t.slice(1)
                  )
                );
              })
            )
          ),
          React.createElement('div', { className: 'col-md-3' },
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', null, 'Position'),
              positions.map(function (p) {
                return React.createElement('div', { key: p.value, className: 'radio' },
                  React.createElement('label', null,
                    React.createElement('input', { type: 'radio', name: 'positions', value: p.value, checked: position === p.value, onChange: function () { setPosition(p.value); } }),
                    ' ' + p.label
                  )
                );
              })
            )
          )
        ),
        React.createElement('div', { className: 'row' },
          React.createElement('div', { className: 'col-md-3' },
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { htmlFor: 'timeOut' }, 'Time out'),
              React.createElement('input', { type: 'text', className: 'form-control', id: 'timeOut', value: timeOut, onChange: function (e) { setTimeOut(e.target.value); } })
            )
          ),
          React.createElement('div', { className: 'col-md-3' },
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { htmlFor: 'extendedTimeOut' }, 'Extended time out'),
              React.createElement('input', { type: 'text', className: 'form-control', id: 'extendedTimeOut', value: extendedTimeOut, onChange: function (e) { setExtendedTimeOut(e.target.value); } })
            )
          )
        ),
        React.createElement('div', { className: 'row' },
          React.createElement('div', { className: 'col-md-12' },
            React.createElement('button', { type: 'button', className: 'btn btn-primary', onClick: openToast }, 'Open Toast'),
            React.createElement('button', { type: 'button', className: 'btn btn-primary', onClick: openRandomToast }, 'Random Toast'),
            React.createElement('button', { type: 'button', className: 'btn btn-danger', onClick: clearToasts }, 'Clear Toasts'),
            React.createElement('button', { type: 'button', className: 'btn btn-danger', onClick: clearLastToast }, 'Clear Last Toast')
          )
        )
      )
    )
  );
}
