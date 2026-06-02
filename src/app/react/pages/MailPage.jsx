import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Panel } from '../components/Panel';
import { profilePicture } from '../utils/profilePicture';

var MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function pad2(n) { return n < 10 ? '0' + n : '' + n; }

function formatListDate(dateStr) {
  var d = new Date(dateStr);
  return MONTHS_SHORT[d.getMonth()] + ' ' + d.getDate() + ' ' + pad2(d.getHours()) + ':' + pad2(d.getMinutes());
}

function formatDetailDate(dateStr) {
  var d = new Date(dateStr);
  var h = d.getHours() % 12 || 12;
  var ampm = d.getHours() >= 12 ? 'PM' : 'AM';
  return h + ':' + pad2(d.getMinutes()) + ' ' + ampm + ' ' + MONTHS_LONG[d.getMonth()] + ' ' + d.getDate() + ' ';
}

function plainText(html) {
  return html ? String(html).replace(/<[^>]+>/gm, '') : '';
}

function parseMailHash() {
  var hash = window.location.hash || '';
  var match = hash.match(/#\/components\/mail(?:\/([^\/]+))?(?:\/(.+))?/);
  if (match) {
    return { label: match[1] || 'inbox', id: match[2] || null };
  }
  return { label: 'inbox', id: null };
}

var messages = [
  {
    id: '2334uudsa', name: 'Kostya Danovsky', subject: 'Street Art',
    date: '2015-11-22T10:05:09',
    body: '<p>Hey John, </p><p>Aliquam eu facilisis eros, quis varius est.</p><p>Consectetur adipiscing elit. Aliquam sodales sem in nibh pellentesque, ac dignissim mi dapibus.</p><p>Lorem ipsum dolor sit amet! Nullam imperdiet justo a ipsum laoreet euismod.</p><br><p>Cras tincidunt fermentum lectus, quis scelerisque lorem volutpat sed.Sed quis orci sed nisl sagittis viverra id at mauris. Nam venenatis mi nibh. Sed fringilla mattis vehic</p>',
    pic: 'img/Kostya.png', email: 'schwart@mail.com', position: 'Technical Chef',
    attachment: 'file.doc', tag: 'family', labels: ['inbox', 'important']
  },
  {
    id: '4563fdfvd', name: 'Nasta Linnie', subject: 'Lores ipsum',
    date: '2015-11-19T03:30:45',
    body: '<p>Hey John, </p><br><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ex mauris, ultrices vel lectus quis, scelerisque hendrerit ipsum. Suspendisse ullamcorper turpis neque, eget dapibus magna placerat ac. Suspendisse rhoncus ligula ac mi tempus varius ut sed lacus. Sed et commodo nulla, et placerat leo. Nam rhoncus vulputate sem non pharetra. Praesent fringilla massa in laoreet convallis. Aliquam lobortis dui a congue facilisis. Aenean dapibus semper semper. Quisque aliquam, nibh dapibus interdum condimentum, ex velit tempor tortor, at vestibulum magna leo quis leo. Morbi pulvinar varius erat ac rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In hac habitasse platea dictumst.</p><br><p>Cras rhoncus quam ipsum, vel dignissim nisl egestas sed. Aliquam erat volutpat. Integer eu nisl elit. Donec malesuada diam vitae tellus luctus tincidunt. Donec tempus blandit neque, rutrum egestas ipsum sagittis tempor. Curabitur volutpat ligula enim, nec vehicula purus molestie at. Sed a facilisis enim, nec molestie magna. Donec in augue non est viverra dapibus vel tempus risus. Nam porttitor purus sit amet hendrerit ullamcorper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>',
    pic: 'img/Nasta.png', email: 'petraramsey@mail.com', position: 'Great Employee',
    tag: 'study', labels: ['inbox']
  },
  {
    id: '4563zxcss', name: 'Nasta Linnie', subject: 'Lores ipsum',
    date: '2015-10-19T03:30:45',
    body: '<p>Hey Nasta, </p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>',
    pic: 'img/Nasta.png', email: 'petraramsey@mail.com', position: 'Great Employee',
    tag: 'work', labels: ['sent', 'important']
  },
  {
    id: '8955asewf', name: 'Nick Cat', subject: 'Some news',
    date: '2015-09-23T03:04:10',
    body: '<p>Hey John, </p><br><p>Integer eu nisl elit. Donec malesuada diam vitae tellus luctus tincidunt. Donec tempus blandit neque, rutrum egestas ipsum sagittis tempor. Curabitur volutpat ligula enim, nec vehicula purus molestie at. Sed a facilisis enim, nec molestie magna. Donec in augue non est viverra dapibus vel tempus risus. Nam porttitor purus sit amet hendrerit ullamcorper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>',
    pic: 'img/Nick.png', email: 'barlowshort@mail.com', position: 'Graphical designer',
    tag: 'work', labels: ['inbox', 'important']
  },
  {
    id: '4563faass', name: 'Nasta Linnie', subject: 'Great text',
    date: '2015-08-28T07:57:09',
    body: '<p>Hey John, </p><p>Check out this cool text.</p>',
    pic: 'img/Nasta.png', email: 'petraramsey@mail.com', position: 'Great Employee',
    attachment: 'poem.txt', tag: 'friend', labels: ['inbox']
  },
  {
    id: '8955sdfcc', name: 'Nick Cat', subject: 'Gift card',
    date: '2015-07-18T10:19:01',
    body: '<p>Hey John, </p><br><p>Consectetur adipiscing elit, Lorem ipsum dolor sit amet</p>',
    pic: 'img/Nick.png', email: 'barlowshort@mail.com', position: 'Graphical designer',
    tag: 'study', labels: ['inbox']
  },
  {
    id: '8223xzxfn', name: 'Andrey Hrabouski', subject: 'Skype moji',
    date: '2015-07-16T06:47:53',
    body: '<p>Hello John, </p><p>Aliquam sodales sem in nibh pellentesque</p><p>Lorem ipsum dolor I find moji in skype sit amet!.</p>',
    pic: 'img/Andrey.png', email: 'lakeishaphillips@mail.com', position: 'Mobile Developer',
    tag: 'family', labels: ['trash']
  },
  {
    id: '2334aefvv', name: 'Kostya Danovsky', subject: 'New product',
    date: '2015-06-22T06:26:10',
    body: '<p>Hello John, </p><p>Lorem ipsum dolor sit amet!</p><p>Consectetur adipiscing elit. Aliquam sodales sem in nibh pellentesque, ac dignissim mi dapibus.</p><p>Aliquam eu facilisis eros, quis varius est. Nullam imperdiet justo a ipsum laoreet euismod.</p><br><p>Nulla facilisi. Nulla congue, arcu eget blandit lacinia, leo ante ullamcorper lectus, vel pulvinar justo ipsum vitae justo.Cras tincidunt fermentum lectus, quis scelerisque lorem volutpat sed. Sed quis orci sed nisl sagittis viverra id at mauris. Nam venenatis mi nibh. Sed fringilla mattis vehic</p>',
    pic: 'img/Kostya.png', email: 'schwart@mail.com', position: 'Technical Chef',
    tag: 'family', labels: ['inbox', 'important']
  },
  {
    id: '2334cvdss', name: 'Kostya Danovsky', subject: 'Old product',
    date: '2015-06-22T06:26:10',
    body: '<p>Hello John, </p><p>Consectetur adipiscing elit. Aliquam sodales sem in nibh pellentesque, ac dignissim mi dapibus.</p><br><p>Cras tincidunt fermentum lectus, quis scelerisque lorem volutpat sed. Sed quis orci sed nisl sagittis viverra id at mauris. Nam venenatis mi nibh. Sed fringilla mattis vehic</p>',
    pic: 'img/Kostya.png', email: 'schwart@mail.com', position: 'Technical Chef',
    tag: 'study', labels: ['trash']
  },
  {
    id: '8223sdffn', name: 'Andrey Hrabouski', subject: 'My App',
    date: '2015-06-20T07:05:02',
    body: '<p>Hey Vlad. </p><p>Lorem ipsum dolor sit amet!</p><p>Consectetur My Falasson App elit. Aliquam sodales sem in nibh pellentesque, ac dignissim mi dapibus.</p>',
    pic: 'img/Andrey.png', email: 'lakeishaphillips@mail.com', position: 'Mobile Developer',
    tag: 'family', labels: ['spam']
  },
  {
    id: '8955sddf', name: 'Nick Cat', subject: 'New Design',
    date: '2015-05-05T12:59:45',
    body: '<p>Hey John, Consectetur adipiscing elit</p><br><p>Cras rhoncus quam ipsum, vel dignissim nisl egestas sed. Aliquam erat volutpat. Integer eu nisl elit. Donec malesuada diam vitae tellus luctus tincidunt. Donec tempus blandit neque, rutrum egestas ipsum sagittis tempor. Curabitur volutpat ligula enim, nec vehicula purus molestie at. Sed a facilisis enim, nec molestie magna. Donec in augue non est viverra dapibus vel tempus risus. Nam porttitor purus sit amet hendrerit ullamcorper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>',
    pic: 'img/Nick.png', email: 'barlowshort@mail.com', position: 'Graphical designer',
    attachment: 'design.psd', tag: 'work', labels: ['inbox']
  },
  {
    id: '9391xdsff', name: 'Vlad Lugovsky', subject: 'Cool',
    date: '2015-03-31T11:52:58',
    body: '<p>Hey Vlad. </p><p>Aliquam sodales sem in nibh pellentesque</p><p>Cras tincidunt fermentum lectus, quis scelerisque lorem volutpat sed.</p>',
    pic: 'img/Vlad.png', email: 'carlsongoodman@mail.com', position: 'Fullstack man',
    tag: 'study', labels: ['draft']
  },
  {
    id: '9391xdsff2', name: 'Vlad Lugovsky', subject: 'What next',
    date: '2015-03-31T11:52:58',
    body: '<p>Hey Vlad. </p><p>Lorem ipsum dolor sit amet!</p><p>Esse esse labore tempor ullamco ullamco. Id veniam laborum c.</p>',
    pic: 'img/Vlad.png', email: 'carlsongoodman@mail.com', position: 'Fullstack man',
    tag: 'study', labels: ['sent']
  },
  {
    id: '8223xsdaa', name: 'Andrey Hrabouski', subject: 'Car rent',
    date: '2015-02-25T10:58:58',
    body: '<p>Hey Andrey. </p><p>Cras tincidunt fermentum lectus, quis scelerisque lorem volutpat sed. Sed quis orci sed nisl sagittis viverra id at mauris. Nam venenatis mi nibh. Sed fringilla mattis vehic</p>',
    pic: 'img/Andrey.png', email: 'lakeishaphillips@mail.com', position: 'Mobile Developer',
    tag: 'family', labels: ['draft']
  },
].sort(function (a, b) {
  if (a.date > b.date) return -1;
  if (a.date < b.date) return 1;
  return 0;
});

var tabs = [
  { label: 'inbox', name: 'Inbox', newMails: 7 },
  { label: 'sent', name: 'Sent Mail' },
  { label: 'important', name: 'Important' },
  { label: 'draft', name: 'Draft', newMails: 2 },
  { label: 'spam', name: 'Spam' },
  { label: 'trash', name: 'Trash' },
];

function getMessagesByLabel(label) {
  return messages.filter(function (m) { return m.labels.indexOf(label) !== -1; });
}

function getMessageById(id) {
  return messages.filter(function (m) { return m.id === id; })[0];
}

function ComposeModal(props) {
  var isOpen = props.isOpen;
  var initialTo = props.to;
  var initialSubject = props.subject;
  var onClose = props.onClose;

  var _to = useState(initialTo || '');
  var to = _to[0]; var setTo = _to[1];
  var _sub = useState(initialSubject || '');
  var subject = _sub[0]; var setSubject = _sub[1];

  useEffect(function () {
    setTo(initialTo || '');
    setSubject(initialSubject || '');
  }, [initialTo, initialSubject]);

  if (!isOpen) return null;

  var modal = React.createElement('div', null,
    React.createElement('div', { className: 'modal', style: { display: 'block' } },
      React.createElement('div', { className: 'modal-dialog modal-compose' },
        React.createElement('div', { className: 'modal-content' },
          React.createElement('div', { className: 'compose-header' },
            React.createElement('span', null, 'New message'),
            React.createElement('span', { className: 'header-controls' },
              React.createElement('i', { className: 'ion-minus-round' }),
              React.createElement('i', { className: 'ion-arrow-resize' }),
              React.createElement('i', { className: 'ion-close-round', onClick: onClose })
            )
          ),
          React.createElement('div', null,
            React.createElement('input', {
              type: 'text', className: 'form-control compose-input default-color',
              placeholder: 'To', value: to, onChange: function (e) { setTo(e.target.value); }
            }),
            React.createElement('input', {
              type: 'text', className: 'form-control compose-input default-color',
              placeholder: 'Subject', value: subject, onChange: function (e) { setSubject(e.target.value); }
            }),
            React.createElement('div', { className: 'compose-container' },
              React.createElement('textarea', { className: 'form-control', rows: 6 })
            )
          ),
          React.createElement('div', { className: 'compose-footer clearfix' },
            React.createElement('button', { type: 'button', className: 'btn btn-send', onClick: onClose }, 'Send'),
            React.createElement('div', { className: 'footer-controls' },
              React.createElement('i', { className: 'footer-control-first compose-footer-icon ion-arrow-down-b' }),
              React.createElement('i', { className: 'compose-footer-icon ion-android-delete', onClick: onClose })
            )
          )
        )
      )
    ),
    React.createElement('div', { className: 'modal-backdrop fade in', style: { display: 'block' } })
  );

  return createPortal(modal, document.body);
}

function MailNavigation(props) {
  var currentLabel = props.currentLabel;
  var navigationCollapsed = props.navigationCollapsed;
  var onCompose = props.onCompose;
  var onSelectTab = props.onSelectTab;

  return React.createElement('div', {
    className: 'mail-navigation-container' + (!navigationCollapsed ? ' expanded' : '')
  },
    React.createElement('div', { className: 'text-center' },
      React.createElement('button', {
        type: 'button', className: 'btn btn-default compose-button',
        onClick: function () { onCompose('', '', ''); }
      }, 'Compose')
    ),
    tabs.map(function (t) {
      return React.createElement('div', {
        key: t.label,
        className: 'mail-navigation' + (t.label === currentLabel ? ' active' : ''),
        onClick: function () { onSelectTab(t.label); }
      },
        t.name,
        t.newMails ? React.createElement('span', { className: 'new-mails' }, t.newMails) : null
      );
    }),
    React.createElement('div', { className: 'labels' },
      React.createElement('div', { className: 'labels-title' }),
      React.createElement('div', { className: 'labels-container' },
        React.createElement('div', { className: 'label-item' },
          React.createElement('span', { className: 'tag label work' }, 'Work')
        ),
        React.createElement('div', { className: 'label-item' },
          React.createElement('span', { className: 'tag label family' }, 'Family')
        ),
        React.createElement('div', { className: 'label-item' },
          React.createElement('span', { className: 'tag label friend' }, 'Friend')
        ),
        React.createElement('div', { className: 'label-item' },
          React.createElement('span', { className: 'tag label study' }, 'Study')
        )
      )
    ),
    React.createElement('div', { className: 'add-label-container' },
      React.createElement('i', { className: 'ion-plus-round' }),
      React.createElement('span', { className: 'label-input-stub' }, 'Add new label')
    )
  );
}

function MailList(props) {
  var msgs = props.messages;
  var label = props.label;
  var navigationCollapsed = props.navigationCollapsed;
  var onToggleNav = props.onToggleNav;

  function goToDetail(id) {
    window.location.hash = '#/components/mail/' + label + '/' + id;
  }

  return React.createElement('div', {
    className: 'side-message-navigation' + (navigationCollapsed ? ' expanded' : '')
  },
    React.createElement('div', { className: 'mail-messages-control side-message-navigation-item' },
      React.createElement('div', { className: 'toggle-navigation-container' },
        React.createElement('a', {
          href: '', className: 'collapse-navigation-link ion-navicon',
          onClick: function (e) { e.preventDefault(); onToggleNav(); }
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
        ),
        React.createElement('ul', { className: 'dropdown-menu' },
          React.createElement('li', null, React.createElement('a', { href: '' }, 'Action')),
          React.createElement('li', null, React.createElement('a', { href: '' }, 'Another action')),
          React.createElement('li', null, React.createElement('a', { href: '' }, 'Something else here')),
          React.createElement('li', { role: 'separator', className: 'divider' }),
          React.createElement('li', null, React.createElement('a', { href: '' }, 'Separated link'))
        )
      )
    ),
    React.createElement('div', { className: 'messages' },
      React.createElement('table', null,
        React.createElement('tbody', null,
          msgs.map(function (m) {
            return React.createElement('tr', {
              key: m.id + m.subject,
              className: 'side-message-navigation-item little-human shineHover ' + m.tag
            },
              React.createElement('td', { className: 'check-td' },
                React.createElement('div', { className: 'mail-checkbox' },
                  React.createElement('label', { className: 'checkbox-inline custom-checkbox nowrap' },
                    React.createElement('input', { type: 'checkbox' }),
                    React.createElement('span', null)
                  )
                )
              ),
              React.createElement('td', {
                className: 'photo-td',
                onClick: function () { goToDetail(m.id); },
                style: { cursor: 'pointer' }
              },
                React.createElement('img', {
                  src: profilePicture(m.name.split(' ')[0]),
                  className: 'little-human-picture'
                })
              ),
              React.createElement('td', {
                onClick: function () { goToDetail(m.id); },
                style: { cursor: 'pointer' }
              },
                React.createElement('div', { className: 'name-container' },
                  React.createElement('div', null,
                    React.createElement('span', { className: 'name' }, m.name)
                  ),
                  React.createElement('div', null,
                    React.createElement('span', { className: 'tag label label-primary ' + m.tag }, m.tag)
                  )
                )
              ),
              React.createElement('td', {
                onClick: function () { goToDetail(m.id); },
                style: { cursor: 'pointer' }
              },
                React.createElement('div', { className: 'additional-info' },
                  React.createElement('span', { className: 'subject' }, ' ' + m.subject)
                )
              ),
              React.createElement('td', {
                onClick: function () { goToDetail(m.id); },
                style: { cursor: 'pointer' }
              },
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
  var mail = props.mail;
  var label = props.label;
  var navigationCollapsed = props.navigationCollapsed;
  var onToggleNav = props.onToggleNav;
  var onCompose = props.onCompose;

  if (!mail) {
    return React.createElement('div', {
      className: 'message-container' + (navigationCollapsed ? ' expanded' : '')
    },
      React.createElement('div', null,
        React.createElement('h5', { className: 'text-center' }, 'Nothing to show')
      )
    );
  }

  var firstName = mail.name.split(' ')[0];
  var lastName = mail.name.split(' ')[1] || '';

  function goBack() {
    window.location.hash = '#/components/mail/' + label;
  }

  return React.createElement('div', {
    className: 'message-container' + (navigationCollapsed ? ' expanded' : '')
  },
    React.createElement('div', { className: 'message' },
      React.createElement('div', { className: 'row' },
        React.createElement('div', { className: 'toggle-navigation-container detail-page' },
          React.createElement('a', {
            href: '', className: 'collapse-navigation-link ion-navicon',
            onClick: function (e) { e.preventDefault(); onToggleNav(); }
          })
        ),
        React.createElement('button', {
          type: 'button', className: 'back-button btn btn-default btn-with-icon',
          onClick: goBack
        },
          React.createElement('i', { className: 'ion-chevron-left' }), 'Back'
        )
      ),
      React.createElement('div', { className: 'person-info row' },
        React.createElement('div', { className: 'col-lg-4 col-md-12 no-padding' },
          React.createElement('img', {
            src: profilePicture(firstName),
            className: 'human-picture'
          }),
          React.createElement('div', { className: 'name' },
            React.createElement('h2', { className: 'name-h' }, firstName),
            React.createElement('h2', { className: 'name-h second-name' }, lastName),
            React.createElement('div', null,
              React.createElement('span', { className: 'mail-tag tag label ' + mail.tag }, mail.tag)
            )
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
              React.createElement('span', { className: 'position' }, mail.position)
            ),
            React.createElement('div', null,
              React.createElement('span', { className: 'address' }, '12 Nezavisimosti st. Vilnius, Lithuania')
            )
          )
        )
      ),
      React.createElement('div', { className: 'row' }),
      React.createElement('div', { className: 'line' }),
      React.createElement('div', { className: 'message-details' },
        React.createElement('span', { className: 'subject' }, mail.subject + ' '),
        React.createElement('span', { className: 'date' }, '\u2022 ' + formatDetailDate(mail.date))
      ),
      React.createElement('div', { className: 'line' }),
      React.createElement('div', {
        className: 'message-body',
        dangerouslySetInnerHTML: { __html: mail.body }
      }),
      React.createElement('div', { className: 'line' }),
      mail.attachment ? React.createElement('div', { className: 'attachment' },
        React.createElement('span', { className: 'file-links' },
          '1 Attachment - ', React.createElement('a', { href: '' }, 'View'),
          ' | ', React.createElement('a', { href: '' }, 'Download')
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
          onClick: function () { onCompose(mail.subject, mail.email, ''); }
        }, React.createElement('i', { className: 'ion-reply' }), 'Reply'),
        React.createElement('button', {
          type: 'button', className: 'btn btn-with-icon',
          onClick: function () { onCompose(mail.subject, '', mail.body); }
        }, React.createElement('i', { className: 'ion-forward' }), 'Forward'),
        React.createElement('button', { type: 'button', className: 'btn btn-with-icon' },
          React.createElement('i', { className: 'ion-printer' }), 'Print'
        ),
        React.createElement('button', { type: 'button', className: 'btn btn-with-icon' },
          React.createElement('i', { className: 'ion-android-remove-circle' }), 'Spam'
        ),
        React.createElement('button', { type: 'button', className: 'btn btn-with-icon' },
          React.createElement('i', { className: 'ion-android-delete' }), 'Delete'
        )
      )
    )
  );
}

export function MailPage() {
  var parsed = parseMailHash();
  var _label = useState(parsed.label);
  var currentLabel = _label[0]; var setCurrentLabel = _label[1];
  var _id = useState(parsed.id);
  var selectedId = _id[0]; var setSelectedId = _id[1];
  var _navCollapsed = useState(true);
  var navigationCollapsed = _navCollapsed[0]; var setNavigationCollapsed = _navCollapsed[1];
  var _compose = useState({ isOpen: false, to: '', subject: '', text: '' });
  var compose = _compose[0]; var setCompose = _compose[1];

  useEffect(function () {
    function onHashChange() {
      var p = parseMailHash();
      setCurrentLabel(p.label);
      setSelectedId(p.id);
    }
    window.addEventListener('hashchange', onHashChange);
    return function () { window.removeEventListener('hashchange', onHashChange); };
  }, []);

  var toggleNav = useCallback(function () {
    setNavigationCollapsed(function (prev) { return !prev; });
  }, []);

  var showCompose = useCallback(function (subject, to, text) {
    setCompose({ isOpen: true, to: to || '', subject: subject || '', text: text || '' });
  }, []);

  var closeCompose = useCallback(function () {
    setCompose({ isOpen: false, to: '', subject: '', text: '' });
  }, []);

  function selectTab(label) {
    window.location.hash = '#/components/mail/' + label;
  }

  var filteredMessages = getMessagesByLabel(currentLabel);
  var currentMail = selectedId ? getMessageById(selectedId) : null;

  var content;
  if (selectedId) {
    content = React.createElement(MailDetail, {
      mail: currentMail,
      label: currentLabel,
      navigationCollapsed: navigationCollapsed,
      onToggleNav: toggleNav,
      onCompose: showCompose,
    });
  } else {
    content = React.createElement(MailList, {
      messages: filteredMessages,
      label: currentLabel,
      navigationCollapsed: navigationCollapsed,
      onToggleNav: toggleNav,
    });
  }

  return React.createElement('div', { className: 'row mail-client-container transparent' },
    React.createElement('div', { className: 'col-md-12' },
      React.createElement(Panel, { panelClass: 'xmedium-panel mail-panel' },
        React.createElement('div', { className: 'letter-layout' },
          React.createElement(MailNavigation, {
            currentLabel: currentLabel,
            navigationCollapsed: navigationCollapsed,
            onCompose: showCompose,
            onSelectTab: selectTab,
          }),
          content
        )
      )
    ),
    React.createElement(ComposeModal, {
      isOpen: compose.isOpen,
      to: compose.to,
      subject: compose.subject,
      text: compose.text,
      onClose: closeCompose,
    })
  );
}
