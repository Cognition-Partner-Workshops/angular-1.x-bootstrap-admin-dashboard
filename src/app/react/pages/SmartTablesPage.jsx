import React, { useState, useCallback, useMemo } from 'react';
import { Panel } from '../components/Panel';
import { smartTableData, initialUsers, statuses, groups } from './tablesData';

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

function Pagination(props) {
  var currentPage = props.currentPage;
  var totalPages = props.totalPages;
  var onPageChange = props.onPageChange;
  var stItemsByPage = props.stItemsByPage;

  var pages = [];
  var start = Math.max(1, currentPage - 2);
  var end = Math.min(totalPages, start + 4);
  start = Math.max(1, end - 4);
  for (var i = start; i <= end; i++) {
    pages.push(i);
  }

  var attrs = { 'st-pagination': '', className: '' };
  if (stItemsByPage !== undefined) {
    attrs['st-items-by-page'] = String(stItemsByPage);
  }
  attrs['st-displayed-pages'] = '5';

  return React.createElement('div', attrs,
    React.createElement('nav', null,
      React.createElement('ul', { className: 'pagination' },
        React.createElement('li', { className: currentPage === 1 ? 'disabled' : '' },
          React.createElement('a', {
            href: '',
            onClick: function (e) { e.preventDefault(); if (currentPage > 1) onPageChange(currentPage - 1); }
          }, '\u00AB')
        ),
        pages.map(function (p) {
          return React.createElement('li', { key: p, className: p === currentPage ? 'active' : '' },
            React.createElement('a', {
              href: '',
              onClick: function (e) { e.preventDefault(); onPageChange(p); }
            }, p)
          );
        }),
        React.createElement('li', { className: currentPage === totalPages ? 'disabled' : '' },
          React.createElement('a', {
            href: '',
            onClick: function (e) { e.preventDefault(); if (currentPage < totalPages) onPageChange(currentPage + 1); }
          }, '\u00BB')
        )
      )
    )
  );
}

function sortData(data, column, reverse) {
  if (!column) return data;
  var sorted = data.slice().sort(function (a, b) {
    var aVal = a[column];
    var bVal = b[column];
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal);
    }
    if (aVal < bVal) return -1;
    if (aVal > bVal) return 1;
    return 0;
  });
  if (reverse) sorted.reverse();
  return sorted;
}

function EditableRowsTable() {
  var [users, setUsers] = useState(function () {
    return initialUsers.map(function (u) { return Object.assign({}, u); });
  });
  var [editingIndex, setEditingIndex] = useState(null);
  var [editForm, setEditForm] = useState({ name: '', status: null, group: null });

  var addUser = useCallback(function () {
    setUsers(function (prev) {
      var newUser = { id: prev.length + 1, name: '', status: null, group: null };
      var next = prev.concat([newUser]);
      setEditingIndex(next.length - 1);
      setEditForm({ name: '', status: null, group: null });
      return next;
    });
  }, []);

  var removeUser = useCallback(function (index) {
    setUsers(function (prev) { return prev.filter(function (_, i) { return i !== index; }); });
    setEditingIndex(function (prev) {
      if (prev === null) return null;
      if (prev === index) return null;
      if (index < prev) return prev - 1;
      return prev;
    });
  }, []);

  var startEdit = useCallback(function (index) {
    setEditingIndex(index);
    setEditForm({
      name: users[index].name,
      status: users[index].status,
      group: users[index].group
    });
  }, [users]);

  var saveEdit = useCallback(function (e) {
    e.preventDefault();
    if (editingIndex === null) return;
    setUsers(function (prev) {
      return prev.map(function (u, i) {
        if (i !== editingIndex) return u;
        return Object.assign({}, u, {
          name: editForm.name,
          status: editForm.status,
          group: editForm.group
        });
      });
    });
    setEditingIndex(null);
  }, [editingIndex, editForm]);

  var cancelEdit = useCallback(function () {
    setEditingIndex(null);
  }, []);

  return React.createElement(React.Fragment, null,
    React.createElement('div', { className: 'add-row-editable-table' },
      React.createElement('button', { className: 'btn btn-primary', onClick: addUser }, 'Add row')
    ),
    React.createElement('table', { className: 'table table-bordered table-hover table-condensed' },
      React.createElement('tbody', null,
        React.createElement('tr', null,
          React.createElement('td', null),
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
                    className: 'form-control',
                    value: editForm.name,
                    required: true,
                    onChange: function (e) { setEditForm(function (f) { return Object.assign({}, f, { name: e.target.value }); }); }
                  })
                : React.createElement('span', null, user.name || 'empty')
            ),
            React.createElement('td', { className: 'select-td' },
              isEditing
                ? React.createElement('select', {
                    className: 'form-control',
                    value: editForm.status || '',
                    onChange: function (e) { setEditForm(function (f) { return Object.assign({}, f, { status: e.target.value ? Number(e.target.value) : null }); }); }
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
                    className: 'form-control',
                    value: editForm.group || '',
                    onChange: function (e) { setEditForm(function (f) { return Object.assign({}, f, { group: e.target.value ? Number(e.target.value) : null }); }); }
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
                ? React.createElement('form', {
                    className: 'form-buttons form-inline',
                    onSubmit: saveEdit
                  },
                    React.createElement('button', {
                      type: 'submit',
                      className: 'btn btn-primary editable-table-button btn-xs'
                    },
                      React.createElement('i', { className: 'ion-checkmark-round' })
                    ),
                    React.createElement('button', {
                      type: 'button',
                      className: 'btn btn-default editable-table-button btn-xs',
                      onClick: cancelEdit
                    },
                      React.createElement('i', { className: 'ion-close-round' })
                    )
                  )
                : React.createElement('div', { className: 'buttons' },
                    React.createElement('button', {
                      className: 'btn btn-primary editable-table-button btn-xs',
                      onClick: function () { startEdit(index); }
                    }, 'Edit'),
                    React.createElement('button', {
                      className: 'btn btn-danger editable-table-button btn-xs',
                      onClick: function () { removeUser(index); }
                    }, 'Delete')
                  )
            )
          );
        })
      )
    )
  );
}

function EditableCellsTable() {
  var [data, setData] = useState(function () {
    return smartTableData.slice(0, 36).map(function (d) { return Object.assign({}, d); });
  });
  var [sortColumn, setSortColumn] = useState('id');
  var [sortReverse, setSortReverse] = useState(false);
  var [currentPage, setCurrentPage] = useState(1);
  var [editingCell, setEditingCell] = useState(null);
  var [editValue, setEditValue] = useState('');
  var itemsPerPage = 12;

  var sorted = useMemo(function () {
    return sortData(data, sortColumn, sortReverse);
  }, [data, sortColumn, sortReverse]);

  var totalPages = Math.ceil(sorted.length / itemsPerPage);
  var pageData = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  var handleSort = useCallback(function (col) {
    setSortColumn(function (prev) {
      if (prev === col) {
        setSortReverse(function (r) { return !r; });
        return col;
      }
      setSortReverse(false);
      return col;
    });
    setCurrentPage(1);
  }, []);

  var startCellEdit = useCallback(function (itemId, field) {
    var item = data.find(function (d) { return d.id === itemId; });
    if (!item) return;
    setEditingCell({ id: itemId, field: field });
    setEditValue(String(item[field]));
  }, [data]);

  var saveCellEdit = useCallback(function () {
    if (!editingCell) return;
    setData(function (prev) {
      return prev.map(function (d) {
        if (d.id !== editingCell.id) return d;
        var updated = Object.assign({}, d);
        updated[editingCell.field] = editValue;
        return updated;
      });
    });
    setEditingCell(null);
  }, [editingCell, editValue]);

  var cancelCellEdit = useCallback(function () {
    setEditingCell(null);
  }, []);

  function renderCell(item, field) {
    var isEditing = editingCell && editingCell.id === item.id && editingCell.field === field;
    if (field === 'email') {
      return React.createElement('a', { className: 'email-link', href: 'mailto:' + item.email }, item.email);
    }
    if (isEditing) {
      return React.createElement('input', {
        type: 'text',
        className: 'form-control input-sm',
        value: editValue,
        autoFocus: true,
        onChange: function (e) { setEditValue(e.target.value); },
        onBlur: cancelCellEdit,
        onKeyDown: function (e) {
          if (e.key === 'Enter') saveCellEdit();
          if (e.key === 'Escape') cancelCellEdit();
        }
      });
    }
    return React.createElement('span', {
      onClick: function () { startCellEdit(item.id, field); },
      style: { cursor: 'pointer' }
    }, item[field]);
  }

  return React.createElement('div', { className: 'horizontal-scroll' },
    React.createElement('table', { className: 'table table-hover', 'st-table': 'editableTableData' },
      React.createElement('thead', null,
        React.createElement('tr', { className: 'sortable' },
          React.createElement('th', {
            className: 'table-id',
            'st-sort': 'id',
            'st-sort-default': 'true',
            onClick: function () { handleSort('id'); },
            style: { cursor: 'pointer' }
          }, '#'),
          React.createElement('th', {
            'st-sort': 'firstName',
            onClick: function () { handleSort('firstName'); },
            style: { cursor: 'pointer' }
          }, 'First Name'),
          React.createElement('th', {
            'st-sort': 'lastName',
            onClick: function () { handleSort('lastName'); },
            style: { cursor: 'pointer' }
          }, 'Last Name'),
          React.createElement('th', {
            'st-sort': 'username',
            onClick: function () { handleSort('username'); },
            style: { cursor: 'pointer' }
          }, 'Username'),
          React.createElement('th', {
            'st-sort': 'email',
            onClick: function () { handleSort('email'); },
            style: { cursor: 'pointer' }
          }, 'Email'),
          React.createElement('th', {
            'st-sort': 'age',
            onClick: function () { handleSort('age'); },
            style: { cursor: 'pointer' }
          }, 'Age')
        )
      ),
      React.createElement('tbody', null,
        pageData.map(function (item) {
          return React.createElement('tr', { key: item.id, className: 'editable-tr-wrap' },
            React.createElement('td', { className: 'table-id' }, item.id),
            React.createElement('td', null, renderCell(item, 'firstName')),
            React.createElement('td', null, renderCell(item, 'lastName')),
            React.createElement('td', null, renderCell(item, 'username')),
            React.createElement('td', null, renderCell(item, 'email')),
            React.createElement('td', null, renderCell(item, 'age'))
          );
        })
      ),
      React.createElement('tfoot', null,
        React.createElement('tr', null,
          React.createElement('td', { colSpan: '6', className: 'text-center' },
            React.createElement(Pagination, {
              currentPage: currentPage,
              totalPages: totalPages,
              onPageChange: setCurrentPage,
              stItemsByPage: 12
            })
          )
        )
      )
    )
  );
}

function SmartTableWidget() {
  var [pageSize, setPageSize] = useState(10);
  var [searchFilters, setSearchFilters] = useState({
    firstName: '', lastName: '', username: '', email: '', age: ''
  });
  var [sortColumn, setSortColumn] = useState('id');
  var [sortReverse, setSortReverse] = useState(false);
  var [currentPage, setCurrentPage] = useState(1);

  var filtered = useMemo(function () {
    return smartTableData.filter(function (item) {
      var keys = Object.keys(searchFilters);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var term = searchFilters[key].toLowerCase();
        if (term && String(item[key]).toLowerCase().indexOf(term) === -1) {
          return false;
        }
      }
      return true;
    });
  }, [searchFilters]);

  var sorted = useMemo(function () {
    return sortData(filtered, sortColumn, sortReverse);
  }, [filtered, sortColumn, sortReverse]);

  var totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  var safePage = Math.min(currentPage, totalPages);
  var pageData = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  var handleSort = useCallback(function (col) {
    setSortColumn(function (prev) {
      if (prev === col) {
        setSortReverse(function (r) { return !r; });
        return col;
      }
      setSortReverse(false);
      return col;
    });
    setCurrentPage(1);
  }, []);

  var handleSearch = useCallback(function (field, value) {
    setSearchFilters(function (prev) {
      var next = Object.assign({}, prev);
      next[field] = value;
      return next;
    });
    setCurrentPage(1);
  }, []);

  var handlePageSizeChange = useCallback(function (e) {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  }, []);

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
          React.createElement('th', {
            className: 'table-id',
            'st-sort': 'id',
            'st-sort-default': 'true',
            onClick: function () { handleSort('id'); },
            style: { cursor: 'pointer' }
          }, '#'),
          React.createElement('th', {
            'st-sort': 'firstName',
            onClick: function () { handleSort('firstName'); },
            style: { cursor: 'pointer' }
          }, 'First Name'),
          React.createElement('th', {
            'st-sort': 'lastName',
            onClick: function () { handleSort('lastName'); },
            style: { cursor: 'pointer' }
          }, 'Last Name'),
          React.createElement('th', {
            'st-sort': 'username',
            onClick: function () { handleSort('username'); },
            style: { cursor: 'pointer' }
          }, 'Username'),
          React.createElement('th', {
            'st-sort': 'email',
            onClick: function () { handleSort('email'); },
            style: { cursor: 'pointer' }
          }, 'Email'),
          React.createElement('th', {
            'st-sort': 'age',
            onClick: function () { handleSort('age'); },
            style: { cursor: 'pointer' }
          }, 'Age')
        ),
        React.createElement('tr', null,
          React.createElement('th', null),
          React.createElement('th', null,
            React.createElement('input', {
              'st-search': 'firstName',
              placeholder: 'Search First Name',
              className: 'input-sm form-control search-input',
              type: 'search',
              value: searchFilters.firstName,
              onChange: function (e) { handleSearch('firstName', e.target.value); }
            })
          ),
          React.createElement('th', null,
            React.createElement('input', {
              'st-search': 'lastName',
              placeholder: 'Search Last Name',
              className: 'input-sm form-control search-input',
              type: 'search',
              value: searchFilters.lastName,
              onChange: function (e) { handleSearch('lastName', e.target.value); }
            })
          ),
          React.createElement('th', null,
            React.createElement('input', {
              'st-search': 'username',
              placeholder: 'Search Username',
              className: 'input-sm form-control search-input',
              type: 'search',
              value: searchFilters.username,
              onChange: function (e) { handleSearch('username', e.target.value); }
            })
          ),
          React.createElement('th', null,
            React.createElement('input', {
              'st-search': 'email',
              placeholder: 'Search Email',
              className: 'input-sm form-control search-input',
              type: 'search',
              value: searchFilters.email,
              onChange: function (e) { handleSearch('email', e.target.value); }
            })
          ),
          React.createElement('th', null,
            React.createElement('input', {
              'st-search': 'age',
              placeholder: 'Search Age',
              className: 'input-sm form-control search-input',
              type: 'search',
              value: searchFilters.age,
              onChange: function (e) { handleSearch('age', e.target.value); }
            })
          )
        )
      ),
      React.createElement('tbody', null,
        pageData.map(function (item) {
          return React.createElement('tr', { key: item.id },
            React.createElement('td', { className: 'table-id' }, item.id),
            React.createElement('td', null, item.firstName),
            React.createElement('td', null, item.lastName),
            React.createElement('td', null, item.username),
            React.createElement('td', null,
              React.createElement('a', { className: 'email-link', href: 'mailto:' + item.email }, item.email)
            ),
            React.createElement('td', null, item.age)
          );
        })
      ),
      React.createElement('tfoot', null,
        React.createElement('tr', null,
          React.createElement('td', { colSpan: '6', className: 'text-center' },
            React.createElement(Pagination, {
              currentPage: safePage,
              totalPages: totalPages,
              onPageChange: setCurrentPage,
              stItemsByPage: pageSize
            })
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
          React.createElement(EditableRowsTable)
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
        React.createElement(Panel, {
          title: 'Smart Table With Filtering, Sorting And Pagination',
          panelClass: 'with-scroll'
        },
          React.createElement(SmartTableWidget)
        )
      )
    )
  );
}
