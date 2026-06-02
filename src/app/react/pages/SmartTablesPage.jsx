import React, { useState, useCallback, useMemo } from 'react';
import { Panel } from '../components/Panel';

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

var initialUsers = [
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

function showGroup(user) {
  if (user.group && groups.length) {
    var selected = groups.filter(function (g) { return g.id === user.group; });
    return selected.length ? selected[0].text : 'Not set';
  }
  return 'Not set';
}

function showStatus(user) {
  var selected = [];
  if (user.status) {
    selected = statuses.filter(function (s) { return s.value === user.status; });
  }
  return selected.length ? selected[0].text : 'Not set';
}

function EditableRowTable() {
  var [users, setUsers] = useState(initialUsers);
  var [editingIndex, setEditingIndex] = useState(null);
  var [editForm, setEditForm] = useState({ name: '', status: null, group: null });

  var addUser = useCallback(function () {
    var newUser = { id: users.length + 1, name: '', status: null, group: null };
    var newUsers = users.concat([newUser]);
    setUsers(newUsers);
    setEditingIndex(newUsers.length - 1);
    setEditForm({ name: '', status: null, group: null });
  }, [users]);

  var removeUser = useCallback(function (index) {
    setUsers(function (prev) { return prev.filter(function (_, i) { return i !== index; }); });
    if (editingIndex === index) {
      setEditingIndex(null);
    } else if (editingIndex !== null && index < editingIndex) {
      setEditingIndex(editingIndex - 1);
    }
  }, [editingIndex]);

  var startEdit = useCallback(function (index) {
    var user = users[index];
    setEditingIndex(index);
    setEditForm({ name: user.name, status: user.status, group: user.group });
  }, [users]);

  var cancelEdit = useCallback(function () {
    setEditingIndex(null);
  }, []);

  var saveEdit = useCallback(function (e) {
    e.preventDefault();
    setUsers(function (prev) {
      return prev.map(function (u, i) {
        if (i === editingIndex) {
          return { id: u.id, name: editForm.name, status: editForm.status, group: editForm.group };
        }
        return u;
      });
    });
    setEditingIndex(null);
  }, [editingIndex, editForm]);

  return React.createElement('div', null,
    React.createElement('div', { className: 'add-row-editable-table' },
      React.createElement('button', { className: 'btn btn-primary', onClick: addUser }, 'Add row')
    ),
    React.createElement('table', { className: 'table table-bordered table-hover table-condensed' },
      React.createElement('tr', null,
        React.createElement('td', null, ''),
        React.createElement('td', null, 'Name'),
        React.createElement('td', null, 'Status'),
        React.createElement('td', null, 'Group'),
        React.createElement('td', null, 'Actions')
      ),
      users.map(function (user, index) {
        var isEditing = editingIndex === index;
        return React.createElement('tr', { key: user.id + '-' + index, className: 'editable-row' },
          React.createElement('td', null, index),
          React.createElement('td', null,
            isEditing
              ? React.createElement('input', {
                  type: 'text',
                  className: 'form-control input-sm',
                  value: editForm.name,
                  onChange: function (e) { setEditForm(Object.assign({}, editForm, { name: e.target.value })); }
                })
              : React.createElement('span', null, user.name || 'empty')
          ),
          React.createElement('td', { className: 'select-td' },
            isEditing
              ? React.createElement('select', {
                  className: 'form-control input-sm',
                  selectpicker: '',
                  value: editForm.status || '',
                  onChange: function (e) { setEditForm(Object.assign({}, editForm, { status: e.target.value ? Number(e.target.value) : null })); }
                },
                  React.createElement('option', { value: '' }, '-- Not set --'),
                  statuses.map(function (s) {
                    return React.createElement('option', { key: s.value, value: s.value }, s.text);
                  })
                )
              : React.createElement('span', null, showStatus(user))
          ),
          React.createElement('td', { className: 'select-td' },
            isEditing
              ? React.createElement('select', {
                  className: 'form-control input-sm',
                  selectpicker: '',
                  value: editForm.group || '',
                  onChange: function (e) { setEditForm(Object.assign({}, editForm, { group: e.target.value ? Number(e.target.value) : null })); }
                },
                  React.createElement('option', { value: '' }, '-- Not set --'),
                  groups.map(function (g) {
                    return React.createElement('option', { key: g.id, value: g.id }, g.text);
                  })
                )
              : React.createElement('span', null, showGroup(user))
          ),
          React.createElement('td', null,
            isEditing
              ? React.createElement('form', { className: 'form-buttons form-inline', onSubmit: saveEdit },
                  React.createElement('button', { type: 'submit', className: 'btn btn-primary editable-table-button btn-xs' }, 'Save'),
                  React.createElement('button', { type: 'button', className: 'btn btn-default editable-table-button btn-xs', onClick: cancelEdit }, 'Cancel')
                )
              : React.createElement('div', { className: 'buttons' },
                  React.createElement('button', { className: 'btn btn-primary editable-table-button btn-xs', onClick: function () { startEdit(index); } }, 'Edit'),
                  React.createElement('button', { className: 'btn btn-danger editable-table-button btn-xs', onClick: function () { removeUser(index); } }, 'Delete')
                )
          )
        );
      })
    )
  );
}

function EditableCellsTable() {
  var [data] = useState(editableTableDataInit);
  var [sortCol, setSortCol] = useState('id');
  var [sortAsc, setSortAsc] = useState(true);
  var [page, setPage] = useState(0);
  var itemsPerPage = 12;

  var sortedData = useMemo(function () {
    var sorted = data.slice().sort(function (a, b) {
      var aVal = a[sortCol];
      var bVal = b[sortCol];
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortCol, sortAsc]);

  var totalPages = Math.ceil(sortedData.length / itemsPerPage);
  var pageData = sortedData.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  var handleSort = useCallback(function (col) {
    if (sortCol === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(col);
      setSortAsc(true);
    }
    setPage(0);
  }, [sortCol, sortAsc]);

  var columns = ['id', 'firstName', 'lastName', 'username', 'email', 'age'];
  var headers = ['#', 'First Name', 'Last Name', 'Username', 'Email', 'Age'];

  return React.createElement('div', { className: 'horizontal-scroll' },
    React.createElement('table', { className: 'table table-hover', 'st-table': 'editableTableData' },
      React.createElement('thead', null,
        React.createElement('tr', { className: 'sortable' },
          columns.map(function (col, i) {
            return React.createElement('th', {
              key: col,
              className: col === 'id' ? 'table-id' : '',
              'st-sort': col,
              'st-sort-default': col === 'id' ? 'true' : undefined,
              onClick: function () { handleSort(col); },
              style: { cursor: 'pointer' }
            }, headers[i]);
          })
        )
      ),
      React.createElement('tbody', null,
        pageData.map(function (item) {
          return React.createElement('tr', { key: item.id, className: 'editable-tr-wrap' },
            React.createElement('td', { className: 'table-id' }, item.id),
            React.createElement('td', null, React.createElement('span', null, item.firstName)),
            React.createElement('td', null, React.createElement('span', null, item.lastName)),
            React.createElement('td', null, React.createElement('span', null, item.username)),
            React.createElement('td', null, React.createElement('a', { className: 'email-link', href: 'mailto:' + item.email }, item.email)),
            React.createElement('td', null, React.createElement('span', null, item.age))
          );
        })
      ),
      React.createElement('tfoot', null,
        React.createElement('tr', null,
          React.createElement('td', { colSpan: '6', className: 'text-center' },
            React.createElement('div', { 'st-pagination': '', 'st-items-by-page': '12', 'st-displayed-pages': '5' },
              React.createElement('nav', null,
                React.createElement('ul', { className: 'pagination' },
                  Array.from({ length: totalPages }, function (_, i) {
                    return React.createElement('li', { key: i, className: page === i ? 'active' : '' },
                      React.createElement('a', { href: '#', onClick: function (e) { e.preventDefault(); setPage(i); } }, i + 1)
                    );
                  })
                )
              )
            )
          )
        )
      )
    )
  );
}

function SmartTable() {
  var [pageSize, setPageSize] = useState(10);
  var [sortCol, setSortCol] = useState('id');
  var [sortAsc, setSortAsc] = useState(true);
  var [page, setPage] = useState(0);
  var [filters, setFilters] = useState({
    firstName: '', lastName: '', username: '', email: '', age: ''
  });

  var filteredData = useMemo(function () {
    return smartTableData.filter(function (item) {
      var match = true;
      if (filters.firstName && String(item.firstName).toLowerCase().indexOf(filters.firstName.toLowerCase()) === -1) match = false;
      if (filters.lastName && String(item.lastName).toLowerCase().indexOf(filters.lastName.toLowerCase()) === -1) match = false;
      if (filters.username && String(item.username).toLowerCase().indexOf(filters.username.toLowerCase()) === -1) match = false;
      if (filters.email && String(item.email).toLowerCase().indexOf(filters.email.toLowerCase()) === -1) match = false;
      if (filters.age && String(item.age).indexOf(filters.age) === -1) match = false;
      return match;
    });
  }, [filters]);

  var sortedData = useMemo(function () {
    return filteredData.slice().sort(function (a, b) {
      var aVal = a[sortCol];
      var bVal = b[sortCol];
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortCol, sortAsc]);

  var totalPages = Math.ceil(sortedData.length / pageSize);
  var pageData = sortedData.slice(page * pageSize, (page + 1) * pageSize);

  var handleSort = useCallback(function (col) {
    if (sortCol === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(col);
      setSortAsc(true);
    }
    setPage(0);
  }, [sortCol, sortAsc]);

  var handleFilter = useCallback(function (field, value) {
    setFilters(function (prev) {
      var next = Object.assign({}, prev);
      next[field] = value;
      return next;
    });
    setPage(0);
  }, []);

  var handlePageSizeChange = useCallback(function (e) {
    setPageSize(Number(e.target.value));
    setPage(0);
  }, []);

  var columns = ['id', 'firstName', 'lastName', 'username', 'email', 'age'];
  var headers = ['#', 'First Name', 'Last Name', 'Username', 'Email', 'Age'];
  var searchFields = ['firstName', 'lastName', 'username', 'email', 'age'];
  var searchPlaceholders = ['Search First Name', 'Search Last Name', 'Search Username', 'Search Email', 'Search Age'];

  return React.createElement('div', { className: 'horizontal-scroll' },
    React.createElement('div', { className: 'form-group select-page-size-wrap' },
      React.createElement('label', null, 'Rows on page',
        React.createElement('select', {
          className: 'form-control selectpicker show-tick',
          title: 'Rows on page',
          selectpicker: '',
          value: pageSize,
          onChange: handlePageSizeChange
        },
          [5, 10, 15, 20, 25].map(function (n) {
            return React.createElement('option', { key: n, value: n }, n);
          })
        )
      )
    ),
    React.createElement('table', { className: 'table', 'st-table': 'smartTableData' },
      React.createElement('thead', null,
        React.createElement('tr', { className: 'sortable' },
          columns.map(function (col, i) {
            return React.createElement('th', {
              key: col,
              className: col === 'id' ? 'table-id' : '',
              'st-sort': col,
              'st-sort-default': col === 'id' ? 'true' : undefined,
              onClick: function () { handleSort(col); },
              style: { cursor: 'pointer' }
            }, headers[i]);
          })
        ),
        React.createElement('tr', null,
          React.createElement('th', null),
          searchFields.map(function (field, i) {
            return React.createElement('th', { key: field },
              React.createElement('input', {
                'st-search': field,
                placeholder: searchPlaceholders[i],
                className: 'input-sm form-control search-input',
                type: 'search',
                value: filters[field],
                onChange: function (e) { handleFilter(field, e.target.value); }
              })
            );
          })
        )
      ),
      React.createElement('tbody', null,
        pageData.map(function (item) {
          return React.createElement('tr', { key: item.id },
            React.createElement('td', { className: 'table-id' }, item.id),
            React.createElement('td', null, item.firstName),
            React.createElement('td', null, item.lastName),
            React.createElement('td', null, item.username),
            React.createElement('td', null, React.createElement('a', { className: 'email-link', href: 'mailto:' + item.email }, item.email)),
            React.createElement('td', null, item.age)
          );
        })
      ),
      React.createElement('tfoot', null,
        React.createElement('tr', null,
          React.createElement('td', { colSpan: '6', className: 'text-center' },
            React.createElement('div', { 'st-pagination': '', 'st-items-by-page': String(pageSize), 'st-displayed-pages': '5' },
              React.createElement('nav', null,
                React.createElement('ul', { className: 'pagination' },
                  Array.from({ length: totalPages }, function (_, i) {
                    return React.createElement('li', { key: i, className: page === i ? 'active' : '' },
                      React.createElement('a', { href: '#', onClick: function (e) { e.preventDefault(); setPage(i); } }, i + 1)
                    );
                  })
                )
              )
            )
          )
        )
      )
    )
  );
}

export function SmartTablesPage() {
  return React.createElement('div', { className: 'widgets' },
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-12' },
        React.createElement(Panel, { title: 'Editable Rows', panelClass: 'with-scroll' },
          React.createElement(EditableRowTable)
        )
      )
    ),
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-12' },
        React.createElement(Panel, { title: 'Editable Cells', panelClass: 'with-scroll' },
          React.createElement(EditableCellsTable)
        )
      )
    ),
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-12' },
        React.createElement(Panel, { title: 'Smart Table With Filtering, Sorting And Pagination', panelClass: 'with-scroll' },
          React.createElement(SmartTable)
        )
      )
    )
  );
}
