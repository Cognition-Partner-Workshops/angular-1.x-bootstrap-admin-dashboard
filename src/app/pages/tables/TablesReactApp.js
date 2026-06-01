/**
 * React implementation of the Tables module.
 * Uses React.createElement (no JSX) for compatibility without build tool changes.
 */
(function () {
  'use strict';

  var h = React.createElement;

  // ============================================================
  // Data (same as the AngularJS controller)
  // ============================================================

  var smartTableData = [
    { id: 1, firstName: 'Mark', lastName: 'Otto', username: '@mdo', email: 'mdo@gmail.com', age: '28' },
    { id: 2, firstName: 'Jacob', lastName: 'Thornton', username: '@fat', email: 'fat@yandex.ru', age: '45' },
    { id: 3, firstName: 'Larry', lastName: 'Bird', username: '@twitter', email: 'twitter@outlook.com', age: '18' },
    { id: 4, firstName: 'John', lastName: 'Snow', username: '@snow', email: 'snow@gmail.com', age: '20' },
    { id: 5, firstName: 'Jack', lastName: 'Sparrow', username: '@jack', email: 'jack@yandex.ru', age: '30' },
    { id: 6, firstName: 'Ann', lastName: 'Smith', username: '@ann', email: 'ann@gmail.com', age: '21' },
    { id: 7, firstName: 'Barbara', lastName: 'Black', username: '@barbara', email: 'barbara@yandex.ru', age: '43' },
    { id: 8, firstName: 'Sevan', lastName: 'Bagrat', username: '@sevan', email: 'sevan@outlook.com', age: '13' },
    { id: 9, firstName: 'Ruben', lastName: 'Vardan', username: '@ruben', email: 'ruben@gmail.com', age: '22' },
    { id: 10, firstName: 'Karen', lastName: 'Sevan', username: '@karen', email: 'karen@yandex.ru', age: '33' },
    { id: 11, firstName: 'Mark', lastName: 'Otto', username: '@mark', email: 'mark@gmail.com', age: '38' },
    { id: 12, firstName: 'Jacob', lastName: 'Thornton', username: '@jacob', email: 'jacob@yandex.ru', age: '48' },
    { id: 13, firstName: 'Haik', lastName: 'Hakob', username: '@haik', email: 'haik@outlook.com', age: '48' },
    { id: 14, firstName: 'Garegin', lastName: 'Jirair', username: '@garegin', email: 'garegin@gmail.com', age: '40' },
    { id: 15, firstName: 'Krikor', lastName: 'Bedros', username: '@krikor', email: 'krikor@yandex.ru', age: '32' },
    { id: 16, firstName: 'Francisca', lastName: 'Brady', username: '@Gibson', email: 'franciscagibson@comtours.com', age: 11 },
    { id: 17, firstName: 'Tillman', lastName: 'Figueroa', username: '@Snow', email: 'tillmansnow@comtours.com', age: 34 },
    { id: 18, firstName: 'Jimenez', lastName: 'Morris', username: '@Bryant', email: 'jimenezbryant@comtours.com', age: 45 },
    { id: 19, firstName: 'Sandoval', lastName: 'Jacobson', username: '@Mcbride', email: 'sandovalmcbride@comtours.com', age: 32 },
    { id: 20, firstName: 'Griffin', lastName: 'Torres', username: '@Charles', email: 'griffincharles@comtours.com', age: 19 },
    { id: 21, firstName: 'Cora', lastName: 'Parker', username: '@Caldwell', email: 'coracaldwell@comtours.com', age: 27 },
    { id: 22, firstName: 'Cindy', lastName: 'Bond', username: '@Velez', email: 'cindyvelez@comtours.com', age: 24 },
    { id: 23, firstName: 'Frieda', lastName: 'Tyson', username: '@Craig', email: 'friedacraig@comtours.com', age: 45 },
    { id: 24, firstName: 'Cote', lastName: 'Holcomb', username: '@Rowe', email: 'coterowe@comtours.com', age: 20 },
    { id: 25, firstName: 'Trujillo', lastName: 'Mejia', username: '@Valenzuela', email: 'trujillovalenzuela@comtours.com', age: 16 },
    { id: 26, firstName: 'Pruitt', lastName: 'Shepard', username: '@Sloan', email: 'pruittsloan@comtours.com', age: 44 },
    { id: 27, firstName: 'Sutton', lastName: 'Ortega', username: '@Black', email: 'suttonblack@comtours.com', age: 42 },
    { id: 28, firstName: 'Marion', lastName: 'Heath', username: '@Espinoza', email: 'marionespinoza@comtours.com', age: 47 },
    { id: 29, firstName: 'Newman', lastName: 'Hicks', username: '@Keith', email: 'newmankeith@comtours.com', age: 15 },
    { id: 30, firstName: 'Boyle', lastName: 'Larson', username: '@Summers', email: 'boylesummers@comtours.com', age: 32 },
    { id: 31, firstName: 'Haynes', lastName: 'Vinson', username: '@Mckenzie', email: 'haynesmckenzie@comtours.com', age: 15 },
    { id: 32, firstName: 'Miller', lastName: 'Acosta', username: '@Young', email: 'milleryoung@comtours.com', age: 55 },
    { id: 33, firstName: 'Johnston', lastName: 'Brown', username: '@Knight', email: 'johnstonknight@comtours.com', age: 29 },
    { id: 34, firstName: 'Lena', lastName: 'Pitts', username: '@Forbes', email: 'lenaforbes@comtours.com', age: 25 },
    { id: 35, firstName: 'Terrie', lastName: 'Kennedy', username: '@Branch', email: 'terriebranch@comtours.com', age: 37 },
    { id: 36, firstName: 'Louise', lastName: 'Aguirre', username: '@Kirby', email: 'louisekirby@comtours.com', age: 44 },
    { id: 37, firstName: 'David', lastName: 'Patton', username: '@Sanders', email: 'davidsanders@comtours.com', age: 26 },
    { id: 38, firstName: 'Holden', lastName: 'Barlow', username: '@Mckinney', email: 'holdenmckinney@comtours.com', age: 11 },
    { id: 39, firstName: 'Baker', lastName: 'Rivera', username: '@Montoya', email: 'bakermontoya@comtours.com', age: 47 },
    { id: 40, firstName: 'Belinda', lastName: 'Lloyd', username: '@Calderon', email: 'belindacalderon@comtours.com', age: 21 },
    { id: 41, firstName: 'Pearson', lastName: 'Patrick', username: '@Clements', email: 'pearsonclements@comtours.com', age: 42 },
    { id: 42, firstName: 'Alyce', lastName: 'Mckee', username: '@Daugherty', email: 'alycedaugherty@comtours.com', age: 55 },
    { id: 43, firstName: 'Valencia', lastName: 'Spence', username: '@Olsen', email: 'valenciaolsen@comtours.com', age: 20 },
    { id: 44, firstName: 'Leach', lastName: 'Holcomb', username: '@Humphrey', email: 'leachhumphrey@comtours.com', age: 28 },
    { id: 45, firstName: 'Moss', lastName: 'Baxter', username: '@Fitzpatrick', email: 'mossfitzpatrick@comtours.com', age: 51 },
    { id: 46, firstName: 'Jeanne', lastName: 'Cooke', username: '@Ward', email: 'jeanneward@comtours.com', age: 59 },
    { id: 47, firstName: 'Wilma', lastName: 'Briggs', username: '@Kidd', email: 'wilmakidd@comtours.com', age: 53 },
    { id: 48, firstName: 'Beatrice', lastName: 'Perry', username: '@Gilbert', email: 'beatricegilbert@comtours.com', age: 39 },
    { id: 49, firstName: 'Whitaker', lastName: 'Hyde', username: '@Mcdonald', email: 'whitakermcdonald@comtours.com', age: 35 },
    { id: 50, firstName: 'Rebekah', lastName: 'Duran', username: '@Gross', email: 'rebekahgross@comtours.com', age: 40 },
    { id: 51, firstName: 'Earline', lastName: 'Mayer', username: '@Woodward', email: 'earlinewoodward@comtours.com', age: 52 },
    { id: 52, firstName: 'Moran', lastName: 'Baxter', username: '@Johns', email: 'moranjohns@comtours.com', age: 20 },
    { id: 53, firstName: 'Nanette', lastName: 'Hubbard', username: '@Cooke', email: 'nanettecooke@comtours.com', age: 55 },
    { id: 54, firstName: 'Dalton', lastName: 'Walker', username: '@Hendricks', email: 'daltonhendricks@comtours.com', age: 25 },
    { id: 55, firstName: 'Bennett', lastName: 'Blake', username: '@Pena', email: 'bennettpena@comtours.com', age: 13 },
    { id: 56, firstName: 'Kellie', lastName: 'Horton', username: '@Weiss', email: 'kellieweiss@comtours.com', age: 48 },
    { id: 57, firstName: 'Hobbs', lastName: 'Talley', username: '@Sanford', email: 'hobbssanford@comtours.com', age: 28 },
    { id: 58, firstName: 'Mcguire', lastName: 'Donaldson', username: '@Roman', email: 'mcguireroman@comtours.com', age: 38 },
    { id: 59, firstName: 'Rodriquez', lastName: 'Saunders', username: '@Harper', email: 'rodriquezharper@comtours.com', age: 20 },
    { id: 60, firstName: 'Lou', lastName: 'Conner', username: '@Sanchez', email: 'lousanchez@comtours.com', age: 16 }
  ];

  var editableTableDataInit = smartTableData.slice(0, 36);

  var peopleTableData = [
    { id: 1, firstName: 'Mark', lastName: 'Otto', username: '@mdo', email: 'mdo@gmail.com', age: '28', status: 'info' },
    { id: 2, firstName: 'Jacob', lastName: 'Thornton', username: '@fat', email: 'fat@yandex.ru', age: '45', status: 'primary' },
    { id: 3, firstName: 'Larry', lastName: 'Bird', username: '@twitter', email: 'twitter@outlook.com', age: '18', status: 'success' },
    { id: 4, firstName: 'John', lastName: 'Snow', username: '@snow', email: 'snow@gmail.com', age: '20', status: 'danger' },
    { id: 5, firstName: 'Jack', lastName: 'Sparrow', username: '@jack', email: 'jack@yandex.ru', age: '30', status: 'warning' }
  ];

  var metricsTableData = [
    { image: 'app/browsers/chrome.svg', browser: 'Google Chrome', visits: '10,392', isVisitsUp: true, purchases: '4,214', isPurchasesUp: true, percent: '45%', isPercentUp: true },
    { image: 'app/browsers/firefox.svg', browser: 'Mozilla Firefox', visits: '7,873', isVisitsUp: true, purchases: '3,031', isPurchasesUp: false, percent: '28%', isPercentUp: true },
    { image: 'app/browsers/ie.svg', browser: 'Internet Explorer', visits: '5,890', isVisitsUp: false, purchases: '2,102', isPurchasesUp: false, percent: '17%', isPercentUp: false },
    { image: 'app/browsers/safari.svg', browser: 'Safari', visits: '4,001', isVisitsUp: false, purchases: '1,001', isPurchasesUp: false, percent: '14%', isPercentUp: true },
    { image: 'app/browsers/opera.svg', browser: 'Opera', visits: '1,833', isVisitsUp: true, purchases: '83', isPurchasesUp: true, percent: '5%', isPercentUp: false }
  ];

  var usersDataInit = [
    { id: 1, name: 'Esther Vang', status: 4, group: 3 },
    { id: 2, name: 'Leah Freeman', status: 3, group: 1 },
    { id: 3, name: 'Mathews Simpson', status: 3, group: 2 },
    { id: 4, name: 'Buckley Hopkins', status: null, group: 4 },
    { id: 5, name: 'Buckley Schwartz', status: 1, group: 1 },
    { id: 6, name: 'Mathews Hopkins', status: 4, group: 2 },
    { id: 7, name: 'Leah Vang', status: 4, group: 1 },
    { id: 8, name: 'Vang Schwartz', status: 4, group: 2 },
    { id: 9, name: 'Hopkin Esther', status: 1, group: 2 },
    { id: 10, name: 'Mathews Schwartz', status: 1, group: 3 }
  ];

  var statuses = [
    { value: 1, text: 'Good' },
    { value: 2, text: 'Awesome' },
    { value: 3, text: 'Excellent' }
  ];

  var groups = [
    { id: 1, text: 'user' },
    { id: 2, text: 'customer' },
    { id: 3, text: 'vip' },
    { id: 4, text: 'admin' }
  ];

  function showStatus(user) {
    if (user.status) {
      var selected = statuses.filter(function (s) { return s.value === user.status; });
      return selected.length ? selected[0].text : 'Not set';
    }
    return 'Not set';
  }

  function showGroup(user) {
    if (user.group && groups.length) {
      var selected = groups.filter(function (g) { return g.id === user.group; });
      return selected.length ? selected[0].text : 'Not set';
    }
    return 'Not set';
  }

  // ============================================================
  // Hash Router
  // ============================================================
  var RouterContext = React.createContext({ path: '', navigate: function () {} });

  function HashRouter(props) {
    var getHash = function () {
      return window.location.hash.replace(/^#/, '') || '/';
    };
    var pathState = React.useState(getHash());
    var path = pathState[0];
    var setPath = pathState[1];

    React.useEffect(function () {
      var onHashChange = function () { setPath(getHash()); };
      window.addEventListener('hashchange', onHashChange);
      return function () { window.removeEventListener('hashchange', onHashChange); };
    }, []);

    var navigate = function (newPath) {
      window.location.hash = '#' + newPath;
    };

    return h(RouterContext.Provider, { value: { path: path, navigate: navigate } }, props.children);
  }

  function Route(props) {
    var ctx = React.useContext(RouterContext);
    if (ctx.path === props.path || ctx.path.indexOf(props.path) === 0) {
      return typeof props.component === 'function' ? h(props.component) : null;
    }
    return null;
  }

  // ============================================================
  // Basic Tables Page Components
  // ============================================================

  function HoverRowsTable() {
    return h('div', { className: 'horizontal-scroll' },
      h('table', { className: 'table table-hover' },
        h('thead', null,
          h('tr', { className: 'black-muted-bg' },
            h('th', { className: 'browser-icons' }),
            h('th', null, 'Browser'),
            h('th', { className: 'align-right' }, 'Visits'),
            h('th', { className: 'table-arr' }),
            h('th', { className: 'align-right' }, 'Purchases'),
            h('th', { className: 'table-arr' }),
            h('th', { className: 'align-right' }, '%'),
            h('th', { className: 'table-arr' })
          )
        ),
        h('tbody', null,
          metricsTableData.map(function (item, i) {
            return h('tr', { key: i, className: 'no-top-border' },
              h('td', null, h('img', { src: item.image, width: '20', height: '20' })),
              h('td', { className: 'nowrap' }, item.browser),
              h('td', { className: 'align-right' }, item.visits),
              h('td', { className: 'table-arr' }, h('i', { className: item.isVisitsUp ? 'icon-up' : 'icon-down' })),
              h('td', { className: 'align-right' }, item.purchases),
              h('td', { className: 'table-arr' }, h('i', { className: item.isPurchasesUp ? 'icon-up' : 'icon-down' })),
              h('td', { className: 'align-right' }, item.percent),
              h('td', { className: 'table-arr' }, h('i', { className: item.isPercentUp ? 'icon-up' : 'icon-down' }))
            );
          })
        )
      )
    );
  }

  function BorderedTable() {
    return h('div', { className: 'horizontal-scroll' },
      h('table', { className: 'table table-bordered' },
        h('thead', null,
          h('tr', null,
            h('th', { className: 'browser-icons' }),
            h('th', null, 'Browser'),
            h('th', { className: 'align-right' }, 'Visits'),
            h('th', { className: 'align-right' }, 'Purchases'),
            h('th', { className: 'align-right' }, '%')
          )
        ),
        h('tbody', null,
          metricsTableData.map(function (item, i) {
            return h('tr', { key: i },
              h('td', null, h('img', { src: item.image, width: '20', height: '20' })),
              h('td', { className: 'nowrap' }, item.browser),
              h('td', { className: 'align-right' }, item.visits),
              h('td', { className: 'align-right' }, item.purchases),
              h('td', { className: 'align-right' }, item.percent)
            );
          })
        )
      )
    );
  }

  function CondensedTable() {
    return h('div', { className: 'horizontal-scroll' },
      h('table', { className: 'table table-condensed' },
        h('thead', null,
          h('tr', null,
            h('th', { className: 'table-id' }, '#'),
            h('th', null, 'First Name'),
            h('th', null, 'Last Name'),
            h('th', null, 'Username'),
            h('th', null, 'Email'),
            h('th', null, 'Status')
          )
        ),
        h('tbody', null,
          peopleTableData.map(function (item, i) {
            return h('tr', { key: i },
              h('td', { className: 'table-id' }, item.id),
              h('td', null, item.firstName),
              h('td', null, item.lastName),
              h('td', null, item.username),
              h('td', null, h('a', { className: 'email-link', href: 'mailto:' + item.email }, item.email)),
              h('td', null, h('button', { className: 'status-button btn btn-xs btn-' + item.status }, item.status))
            );
          })
        )
      )
    );
  }

  function StripedRowsTable() {
    return h('div', { className: 'vertical-scroll' },
      h('table', { className: 'table table-striped' },
        h('thead', null,
          h('tr', null,
            h('th', { className: 'table-id' }, '#'),
            h('th', null, 'First Name'),
            h('th', null, 'Last Name'),
            h('th', null, 'Username'),
            h('th', null, 'Email'),
            h('th', null, 'Age')
          )
        ),
        h('tbody', null,
          smartTableData.map(function (item, i) {
            return h('tr', { key: i },
              h('td', { className: 'table-id' }, item.id),
              h('td', null, item.firstName),
              h('td', null, item.lastName),
              h('td', null, item.username),
              h('td', null, h('a', { className: 'email-link', href: 'mailto:' + item.email }, item.email)),
              h('td', null, item.age)
            );
          })
        )
      )
    );
  }

  function ContextualTable() {
    var rows = [
      { cls: 'primary', id: 1, firstName: 'Mark', lastName: 'Otto', username: '@mdo', email: 'mdo@gmail.com', age: 28 },
      { cls: 'success', id: 2, firstName: 'Jacob', lastName: 'Thornton', username: '@fat', email: 'fat@yandex.ru', age: 45 },
      { cls: 'warning', id: 3, firstName: 'Larry', lastName: 'Bird', username: '@twitter', email: 'twitter@outlook.com', age: 18 },
      { cls: 'danger', id: 4, firstName: 'John', lastName: 'Snow', username: '@snow', email: 'snow@gmail.com', age: 20 },
      { cls: 'info', id: 5, firstName: 'Jack', lastName: 'Sparrow', username: '@jack', email: 'jack@yandex.ru', age: 30 }
    ];

    return h('table', { className: 'table' },
      h('tbody', null,
        h('tr', null,
          h('th', null, '#'),
          h('th', null, 'First Name'),
          h('th', null, 'Last Name'),
          h('th', null, 'Username'),
          h('th', null, 'Email'),
          h('th', null, 'Age')
        ),
        rows.map(function (r, i) {
          return h('tr', { key: i, className: r.cls },
            h('td', null, r.id),
            h('td', null, r.firstName),
            h('td', null, r.lastName),
            h('td', null, r.username),
            h('td', null, h('a', { className: 'email-link', href: 'mailto:' + r.email }, r.email)),
            h('td', null, r.age)
          );
        })
      )
    );
  }

  function ResponsiveTable() {
    var rows = [
      { id: 1, firstName: 'Mark', lastName: 'Otto', username: '@mdo', email: 'mdo@gmail.com', age: 28 },
      { id: 2, firstName: 'Jacob', lastName: 'Thornton', username: '@fat', email: 'fat@yandex.ru', age: 45 },
      { id: 3, firstName: 'Larry', lastName: 'Bird', username: '@twitter', email: 'twitter@outlook.com', age: 18 },
      { id: 4, firstName: 'John', lastName: 'Snow', username: '@snow', email: 'snow@gmail.com', age: 20 },
      { id: 5, firstName: 'Jack', lastName: 'Sparrow', username: '@jack', email: 'jack@yandex.ru', age: 30 }
    ];

    return h('div', { className: 'table-responsive' },
      h('table', { className: 'table' },
        h('tbody', null,
          h('tr', null,
            h('th', null, '#'),
            h('th', null, 'First Name'),
            h('th', null, 'Last Name'),
            h('th', null, 'Username'),
            h('th', null, 'Email'),
            h('th', null, 'Age')
          ),
          rows.map(function (r, i) {
            return h('tr', { key: i },
              h('td', null, r.id),
              h('td', null, r.firstName),
              h('td', null, r.lastName),
              h('td', null, r.username),
              h('td', null, h('a', { className: 'email-link', href: 'mailto:' + r.email }, r.email)),
              h('td', null, r.age)
            );
          })
        )
      )
    );
  }

  // Panel wrapper to match ba-panel directive output
  function Panel(props) {
    return h('div', { className: 'panel ' + (props.panelClass || '') },
      h('div', { className: 'panel-heading clearfix' },
        h('h3', { className: 'panel-title' }, props.title)
      ),
      h('div', { className: 'panel-body' }, props.children)
    );
  }

  function BasicTablesPage() {
    return h('div', { className: 'widgets' },
      h('div', { className: 'row' },
        h('div', { className: 'col-lg-6 col-md-12' },
          h(Panel, { title: 'Hover Rows', panelClass: 'with-scroll table-panel' }, h(HoverRowsTable))
        ),
        h('div', { className: 'col-lg-6 col-md-12' },
          h(Panel, { title: 'Bordered Table', panelClass: 'with-scroll table-panel' }, h(BorderedTable))
        )
      ),
      h('div', { className: 'row' },
        h('div', { className: 'col-lg-6 col-md-12' },
          h(Panel, { title: 'Condensed Table', panelClass: 'with-scroll table-panel' }, h(CondensedTable))
        ),
        h('div', { className: 'col-lg-6 col-md-12' },
          h(Panel, { title: 'Striped Rows', panelClass: 'with-scroll table-panel' }, h(StripedRowsTable))
        )
      ),
      h('div', { className: 'row' },
        h('div', { className: 'col-lg-6 col-md-12' },
          h(Panel, { title: 'Contextual Table', panelClass: 'with-scroll table-panel' }, h(ContextualTable))
        ),
        h('div', { className: 'col-lg-6 col-md-12' },
          h(Panel, { title: 'Responsive Table', panelClass: 'with-scroll table-panel' }, h(ResponsiveTable))
        )
      )
    );
  }

  // ============================================================
  // Smart Tables Page Components
  // ============================================================

  function EditableRowsTable() {
    var usersState = React.useState(usersDataInit.map(function (u) { return Object.assign({}, u); }));
    var users = usersState[0];
    var setUsers = usersState[1];

    var editingState = React.useState(null);
    var editingIndex = editingState[0];
    var setEditingIndex = editingState[1];

    var editFormState = React.useState({ name: '', status: null, group: null });
    var editForm = editFormState[0];
    var setEditForm = editFormState[1];

    function addUser() {
      var newUser = {
        id: users.length + 1,
        name: '',
        status: null,
        group: null
      };
      var newUsers = users.concat([newUser]);
      setUsers(newUsers);
      setEditingIndex(newUsers.length - 1);
      setEditForm({ name: '', status: null, group: null });
    }

    function removeUser(index) {
      setUsers(users.filter(function (_, i) { return i !== index; }));
      if (editingIndex === index) {
        setEditingIndex(null);
      } else if (editingIndex !== null && index < editingIndex) {
        setEditingIndex(editingIndex - 1);
      }
    }

    function startEdit(index) {
      setEditingIndex(index);
      setEditForm({
        name: users[index].name,
        status: users[index].status,
        group: users[index].group
      });
    }

    function cancelEdit() {
      // If the user was newly added (empty name), remove it
      if (editingIndex !== null && users[editingIndex] && users[editingIndex].name === '') {
        setUsers(users.filter(function (_, i) { return i !== editingIndex; }));
      }
      setEditingIndex(null);
    }

    function saveEdit() {
      if (editingIndex === null) return;
      var newUsers = users.map(function (u, i) {
        if (i === editingIndex) {
          return Object.assign({}, u, {
            name: editForm.name,
            status: editForm.status,
            group: editForm.group
          });
        }
        return u;
      });
      setUsers(newUsers);
      setEditingIndex(null);
    }

    return h('div', null,
      h('div', { className: 'add-row-editable-table' },
        h('button', { className: 'btn btn-primary', onClick: addUser }, 'Add row')
      ),
      h('table', { className: 'table table-bordered table-hover table-condensed' },
        h('tbody', null,
          h('tr', null,
            h('td', null, ''),
            h('td', null, 'Name'),
            h('td', null, 'Status'),
            h('td', null, 'Group'),
            h('td', null, 'Actions')
          ),
          users.map(function (user, index) {
            var isEditing = editingIndex === index;
            return h('tr', { key: user.id + '-' + index, className: 'editable-row' },
              h('td', null, index),
              h('td', null,
                isEditing
                  ? h('input', {
                      type: 'text',
                      className: 'form-control',
                      value: editForm.name,
                      onChange: function (e) { setEditForm(Object.assign({}, editForm, { name: e.target.value })); }
                    })
                  : h('span', null, user.name || 'empty')
              ),
              h('td', { className: 'select-td' },
                isEditing
                  ? h('select', {
                      className: 'form-control',
                      value: editForm.status || '',
                      onChange: function (e) { setEditForm(Object.assign({}, editForm, { status: e.target.value ? Number(e.target.value) : null })); }
                    },
                    h('option', { value: '' }, '-- Not set --'),
                    statuses.map(function (s) {
                      return h('option', { key: s.value, value: s.value }, s.text);
                    })
                  )
                  : h('span', null, showStatus(user))
              ),
              h('td', { className: 'select-td' },
                isEditing
                  ? h('select', {
                      className: 'form-control',
                      value: editForm.group || '',
                      onChange: function (e) { setEditForm(Object.assign({}, editForm, { group: e.target.value ? Number(e.target.value) : null })); }
                    },
                    h('option', { value: '' }, '-- Not set --'),
                    groups.map(function (g) {
                      return h('option', { key: g.id, value: g.id }, g.text);
                    })
                  )
                  : h('span', null, showGroup(user))
              ),
              h('td', null,
                isEditing
                  ? h('form', { className: 'form-buttons form-inline', onSubmit: function (e) { e.preventDefault(); saveEdit(); } },
                      h('button', { type: 'submit', className: 'btn btn-primary editable-table-button btn-xs' }, 'Save'),
                      h('button', { type: 'button', className: 'btn btn-default editable-table-button btn-xs', onClick: cancelEdit }, 'Cancel')
                    )
                  : h('div', { className: 'buttons' },
                      h('button', { className: 'btn btn-primary editable-table-button btn-xs', onClick: function () { startEdit(index); } }, 'Edit'),
                      h('button', { className: 'btn btn-danger editable-table-button btn-xs', onClick: function () { removeUser(index); } }, 'Delete')
                    )
              )
            );
          })
        )
      )
    );
  }

  function EditableCellsTable() {
    var dataState = React.useState(editableTableDataInit.map(function (d) { return Object.assign({}, d); }));
    var data = dataState[0];
    var setData = dataState[1];

    var sortState = React.useState({ column: 'id', reverse: false });
    var sort = sortState[0];
    var setSort = sortState[1];

    var pageState = React.useState(0);
    var currentPage = pageState[0];
    var setCurrentPage = pageState[1];

    var itemsPerPage = 12;

    function handleSort(column) {
      if (sort.column === column) {
        setSort({ column: column, reverse: !sort.reverse });
      } else {
        setSort({ column: column, reverse: false });
      }
    }

    var sortedData = data.slice().sort(function (a, b) {
      var aVal = a[sort.column];
      var bVal = b[sort.column];
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      if (aVal < bVal) return sort.reverse ? 1 : -1;
      if (aVal > bVal) return sort.reverse ? -1 : 1;
      return 0;
    });

    var totalPages = Math.ceil(sortedData.length / itemsPerPage);
    var pagedData = sortedData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    var columns = ['id', 'firstName', 'lastName', 'username', 'email', 'age'];
    var columnLabels = { id: '#', firstName: 'First Name', lastName: 'Last Name', username: 'Username', email: 'Email', age: 'Age' };

    return h('div', { className: 'horizontal-scroll' },
      h('table', { className: 'table table-hover' },
        h('thead', null,
          h('tr', { className: 'sortable' },
            columns.map(function (col) {
              return h('th', {
                key: col,
                className: col === 'id' ? 'table-id' : '',
                onClick: function () { handleSort(col); },
                style: { cursor: 'pointer' }
              },
                columnLabels[col],
                sort.column === col ? h('span', null, sort.reverse ? ' \u25BC' : ' \u25B2') : null
              );
            })
          )
        ),
        h('tbody', null,
          pagedData.map(function (item, i) {
            return h('tr', { key: item.id, className: 'editable-tr-wrap' },
              h('td', { className: 'table-id' }, item.id),
              h('td', null, h('span', null, item.firstName)),
              h('td', null, h('span', null, item.lastName)),
              h('td', null, h('span', null, item.username)),
              h('td', null, h('a', { className: 'email-link', href: 'mailto:' + item.email }, item.email)),
              h('td', null, h('span', null, item.age))
            );
          })
        ),
        h('tfoot', null,
          h('tr', null,
            h('td', { colSpan: 6, className: 'text-center' },
              h('nav', null,
                h('ul', { className: 'pagination' },
                  Array.from({ length: totalPages }, function (_, i) {
                    return h('li', { key: i, className: currentPage === i ? 'active' : '' },
                      h('a', { href: '#', onClick: function (e) { e.preventDefault(); setCurrentPage(i); } }, i + 1)
                    );
                  })
                )
              )
            )
          )
        )
      )
    );
  }

  function SmartTableWidget() {
    var pageSizeState = React.useState(10);
    var pageSize = pageSizeState[0];
    var setPageSize = pageSizeState[1];

    var sortState = React.useState({ column: 'id', reverse: false });
    var sort = sortState[0];
    var setSort = sortState[1];

    var filtersState = React.useState({ firstName: '', lastName: '', username: '', email: '', age: '' });
    var filters = filtersState[0];
    var setFilters = filtersState[1];

    var pageState = React.useState(0);
    var currentPage = pageState[0];
    var setCurrentPage = pageState[1];

    function handleSort(column) {
      if (sort.column === column) {
        setSort({ column: column, reverse: !sort.reverse });
      } else {
        setSort({ column: column, reverse: false });
      }
    }

    function handleFilterChange(field, value) {
      var newFilters = Object.assign({}, filters);
      newFilters[field] = value;
      setFilters(newFilters);
      setCurrentPage(0);
    }

    var filteredData = smartTableData.filter(function (item) {
      for (var key in filters) {
        if (filters[key] && String(item[key]).toLowerCase().indexOf(filters[key].toLowerCase()) === -1) {
          return false;
        }
      }
      return true;
    });

    var sortedData = filteredData.slice().sort(function (a, b) {
      var aVal = a[sort.column];
      var bVal = b[sort.column];
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      if (aVal < bVal) return sort.reverse ? 1 : -1;
      if (aVal > bVal) return sort.reverse ? -1 : 1;
      return 0;
    });

    var totalPages = Math.ceil(sortedData.length / pageSize);
    var pagedData = sortedData.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

    var columns = ['id', 'firstName', 'lastName', 'username', 'email', 'age'];
    var columnLabels = { id: '#', firstName: 'First Name', lastName: 'Last Name', username: 'Username', email: 'Email', age: 'Age' };
    var searchPlaceholders = { firstName: 'Search First Name', lastName: 'Search Last Name', username: 'Search Username', email: 'Search Email', age: 'Search Age' };

    return h('div', { className: 'horizontal-scroll' },
      h('div', { className: 'form-group select-page-size-wrap' },
        h('label', null, 'Rows on page',
          h('select', {
            className: 'form-control',
            value: pageSize,
            onChange: function (e) { setPageSize(Number(e.target.value)); setCurrentPage(0); }
          },
            [5, 10, 15, 20, 25].map(function (n) {
              return h('option', { key: n, value: n }, n);
            })
          )
        )
      ),
      h('table', { className: 'table' },
        h('thead', null,
          h('tr', { className: 'sortable' },
            columns.map(function (col) {
              return h('th', {
                key: col,
                className: col === 'id' ? 'table-id' : '',
                onClick: function () { handleSort(col); },
                style: { cursor: 'pointer' }
              },
                columnLabels[col],
                sort.column === col ? h('span', null, sort.reverse ? ' \u25BC' : ' \u25B2') : null
              );
            })
          ),
          h('tr', null,
            h('th', null),
            ['firstName', 'lastName', 'username', 'email', 'age'].map(function (field) {
              return h('th', { key: field },
                h('input', {
                  type: 'search',
                  placeholder: searchPlaceholders[field],
                  className: 'input-sm form-control search-input',
                  value: filters[field],
                  onChange: function (e) { handleFilterChange(field, e.target.value); }
                })
              );
            })
          )
        ),
        h('tbody', null,
          pagedData.map(function (item, i) {
            return h('tr', { key: item.id },
              h('td', { className: 'table-id' }, item.id),
              h('td', null, item.firstName),
              h('td', null, item.lastName),
              h('td', null, item.username),
              h('td', null, h('a', { className: 'email-link', href: 'mailto:' + item.email }, item.email)),
              h('td', null, item.age)
            );
          })
        ),
        h('tfoot', null,
          h('tr', null,
            h('td', { colSpan: 6, className: 'text-center' },
              h('nav', null,
                h('ul', { className: 'pagination' },
                  Array.from({ length: totalPages }, function (_, i) {
                    return h('li', { key: i, className: currentPage === i ? 'active' : '' },
                      h('a', { href: '#', onClick: function (e) { e.preventDefault(); setCurrentPage(i); } }, i + 1)
                    );
                  })
                )
              )
            )
          )
        )
      )
    );
  }

  function SmartTablesPage() {
    return h('div', { className: 'widgets' },
      h('div', { className: 'row' },
        h('div', { className: 'col-md-12' },
          h(Panel, { title: 'Editable Rows', panelClass: 'with-scroll' }, h(EditableRowsTable))
        )
      ),
      h('div', { className: 'row' },
        h('div', { className: 'col-md-12' },
          h(Panel, { title: 'Editable Cells', panelClass: 'with-scroll' }, h(EditableCellsTable))
        )
      ),
      h('div', { className: 'row' },
        h('div', { className: 'col-md-12' },
          h(Panel, { title: 'Smart Table With Filtering, Sorting And Pagination', panelClass: 'with-scroll' }, h(SmartTableWidget))
        )
      )
    );
  }

  // ============================================================
  // Main App — routes based on hash
  // ============================================================

  function TablesApp() {
    return h(HashRouter, null,
      h(Route, { path: '/tables/basic', component: BasicTablesPage }),
      h(Route, { path: '/tables/smart', component: SmartTablesPage })
    );
  }

  // ============================================================
  // Mount / Unmount API
  // ============================================================
  var mountEl = null;

  window.mountTablesReact = function (element) {
    mountEl = element;
    ReactDOM.render(h(TablesApp), element);
  };

  window.unmountTablesReact = function () {
    if (mountEl) {
      ReactDOM.unmountComponentAtNode(mountEl);
      mountEl = null;
    }
  };

})();
