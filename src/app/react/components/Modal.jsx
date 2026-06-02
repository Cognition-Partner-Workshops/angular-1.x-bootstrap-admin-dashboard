/**
 * <Modal> — React equivalent of the angular-ui-bootstrap `$uibModal` window.
 *
 * Reproduces the compiled modal DOM (`.modal.fade.in` > `.modal-dialog` >
 * children, plus a `.modal-backdrop`) so existing theme CSS and E2E selectors
 * (e.g. `.modal-dialog`) keep working.
 *
 * Props:
 *   isOpen   — whether the modal is rendered
 *   size     — 'sm' | 'lg' (maps to modal-sm / modal-lg); omit for default
 *   onClose  — called when the backdrop or a dismiss control is clicked
 *   children — modal content (typically a `.modal-content` block)
 */
import React from 'react';
import { useEffect } from 'react';

export function Modal({ isOpen, size, onClose, children }) {
  useEffect(function () {
    if (isOpen) {
      document.body.classList.add('modal-open');
      return function () { document.body.classList.remove('modal-open'); };
    }
    return undefined;
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  var dialogClass = 'modal-dialog' + (size ? ' modal-' + size : '');

  return React.createElement(React.Fragment, null,
    React.createElement('div', {
      className: 'modal fade in',
      role: 'dialog',
      tabIndex: -1,
      style: { display: 'block' },
      onClick: function () { if (onClose) { onClose(); } },
    },
      React.createElement('div', {
        className: dialogClass,
        role: 'document',
        onClick: function (e) { e.stopPropagation(); },
      }, children)
    ),
    React.createElement('div', { className: 'modal-backdrop fade in' })
  );
}
