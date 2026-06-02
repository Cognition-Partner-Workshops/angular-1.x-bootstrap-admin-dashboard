/**
 * SmartTablesPage — React migration of src/app/pages/tables/smart/tables.html
 * (Editable Rows, Editable Cells, and Smart Table widgets) plus the related
 * controller logic from TablesPageCtrl.js.
 */
import React, { useState, useMemo, useRef, useCallback } from 'react';
import { Panel } from '../components/Panel';
import {
  editableTableData,
  smartTableData,
  usersData,
  statuses,
  groups,
} from './tablesData';

var SMART_COLUMNS = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'age', label: 'Age' },
];

function showStatus(user) {
  if (user.status) {
    var selected = statuses.filter(function (s) { return s.value === user.status; });
    if (selected.length) { return selected[0].text; }
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

/** Lightweight pagination control standing in for smart-table's st-pagination. */
function Pagination({ totalItems, itemsByPage, displayedPages, currentPage, onSelectPage }) {
  var pageCount = Math.max(1, Math.ceil(totalItems / itemsByPage));
  var start = Math.max(0, Math.min(currentPage - Math.floor(displayedPages / 2), pageCount - displayedPages));
  var pages = [];
  for (var i = start; i < Math.min(start + displayedPages, pageCount); i++) {
    pages.push(i);
  }
  return (
    <div
      st-pagination=""
      st-items-by-page={String(itemsByPage)}
      st-displayed-pages={String(displayedPages)}
    >
      <nav className="text-center">
        <ul className="pagination">
          {pages.map(function (p) {
            return (
              <li key={p} className={p === currentPage ? 'active' : ''}>
                <a href="" onClick={function (e) { e.preventDefault(); onSelectPage(p); }}>{p + 1}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

/** Inline click-to-edit text cell, replacing angular-xeditable's editable-text. */
function EditableText({ value, onChange }) {
  var [editing, setEditing] = useState(false);
  var [draft, setDraft] = useState(value);

  var startEdit = useCallback(function () {
    setDraft(value);
    setEditing(true);
  }, [value]);

  var commit = useCallback(function () {
    setEditing(false);
    onChange(draft);
  }, [draft, onChange]);

  if (editing) {
    return (
      <input
        className="form-control input-sm"
        value={draft}
        autoFocus
        onChange={function (e) { setDraft(e.target.value); }}
        onBlur={commit}
        onKeyDown={function (e) { if (e.key === 'Enter') { commit(); } }}
      />
    );
  }
  return (
    <span className="editable-click" onClick={startEdit}>{value}</span>
  );
}

function EditableRowsTable() {
  var [users, setUsers] = useState(usersData);
  var [editingId, setEditingId] = useState(null);
  var [draft, setDraft] = useState({ name: '', status: null, group: null });
  var nextId = useRef(usersData.length);

  var startEdit = useCallback(function (user) {
    setDraft({ name: user.name, status: user.status || null, group: user.group || null });
    setEditingId(user.id);
  }, []);

  var saveEdit = useCallback(function (id) {
    setUsers(function (prev) {
      return prev.map(function (u) {
        return u.id === id
          ? { id: u.id, name: draft.name, status: draft.status, group: draft.group }
          : u;
      });
    });
    setEditingId(null);
  }, [draft]);

  var cancelEdit = useCallback(function () {
    setEditingId(null);
  }, []);

  var removeUser = useCallback(function (id) {
    setUsers(function (prev) { return prev.filter(function (u) { return u.id !== id; }); });
    setEditingId(function (cur) { return cur === id ? null : cur; });
  }, []);

  var addUser = useCallback(function () {
    nextId.current += 1;
    var newUser = { id: nextId.current, name: '', status: null, group: null };
    setUsers(function (prev) { return prev.concat([newUser]); });
    setDraft({ name: '', status: null, group: null });
    setEditingId(newUser.id);
  }, []);

  return (
    <div>
      <div className="add-row-editable-table">
        <button className="btn btn-primary" onClick={addUser}>Add row</button>
      </div>
      <table className="table table-bordered table-hover table-condensed">
        <tbody>
          <tr>
            <td></td>
            <td>Name</td>
            <td>Status</td>
            <td>Group</td>
            <td>Actions</td>
          </tr>
          {users.map(function (user, index) {
            var isEditing = editingId === user.id;
            return (
              <tr key={user.id} className="editable-row">
                <td>{index}</td>
                <td>
                  {isEditing
                    ? (
                      <input
                        className="form-control input-sm"
                        value={draft.name}
                        onChange={function (e) { setDraft(Object.assign({}, draft, { name: e.target.value })); }}
                      />
                    )
                    : <span>{user.name || 'empty'}</span>}
                </td>
                <td className="select-td">
                  {isEditing
                    ? (
                      <select
                        className="form-control"
                        selectpicker=""
                        value={draft.status || ''}
                        onChange={function (e) { setDraft(Object.assign({}, draft, { status: e.target.value ? Number(e.target.value) : null })); }}
                      >
                        <option value=""></option>
                        {statuses.map(function (s) {
                          return <option key={s.value} value={s.value}>{s.text}</option>;
                        })}
                      </select>
                    )
                    : showStatus(user)}
                </td>
                <td className="select-td">
                  {isEditing
                    ? (
                      <select
                        className="form-control"
                        selectpicker=""
                        value={draft.group || ''}
                        onChange={function (e) { setDraft(Object.assign({}, draft, { group: e.target.value ? Number(e.target.value) : null })); }}
                      >
                        <option value=""></option>
                        {groups.map(function (g) {
                          return <option key={g.id} value={g.id}>{g.text}</option>;
                        })}
                      </select>
                    )
                    : showGroup(user)}
                </td>
                <td>
                  {isEditing
                    ? (
                      <div className="form-buttons form-inline">
                        <button className="btn btn-primary editable-table-button btn-xs" onClick={function () { saveEdit(user.id); }}>Save</button>
                        <button className="btn btn-default editable-table-button btn-xs" onClick={cancelEdit}>Cancel</button>
                      </div>
                    )
                    : (
                      <div className="buttons">
                        <button className="btn btn-primary editable-table-button btn-xs" onClick={function () { startEdit(user); }}>Edit</button>
                        <button className="btn btn-danger editable-table-button btn-xs" onClick={function () { removeUser(user.id); }}>Delete</button>
                      </div>
                    )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function EditableCellsTable() {
  var ITEMS_BY_PAGE = 12;
  var [rows, setRows] = useState(editableTableData);
  var [sortField, setSortField] = useState('id');
  var [sortReverse, setSortReverse] = useState(false);
  var [page, setPage] = useState(0);

  var sorted = useMemo(function () {
    var copy = rows.slice();
    copy.sort(function (a, b) {
      var av = a[sortField];
      var bv = b[sortField];
      if (av < bv) { return sortReverse ? 1 : -1; }
      if (av > bv) { return sortReverse ? -1 : 1; }
      return 0;
    });
    return copy;
  }, [rows, sortField, sortReverse]);

  var pageRows = sorted.slice(page * ITEMS_BY_PAGE, page * ITEMS_BY_PAGE + ITEMS_BY_PAGE);

  var toggleSort = useCallback(function (field) {
    setSortField(function (cur) {
      if (cur === field) { setSortReverse(function (r) { return !r; }); return cur; }
      setSortReverse(false);
      return field;
    });
  }, []);

  var updateCell = useCallback(function (id, field, value) {
    setRows(function (prev) {
      return prev.map(function (r) {
        return r.id === id ? Object.assign({}, r, (function () { var o = {}; o[field] = value; return o; })()) : r;
      });
    });
  }, []);

  return (
    <div className="horizontal-scroll">
      <table className="table table-hover">
        <thead>
          <tr className="sortable">
            <th className="table-id" onClick={function () { toggleSort('id'); }}>#</th>
            {SMART_COLUMNS.map(function (col) {
              return <th key={col.key} onClick={function () { toggleSort(col.key); }}>{col.label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {pageRows.map(function (item) {
            return (
              <tr key={item.id} className="editable-tr-wrap">
                <td className="table-id">{item.id}</td>
                <td><EditableText value={item.firstName} onChange={function (v) { updateCell(item.id, 'firstName', v); }} /></td>
                <td><EditableText value={item.lastName} onChange={function (v) { updateCell(item.id, 'lastName', v); }} /></td>
                <td><EditableText value={item.username} onChange={function (v) { updateCell(item.id, 'username', v); }} /></td>
                <td><a className="email-link" href={'mailto:' + item.email}>{item.email}</a></td>
                <td><EditableText value={item.age} onChange={function (v) { updateCell(item.id, 'age', v); }} /></td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="6" className="text-center">
              <Pagination
                totalItems={sorted.length}
                itemsByPage={ITEMS_BY_PAGE}
                displayedPages={5}
                currentPage={page}
                onSelectPage={setPage}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function SmartTable() {
  var [pageSize, setPageSize] = useState(10);
  var [search, setSearch] = useState({ firstName: '', lastName: '', username: '', email: '', age: '' });
  var [sortField, setSortField] = useState('id');
  var [sortReverse, setSortReverse] = useState(false);
  var [page, setPage] = useState(0);

  var filtered = useMemo(function () {
    return smartTableData.filter(function (item) {
      return SMART_COLUMNS.every(function (col) {
        var term = search[col.key];
        if (!term) { return true; }
        return String(item[col.key]).toLowerCase().indexOf(term.toLowerCase()) !== -1;
      });
    });
  }, [search]);

  var sorted = useMemo(function () {
    var copy = filtered.slice();
    copy.sort(function (a, b) {
      var av = a[sortField];
      var bv = b[sortField];
      if (av < bv) { return sortReverse ? 1 : -1; }
      if (av > bv) { return sortReverse ? -1 : 1; }
      return 0;
    });
    return copy;
  }, [filtered, sortField, sortReverse]);

  var pageRows = sorted.slice(page * pageSize, page * pageSize + pageSize);

  var toggleSort = useCallback(function (field) {
    setSortField(function (cur) {
      if (cur === field) { setSortReverse(function (r) { return !r; }); return cur; }
      setSortReverse(false);
      return field;
    });
  }, []);

  var onSearch = useCallback(function (key, value) {
    setPage(0);
    setSearch(function (prev) { return Object.assign({}, prev, (function () { var o = {}; o[key] = value; return o; })()); });
  }, []);

  return (
    <div className="horizontal-scroll">
      <div className="form-group select-page-size-wrap">
        <label>Rows on page
          <select
            className="form-control selectpicker show-tick"
            title="Rows on page"
            selectpicker=""
            value={pageSize}
            onChange={function (e) { setPage(0); setPageSize(Number(e.target.value)); }}
          >
            {[5, 10, 15, 20, 25].map(function (i) {
              return <option key={i} value={i}>{i}</option>;
            })}
          </select>
        </label>
      </div>
      <table className="table">
        <thead>
          <tr className="sortable">
            <th className="table-id" onClick={function () { toggleSort('id'); }}>#</th>
            {SMART_COLUMNS.map(function (col) {
              return <th key={col.key} onClick={function () { toggleSort(col.key); }}>{col.label}</th>;
            })}
          </tr>
          <tr>
            <th></th>
            {SMART_COLUMNS.map(function (col) {
              return (
                <th key={col.key}>
                  <input
                    placeholder={'Search ' + col.label}
                    className="input-sm form-control search-input"
                    type="search"
                    value={search[col.key]}
                    onChange={function (e) { onSearch(col.key, e.target.value); }}
                  />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {pageRows.map(function (item) {
            return (
              <tr key={item.id}>
                <td className="table-id">{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.username}</td>
                <td><a className="email-link" href={'mailto:' + item.email}>{item.email}</a></td>
                <td>{item.age}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="6" className="text-center">
              <Pagination
                totalItems={sorted.length}
                itemsByPage={pageSize}
                displayedPages={5}
                currentPage={page}
                onSelectPage={setPage}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export function SmartTablesPage() {
  return (
    <div className="widgets">
      <div className="row">
        <div className="col-md-12">
          <Panel title="Editable Rows" panelClass="with-scroll">
            <EditableRowsTable />
          </Panel>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Panel title="Editable Cells" panelClass="with-scroll">
            <EditableCellsTable />
          </Panel>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Panel title="Smart Table With Filtering, Sorting And Pagination" panelClass="with-scroll">
            <SmartTable />
          </Panel>
        </div>
      </div>
    </div>
  );
}
