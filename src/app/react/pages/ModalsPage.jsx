import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Panel } from '../components/Panel';

function ModalDialog({ isOpen, onClose, size, children }) {
  var overlayRef = useRef(null);

  useEffect(function () {
    if (isOpen) {
      document.body.classList.add('modal-open');
      var backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade in';
      document.body.appendChild(backdrop);
      return function () {
        document.body.classList.remove('modal-open');
        if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  var dialogClass = 'modal-dialog';
  if (size === 'lg') dialogClass += ' modal-lg';
  if (size === 'sm') dialogClass += ' modal-sm';

  return React.createElement('div', {
    ref: overlayRef,
    className: 'modal fade in',
    style: { display: 'block' },
    onClick: function (e) { if (e.target === overlayRef.current) onClose(); }
  },
    React.createElement('div', { className: dialogClass },
      children
    )
  );
}

function BasicModalContent({ onClose }) {
  return React.createElement('div', { className: 'modal-content' },
    React.createElement('div', { className: 'modal-header' },
      React.createElement('button', { type: 'button', className: 'close', onClick: onClose, 'aria-label': 'Close' },
        React.createElement('em', { className: 'ion-ios-close-empty sn-link-close' })
      ),
      React.createElement('h4', { className: 'modal-title', id: 'myModalLabel' }, 'Modal title')
    ),
    React.createElement('div', { className: 'modal-body' },
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.'
    ),
    React.createElement('div', { className: 'modal-footer' },
      React.createElement('button', { type: 'button', className: 'btn btn-primary', onClick: onClose }, 'Save changes')
    )
  );
}

function MessageModalContent({ onClose, type, icon, title, message }) {
  return React.createElement('div', { className: 'modal-content' },
    React.createElement('div', { className: 'modal-header bg-' + type },
      React.createElement('i', { className: icon + ' modal-icon' }),
      React.createElement('span', null, ' ' + title)
    ),
    React.createElement('div', { className: 'modal-body text-center' }, message),
    React.createElement('div', { className: 'modal-footer' },
      React.createElement('button', { type: 'button', className: 'btn btn-' + type, onClick: onClose }, 'OK')
    )
  );
}

function ProgressModalContent({ onClose }) {
  var ref = useRef(null);
  var intervalRef = useRef(null);
  var timerRef = useRef(null);

  useEffect(function () {
    var progress = 0;
    intervalRef.current = setInterval(function () {
      progress += 10;
      if (ref.current) {
        ref.current.style.width = progress + '%';
        ref.current.setAttribute('aria-valuenow', String(progress));
      }
      if (progress >= 100) {
        clearInterval(intervalRef.current);
        timerRef.current = setTimeout(function () { onClose(); }, 500);
      }
    }, 300);
    return function () { clearInterval(intervalRef.current); clearTimeout(timerRef.current); };
  }, [onClose]);

  return React.createElement('div', { className: 'modal-content' },
    React.createElement('div', { className: 'modal-header' },
      React.createElement('h4', { className: 'modal-title' }, 'Upload Dialog')
    ),
    React.createElement('div', { className: 'modal-body' },
      React.createElement('div', { className: 'progress' },
        React.createElement('div', {
          ref: ref,
          className: 'progress-bar progress-bar-primary progress-bar-striped active',
          role: 'progressbar',
          'aria-valuenow': '0',
          'aria-valuemin': '0',
          'aria-valuemax': '100',
          style: { width: '0%' }
        })
      )
    )
  );
}

export function ModalsPage() {
  var activeModal = useState(null);
  var modal = activeModal[0];
  var setModal = activeModal[1];

  var close = useCallback(function () { setModal(null); }, []);

  var messageModals = [
    { type: 'success', icon: 'ion-checkmark', title: 'Success', message: 'Your information has been saved successfully', btnLabel: 'Success Message', key: 'success' },
    { type: 'info', icon: 'ion-information-circled', title: 'Information', message: "You've got a new email!", btnLabel: 'Info Message', key: 'info' },
    { type: 'warning', icon: 'ion-android-warning', title: 'Warning', message: 'Your computer is about to explode!', btnLabel: 'Warning Message', key: 'warning' },
    { type: 'danger', icon: 'ion-flame', title: 'Error', message: "Your information hasn't been saved!", btnLabel: 'Danger Message', key: 'danger' }
  ];

  return React.createElement('div', { className: 'widgets' },
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-12', 'ba-panel-title': 'Modals', 'ba-panel-class': 'with-scroll' },
        React.createElement(Panel, { title: 'Modals', panelClass: 'with-scroll' },
          React.createElement('div', { className: 'modal-buttons clearfix' },
            React.createElement('button', { type: 'button', className: 'btn btn-primary', 'data-toggle': 'modal', onClick: function () { setModal('default'); } }, 'Default modal'),
            React.createElement('button', { type: 'button', className: 'btn btn-success', 'data-toggle': 'modal', onClick: function () { setModal('large'); } }, 'Large modal'),
            React.createElement('button', { type: 'button', className: 'btn btn-warning', 'data-toggle': 'modal', onClick: function () { setModal('small'); } }, 'Small modal')
          )
        )
      )
    ),
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-6', 'ba-panel-title': 'Message Modals', 'ba-panel-class': 'with-scroll' },
        React.createElement(Panel, { title: 'Message Modals', panelClass: 'with-scroll' },
          React.createElement('div', { className: 'modal-buttons same-width clearfix' },
            messageModals.map(function (m) {
              return React.createElement('button', {
                key: m.key,
                type: 'button',
                className: 'btn btn-' + m.type,
                'data-toggle': 'modal',
                onClick: function () { setModal(m.key); }
              }, m.btnLabel);
            })
          )
        )
      ),
      React.createElement('div', { className: 'col-md-6', 'ba-panel-title': 'Notifications', 'ba-panel-class': 'with-scroll' },
        React.createElement(Panel, { title: 'Notifications', panelClass: 'with-scroll' },
          React.createElement('p', null, 'Notifications panel placeholder')
        )
      )
    ),
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-6', 'ba-panel-title': 'Progress dialogs', 'ba-panel-class': 'with-scroll' },
        React.createElement(Panel, { title: 'Progress dialogs', panelClass: 'with-scroll' },
          React.createElement('div', { className: 'modal-buttons same-width clearfix' },
            React.createElement('button', {
              type: 'button',
              className: 'btn btn-info',
              'data-toggle': 'modal',
              onClick: function () { setModal('progress'); }
            }, 'Progress dialog')
          )
        )
      )
    ),

    React.createElement(ModalDialog, { isOpen: modal === 'default', onClose: close },
      React.createElement(BasicModalContent, { onClose: close })
    ),
    React.createElement(ModalDialog, { isOpen: modal === 'large', onClose: close, size: 'lg' },
      React.createElement(BasicModalContent, { onClose: close })
    ),
    React.createElement(ModalDialog, { isOpen: modal === 'small', onClose: close, size: 'sm' },
      React.createElement(BasicModalContent, { onClose: close })
    ),
    messageModals.map(function (m) {
      return React.createElement(ModalDialog, { key: 'modal-' + m.key, isOpen: modal === m.key, onClose: close },
        React.createElement(MessageModalContent, { onClose: close, type: m.type, icon: m.icon, title: m.title, message: m.message })
      );
    }),
    React.createElement(ModalDialog, { isOpen: modal === 'progress', onClose: close },
      React.createElement(ProgressModalContent, { onClose: close })
    )
  );
}
