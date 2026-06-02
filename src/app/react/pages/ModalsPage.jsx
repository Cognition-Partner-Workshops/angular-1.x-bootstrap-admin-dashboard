/**
 * ModalsPage — migrated from src/app/pages/ui/modals
 * (ModalsPageCtrl.js + modals.html + modalTemplates/ + notifications/ + progressModal/).
 *
 * The original opened modals via $uibModal.open({ templateUrl, size }). Here a
 * single <Modal> child component is driven by component state; the active modal
 * "kind" selects which content block to render. Toastr notifications and the
 * auto-advancing progress dialog are reproduced in React.
 */
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { BaPanel } from '../components/BaPanel';
import { Modal } from '../components/Modal';

var LOREM = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.';

function BasicModalContent({ onClose }) {
  return React.createElement('div', { className: 'modal-content' },
    React.createElement('div', { className: 'modal-header' },
      React.createElement('button', { type: 'button', className: 'close', onClick: onClose, 'aria-label': 'Close' },
        React.createElement('em', { className: 'ion-ios-close-empty sn-link-close' })),
      React.createElement('h4', { className: 'modal-title', id: 'myModalLabel' }, 'Modal title')
    ),
    React.createElement('div', { className: 'modal-body' }, LOREM),
    React.createElement('div', { className: 'modal-footer' },
      React.createElement('button', { type: 'button', className: 'btn btn-primary', onClick: onClose }, 'Save changes'))
  );
}

var MESSAGE_MODALS = {
  success: { bg: 'bg-success', icon: 'ion-checkmark', label: 'Success', body: 'Your information has been saved successfully', btn: 'btn-success' },
  info: { bg: 'bg-info', icon: 'ion-information-circled', label: 'Information', body: "You've got a new email!", btn: 'btn-info' },
  warning: { bg: 'bg-warning', icon: 'ion-android-warning', label: 'Warning', body: 'Your computer is about to explode!', btn: 'btn-warning' },
  danger: { bg: 'bg-danger', icon: 'ion-flame', label: 'Error', body: "Your information hasn't been saved!", btn: 'btn-danger' },
};

function MessageModalContent({ kind, onClose }) {
  var cfg = MESSAGE_MODALS[kind];
  return React.createElement('div', { className: 'modal-content' },
    React.createElement('div', { className: 'modal-header ' + cfg.bg },
      React.createElement('i', { className: cfg.icon + ' modal-icon' }),
      React.createElement('span', null, ' ' + cfg.label)
    ),
    React.createElement('div', { className: 'modal-body text-center' }, cfg.body),
    React.createElement('div', { className: 'modal-footer' },
      React.createElement('button', { type: 'button', className: 'btn ' + cfg.btn, onClick: onClose }, 'OK'))
  );
}

function ProgressModalContent({ progress }) {
  return React.createElement('div', { className: 'modal-content' },
    React.createElement('div', { className: 'modal-body' },
      React.createElement('div', { className: 'progress-bar-round' },
        React.createElement('div', { className: 'progress' },
          React.createElement('div', {
            className: 'progress-bar progress-bar-success',
            role: 'progressbar',
            'aria-valuenow': progress,
            'aria-valuemin': 0,
            'aria-valuemax': 100,
            style: { width: progress + '%' },
          }, progress + '%')
        )
      )
    ),
    React.createElement('div', { className: 'modal-footer' })
  );
}

export function ModalsPage({ toastr, $rootScope }) {
  // active: { kind: 'basic'|'success'|..., size?: 'lg'|'sm' } or null
  var [active, setActive] = useState(null);
  var [progressOpen, setProgressOpen] = useState(false);
  var [progress, setProgress] = useState(0);
  var timerRef = useRef(null);

  var close = function () { setActive(null); };

  var notify = function (method, message, title) {
    if (!toastr) { return; }
    var run = function () { toastr[method](message, title); };
    if ($rootScope && typeof $rootScope.$apply === 'function') {
      $rootScope.$apply(run);
    } else {
      run();
    }
  };

  var openProgress = function () {
    setProgress(0);
    setProgressOpen(true);
  };

  useEffect(function () {
    if (!progressOpen) { return undefined; }
    timerRef.current = setInterval(function () {
      setProgress(function (p) {
        if (p >= 100) {
          clearInterval(timerRef.current);
          setProgressOpen(false);
          return 100;
        }
        return p + 10;
      });
    }, 300);
    return function () { clearInterval(timerRef.current); };
  }, [progressOpen]);

  return React.createElement('div', { className: 'widgets' },
    React.createElement('div', { className: 'row' },
      React.createElement(BaPanel, { title: 'Modals', panelClass: 'with-scroll', outerClass: 'col-md-12' },
        React.createElement('div', { className: 'modal-buttons clearfix' },
          React.createElement('button', { type: 'button', className: 'btn btn-primary', 'data-toggle': 'modal', onClick: function () { setActive({ kind: 'basic', size: 'md' }); } }, 'Default modal'),
          React.createElement('button', { type: 'button', className: 'btn btn-success', 'data-toggle': 'modal', onClick: function () { setActive({ kind: 'basic', size: 'lg' }); } }, 'Large modal'),
          React.createElement('button', { type: 'button', className: 'btn btn-warning', 'data-toggle': 'modal', onClick: function () { setActive({ kind: 'basic', size: 'sm' }); } }, 'Small modal')
        )
      )
    ),
    React.createElement('div', { className: 'row' },
      React.createElement(BaPanel, { title: 'Message Modals', panelClass: 'with-scroll', outerClass: 'col-md-6' },
        React.createElement('div', { className: 'modal-buttons same-width clearfix' },
          React.createElement('button', { type: 'button', className: 'btn btn-success', 'data-toggle': 'modal', onClick: function () { setActive({ kind: 'success' }); } }, 'Success Message'),
          React.createElement('button', { type: 'button', className: 'btn btn-info', 'data-toggle': 'modal', onClick: function () { setActive({ kind: 'info' }); } }, 'Info Message'),
          React.createElement('button', { type: 'button', className: 'btn btn-warning', 'data-toggle': 'modal', onClick: function () { setActive({ kind: 'warning' }); } }, 'Warning Message'),
          React.createElement('button', { type: 'button', className: 'btn btn-danger', 'data-toggle': 'modal', onClick: function () { setActive({ kind: 'danger' }); } }, 'Danger Message')
        )
      ),
      React.createElement(BaPanel, { title: 'Notifications', panelClass: 'with-scroll', outerClass: 'col-md-6' },
        React.createElement('div', { className: 'modal-buttons same-width clearfix' },
          React.createElement('button', { type: 'button', className: 'btn btn-success', onClick: function () { notify('success', 'Your information has been saved successfully!'); } }, 'Success Notification'),
          React.createElement('button', { type: 'button', className: 'btn btn-info', onClick: function () { notify('info', "You've got a new email!", 'Information'); } }, 'Info Notification'),
          React.createElement('button', { type: 'button', className: 'btn btn-warning', onClick: function () { notify('warning', 'Your computer is about to explode!', 'Warning'); } }, 'Warning Notification'),
          React.createElement('button', { type: 'button', className: 'btn btn-danger', onClick: function () { notify('error', "Your information hasn't been saved!", 'Error'); } }, 'Danger Notification')
        )
      )
    ),
    React.createElement('div', { className: 'row' },
      React.createElement(BaPanel, { title: 'Progress dialogs', panelClass: 'with-scroll', outerClass: 'col-md-6' },
        React.createElement('div', { className: 'modal-buttons same-width clearfix' },
          React.createElement('button', { type: 'button', className: 'btn btn-info', 'data-toggle': 'modal', onClick: openProgress }, 'Progress dialog')
        )
      )
    ),
    React.createElement(Modal, { isOpen: !!active, size: active ? active.size : undefined, onClose: close },
      active
        ? (active.kind === 'basic'
            ? React.createElement(BasicModalContent, { onClose: close })
            : React.createElement(MessageModalContent, { kind: active.kind, onClose: close }))
        : null
    ),
    React.createElement(Modal, { isOpen: progressOpen, onClose: function () { setProgressOpen(false); } },
      React.createElement(ProgressModalContent, { progress: progress })
    )
  );
}
