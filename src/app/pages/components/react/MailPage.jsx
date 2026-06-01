import React, { useState } from 'react';
import Panel from './Panel';
import ComposeModal from './ComposeModal';

var PROFILE_PATH = 'assets/img/app/profile/';

function profilePicture(name) {
  var firstName = name.split(' ')[0];
  return PROFILE_PATH + firstName + '.png';
}

function plainText(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

function formatDate(dateStr) {
  var d = new Date(dateStr);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var hours = d.getHours();
  var minutes = d.getMinutes().toString().padStart(2, '0');
  return months[d.getMonth()] + ' ' + d.getDate() + ' ' + hours + ':' + minutes;
}

function formatDetailDate(dateStr) {
  var d = new Date(dateStr);
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var hours = d.getHours();
  var minutes = d.getMinutes().toString().padStart(2, '0');
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return hours + ':' + minutes + ' ' + ampm + ' ' + months[d.getMonth()] + ' ' + d.getDate();
}

var messages = [
  { id: '4563faass', name: 'Nasta Linnie', subject: 'Great text', date: '2015-08-28T07:57:09', body: '<p>Hey John, </p><p>Check out this cool text.</p>', email: 'petraramsey@mail.com', attachment: 'poem.txt', position: 'Great Employee', tag: 'friend', labels: ['inbox'] },
  { id: '4563fdfvd', name: 'Nasta Linnie', subject: 'Lores ipsum', date: '2015-11-19T03:30:45', body: '<p>Hey John, </p><br><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ex mauris, ultrices vel lectus quis, scelerisque hendrerit ipsum. Suspendisse ullamcorper turpis neque, eget dapibus magna placerat ac.</p>', email: 'petraramsey@mail.com', position: 'Great Employee', tag: 'study', labels: ['inbox'] },
  { id: '4563zxcss', name: 'Nasta Linnie', subject: 'Lores ipsum', date: '2015-10-19T03:30:45', body: '<p>Hey Nasta, </p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>', email: 'petraramsey@mail.com', position: 'Great Employee', tag: 'work', labels: ['sent', 'important'] },
  { id: '8955sddf', name: 'Nick Cat', subject: 'New Design', date: '2015-05-05T12:59:45', body: '<p>Hey John, Consectetur adipiscing elit</p><br><p>Cras rhoncus quam ipsum, vel dignissim nisl egestas sed.</p>', email: 'barlowshort@mail.com', position: 'Graphical designer', attachment: 'design.psd', tag: 'work', labels: ['inbox'] },
  { id: '8955sdfcc', name: 'Nick Cat', subject: 'Gift card', date: '2015-07-18T10:19:01', body: '<p>Hey John, </p><br><p>Consectetur adipiscing elit, Lorem ipsum dolor sit amet</p>', email: 'barlowshort@mail.com', position: 'Graphical designer', tag: 'study', labels: ['inbox'] },
  { id: '8955asewf', name: 'Nick Cat', subject: 'Some news', date: '2015-09-23T03:04:10', body: '<p>Hey John, </p><br><p>Integer eu nisl elit. Donec malesuada diam vitae tellus luctus tincidunt.</p>', email: 'barlowshort@mail.com', position: 'Graphical designer', tag: 'work', labels: ['inbox', 'important'] },
  { id: '2334uudsa', name: 'Kostya Danovsky', subject: 'Street Art', date: '2015-11-22T10:05:09', body: '<p>Hey John, </p><p>Aliquam eu facilisis eros, quis varius est.</p><p>Consectetur adipiscing elit.</p>', email: 'schwart@mail.com', position: 'Technical Chef', attachment: 'file.doc', tag: 'family', labels: ['inbox', 'important'] },
  { id: '2334aefvv', name: 'Kostya Danovsky', subject: 'New product', date: '2015-06-22T06:26:10', body: '<p>Hello John, </p><p>Lorem ipsum dolor sit amet!</p><p>Consectetur adipiscing elit.</p>', email: 'schwart@mail.com', position: 'Technical Chef', tag: 'family', labels: ['inbox', 'important'] },
  { id: '2334cvdss', name: 'Kostya Danovsky', subject: 'Old product', date: '2015-06-22T06:26:10', body: '<p>Hello John, </p><p>Consectetur adipiscing elit.</p>', email: 'schwart@mail.com', position: 'Technical Chef', tag: 'study', labels: ['trash'] },
  { id: '8223xzxfn', name: 'Andrey Hrabouski', subject: 'Skype moji', date: '2015-07-16T06:47:53', body: '<p>Hello John, </p><p>Aliquam sodales sem in nibh pellentesque</p>', email: 'lakeishaphillips@mail.com', position: 'Mobile Developer', tag: 'family', labels: ['trash'] },
  { id: '8223sdffn', name: 'Andrey Hrabouski', subject: 'My App', date: '2015-06-20T07:05:02', body: '<p>Hey Vlad. </p><p>Lorem ipsum dolor sit amet!</p>', email: 'lakeishaphillips@mail.com', position: 'Mobile Developer', tag: 'family', labels: ['spam'] },
  { id: '9391xdsff', name: 'Vlad Lugovsky', subject: 'Cool', date: '2015-03-31T11:52:58', body: '<p>Hey Vlad. </p><p>Aliquam sodales sem in nibh pellentesque</p>', email: 'carlsongoodman@mail.com', position: 'Fullstack man', tag: 'study', labels: ['draft'] },
  { id: '8223xsdaa', name: 'Andrey Hrabouski', subject: 'Car rent', date: '2015-02-25T10:58:58', body: '<p>Hey Andrey. </p><p>Cras tincidunt fermentum lectus.</p>', email: 'lakeishaphillips@mail.com', position: 'Mobile Developer', tag: 'family', labels: ['draft'] },
  { id: '9391xdsff2', name: 'Vlad Lugovsky', subject: 'What next', date: '2015-03-31T11:52:58', body: '<p>Hey Vlad. </p><p>Lorem ipsum dolor sit amet!</p><p>Esse esse labore tempor ullamco ullamco.</p>', email: 'carlsongoodman@mail.com', position: 'Fullstack man', tag: 'study', labels: ['sent'] }
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
  { label: 'trash', name: 'Trash' }
];

function getMessagesByLabel(label) {
  return messages.filter(function (m) {
    return m.labels.indexOf(label) !== -1;
  });
}

function getMessageById(id) {
  return messages.filter(function (m) {
    return m.id === id;
  })[0];
}

function MailPage() {
  var [currentLabel, setCurrentLabel] = useState('inbox');
  var [selectedMessageId, setSelectedMessageId] = useState(null);
  var [navigationCollapsed, setNavigationCollapsed] = useState(true);
  var [composeOpen, setComposeOpen] = useState(false);
  var [composeData, setComposeData] = useState({ subject: '', to: '', text: '' });

  var currentMessages = getMessagesByLabel(currentLabel);
  var selectedMessage = selectedMessageId ? getMessageById(selectedMessageId) : null;

  function showCompose(subject, to, text) {
    setComposeData({ subject: subject || '', to: to || '', text: text || '' });
    setComposeOpen(true);
  }

  function handleSelectTab(label) {
    setCurrentLabel(label);
    setSelectedMessageId(null);
  }

  function handleSelectMessage(id) {
    setSelectedMessageId(id);
  }

  function handleBack() {
    setSelectedMessageId(null);
  }

  return (
    <div className="row mail-client-container transparent">
      <div className="col-md-12">
        <Panel className="xmedium-panel mail-panel">
          <div className="letter-layout">
            <div className={'mail-navigation-container' + (!navigationCollapsed ? ' expanded' : '')}>
              <div className="text-center">
                <button type="button" className="btn btn-default compose-button" onClick={function () { showCompose('', '', ''); }}>
                  Compose
                </button>
              </div>
              {tabs.map(function (t) {
                return (
                  <div
                    key={t.label}
                    className={'mail-navigation' + (currentLabel === t.label ? ' active' : '')}
                    onClick={function () { handleSelectTab(t.label); }}
                  >
                    {t.name}
                    {t.newMails && <span className="new-mails">{t.newMails}</span>}
                  </div>
                );
              })}
              <div className="labels">
                <div className="labels-title"></div>
                <div className="labels-container">
                  <div className="label-item"><span className="tag label work">Work</span></div>
                  <div className="label-item"><span className="tag label family">Family</span></div>
                  <div className="label-item"><span className="tag label friend">Friend</span></div>
                  <div className="label-item"><span className="tag label study">Study</span></div>
                </div>
              </div>
              <div className="add-label-container">
                <i className="ion-plus-round"></i><span className="label-input-stub">Add new label</span>
              </div>
            </div>

            {selectedMessage ? (
              <div className={'message-container' + (navigationCollapsed ? ' expanded' : '')}>
                <div className="message">
                  <div className="row">
                    <div className="toggle-navigation-container detail-page">
                      <a href="#" className="collapse-navigation-link ion-navicon" onClick={function (e) { e.preventDefault(); setNavigationCollapsed(!navigationCollapsed); }}></a>
                    </div>
                    <button type="button" className="back-button btn btn-default btn-with-icon" onClick={handleBack}>
                      <i className="ion-chevron-left"></i>Back
                    </button>
                  </div>
                  <div className="person-info row">
                    <div className="col-lg-4 col-md-12 no-padding">
                      <img src={profilePicture(selectedMessage.name)} className="human-picture" />
                      <div className="name">
                        <h2 className="name-h">{selectedMessage.name.split(' ')[0]}</h2>
                        <h2 className="name-h second-name">{selectedMessage.name.split(' ')[1]}</h2>
                        <div>
                          <span className={'mail-tag tag label ' + selectedMessage.tag}>{selectedMessage.tag}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-xs-12 no-padding">
                      <div className="contact-info phone-email">
                        <div><i className="ion-iphone"></i><span className="phone">777-777-7777</span></div>
                        <div><i className="ion-email"></i><span className="email">{selectedMessage.email}</span></div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-xs-12 no-padding">
                      <div className="contact-info position-address">
                        <div><span className="position">{selectedMessage.position}</span></div>
                        <div><span className="address">12 Nezavisimosti st. Vilnius, Lithuania</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="row"></div>
                  <div className="line"></div>
                  <div className="message-details">
                    <span className="subject">{selectedMessage.subject} </span>
                    <span className="date">&bull; {formatDetailDate(selectedMessage.date)}</span>
                  </div>
                  <div className="line"></div>
                  <div className="message-body" dangerouslySetInnerHTML={{ __html: selectedMessage.body }}></div>
                  <div className="line"></div>
                  {selectedMessage.attachment && (
                    <div>
                      <div className="attachment">
                        <span className="file-links">1 Attachment - <a href="#">View</a> | <a href="#">Download</a></span>
                        <div>
                          <i className="file-icon ion-document"></i>
                          <span className="file-name">{selectedMessage.attachment}</span>
                        </div>
                      </div>
                      <div className="line"></div>
                    </div>
                  )}
                  <div className="answer-container">
                    <button type="button" className="btn btn-with-icon" onClick={function () { showCompose(selectedMessage.subject, selectedMessage.email, ''); }}><i className="ion-reply"></i>Reply</button>
                    <button type="button" className="btn btn-with-icon" onClick={function () { showCompose(selectedMessage.subject, '', selectedMessage.body); }}><i className="ion-forward"></i>Forward</button>
                    <button type="button" className="btn btn-with-icon"><i className="ion-printer"></i>Print</button>
                    <button type="button" className="btn btn-with-icon"><i className="ion-android-remove-circle"></i>Spam</button>
                    <button type="button" className="btn btn-with-icon"><i className="ion-android-delete"></i>Delete</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={'side-message-navigation' + (navigationCollapsed ? ' expanded' : '')}>
                <div className="mail-messages-control side-message-navigation-item">
                  <div className="toggle-navigation-container">
                    <a href="#" className="collapse-navigation-link ion-navicon" onClick={function (e) { e.preventDefault(); setNavigationCollapsed(!navigationCollapsed); }}></a>
                  </div>
                  <label className="checkbox-inline custom-checkbox nowrap">
                    <input type="checkbox" value="option1" />
                    <span className="select-all-label">Select All</span>
                  </label>
                  <button type="button" className="btn btn-icon refresh-button"><i className="ion-refresh"></i></button>
                  <div className="btn-group dropdown">
                    <button type="button" className="btn more-button dropdown-toggle" data-toggle="dropdown">
                      More <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      <li><a href="#">Action</a></li>
                      <li><a href="#">Another action</a></li>
                      <li><a href="#">Something else here</a></li>
                      <li role="separator" className="divider"></li>
                      <li><a href="#">Separated link</a></li>
                    </ul>
                  </div>
                </div>
                <div className="messages">
                  <table>
                    <tbody>
                      {currentMessages.map(function (m) {
                        return (
                          <tr key={m.id} className={'side-message-navigation-item little-human shineHover ' + m.tag}>
                            <td className="check-td">
                              <div className="mail-checkbox">
                                <label className="checkbox-inline custom-checkbox nowrap">
                                  <input type="checkbox" />
                                  <span></span>
                                </label>
                              </div>
                            </td>
                            <td className="photo-td" onClick={function () { handleSelectMessage(m.id); }}>
                              <img src={profilePicture(m.name)} className="little-human-picture" />
                            </td>
                            <td onClick={function () { handleSelectMessage(m.id); }}>
                              <div className="name-container">
                                <div><span className="name">{m.name}</span></div>
                                <div><span className={'tag label label-primary ' + m.tag}>{m.tag}</span></div>
                              </div>
                            </td>
                            <td onClick={function () { handleSelectMessage(m.id); }}>
                              <div className="additional-info">
                                <span className="subject"> {m.subject}</span>
                              </div>
                            </td>
                            <td onClick={function () { handleSelectMessage(m.id); }}>
                              <div className="mail-body-part">{plainText(m.body)}</div>
                            </td>
                            <td className="date">
                              <span>{formatDate(m.date)}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </Panel>
      </div>
      <ComposeModal
        isOpen={composeOpen}
        onClose={function () { setComposeOpen(false); }}
        subject={composeData.subject}
        to={composeData.to}
        text={composeData.text}
      />
    </div>
  );
}

export default MailPage;
