(function() {
  'use strict';

  var h = React.createElement;

  // --- Mail data (same as mailMessages service) ---
  var messages = [
    { id: '4563faass', name: 'Nasta Linnie', subject: 'Great text', date: '2015-08-28T07:57:09',
      body: '<p>Hey John, </p><p>Check out this cool text.</p>',
      email: 'petraramsey@mail.com', attachment: 'poem.txt', position: 'Great Employee', tag: 'friend', labels: ['inbox'] },
    { id: '4563fdfvd', name: 'Nasta Linnie', subject: 'Lores ipsum', date: '2015-11-19T03:30:45',
      body: '<p>Hey John, </p><br><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ex mauris, ultrices vel lectus quis, scelerisque hendrerit ipsum. Suspendisse ullamcorper turpis neque, eget dapibus magna placerat ac. Suspendisse rhoncus ligula ac mi tempus varius ut sed lacus. Sed et commodo nulla, et placerat leo. Nam rhoncus vulputate sem non pharetra. Praesent fringilla massa in laoreet convallis. Aliquam lobortis dui a congue facilisis. Aenean dapibus semper semper. Quisque aliquam, nibh dapibus interdum condimentum, ex velit tempor tortor, at vestibulum magna leo quis leo. Morbi pulvinar varius erat ac rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In hac habitasse platea dictumst.</p><br><p>Cras rhoncus quam ipsum, vel dignissim nisl egestas sed. Aliquam erat volutpat. Integer eu nisl elit. Donec malesuada diam vitae tellus luctus tincidunt. Donec tempus blandit neque, rutrum egestas ipsum sagittis tempor. Curabitur volutpat ligula enim, nec vehicula purus molestie at. Sed a facilisis enim, nec molestie magna. Donec in augue non est viverra dapibus vel tempus risus. Nam porttitor purus sit amet hendrerit ullamcorper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>',
      email: 'petraramsey@mail.com', position: 'Great Employee', tag: 'study', labels: ['inbox'] },
    { id: '4563zxcss', name: 'Nasta Linnie', subject: 'Lores ipsum', date: '2015-10-19T03:30:45',
      body: '<p>Hey Nasta, </p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>',
      email: 'petraramsey@mail.com', position: 'Great Employee', tag: 'work', labels: ['sent', 'important'] },
    { id: '8955sddf', name: 'Nick Cat', subject: 'New Design', date: '2015-05-05T12:59:45',
      body: '<p>Hey John, Consectetur adipiscing elit</p><br><p>Cras rhoncus quam ipsum, vel dignissim nisl egestas sed. Aliquam erat volutpat. Integer eu nisl elit. Donec malesuada diam vitae tellus luctus tincidunt. Donec tempus blandit neque, rutrum egestas ipsum sagittis tempor. Curabitur volutpat ligula enim, nec vehicula purus molestie at. Sed a facilisis enim, nec molestie magna. Donec in augue non est viverra dapibus vel tempus risus. Nam porttitor purus sit amet hendrerit ullamcorper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>',
      email: 'barlowshort@mail.com', position: 'Graphical designer', attachment: 'design.psd', tag: 'work', labels: ['inbox'] },
    { id: '8955sdfcc', name: 'Nick Cat', subject: 'Gift card', date: '2015-07-18T10:19:01',
      body: '<p>Hey John, </p><br><p>Consectetur adipiscing elit, Lorem ipsum dolor sit amet</p>',
      email: 'barlowshort@mail.com', position: 'Graphical designer', tag: 'study', labels: ['inbox'] },
    { id: '8955asewf', name: 'Nick Cat', subject: 'Some news', date: '2015-09-23T03:04:10',
      body: '<p>Hey John, </p><br><p>Integer eu nisl elit. Donec malesuada diam vitae tellus luctus tincidunt. Donec tempus blandit neque, rutrum egestas ipsum sagittis tempor. Curabitur volutpat ligula enim, nec vehicula purus molestie at. Sed a facilisis enim, nec molestie magna. Donec in augue non est viverra dapibus vel tempus risus. Nam porttitor purus sit amet hendrerit ullamcorper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>',
      email: 'barlowshort@mail.com', position: 'Graphical designer', tag: 'work', labels: ['inbox', 'important'] },
    { id: '2334uudsa', name: 'Kostya Danovsky', subject: 'Street Art', date: '2015-11-22T10:05:09',
      body: '<p>Hey John, </p><p>Aliquam eu facilisis eros, quis varius est.</p><p>Consectetur adipiscing elit. Aliquam sodales sem in nibh pellentesque, ac dignissim mi dapibus.</p><p>Lorem ipsum dolor sit amet! Nullam imperdiet justo a ipsum laoreet euismod.</p><br><p>Cras tincidunt fermentum lectus, quis scelerisque lorem volutpat sed.Sed quis orci sed nisl sagittis viverra id at mauris. Nam venenatis mi nibh. Sed fringilla mattis vehic</p>',
      email: 'schwart@mail.com', position: 'Technical Chef', attachment: 'file.doc', tag: 'family', labels: ['inbox', 'important'] },
    { id: '2334aefvv', name: 'Kostya Danovsky', subject: 'New product', date: '2015-06-22T06:26:10',
      body: '<p>Hello John, </p><p>Lorem ipsum dolor sit amet!</p><p>Consectetur adipiscing elit. Aliquam sodales sem in nibh pellentesque, ac dignissim mi dapibus.</p><p>Aliquam eu facilisis eros, quis varius est. Nullam imperdiet justo a ipsum laoreet euismod.</p><br><p>Nulla facilisi. Nulla congue, arcu eget blandit lacinia, leo ante ullamcorper lectus, vel pulvinar justo ipsum vitae justo.Cras tincidunt fermentum lectus, quis scelerisque lorem volutpat sed. Sed quis orci sed nisl sagittis viverra id at mauris. Nam venenatis mi nibh. Sed fringilla mattis vehic</p>',
      email: 'schwart@mail.com', position: 'Technical Chef', tag: 'family', labels: ['inbox', 'important'] },
    { id: '2334cvdss', name: 'Kostya Danovsky', subject: 'Old product', date: '2015-06-22T06:26:10',
      body: '<p>Hello John, </p><p>Consectetur adipiscing elit. Aliquam sodales sem in nibh pellentesque, ac dignissim mi dapibus.</p><br><p>Cras tincidunt fermentum lectus, quis scelerisque lorem volutpat sed. Sed quis orci sed nisl sagittis viverra id at mauris. Nam venenatis mi nibh. Sed fringilla mattis vehic</p>',
      email: 'schwart@mail.com', position: 'Technical Chef', tag: 'study', labels: ['trash'] },
    { id: '8223xzxfn', name: 'Andrey Hrabouski', subject: 'Skype moji', date: '2015-07-16T06:47:53',
      body: '<p>Hello John, </p><p>Aliquam sodales sem in nibh pellentesque</p><p>Lorem ipsum dolor I find moji in skype sit amet!.</p>',
      email: 'lakeishaphillips@mail.com', position: 'Mobile Developer', tag: 'family', labels: ['trash'] },
    { id: '8223sdffn', name: 'Andrey Hrabouski', subject: 'My App', date: '2015-06-20T07:05:02',
      body: '<p>Hey Vlad. </p><p>Lorem ipsum dolor sit amet!</p><p>Consectetur My Falasson App elit. Aliquam sodales sem in nibh pellentesque, ac dignissim mi dapibus.</p>',
      email: 'lakeishaphillips@mail.com', position: 'Mobile Developer', tag: 'family', labels: ['spam'] },
    { id: '9391xdsff', name: 'Vlad Lugovsky', subject: 'Cool', date: '2015-03-31T11:52:58',
      body: '<p>Hey Vlad. </p><p>Aliquam sodales sem in nibh pellentesque</p><p>Cras tincidunt fermentum lectus, quis scelerisque lorem volutpat sed.</p>',
      email: 'carlsongoodman@mail.com', position: 'Fullstack man', tag: 'study', labels: ['draft'] },
    { id: '8223xsdaa', name: 'Andrey Hrabouski', subject: 'Car rent', date: '2015-02-25T10:58:58',
      body: '<p>Hey Andrey. </p><p>Cras tincidunt fermentum lectus, quis scelerisque lorem volutpat sed. Sed quis orci sed nisl sagittis viverra id at mauris. Nam venenatis mi nibh. Sed fringilla mattis vehic</p>',
      email: 'lakeishaphillips@mail.com', position: 'Mobile Developer', tag: 'family', labels: ['draft'] },
    { id: '9391xdsff2', name: 'Vlad Lugovsky', subject: 'What next', date: '2015-03-31T11:52:58',
      body: '<p>Hey Vlad. </p><p>Lorem ipsum dolor sit amet!</p><p>Esse esse labore tempor ullamco ullamco. Id veniam laborum c.</p>',
      email: 'carlsongoodman@mail.com', position: 'Fullstack man', tag: 'study', labels: ['sent'] }
  ].sort(function(a, b) {
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
    { label: 'trash', name: 'Trash' }
  ];

  function getMessagesByLabel(label) {
    return messages.filter(function(m) { return m.labels.indexOf(label) !== -1; });
  }

  function getMessageById(id) {
    return messages.filter(function(m) { return m.id === id; })[0];
  }

  function profilePicture(name) {
    return 'assets/img/app/profile/' + name + '.png';
  }

  function formatDate(dateStr, format) {
    var d = new Date(dateStr);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if (format === 'list') {
      var month = months[d.getMonth()];
      var day = d.getDate();
      var hours = d.getHours().toString().padStart(2, '0');
      var mins = d.getMinutes().toString().padStart(2, '0');
      return month + ' ' + day + ' ' + hours + ':' + mins;
    }
    if (format === 'detail') {
      var h12 = d.getHours() % 12 || 12;
      var ampm = d.getHours() >= 12 ? 'PM' : 'AM';
      var mins2 = d.getMinutes().toString().padStart(2, '0');
      return h12 + ':' + mins2 + ' ' + ampm + ' ' + fullMonths[d.getMonth()] + ' ' + d.getDate() + ' ';
    }
    return dateStr;
  }

  function stripHtml(html) {
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  // --- Compose Modal ---
  function ComposeModal(props) {
    var _s = React.useState;
    var toState = _s(props.initialTo || '');
    var to = toState[0]; var setTo = toState[1];
    var subjectState = _s(props.initialSubject || '');
    var subject = subjectState[0]; var setSubject = subjectState[1];
    var editorRef = React.useRef(null);

    React.useEffect(function() {
      setTo(props.initialTo || '');
      setSubject(props.initialSubject || '');
    }, [props.initialTo, props.initialSubject]);

    React.useEffect(function() {
      if (editorRef.current) {
        editorRef.current.innerHTML = props.initialText || '';
      }
    }, [props.initialText]);

    if (!props.isOpen) return null;

    var modalContent = h('div', { className: 'modal', style: { display: 'block' } },
      h('div', { className: 'modal-dialog modal-compose' },
        h('div', { className: 'modal-content' },
          h('div', { className: 'compose-header' },
            h('span', null, 'New message'),
            h('span', { className: 'header-controls' },
              h('i', { className: 'ion-minus-round' }),
              h('i', { className: 'ion-arrow-resize' }),
              h('i', { className: 'ion-close-round', onClick: props.onDismiss })
            )
          ),
          h('div', null,
            h('input', { type: 'text', className: 'form-control compose-input default-color', placeholder: 'To', value: to, onChange: function(e) { setTo(e.target.value); } }),
            h('input', { type: 'text', className: 'form-control compose-input default-color', placeholder: 'Subject', value: subject, onChange: function(e) { setSubject(e.target.value); } }),
            h('div', { className: 'compose-container' },
              h('div', { className: 'toolbarMain' }),
              h('div', { ref: editorRef, className: 'ta-editor', contentEditable: true, style: { minHeight: '150px', border: '1px solid #ccc', padding: '10px' } })
            )
          ),
          h('div', { className: 'compose-footer clearfix' },
            h('button', { type: 'button', className: 'btn btn-send', onClick: props.onDismiss }, 'Send'),
            h('div', { className: 'footer-controls' },
              h('i', { className: 'footer-control-first compose-footer-icon ion-arrow-down-b' }),
              h('i', { className: 'compose-footer-icon ion-android-delete', onClick: props.onDismiss })
            )
          )
        )
      )
    );

    return ReactDOM.createPortal(modalContent, document.body);
  }

  // --- Mail List ---
  function MailList(props) {
    var msgs = getMessagesByLabel(props.label);

    function goToDetail(m) {
      window.location.hash = '/components/mail/' + props.label + '/' + m.id;
    }

    return h('div', { className: 'side-message-navigation' + (props.navigationCollapsed ? ' expanded' : '') },
      h('div', { className: 'mail-messages-control side-message-navigation-item' },
        h('div', { className: 'toggle-navigation-container' },
          h('a', { href: '', className: 'collapse-navigation-link ion-navicon', onClick: function(e) { e.preventDefault(); props.onToggleNav(); } })
        ),
        h('label', { className: 'checkbox-inline custom-checkbox nowrap' },
          h('input', { type: 'checkbox', id: 'inlineCheckbox01', defaultValue: 'option1' }),
          h('span', { className: 'select-all-label' }, 'Select All')
        ),
        h('button', { type: 'button', className: 'btn btn-icon refresh-button' },
          h('i', { className: 'ion-refresh' })
        ),
        h('div', { className: 'btn-group' },
          h('button', { type: 'button', className: 'btn more-button' },
            'More ', h('span', { className: 'caret' })
          ),
          h('ul', { className: 'dropdown-menu' },
            h('li', null, h('a', { href: '' }, 'Action')),
            h('li', null, h('a', { href: '' }, 'Another action')),
            h('li', null, h('a', { href: '' }, 'Something else here')),
            h('li', { role: 'separator', className: 'divider' }),
            h('li', null, h('a', { href: '' }, 'Separated link'))
          )
        )
      ),
      h('div', { className: 'messages' },
        h('table', null,
          h('tbody', null,
            msgs.map(function(m) {
              var firstName = m.name.split(' ')[0];
              return h('tr', { key: m.id, className: 'side-message-navigation-item little-human shineHover ' + m.tag },
                h('td', { className: 'check-td' },
                  h('div', { className: 'mail-checkbox' },
                    h('label', { className: 'checkbox-inline custom-checkbox nowrap' },
                      h('input', { type: 'checkbox' }),
                      h('span', null)
                    )
                  )
                ),
                h('td', { className: 'photo-td', onClick: function() { goToDetail(m); } },
                  h('img', { src: profilePicture(firstName), className: 'little-human-picture' })
                ),
                h('td', { onClick: function() { goToDetail(m); } },
                  h('div', { className: 'name-container' },
                    h('div', null, h('span', { className: 'name' }, m.name)),
                    h('div', null, h('span', { className: 'tag label label-primary ' + m.tag }, m.tag))
                  )
                ),
                h('td', { onClick: function() { goToDetail(m); } },
                  h('div', { className: 'additional-info' },
                    h('span', { className: 'subject' }, ' ' + m.subject)
                  )
                ),
                h('td', { onClick: function() { goToDetail(m); } },
                  h('div', { className: 'mail-body-part' }, stripHtml(m.body))
                ),
                h('td', { className: 'date' },
                  h('span', null, formatDate(m.date, 'list'))
                )
              );
            })
          )
        )
      )
    );
  }

  // --- Mail Detail ---
  function MailDetail(props) {
    var mail = props.mail;

    if (!mail) {
      return h('div', { className: 'message-container' + (props.navigationCollapsed ? ' expanded' : '') },
        h('div', null,
          h('h5', { className: 'text-center' }, 'Nothing to show')
        )
      );
    }

    var firstName = mail.name.split(' ')[0];
    var lastName = mail.name.split(' ')[1] || '';

    function goBack() {
      window.location.hash = '/components/mail/' + props.label;
    }

    return h('div', { className: 'message-container' + (props.navigationCollapsed ? ' expanded' : '') },
      h('div', { className: 'message' },
        h('div', { className: 'row' },
          h('div', { className: 'toggle-navigation-container detail-page' },
            h('a', { href: '', className: 'collapse-navigation-link ion-navicon', onClick: function(e) { e.preventDefault(); props.onToggleNav(); } })
          ),
          h('button', { type: 'button', className: 'back-button btn btn-default btn-with-icon', onClick: goBack },
            h('i', { className: 'ion-chevron-left' }), 'Back'
          )
        ),
        h('div', { className: 'person-info row' },
          h('div', { className: 'col-lg-4 col-md-12 no-padding' },
            h('img', { src: profilePicture(firstName), className: 'human-picture' }),
            h('div', { className: 'name' },
              h('h2', { className: 'name-h' }, firstName),
              h('h2', { className: 'name-h second-name' }, lastName),
              h('div', null,
                h('span', { className: 'mail-tag tag label ' + mail.tag }, mail.tag)
              )
            )
          ),
          h('div', { className: 'col-lg-4 col-md-6 col-xs-12 no-padding' },
            h('div', { className: 'contact-info phone-email' },
              h('div', null,
                h('i', { className: 'ion-iphone' }),
                h('span', { className: 'phone' }, '777-777-7777')
              ),
              h('div', null,
                h('i', { className: 'ion-email' }),
                h('span', { className: 'email' }, mail.email)
              )
            )
          ),
          h('div', { className: 'col-lg-4 col-md-6 col-xs-12 no-padding' },
            h('div', { className: 'contact-info position-address' },
              h('div', null, h('span', { className: 'position' }, mail.position)),
              h('div', null, h('span', { className: 'address' }, '12 Nezavisimosti st. Vilnius, Lithuania'))
            )
          )
        ),
        h('div', { className: 'row' }),
        h('div', { className: 'line' }),
        h('div', { className: 'message-details' },
          h('span', { className: 'subject' }, mail.subject + ' '),
          h('span', { className: 'date' }, '\u2022 ' + formatDate(mail.date, 'detail'))
        ),
        h('div', { className: 'line' }),
        h('div', { className: 'message-body', dangerouslySetInnerHTML: { __html: mail.body } }),
        h('div', { className: 'line' }),
        mail.attachment ? h('div', { className: 'attachment' },
          h('span', { className: 'file-links' }, '1 Attachment - ', h('a', { href: '' }, 'View'), ' | ', h('a', { href: '' }, 'Download')),
          h('div', null,
            h('i', { className: 'file-icon ion-document' }),
            h('span', { className: 'file-name' }, mail.attachment)
          )
        ) : null,
        mail.attachment ? h('div', { className: 'line' }) : null,
        h('div', { className: 'answer-container' },
          h('button', { type: 'button', className: 'btn btn-with-icon', onClick: function() { props.onCompose(mail.subject, mail.email, ''); } },
            h('i', { className: 'ion-reply' }), 'Reply'),
          h('button', { type: 'button', className: 'btn btn-with-icon', onClick: function() { props.onCompose(mail.subject, '', mail.body); } },
            h('i', { className: 'ion-forward' }), 'Forward'),
          h('button', { type: 'button', className: 'btn btn-with-icon' },
            h('i', { className: 'ion-printer' }), 'Print'),
          h('button', { type: 'button', className: 'btn btn-with-icon' },
            h('i', { className: 'ion-android-remove-circle' }), 'Spam'),
          h('button', { type: 'button', className: 'btn btn-with-icon' },
            h('i', { className: 'ion-android-delete' }), 'Delete')
        )
      )
    );
  }

  // --- Main Mail App ---
  function MailApp() {
    var _s = React.useState;
    var navCollapsedState = _s(true);
    var navigationCollapsed = navCollapsedState[0];
    var setNavigationCollapsed = navCollapsedState[1];
    var composeState = _s({ isOpen: false, subject: '', to: '', text: '' });
    var compose = composeState[0];
    var setCompose = composeState[1];
    var hashState = _s(window.location.hash);
    var hash = hashState[0];
    var setHash = hashState[1];

    React.useEffect(function() {
      function onHashChange() {
        setHash(window.location.hash);
      }
      window.addEventListener('hashchange', onHashChange);
      return function() { window.removeEventListener('hashchange', onHashChange); };
    }, []);

    function toggleNav() {
      setNavigationCollapsed(function(v) { return !v; });
    }

    function showCompose(subject, to, text) {
      setCompose({ isOpen: true, subject: subject || '', to: to || '', text: text || '' });
    }

    function dismissCompose() {
      setCompose({ isOpen: false, subject: '', to: '', text: '' });
    }

    // Parse hash route: #/components/mail/:label or #/components/mail/:label/:id
    var mailMatch = hash.match(/^#\/components\/mail\/([^/]+)(?:\/(.+))?$/);
    var currentLabel = mailMatch ? mailMatch[1] : 'inbox';
    var currentId = mailMatch ? mailMatch[2] : null;

    function navigateToLabel(label) {
      window.location.hash = '/components/mail/' + label;
    }

    var mainContent;
    if (currentId) {
      var mail = getMessageById(currentId);
      mainContent = h(MailDetail, {
        mail: mail,
        label: currentLabel,
        navigationCollapsed: navigationCollapsed,
        onToggleNav: toggleNav,
        onCompose: showCompose
      });
    } else {
      mainContent = h(MailList, {
        label: currentLabel,
        navigationCollapsed: navigationCollapsed,
        onToggleNav: toggleNav
      });
    }

    return h('div', { className: 'row mail-client-container transparent' },
      h('div', { className: 'col-md-12' },
        h('div', { className: 'panel panel-default mail-panel' },
          h('div', { className: 'panel-body' },
            h('div', { className: 'letter-layout' },
              h('div', { className: 'mail-navigation-container' + (!navigationCollapsed ? ' expanded' : '') },
                h('div', { className: 'text-center' },
                  h('button', { type: 'button', className: 'btn btn-default compose-button', onClick: function() { showCompose('', '', ''); } }, 'Compose')
                ),
                tabs.map(function(t) {
                  var isActive = t.label === currentLabel;
                  return h('div', {
                    key: t.label,
                    className: 'mail-navigation' + (isActive ? ' active' : ''),
                    onClick: function() { navigateToLabel(t.label); }
                  },
                    t.name,
                    t.newMails ? h('span', { className: 'new-mails' }, t.newMails) : null
                  );
                }),
                h('div', { className: 'labels' },
                  h('div', { className: 'labels-title' }),
                  h('div', { className: 'labels-container' },
                    h('div', { className: 'label-item' }, h('span', { className: 'tag label work' }, 'Work')),
                    h('div', { className: 'label-item' }, h('span', { className: 'tag label family' }, 'Family')),
                    h('div', { className: 'label-item' }, h('span', { className: 'tag label friend' }, 'Friend')),
                    h('div', { className: 'label-item' }, h('span', { className: 'tag label study' }, 'Study'))
                  )
                ),
                h('div', { className: 'add-label-container' },
                  h('i', { className: 'ion-plus-round' }),
                  h('span', { className: 'label-input-stub' }, 'Add new label')
                )
              ),
              mainContent
            )
          )
        )
      ),
      h(ComposeModal, {
        isOpen: compose.isOpen,
        initialTo: compose.to,
        initialSubject: compose.subject,
        initialText: compose.text,
        onDismiss: dismissCompose
      })
    );
  }

  // Mount/unmount API
  var mountEl = null;
  window.mountMailReact = function(element) {
    mountEl = element;
    ReactDOM.render(h(MailApp), element);
  };
  window.unmountMailReact = function() {
    if (mountEl) {
      ReactDOM.unmountComponentAtNode(mountEl);
      mountEl = null;
    }
  };
})();
