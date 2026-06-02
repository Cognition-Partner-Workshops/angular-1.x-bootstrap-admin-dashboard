/**
 * ComponentsMail — React migration of the AngularJS mail module
 * (src/app/pages/components/mail). Consolidates the former abstract parent
 * state and its `label` / `detail` child states into a single component that
 * derives the active view from the location hash:
 *
 *   #/components/mail/<label>            -> message list
 *   #/components/mail/<label>/<id>       -> message detail
 *
 * The `$uibModal` compose dialog is reimplemented as the <ComposeModal> child.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { Panel } from '../components/Panel';
import { profilePicture } from '../utils/profilePicture';
import { mailTabs, getMessagesByLabel, getMessageById } from './mailData';

var MAIL_HASH_PREFIX = '#/components/mail';
var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function plainText(text) {
  return text ? String(text).replace(/<[^>]+>/gm, '') : '';
}

function pad(n) {
  return (n < 10 ? '0' : '') + n;
}

function formatListDate(iso) {
  var d = new Date(iso);
  if (isNaN(d.getTime())) { return ''; }
  return MONTHS[d.getMonth()] + ' ' + d.getDate() + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
}

function formatDetailDate(iso) {
  var d = new Date(iso);
  if (isNaN(d.getTime())) { return ''; }
  var hours = d.getHours();
  var ampm = hours >= 12 ? 'pm' : 'am';
  var h12 = hours % 12;
  if (h12 === 0) { h12 = 12; }
  return h12 + ':' + pad(d.getMinutes()) + ' ' + ampm + ' ' + fullMonth(d.getMonth()) + ' ' + d.getDate();
}

function fullMonth(i) {
  var full = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  return full[i];
}

function parseHash() {
  var hash = window.location.hash || '';
  var rest = '';
  if (hash.indexOf(MAIL_HASH_PREFIX) === 0) {
    rest = hash.substring(MAIL_HASH_PREFIX.length);
  }
  rest = rest.replace(/^\/+/, '');
  var parts = rest.split('/').filter(function (p) { return p.length > 0; });
  return {
    label: parts[0] || 'inbox',
    id: parts[1] || null,
  };
}

function ComposeModal(props) {
  var initial = props.initial || {};
  var [to, setTo] = useState(initial.to || '');
  var [subject, setSubject] = useState(initial.subject || '');
  var [text, setText] = useState(initial.text || '');

  return React.createElement('div', null,
    React.createElement('div', {
      className: 'modal fade in',
      role: 'dialog',
      style: { display: 'block' },
    },
      React.createElement('div', { className: 'modal-dialog modal-compose' },
        React.createElement('div', { className: 'modal-content' },
          React.createElement('div', { className: 'compose-header' },
            React.createElement('span', null, 'New message'),
            React.createElement('span', { className: 'header-controls' },
              React.createElement('i', { className: 'ion-minus-round' }),
              React.createElement('i', { className: 'ion-arrow-resize' }),
              React.createElement('i', { className: 'ion-close-round', onClick: props.onClose })
            )
          ),
          React.createElement('div', null,
            React.createElement('input', {
              type: 'text',
              className: 'form-control compose-input default-color',
              placeholder: 'To',
              value: to,
              onChange: function (e) { setTo(e.target.value); },
            }),
            React.createElement('input', {
              type: 'text',
              className: 'form-control compose-input default-color',
              placeholder: 'Subject',
              value: subject,
              onChange: function (e) { setSubject(e.target.value); },
            }),
            React.createElement('div', { className: 'compose-container' },
              React.createElement('textarea', {
                className: 'form-control compose-text',
                value: text,
                onChange: function (e) { setText(e.target.value); },
              })
            )
          ),
          React.createElement('div', { className: 'compose-footer clearfix' },
            React.createElement('button', { type: 'button', onClick: props.onClose, className: 'btn btn-send' }, 'Send'),
            React.createElement('div', { className: 'footer-controls' },
              React.createElement('i', { className: 'footer-control-first compose-footer-icon ion-arrow-down-b' }),
              React.createElement('i', { className: 'compose-footer-icon ion-android-delete', onClick: props.onClose })
            )
          )
        )
      )
    ),
    React.createElement('div', { className: 'modal-backdrop fade in', onClick: props.onClose })
  );
}

function MailNavigation(props) {
  return React.createElement('div', {
    className: 'mail-navigation-container' + (!props.navigationCollapsed ? ' expanded' : ''),
  },
    React.createElement('div', { className: 'text-center' },
      React.createElement('button', {
        type: 'button',
        className: 'btn btn-default compose-button',
        onClick: function () { props.onCompose('', '', ''); },
      }, 'Compose')
    ),
    mailTabs.map(function (t) {
      return React.createElement('div', {
        key: t.label,
        className: 'mail-navigation' + (t.label === props.activeLabel ? ' active' : ''),
        onClick: function () { props.onSelectTab(t.label); },
      },
        t.name,
        t.newMails ? React.createElement('span', { className: 'new-mails' }, t.newMails) : null
      );
    }),
    React.createElement('div', { className: 'labels' },
      React.createElement('div', { className: 'labels-title' }),
      React.createElement('div', { className: 'labels-container' },
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
    React.createElement('div', { className: 'add-label-container' },
      React.createElement('i', { className: 'ion-plus-round' }),
      React.createElement('span', { className: 'label-input-stub' }, 'Add new label')
    )
  );
}

function MailList(props) {
  var messages = getMessagesByLabel(props.label);
  return React.createElement('div', {
    className: 'side-message-navigation' + (props.navigationCollapsed ? ' expanded' : ''),
  },
    React.createElement('div', { className: 'mail-messages-control side-message-navigation-item' },
      React.createElement('div', { className: 'toggle-navigation-container' },
        React.createElement('a', {
          href: '',
          className: 'collapse-navigation-link ion-navicon',
          onClick: function (e) { e.preventDefault(); props.onToggleNav(); },
        })
      ),
      React.createElement('label', { className: 'checkbox-inline custom-checkbox nowrap' },
        React.createElement('input', { type: 'checkbox', id: 'inlineCheckbox01', value: 'option1' }),
        React.createElement('span', { className: 'select-all-label' }, 'Select All')
      ),
      React.createElement('button', { type: 'button', className: 'btn btn-icon refresh-button' },
        React.createElement('i', { className: 'ion-refresh' })
      ),
      React.createElement('div', { className: 'btn-group' },
        React.createElement('button', { type: 'button', className: 'btn more-button' },
          'More ', React.createElement('span', { className: 'caret' })
        )
      )
    ),
    React.createElement('div', { className: 'messages' },
      React.createElement('table', null,
        React.createElement('tbody', null,
          messages.map(function (m) {
            var goDetail = function () { props.onOpenMessage(m.id); };
            return React.createElement('tr', {
              key: m.id,
              className: 'side-message-navigation-item little-human shineHover ' + m.tag,
            },
              React.createElement('td', { className: 'check-td' },
                React.createElement('div', { className: 'mail-checkbox' },
                  React.createElement('label', { className: 'checkbox-inline custom-checkbox nowrap' },
                    React.createElement('input', { type: 'checkbox' }),
                    React.createElement('span', null)
                  )
                )
              ),
              React.createElement('td', { className: 'photo-td', onClick: goDetail },
                React.createElement('img', {
                  src: profilePicture(m.name.split(' ')[0]),
                  className: 'little-human-picture',
                })
              ),
              React.createElement('td', { onClick: goDetail },
                React.createElement('div', { className: 'name-container' },
                  React.createElement('div', null, React.createElement('span', { className: 'name' }, m.name)),
                  React.createElement('div', null,
                    React.createElement('span', { className: 'tag label label-primary ' + m.tag }, m.tag))
                )
              ),
              React.createElement('td', { onClick: goDetail },
                React.createElement('div', { className: 'additional-info' },
                  React.createElement('span', { className: 'subject' }, ' ' + m.subject))
              ),
              React.createElement('td', { onClick: goDetail },
                React.createElement('div', { className: 'mail-body-part' }, plainText(m.body))
              ),
              React.createElement('td', { className: 'date' },
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
    return React.createElement('div', { className: 'message-container' },
      React.createElement('div', null,
        React.createElement('h5', { className: 'text-center' }, 'Nothing to show')
      )
    );
  }
  var nameParts = mail.name.split(' ');
  return React.createElement('div', {
    className: 'message-container' + (props.navigationCollapsed ? ' expanded' : ''),
  },
    React.createElement('div', { className: 'message' },
      React.createElement('div', { className: 'row' },
        React.createElement('div', { className: 'toggle-navigation-container detail-page' },
          React.createElement('a', {
            href: '',
            className: 'collapse-navigation-link ion-navicon',
            onClick: function (e) { e.preventDefault(); props.onToggleNav(); },
          })
        ),
        React.createElement('button', {
          type: 'button',
          className: 'back-button btn btn-default btn-with-icon',
          onClick: props.onBack,
        },
          React.createElement('i', { className: 'ion-chevron-left' }), 'Back'
        )
      ),
      React.createElement('div', { className: 'person-info row' },
        React.createElement('div', { className: 'col-lg-4 col-md-12 no-padding' },
          React.createElement('img', {
            src: profilePicture(nameParts[0]),
            className: 'human-picture',
          }),
          React.createElement('div', { className: 'name' },
            React.createElement('h2', { className: 'name-h' }, nameParts[0]),
            React.createElement('h2', { className: 'name-h second-name' }, nameParts[1]),
            React.createElement('div', null,
              React.createElement('span', { className: 'mail-tag tag label ' + mail.tag }, mail.tag))
          )
        ),
        React.createElement('div', { className: 'col-lg-4 col-md-6 col-xs-12 no-padding' },
          React.createElement('div', { className: 'contact-info phone-email' },
            React.createElement('div', null,
              React.createElement('i', { className: 'ion-iphone' }),
              React.createElement('span', { className: 'phone' }, '777-777-7777')
            ),
            React.createElement('div', null,
              React.createElement('i', { className: 'ion-email' }),
              React.createElement('span', { className: 'email' }, mail.email)
            )
          )
        ),
        React.createElement('div', { className: 'col-lg-4 col-md-6 col-xs-12 no-padding' },
          React.createElement('div', { className: 'contact-info position-address' },
            React.createElement('div', null,
              React.createElement('span', { className: 'position' }, mail.position)),
            React.createElement('div', null,
              React.createElement('span', { className: 'address' }, '12 Nezavisimosti st. Vilnius, Lithuania'))
          )
        )
      ),
      React.createElement('div', { className: 'row' }),
      React.createElement('div', { className: 'line' }),
      React.createElement('div', { className: 'message-details' },
        React.createElement('span', { className: 'subject' }, mail.subject + ' '),
        React.createElement('span', { className: 'date' }, '• ' + formatDetailDate(mail.date))
      ),
      React.createElement('div', { className: 'line' }),
      React.createElement('div', {
        className: 'message-body',
        dangerouslySetInnerHTML: { __html: mail.body },
      }),
      React.createElement('div', { className: 'line' }),
      mail.attachment ? React.createElement('div', { className: 'attachment' },
        React.createElement('span', { className: 'file-links' }, '1 Attachment - ',
          React.createElement('a', { href: '' }, 'View'), ' | ',
          React.createElement('a', { href: '' }, 'Download')
        ),
        React.createElement('div', null,
          React.createElement('i', { className: 'file-icon ion-document' }),
          React.createElement('span', { className: 'file-name' }, mail.attachment)
        )
      ) : null,
      mail.attachment ? React.createElement('div', { className: 'line' }) : null,
      React.createElement('div', { className: 'answer-container' },
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

export function ComponentsMail() {
  var [route, setRoute] = useState(parseHash);
  var [navigationCollapsed, setNavigationCollapsed] = useState(true);
  var [compose, setCompose] = useState(null);

  useEffect(function () {
    var onHashChange = function () { setRoute(parseHash()); };
    window.addEventListener('hashchange', onHashChange);
    return function () { window.removeEventListener('hashchange', onHashChange); };
  }, []);

  var selectTab = function (label) {
    window.location.hash = MAIL_HASH_PREFIX + '/' + label;
  };

  var openMessage = function (id) {
    window.location.hash = MAIL_HASH_PREFIX + '/' + route.label + '/' + id;
  };

  var goBack = function () {
    window.location.hash = MAIL_HASH_PREFIX + '/' + route.label;
  };

  var toggleNav = useCallback(function () {
    setNavigationCollapsed(function (v) { return !v; });
  }, []);

  var showCompose = useCallback(function (subject, to, text) {
    setCompose({ subject: subject, to: to, text: text });
  }, []);

  var closeCompose = useCallback(function () { setCompose(null); }, []);

  var content = route.id
    ? React.createElement(MailDetail, {
        id: route.id,
        navigationCollapsed: navigationCollapsed,
        onToggleNav: toggleNav,
        onBack: goBack,
        onCompose: showCompose,
      })
    : React.createElement(MailList, {
        label: route.label,
        navigationCollapsed: navigationCollapsed,
        onToggleNav: toggleNav,
        onOpenMessage: openMessage,
      });

  return React.createElement('div', { className: 'row mail-client-container transparent' },
    React.createElement('div', { className: 'col-md-12' },
      React.createElement(Panel, { panelClass: 'xmedium-panel mail-panel' },
        React.createElement('div', { className: 'letter-layout' },
          React.createElement(MailNavigation, {
            navigationCollapsed: navigationCollapsed,
            activeLabel: route.label,
            onCompose: showCompose,
            onSelectTab: selectTab,
          }),
          content
        )
      )
    ),
    compose ? React.createElement(ComposeModal, {
      initial: compose,
      onClose: closeCompose,
    }) : null
  );
}
