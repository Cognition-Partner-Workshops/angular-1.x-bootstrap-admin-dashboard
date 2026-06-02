/**
 * SmartTablesPage — React migration of src/app/pages/tables/smart/tables.html
 * and its widgets (editableRowTable, editableTable, smartTable).
 *
 * Reproduces the angular-smart-table + xeditable behaviour:
 *   - Editable Rows: add / edit (in place) / delete user rows
 *   - Editable Cells: sortable, paginated grid with in-place editable text cells
 *   - Smart Table: search filtering, sorting, selectable page size, pagination
 *
 * Bridged into AngularJS via the `tablesSmartReact` directive (tablesReact.js)
 * for the `tables.smart` UI-Router state (#/tables/smart).
 */
import React, { useState, useMemo, useCallback } from 'react';
import { Panel } from '../components/Panel';
import {
  editableTableData as initialEditableData,
  smartTableData,
  users as initialUsers,
  statuses,
  groups,
} from '../data/tablesData';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function compareBy(key, asc) {
  return function (a, b) {
    var av = a[key];
    var bv = b[key];
    // Numeric comparison when both look numeric (e.g. id, age).
    var an = typeof av === 'number' ? av : parseFloat(av);
    var bn = typeof bv === 'number' ? bv : parseFloat(bv);
    var cmp;
    if (!isNaN(an) && !isNaN(bn) && String(an) === String(av) && String(bn) === String(bv)) {
      cmp = an - bn;
    } else {
      cmp = String(av).localeCompare(String(bv));
    }
    return asc ? cmp : -cmp;
  };
}

var COLUMNS = [
  { key: 'id', label: '#', className: 'table-id' },
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'age', label: 'Age' },
];

function Pagination({ page, pageCount, onPage, itemsByPage, displayedPages }) {
  var pages = [];
  for (var i = 1; i <= pageCount; i++) {
    pages.push(i);
  }
  return (
    <div
      st-pagination=""
      st-items-by-page={String(itemsByPage)}
      st-displayed-pages={String(displayedPages || 5)}
      className="pagination-wrap"
    >
      <ul className="pagination">
        <li className={page <= 1 ? 'disabled' : ''}>
          <a href="#" onClick={function (e) { e.preventDefault(); if (page > 1) onPage(page - 1); }}>&laquo;</a>
        </li>
        {pages.map(function (p) {
          return (
            <li key={p} className={p === page ? 'active' : ''}>
              <a href="#" onClick={function (e) { e.preventDefault(); onPage(p); }}>{p}</a>
            </li>
          );
        })}
        <li className={page >= pageCount ? 'disabled' : ''}>
          <a href="#" onClick={function (e) { e.preventDefault(); if (page < pageCount) onPage(page + 1); }}>&raquo;</a>
        </li>
      </ul>
    </div>
  );
}

function SortableHeaders({ sort, onSort }) {
  return (
    <tr className="sortable">
      {COLUMNS.map(function (col) {
        var props = { key: col.key, 'st-sort': col.key, onClick: function () { onSort(col.key); } };
        if (col.className) {
          props.className = col.className;
        }
        if (col.key === 'id') {
          props['st-sort-default'] = 'true';
        }
        var indicator = sort.key === col.key
          ? React.createElement('i', { className: sort.asc ? 'fa fa-sort-up' : 'fa fa-sort-down' })
          : null;
        return React.createElement('th', props, col.label, ' ', indicator);
      })}
    </tr>
  );
}

// ---------------------------------------------------------------------------
// Editable Rows (xeditable-style add / edit / delete)
// ---------------------------------------------------------------------------

function showStatus(user) {
  if (user.status) {
    var s = statuses.filter(function (st) { return st.value === user.status; });
    if (s.length) {
      return s[0].text;
    }
  }
  return 'Not set';
}

function showGroup(user) {
  if (user.group && groups.length) {
    var g = groups.filter(function (gr) { return gr.id === user.group; });
    if (g.length) {
      return g[0].text;
    }
  }
  return 'Not set';
}

function EditableRowsTable() {
  var [rows, setRows] = useState(function () {
    return initialUsers.map(function (u) { return Object.assign({}, u); });
  });
  // Track the row being edited by stable id (not array index) so add / delete
  // do not point the editor at the wrong row.
  var [editingId, setEditingId] = useState(null);
  var [draft, setDraft] = useState(null);

  var startEdit = useCallback(function (user) {
    setEditingId(user.id);
    setDraft(Object.assign({}, user));
  }, []);

  var saveEdit = useCallback(function () {
    setRows(function (prev) {
      return prev.map(function (u) { return u.id === draft.id ? Object.assign({}, draft) : u; });
    });
    setEditingId(null);
    setDraft(null);
  }, [draft]);

  var cancelEdit = useCallback(function () {
    setEditingId(null);
    setDraft(null);
  }, []);

  var removeUser = useCallback(function (id) {
    setRows(function (prev) { return prev.filter(function (u) { return u.id !== id; }); });
    setEditingId(function (cur) { return cur === id ? null : cur; });
  }, []);

  var addUser = useCallback(function () {
    setRows(function (prev) {
      // Derive a unique id from the current max so ids stay stable after
      // deletions (prev.length + 1 would collide once any row is removed,
      // breaking React keys and editingId tracking).
      var maxId = prev.reduce(function (m, u) { return Math.max(m, u.id); }, 0);
      var newUser = { id: maxId + 1, name: '', status: null, group: null };
      var next = prev.concat([newUser]);
      setEditingId(newUser.id);
      setDraft(Object.assign({}, newUser));
      return next;
    });
  }, []);

  var updateDraft = function (field, value) {
    setDraft(function (prev) {
      var next = Object.assign({}, prev);
      next[field] = value;
      return next;
    });
  };

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
          {rows.map(function (user, index) {
            var isEditing = editingId === user.id;
            return (
              <tr key={user.id} className="editable-row">
                <td>{index}</td>
                <td>
                  {isEditing
                    ? <input
                        type="text"
                        className="form-control"
                        value={draft.name}
                        onChange={function (e) { updateDraft('name', e.target.value); }}
                      />
                    : <span>{user.name || 'empty'}</span>}
                </td>
                <td className="select-td">
                  {isEditing
                    ? <select
                        className="form-control"
                        value={draft.status == null ? '' : draft.status}
                        onChange={function (e) { updateDraft('status', e.target.value === '' ? null : Number(e.target.value)); }}
                      >
                        <option value="">Not set</option>
                        {statuses.map(function (s) {
                          return <option key={s.value} value={s.value}>{s.text}</option>;
                        })}
                      </select>
                    : <span>{showStatus(user)}</span>}
                </td>
                <td className="select-td">
                  {isEditing
                    ? <select
                        className="form-control"
                        value={draft.group == null ? '' : draft.group}
                        onChange={function (e) { updateDraft('group', e.target.value === '' ? null : Number(e.target.value)); }}
                      >
                        <option value="">Not set</option>
                        {groups.map(function (g) {
                          return <option key={g.id} value={g.id}>{g.text}</option>;
                        })}
                      </select>
                    : <span>{showGroup(user)}</span>}
                </td>
                <td>
                  {isEditing
                    ? <form className="form-buttons form-inline" onSubmit={function (e) { e.preventDefault(); saveEdit(); }}>
                        <button type="submit" className="btn btn-primary editable-table-button btn-xs">Save</button>
                        <button type="button" onClick={cancelEdit} className="btn btn-default editable-table-button btn-xs">Cancel</button>
                      </form>
                    : <div className="buttons">
                        <button className="btn btn-primary editable-table-button btn-xs" onClick={function () { startEdit(user); }}>Edit</button>
                        <button className="btn btn-danger editable-table-button btn-xs" onClick={function () { removeUser(user.id); }}>Delete</button>
                      </div>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Editable Cells (sortable + paginated grid with in-place editable text)
// ---------------------------------------------------------------------------

function EditableCell({ row, field, isEditing, onStart, onCommit }) {
  if (isEditing) {
    return (
      <input
        type="text"
        className="form-control input-sm"
        autoFocus
        defaultValue={row[field]}
        onBlur={function (e) { onCommit(row.id, field, e.target.value); }}
        onKeyDown={function (e) { if (e.key === 'Enter') { onCommit(row.id, field, e.target.value); } }}
      />
    );
  }
  return (
    <span editable-text={'item.' + field} onClick={function () { onStart(row.id, field); }}>
      {row[field]}
    </span>
  );
}

function EditableCellsTable() {
  var ITEMS_BY_PAGE = 12;
  var [data, setData] = useState(function () {
    return initialEditableData.map(function (r) { return Object.assign({}, r); });
  });
  var [sort, setSort] = useState({ key: 'id', asc: true });
  var [page, setPage] = useState(1);
  var [editing, setEditing] = useState(null); // { id, field }

  var onSort = useCallback(function (key) {
    setSort(function (prev) {
      return prev.key === key ? { key: key, asc: !prev.asc } : { key: key, asc: true };
    });
    setPage(1);
  }, []);

  var sorted = useMemo(function () {
    return data.slice().sort(compareBy(sort.key, sort.asc));
  }, [data, sort]);

  var pageCount = Math.max(1, Math.ceil(sorted.length / ITEMS_BY_PAGE));
  var current = sorted.slice((page - 1) * ITEMS_BY_PAGE, page * ITEMS_BY_PAGE);

  var commit = useCallback(function (id, field, value) {
    setData(function (prev) {
      return prev.map(function (r) {
        if (r.id !== id) {
          return r;
        }
        var next = Object.assign({}, r);
        next[field] = value;
        return next;
      });
    });
    setEditing(null);
  }, []);

  var startEdit = useCallback(function (id, field) {
    setEditing({ id: id, field: field });
  }, []);

  var isEditingCell = function (row, field) {
    return !!editing && editing.id === row.id && editing.field === field;
  };

  return (
    <div className="horizontal-scroll">
      <table className="table table-hover" st-table="editableTableData">
        <thead>
          <SortableHeaders sort={sort} onSort={onSort} />
        </thead>
        <tbody>
          {current.map(function (item) {
            return (
              <tr key={item.id} className="editable-tr-wrap">
                <td className="table-id">{item.id}</td>
                <td><EditableCell row={item} field="firstName" isEditing={isEditingCell(item, 'firstName')} onStart={startEdit} onCommit={commit} /></td>
                <td><EditableCell row={item} field="lastName" isEditing={isEditingCell(item, 'lastName')} onStart={startEdit} onCommit={commit} /></td>
                <td><EditableCell row={item} field="username" isEditing={isEditingCell(item, 'username')} onStart={startEdit} onCommit={commit} /></td>
                <td><a className="email-link" href={'mailto:' + item.email}>{item.email}</a></td>
                <td><EditableCell row={item} field="age" isEditing={isEditingCell(item, 'age')} onStart={startEdit} onCommit={commit} /></td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="6" className="text-center">
              <Pagination
                page={page}
                pageCount={pageCount}
                onPage={setPage}
                itemsByPage={ITEMS_BY_PAGE}
                displayedPages={5}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Smart Table (search filtering + sorting + selectable page size + pagination)
// ---------------------------------------------------------------------------

var SEARCH_FIELDS = [
  { key: 'firstName', placeholder: 'Search First Name' },
  { key: 'lastName', placeholder: 'Search Last Name' },
  { key: 'username', placeholder: 'Search Username' },
  { key: 'email', placeholder: 'Search Email' },
  { key: 'age', placeholder: 'Search Age' },
];

function SmartTablePaginated() {
  var [pageSize, setPageSize] = useState(10);
  var [sort, setSort] = useState({ key: 'id', asc: true });
  var [search, setSearch] = useState({});
  var [page, setPage] = useState(1);

  var onSort = useCallback(function (key) {
    setSort(function (prev) {
      return prev.key === key ? { key: key, asc: !prev.asc } : { key: key, asc: true };
    });
    setPage(1);
  }, []);

  var updateSearch = function (key, value) {
    setSearch(function (prev) {
      var next = Object.assign({}, prev);
      next[key] = value;
      return next;
    });
    setPage(1);
  };

  var filtered = useMemo(function () {
    return smartTableData.filter(function (row) {
      return SEARCH_FIELDS.every(function (f) {
        var term = (search[f.key] || '').toLowerCase();
        if (!term) {
          return true;
        }
        return String(row[f.key]).toLowerCase().indexOf(term) !== -1;
      });
    });
  }, [search]);

  var sorted = useMemo(function () {
    return filtered.slice().sort(compareBy(sort.key, sort.asc));
  }, [filtered, sort]);

  var pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  var safePage = Math.min(page, pageCount);
  var current = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="horizontal-scroll">
      <div className="form-group select-page-size-wrap ">
        <label>Rows on page
          <select
            className="form-control selectpicker show-tick"
            title="Rows on page"
            selectpicker=""
            value={String(pageSize)}
            onChange={function (e) { setPageSize(Number(e.target.value)); setPage(1); }}
          >
            {[5, 10, 15, 20, 25].map(function (i) {
              return <option key={i} value={i}>{i}</option>;
            })}
          </select>
        </label>
      </div>
      <table className="table" st-table="smartTableData">
        <thead>
          <SortableHeaders sort={sort} onSort={onSort} />
          <tr>
            <th></th>
            {SEARCH_FIELDS.map(function (f) {
              return (
                <th key={f.key}>
                  <input
                    st-search={f.key}
                    placeholder={f.placeholder}
                    className="input-sm form-control search-input"
                    type="search"
                    value={search[f.key] || ''}
                    onChange={function (e) { updateSearch(f.key, e.target.value); }}
                  />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {current.map(function (item) {
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
                page={safePage}
                pageCount={pageCount}
                onPage={setPage}
                itemsByPage={pageSize}
                displayedPages={5}
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
            <SmartTablePaginated />
          </Panel>
        </div>
      </div>
    </div>
  );
}
