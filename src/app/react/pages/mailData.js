/**
 * mailData — React port of the AngularJS `mailMessages` service
 * (src/app/pages/components/mail/mailMessages.js).
 *
 * Exposes the static demo mailbox data plus the same lookup helpers the
 * original service provided (getTabs / getMessagesByLabel / getMessageById).
 * Message bodies are kept as raw HTML strings (the original wrapped them in
 * $sce.trustAsHtml); render them with dangerouslySetInnerHTML on the detail
 * page and strip tags for list previews.
 */

var MESSAGES = [
  {
    id: '4563faass',
    name: 'Nasta Linnie',
    subject: 'Great text',
    date: '2015-08-28T07:57:09',
    body: '<p>Hey John, </p><p>Check out this cool text.</p>',
    email: 'petraramsey@mail.com',
    attachment: 'poem.txt',
    position: 'Great Employee',
    tag: 'friend',
    labels: ['inbox'],
  },
  {
    id: '4563fdfvd',
    name: 'Nasta Linnie',
    subject: 'Lores ipsum',
    date: '2015-11-19T03:30:45',
    body: '<p>Hey John, </p><br><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ex mauris, ultrices vel lectus quis, scelerisque hendrerit ipsum.</p>',
    email: 'petraramsey@mail.com',
    position: 'Great Employee',
    tag: 'study',
    labels: ['inbox'],
  },
  {
    id: '4563zxcss',
    name: 'Nasta Linnie',
    subject: 'Lores ipsum',
    date: '2015-10-19T03:30:45',
    body: '<p>Hey Nasta, </p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>',
    email: 'petraramsey@mail.com',
    position: 'Great Employee',
    tag: 'work',
    labels: ['sent', 'important'],
  },
  {
    id: '8955sddf',
    name: 'Nick Cat',
    subject: 'New Design',
    date: '2015-05-05T12:59:45',
    body: '<p>Hey John, Consectetur adipiscing elit</p><br><p>Cras rhoncus quam ipsum, vel dignissim nisl egestas sed. Aliquam erat volutpat.</p>',
    email: 'barlowshort@mail.com',
    position: 'Graphical designer',
    attachment: 'design.psd',
    tag: 'work',
    labels: ['inbox'],
  },
  {
    id: '8955sdfcc',
    name: 'Nick Cat',
    subject: 'Gift card',
    date: '2015-07-18T10:19:01',
    body: '<p>Hey John, </p><br><p>Consectetur adipiscing elit, Lorem ipsum dolor sit amet</p>',
    email: 'barlowshort@mail.com',
    position: 'Graphical designer',
    tag: 'study',
    labels: ['inbox'],
  },
  {
    id: '8955asewf',
    name: 'Nick Cat',
    subject: 'Some news',
    date: '2015-09-23T03:04:10',
    body: '<p>Hey John, </p><br><p>Integer eu nisl elit. Donec malesuada diam vitae tellus luctus tincidunt.</p>',
    email: 'barlowshort@mail.com',
    position: 'Graphical designer',
    tag: 'work',
    labels: ['inbox', 'important'],
  },
  {
    id: '2334uudsa',
    name: 'Kostya Danovsky',
    subject: 'Street Art',
    date: '2015-11-22T10:05:09',
    body: '<p>Hey John, </p><p>Aliquam eu facilisis eros, quis varius est.</p><p>Consectetur adipiscing elit. Aliquam sodales sem in nibh pellentesque, ac dignissim mi dapibus.</p>',
    email: 'schwart@mail.com',
    position: 'Technical Chef',
    attachment: 'file.doc',
    tag: 'family',
    labels: ['inbox', 'important'],
  },
  {
    id: '2334aefvv',
    name: 'Kostya Danovsky',
    subject: 'New product',
    date: '2015-06-22T06:26:10',
    body: '<p>Hello John, </p><p>Lorem ipsum dolor sit amet!</p><p>Consectetur adipiscing elit. Aliquam sodales sem in nibh pellentesque, ac dignissim mi dapibus.</p>',
    email: 'schwart@mail.com',
    position: 'Technical Chef',
    tag: 'family',
    labels: ['inbox', 'important'],
  },
  {
    id: '2334cvdss',
    name: 'Kostya Danovsky',
    subject: 'Old product',
    date: '2015-06-22T06:26:10',
    body: '<p>Hello John, </p><p>Consectetur adipiscing elit. Aliquam sodales sem in nibh pellentesque, ac dignissim mi dapibus.</p>',
    email: 'schwart@mail.com',
    position: 'Technical Chef',
    tag: 'study',
    labels: ['trash'],
  },
  {
    id: '8223xzxfn',
    name: 'Andrey Hrabouski',
    subject: 'Skype moji',
    date: '2015-07-16T06:47:53',
    body: '<p>Hello John, </p><p>Aliquam sodales sem in nibh pellentesque</p><p>Lorem ipsum dolor I find moji in skype sit amet!.</p>',
    email: 'lakeishaphillips@mail.com',
    position: 'Mobile Developer',
    tag: 'family',
    labels: ['trash'],
  },
  {
    id: '8223sdffn',
    name: 'Andrey Hrabouski',
    subject: 'My App',
    date: '2015-06-20T07:05:02',
    body: '<p>Hey Vlad. </p><p>Lorem ipsum dolor sit amet!</p><p>Consectetur My Falasson App elit. Aliquam sodales sem in nibh pellentesque, ac dignissim mi dapibus.</p>',
    email: 'lakeishaphillips@mail.com',
    position: 'Mobile Developer',
    tag: 'family',
    labels: ['spam'],
  },
  {
    id: '9391xdsff',
    name: 'Vlad Lugovsky',
    subject: 'Cool',
    date: '2015-03-31T11:52:58',
    body: '<p>Hey Vlad. </p><p>Aliquam sodales sem in nibh pellentesque</p><p>Cras tincidunt fermentum lectus, quis scelerisque lorem volutpat sed.</p>',
    email: 'carlsongoodman@mail.com',
    position: 'Fullstack man',
    tag: 'study',
    labels: ['draft'],
  },
  {
    id: '8223xsdaa',
    name: 'Andrey Hrabouski',
    subject: 'Car rent',
    date: '2015-02-25T10:58:58',
    body: '<p>Hey Andrey. </p><p>Cras tincidunt fermentum lectus, quis scelerisque lorem volutpat sed.</p>',
    email: 'lakeishaphillips@mail.com',
    position: 'Mobile Developer',
    tag: 'family',
    labels: ['draft'],
  },
  {
    id: '9391xdsgg',
    name: 'Vlad Lugovsky',
    subject: 'What next',
    date: '2015-03-31T11:52:58',
    body: '<p>Hey Vlad. </p><p>Lorem ipsum dolor sit amet!</p><p>Esse esse labore tempor ullamco ullamco. Id veniam laborum c.</p>',
    email: 'carlsongoodman@mail.com',
    position: 'Fullstack man',
    tag: 'study',
    labels: ['sent'],
  },
];

var SORTED_MESSAGES = MESSAGES.slice().sort(function (a, b) {
  if (a.date > b.date) return -1;
  if (a.date < b.date) return 1;
  return 0;
});

var TABS = [
  { label: 'inbox', name: 'Inbox', newMails: 7 },
  { label: 'sent', name: 'Sent Mail' },
  { label: 'important', name: 'Important' },
  { label: 'draft', name: 'Draft', newMails: 2 },
  { label: 'spam', name: 'Spam' },
  { label: 'trash', name: 'Trash' },
];

export function getTabs() {
  return TABS;
}

export function getMessagesByLabel(label) {
  return SORTED_MESSAGES.filter(function (m) {
    return m.labels.indexOf(label) !== -1;
  });
}

export function getMessageById(id) {
  return SORTED_MESSAGES.filter(function (m) {
    return m.id === id;
  })[0];
}
