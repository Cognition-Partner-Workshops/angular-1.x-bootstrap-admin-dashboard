/**
 * ProfileModal — React equivalent of ProfileModalCtrl + profileModal.html.
 *
 * Props:
 *   isOpen   — boolean controlling visibility
 *   onSave   — callback receiving the entered link string
 *   onClose  — callback to dismiss the modal
 */
import React, { useState, useEffect } from 'react';

export function ProfileModal({ isOpen, onSave, onClose }) {
  var [link, setLink] = useState('');

  useEffect(function () {
    if (isOpen) {
      setLink('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  function handleSave() {
    onSave(link);
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return React.createElement('div', {
    className: 'modal',
    style: { display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' },
    onClick: handleBackdropClick
  },
    React.createElement('div', { className: 'modal-dialog' },
      React.createElement('div', { className: 'modal-content' },
        React.createElement('div', { className: 'modal-header' },
          React.createElement('button', {
            type: 'button',
            className: 'close',
            onClick: onClose,
            'aria-label': 'Close'
          },
            React.createElement('em', { className: 'ion-ios-close-empty sn-link-close' })
          ),
          React.createElement('h4', { className: 'modal-title', id: 'myModalLabel' }, 'Add Account')
        ),
        React.createElement('form', { name: 'linkForm' },
          React.createElement('div', { className: 'modal-body' },
            React.createElement('p', null, 'Paste a link to your profile into the box below'),
            React.createElement('div', { className: 'form-group' },
              React.createElement('input', {
                type: 'text',
                className: 'form-control',
                placeholder: 'Link to Profile',
                value: link,
                onChange: function (e) { setLink(e.target.value); }
              })
            )
          ),
          React.createElement('div', { className: 'modal-footer' },
            React.createElement('button', {
              type: 'button',
              className: 'btn btn-primary',
              onClick: handleSave
            }, 'Save changes')
          )
        )
      )
    )
  );
}
