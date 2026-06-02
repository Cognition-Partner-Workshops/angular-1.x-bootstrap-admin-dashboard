/**
 * ComponentsMailPage — React migration of the AngularJS mail module
 * (src/app/pages/components/mail).
 *
 * Consolidates the former abstract `components.mail` state and its
 * `.label` / `.detail` child states into a single component. The current
 * folder (`label`) and selected message (`id`) come in as props, sourced from
 * the UI-Router state params by the react2angular bridge; `navigate(label, id)`
 * drives `$state.go` so the URL stays the source of truth:
 *
 *   /components/mail/inbox        -> list view  (label=inbox, id=null)
 *   /components/mail/inbox/:id    -> detail view
 *
 * The compose dialog ($uibModal in the original) is a self-contained modal
 * rendered from local state.
 */
import React, { useState, useCallback } from 'react';
import { Panel } from '../components/Panel';
import { profilePicture } from '../utils/profilePicture';
import { getTabs, getMessagesByLabel, getMessageById } from './mailData';

var MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function pad(n) {
  return (n < 10 ? '0' : '') + n;
}

function firstName(name) {
  return (name || '').split(' ')[0] || '';
}

function lastName(name) {
  return (name || '').split(' ')[1] || '';
}

function plainText(html) {
  return (html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function formatListDate(value) {
  var d = new Date(value);
  if (isNaN(d.getTime())) return '';
  return MONTHS_SHORT[d.getMonth()] + ' ' + d.getDate() + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
}

function formatDetailDate(value) {
  var d = new Date(value);
  if (isNaN(d.getTime())) return '';
  var hours = d.getHours();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  var h12 = hours % 12;
  if (h12 === 0) h12 = 12;
  return h12 + ':' + pad(d.getMinutes()) + ' ' + ampm + ' ' + MONTHS_LONG[d.getMonth()] + ' ' + d.getDate() + ' ';
}

function MailNavigation(props) {
  var tabs = getTabs();
  return React.createElement(
    'div',
    { className: 'mail-navigation-container' + (props.navigationCollapsed ? '' : ' expanded') },
    React.createElement(
      'div',
      { className: 'text-center' },
      React.createElement(
        'button',
        {
          type: 'button',
          className: 'btn btn-default compose-button',
          onClick: function () { props.onCompose('', '', ''); },
        },
        'Compose'
      )
    ),
    tabs.map(function (t) {
      return React.createElement(
        'div',
        {
          key: t.label,
          className: 'mail-navigation' + (props.label === t.label ? ' active' : ''),
          onClick: function () { props.navigate(t.label, null); },
        },
        t.name,
        t.newMails
          ? React.createElement('span', { className: 'new-mails' }, String(t.newMails))
          : null
      );
    }),
    React.createElement(
      'div',
      { className: 'labels' },
      React.createElement('div', { className: 'labels-title' }),
      React.createElement(
        'div',
        { className: 'labels-container' },
        React.createElement('div', { className: 'label-item' },
          React.createElement('span', { className: 'tag label work' }, 'Work')),
        React.createElement('div', { className: 'label-item' },
          React.createElement('span', { className: 'tag label family' }, 'Family')),
        React.createElement('div', { className: 'label-item' },
          React.createElement('span', { className: 'tag label friend' }, 'Friend')),
        React.createElement('div', { className: 'label-item' },
          React.createElement('span', { className: 'tag label study' }, 'Study'))
      )
    ),
    React.createElement(
      'div',
      { className: 'add-label-container' },
      React.createElement('i', { className: 'ion-plus-round' }),
      React.createElement('span', { className: 'label-input-stub' }, 'Add new label')
    )
  );
}

function MailList(props) {
  var messages = getMessagesByLabel(props.label);
  return React.createElement(
    'div',
    { className: 'side-message-navigation' + (props.navigationCollapsed ? ' expanded' : '') },
    React.createElement(
      'div',
      { className: 'mail-messages-control side-message-navigation-item' },
      React.createElement(
        'div',
        { className: 'toggle-navigation-container' },
        React.createElement('a', {
          className: 'collapse-navigation-link ion-navicon',
          onClick: function (e) { e.preventDefault(); props.onToggleNav(); },
        })
      ),
      React.createElement(
        'label',
        { className: 'checkbox-inline custom-checkbox nowrap' },
        React.createElement('input', { type: 'checkbox', id: 'inlineCheckbox01', value: 'option1' }),
        React.createElement('span', { className: 'select-all-label' }, 'Select All')
      ),
      React.createElement('button', { type: 'button', className: 'btn btn-icon refresh-button' },
        React.createElement('i', { className: 'ion-refresh' })),
      React.createElement(
        'div',
        { className: 'btn-group' },
        React.createElement('button', { type: 'button', className: 'btn more-button' },
          'More ', React.createElement('span', { className: 'caret' })),
        React.createElement(
          'ul',
          null,
          React.createElement('li', null, React.createElement('a', null, 'Action')),
          React.createElement('li', null, React.createElement('a', null, 'Another action')),
          React.createElement('li', null, React.createElement('a', null, 'Something else here')),
          React.createElement('li', { role: 'separator', className: 'divider' }),
          React.createElement('li', null, React.createElement('a', null, 'Separated link'))
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'messages' },
      React.createElement(
        'table',
        null,
        React.createElement(
          'tbody',
          null,
          messages.map(function (m, index) {
            var goDetail = function () { props.navigate(props.label, m.id); };
            return React.createElement(
              'tr',
              {
                key: m.id + '-' + index,
                className: 'side-message-navigation-item little-human shineHover ' + m.tag,
              },
              React.createElement(
                'td',
                { className: 'check-td' },
                React.createElement(
                  'div',
                  { className: 'mail-checkbox' },
                  React.createElement(
                    'label',
                    { className: 'checkbox-inline custom-checkbox nowrap' },
                    React.createElement('input', { type: 'checkbox' }),
                    React.createElement('span', null)
                  )
                )
              ),
              React.createElement(
                'td',
                { className: 'photo-td', onClick: goDetail },
                React.createElement('img', {
                  src: profilePicture(firstName(m.name)),
                  className: 'little-human-picture',
                })
              ),
              React.createElement(
                'td',
                { onClick: goDetail },
                React.createElement(
                  'div',
                  { className: 'name-container' },
                  React.createElement('div', null, React.createElement('span', { className: 'name' }, m.name)),
                  React.createElement('div', null,
                    React.createElement('span', { className: 'tag label label-primary ' + m.tag }, m.tag))
                )
              ),
              React.createElement(
                'td',
                { onClick: goDetail },
                React.createElement('div', { className: 'additional-info' },
                  React.createElement('span', { className: 'subject' }, ' ' + m.subject))
              ),
              React.createElement(
                'td',
                { onClick: goDetail },
                React.createElement('div', { className: 'mail-body-part' }, plainText(m.body))
              ),
              React.createElement(
                'td',
                { className: 'date' },
                React.createElement('span', null, formatListDate(m.date))
              )
            );
          })
        )
      )
    )
  );
}

function MailDetail(props) {
  var mail = getMessageById(props.id);

  if (!mail) {
    return React.createElement(
      'div',
      { className: 'message-container' + (props.navigationCollapsed ? ' expanded' : '') },
      React.createElement('div', null, React.createElement('h5', { className: 'text-center' }, 'Nothing to show'))
    );
  }

  return React.createElement(
    'div',
    { className: 'message-container' + (props.navigationCollapsed ? ' expanded' : '') },
    React.createElement(
      'div',
      { className: 'message' },
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'toggle-navigation-container detail-page' },
          React.createElement('a', {
            className: 'collapse-navigation-link ion-navicon',
            onClick: function (e) { e.preventDefault(); props.onToggleNav(); },
          })
        ),
        React.createElement(
          'button',
          {
            type: 'button',
            className: 'back-button btn btn-default btn-with-icon',
            onClick: function () { props.navigate(props.label, null); },
          },
          React.createElement('i', { className: 'ion-chevron-left' }),
          'Back'
        )
      ),
      React.createElement(
        'div',
        { className: 'person-info row' },
        React.createElement(
          'div',
          { className: 'col-lg-4 col-md-12 no-padding' },
          React.createElement('img', { src: profilePicture(firstName(mail.name)), className: 'human-picture' }),
          React.createElement(
            'div',
            { className: 'name' },
            React.createElement('h2', { className: 'name-h' }, firstName(mail.name)),
            React.createElement('h2', { className: 'name-h second-name' }, lastName(mail.name)),
            React.createElement('div', null,
              React.createElement('span', { className: 'mail-tag tag label ' + mail.tag }, mail.tag))
          )
        ),
        React.createElement(
          'div',
          { className: 'col-lg-4 col-md-6 col-xs-12 no-padding' },
          React.createElement(
            'div',
            { className: 'contact-info phone-email' },
            React.createElement('div', null,
              React.createElement('i', { className: 'ion-iphone' }),
              React.createElement('span', { className: 'phone' }, '777-777-7777')),
            React.createElement('div', null,
              React.createElement('i', { className: 'ion-email' }),
              React.createElement('span', { className: 'email' }, mail.email))
          )
        ),
        React.createElement(
          'div',
          { className: 'col-lg-4 col-md-6 col-xs-12 no-padding' },
          React.createElement(
            'div',
            { className: 'contact-info position-address' },
            React.createElement('div', null, React.createElement('span', { className: 'position' }, mail.position)),
            React.createElement('div', null,
              React.createElement('span', { className: 'address' }, '12 Nezavisimosti st. Vilnius, Lithuania'))
          )
        )
      ),
      React.createElement('div', { className: 'row' }),
      React.createElement('div', { className: 'line' }),
      React.createElement(
        'div',
        { className: 'message-details' },
        React.createElement('span', { className: 'subject' }, mail.subject + ' '),
        React.createElement('span', { className: 'date' }, '• ' + formatDetailDate(mail.date))
      ),
      React.createElement('div', { className: 'line' }),
      React.createElement('div', { className: 'message-body', dangerouslySetInnerHTML: { __html: mail.body } }),
      React.createElement('div', { className: 'line' }),
      mail.attachment
        ? React.createElement(
            'div',
            { className: 'attachment' },
            React.createElement('span', { className: 'file-links' }, '1 Attachment - ',
              React.createElement('a', null, 'View'), ' | ', React.createElement('a', null, 'Download')),
            React.createElement(
              'div',
              null,
              React.createElement('i', { className: 'file-icon ion-document' }),
              React.createElement('span', { className: 'file-name' }, mail.attachment)
            )
          )
        : null,
      mail.attachment ? React.createElement('div', { className: 'line' }) : null,
      React.createElement(
        'div',
        { className: 'answer-container' },
        React.createElement('button', {
          type: 'button', className: 'btn btn-with-icon',
          onClick: function () { props.onCompose(mail.subject, mail.email, ''); },
        }, React.createElement('i', { className: 'ion-reply' }), 'Reply'),
        React.createElement('button', {
          type: 'button', className: 'btn btn-with-icon',
          onClick: function () { props.onCompose(mail.subject, '', mail.body); },
        }, React.createElement('i', { className: 'ion-forward' }), 'Forward'),
        React.createElement('button', { type: 'button', className: 'btn btn-with-icon' },
          React.createElement('i', { className: 'ion-printer' }), 'Print'),
        React.createElement('button', { type: 'button', className: 'btn btn-with-icon' },
          React.createElement('i', { className: 'ion-android-remove-circle' }), 'Spam'),
        React.createElement('button', { type: 'button', className: 'btn btn-with-icon' },
          React.createElement('i', { className: 'ion-android-delete' }), 'Delete')
      )
    )
  );
}

function ComposeModal(props) {
  return React.createElement(
    'div',
    { className: 'modal fade in', style: { display: 'block' } },
    React.createElement(
      'div',
      { className: 'modal-dialog modal-compose' },
      React.createElement(
        'div',
        { className: 'modal-content' },
        React.createElement(
          'div',
          { className: 'compose-header' },
          React.createElement('span', null, 'New message'),
          React.createElement(
            'span',
            { className: 'header-controls' },
            React.createElement('i', { className: 'ion-minus-round' }),
            React.createElement('i', { className: 'ion-arrow-resize' }),
            React.createElement('i', { className: 'ion-close-round', onClick: props.onClose })
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement('input', {
            type: 'text', className: 'form-control compose-input default-color', placeholder: 'To',
            value: props.to, onChange: function (e) { props.onChange('to', e.target.value); },
          }),
          React.createElement('input', {
            type: 'text', className: 'form-control compose-input default-color', placeholder: 'Subject',
            value: props.subject, onChange: function (e) { props.onChange('subject', e.target.value); },
          }),
          React.createElement(
            'div',
            { className: 'compose-container' },
            React.createElement('textarea', {
              className: 'form-control compose-textarea',
              value: props.text, onChange: function (e) { props.onChange('text', e.target.value); },
            })
          )
        ),
        React.createElement(
          'div',
          { className: 'compose-footer clearfix' },
          React.createElement('button', { type: 'button', className: 'btn btn-send', onClick: props.onClose }, 'Send'),
          React.createElement(
            'div',
            { className: 'footer-controls' },
            React.createElement('i', { className: 'footer-control-first compose-footer-icon ion-arrow-down-b' }),
            React.createElement('i', { className: 'compose-footer-icon ion-android-delete', onClick: props.onClose })
          )
        )
      )
    )
  );
}

export function ComponentsMailPage(props) {
  var label = props.label || 'inbox';
  var id = props.id || null;
  var navigate = props.navigate || function () {};

  var [navigationCollapsed, setNavigationCollapsed] = useState(true);
  var [compose, setCompose] = useState({ open: false, to: '', subject: '', text: '' });

  var toggleNav = useCallback(function () {
    setNavigationCollapsed(function (prev) { return !prev; });
  }, []);

  var openCompose = useCallback(function (subject, to, text) {
    setCompose({ open: true, subject: subject || '', to: to || '', text: text || '' });
  }, []);

  var closeCompose = useCallback(function () {
    setCompose(function (prev) { return Object.assign({}, prev, { open: false }); });
  }, []);

  var changeCompose = useCallback(function (field, value) {
    setCompose(function (prev) {
      var next = Object.assign({}, prev);
      next[field] = value;
      return next;
    });
  }, []);

  var content = id
    ? React.createElement(MailDetail, {
        label: label, id: id, navigationCollapsed: navigationCollapsed,
        navigate: navigate, onToggleNav: toggleNav, onCompose: openCompose,
      })
    : React.createElement(MailList, {
        label: label, navigationCollapsed: navigationCollapsed,
        navigate: navigate, onToggleNav: toggleNav,
      });

  return React.createElement(
    'div',
    { className: 'row mail-client-container transparent' },
    React.createElement(
      'div',
      { className: 'col-md-12' },
      React.createElement(
        Panel,
        { panelClass: 'xmedium-panel mail-panel' },
        React.createElement(
          'div',
          { className: 'letter-layout' },
          React.createElement(MailNavigation, {
            label: label, navigationCollapsed: navigationCollapsed,
            navigate: navigate, onCompose: openCompose,
          }),
          content
        )
      )
    ),
    compose.open
      ? React.createElement(ComposeModal, {
          to: compose.to, subject: compose.subject, text: compose.text,
          onChange: changeCompose, onClose: closeCompose,
        })
      : null
  );
}
