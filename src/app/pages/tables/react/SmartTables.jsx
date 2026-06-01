import React, { useState, useMemo } from 'react';
import Panel from './Panel';

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

function showGroup(user) {
  if (user.group && groups.length) {
    var selected = groups.filter(function (g) { return g.id === user.group; });
    return selected.length ? selected[0].text : 'Not set';
  }
  return 'Not set';
}

function showStatus(user) {
  if (user.status) {
    var selected = statuses.filter(function (s) { return s.value === user.status; });
    return selected.length ? selected[0].text : 'Not set';
  }
  return 'Not set';
}

function EditableRowTable() {
  var [users, setUsers] = useState(initialUsers);
  var [editingIndex, setEditingIndex] = useState(null);
  var [editForm, setEditForm] = useState({ name: '', status: null, group: null });

  function addUser() {
    var newUser = { id: users.length + 1, name: '', status: null, group: null };
    var updated = users.concat([newUser]);
    setUsers(updated);
    setEditingIndex(updated.length - 1);
    setEditForm({ name: '', status: null, group: null });
  }

  function removeUser(index) {
    setUsers(users.filter(function (_, i) { return i !== index; }));
    if (editingIndex === index) setEditingIndex(null);
    else if (editingIndex !== null && index < editingIndex) setEditingIndex(editingIndex - 1);
  }

  function startEdit(index) {
    var u = users[index];
    setEditingIndex(index);
    setEditForm({ name: u.name, status: u.status, group: u.group });
  }

  function cancelEdit() {
    var u = users[editingIndex];
    if (!u.name) {
      setUsers(users.filter(function (_, i) { return i !== editingIndex; }));
    }
    setEditingIndex(null);
  }

  function saveEdit(e) {
    e.preventDefault();
    var updated = users.map(function (u, i) {
      if (i === editingIndex) {
        return { id: u.id, name: editForm.name, status: editForm.status, group: editForm.group };
      }
      return u;
    });
    setUsers(updated);
    setEditingIndex(null);
  }

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
            var isEditing = editingIndex === index;
            return (
              <tr key={user.id + '-' + index} className="editable-row">
                <td>{index}</td>
                <td>
                  {isEditing ? (
                    <input type="text" className="form-control input-sm" value={editForm.name}
                      onChange={function (e) { setEditForm(Object.assign({}, editForm, { name: e.target.value })); }} required />
                  ) : (
                    <span>{user.name || 'empty'}</span>
                  )}
                </td>
                <td className="select-td">
                  {isEditing ? (
                    <select className="form-control input-sm" value={editForm.status || ''}
                      onChange={function (e) { setEditForm(Object.assign({}, editForm, { status: Number(e.target.value) || null })); }}>
                      <option value="">--</option>
                      {statuses.map(function (s) { return <option key={s.value} value={s.value}>{s.text}</option>; })}
                    </select>
                  ) : (
                    <span>{showStatus(user)}</span>
                  )}
                </td>
                <td className="select-td">
                  {isEditing ? (
                    <select className="form-control input-sm" value={editForm.group || ''}
                      onChange={function (e) { setEditForm(Object.assign({}, editForm, { group: Number(e.target.value) || null })); }}>
                      <option value="">--</option>
                      {groups.map(function (g) { return <option key={g.id} value={g.id}>{g.text}</option>; })}
                    </select>
                  ) : (
                    <span>{showGroup(user)}</span>
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <form className="form-buttons form-inline" onSubmit={saveEdit}>
                      <button type="submit" className="btn btn-primary editable-table-button btn-xs">Save</button>
                      <button type="button" className="btn btn-default editable-table-button btn-xs" onClick={cancelEdit}>Cancel</button>
                    </form>
                  ) : (
                    <div className="buttons">
                      <button className="btn btn-primary editable-table-button btn-xs" onClick={function () { startEdit(index); }}>Edit</button>
                      <button className="btn btn-danger editable-table-button btn-xs" onClick={function () { removeUser(index); }}>Delete</button>
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
  var [data, setData] = useState(function () { return smartTableData.slice(0, 36); });
  var [editingCell, setEditingCell] = useState(null);
  var [editValue, setEditValue] = useState('');
  var [sortCol, setSortCol] = useState('id');
  var [sortAsc, setSortAsc] = useState(true);
  var [page, setPage] = useState(0);
  var pageSize = 12;

  var sorted = useMemo(function () {
    return data.slice().sort(function (a, b) {
      var va = a[sortCol];
      var vb = b[sortCol];
      var na = Number(va);
      var nb = Number(vb);
      if (!isNaN(na) && !isNaN(nb)) return sortAsc ? na - nb : nb - na;
      va = String(va).toLowerCase();
      vb = String(vb).toLowerCase();
      if (va < vb) return sortAsc ? -1 : 1;
      if (va > vb) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [data, sortCol, sortAsc]);

  var totalPages = Math.ceil(sorted.length / pageSize);
  var pageData = sorted.slice(page * pageSize, (page + 1) * pageSize);

  function handleSort(col) {
    if (sortCol === col) { setSortAsc(!sortAsc); }
    else { setSortCol(col); setSortAsc(true); }
    setPage(0);
  }

  function startCellEdit(itemId, field) {
    var item = data.find(function (d) { return d.id === itemId; });
    setEditingCell({ id: itemId, field: field });
    setEditValue(item[field]);
  }

  function finishCellEdit() {
    if (editingCell) {
      setData(data.map(function (item) {
        if (item.id === editingCell.id) {
          var updated = Object.assign({}, item);
          updated[editingCell.field] = editValue;
          return updated;
        }
        return item;
      }));
      setEditingCell(null);
    }
  }

  function cancelCellEdit() {
    setEditingCell(null);
  }

  function renderCell(item, field) {
    var isEditing = editingCell && editingCell.id === item.id && editingCell.field === field;
    if (isEditing) {
      return (
        <input type="text" className="form-control input-sm" value={editValue}
          onChange={function (e) { setEditValue(e.target.value); }}
          onBlur={cancelCellEdit}
          onKeyDown={function (e) { if (e.key === 'Enter') finishCellEdit(); if (e.key === 'Escape') cancelCellEdit(); }}
          autoFocus />
      );
    }
    return <span onClick={function () { startCellEdit(item.id, field); }}>{item[field]}</span>;
  }

  var columns = ['firstName', 'lastName', 'username', 'email', 'age'];
  var columnHeaders = ['First Name', 'Last Name', 'Username', 'Email', 'Age'];

  return (
    <div className="horizontal-scroll">
      <table className="table table-hover">
        <thead>
          <tr className="sortable">
            <th className="table-id" onClick={function () { handleSort('id'); }}>#</th>
            {columns.map(function (col, i) {
              return <th key={col} onClick={function () { handleSort(col); }}>{columnHeaders[i]}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {pageData.map(function (item) {
            return (
              <tr key={item.id} className="editable-tr-wrap">
                <td className="table-id">{item.id}</td>
                {columns.map(function (col) {
                  if (col === 'email') {
                    return <td key={col}><a className="email-link" href={'mailto:' + item.email}>{item.email}</a></td>;
                  }
                  return <td key={col}>{renderCell(item, col)}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="6" className="text-center">
              <nav>
                <ul className="pagination">
                  {Array.from({ length: totalPages }, function (_, i) {
                    return (
                      <li key={i} className={page === i ? 'active' : ''}>
                        <a href="#" onClick={function (e) { e.preventDefault(); setPage(i); }}>{i + 1}</a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function SmartTableWithFiltering() {
  var [pageSize, setPageSize] = useState(10);
  var [page, setPage] = useState(0);
  var [sortCol, setSortCol] = useState('id');
  var [sortAsc, setSortAsc] = useState(true);
  var [filters, setFilters] = useState({ firstName: '', lastName: '', username: '', email: '', age: '' });

  var filtered = useMemo(function () {
    return smartTableData.filter(function (item) {
      var keys = Object.keys(filters);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (filters[key] && String(item[key]).toLowerCase().indexOf(filters[key].toLowerCase()) === -1) {
          return false;
        }
      }
      return true;
    });
  }, [filters]);

  var sorted = useMemo(function () {
    return filtered.slice().sort(function (a, b) {
      var va = a[sortCol];
      var vb = b[sortCol];
      var na = Number(va);
      var nb = Number(vb);
      if (!isNaN(na) && !isNaN(nb)) return sortAsc ? na - nb : nb - na;
      va = String(va).toLowerCase();
      vb = String(vb).toLowerCase();
      if (va < vb) return sortAsc ? -1 : 1;
      if (va > vb) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filtered, sortCol, sortAsc]);

  var totalPages = Math.ceil(sorted.length / pageSize);
  var pageData = sorted.slice(page * pageSize, (page + 1) * pageSize);

  function handleSort(col) {
    if (sortCol === col) { setSortAsc(!sortAsc); }
    else { setSortCol(col); setSortAsc(true); }
    setPage(0);
  }

  function handleFilter(field, value) {
    var updated = Object.assign({}, filters);
    updated[field] = value;
    setFilters(updated);
    setPage(0);
  }

  function handlePageSizeChange(e) {
    setPageSize(Number(e.target.value));
    setPage(0);
  }

  var columns = ['firstName', 'lastName', 'username', 'email', 'age'];
  var columnHeaders = ['First Name', 'Last Name', 'Username', 'Email', 'Age'];

  return (
    <div className="horizontal-scroll">
      <div className="form-group select-page-size-wrap">
        <label>Rows on page
          <select className="form-control selectpicker show-tick" value={pageSize} onChange={handlePageSizeChange}>
            {[5, 10, 15, 20, 25].map(function (n) { return <option key={n} value={n}>{n}</option>; })}
          </select>
        </label>
      </div>
      <table className="table">
        <thead>
          <tr className="sortable">
            <th className="table-id" onClick={function () { handleSort('id'); }}>#</th>
            {columns.map(function (col, i) {
              return <th key={col} onClick={function () { handleSort(col); }}>{columnHeaders[i]}</th>;
            })}
          </tr>
          <tr>
            <th></th>
            {columns.map(function (col, i) {
              return (
                <th key={col}>
                  <input type="search" placeholder={'Search ' + columnHeaders[i]} className="input-sm form-control search-input"
                    value={filters[col]} onChange={function (e) { handleFilter(col, e.target.value); }} />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {pageData.map(function (item) {
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
              <nav>
                <ul className="pagination">
                  {Array.from({ length: totalPages }, function (_, i) {
                    return (
                      <li key={i} className={page === i ? 'active' : ''}>
                        <a href="#" onClick={function (e) { e.preventDefault(); setPage(i); }}>{i + 1}</a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function SmartTables() {
  return (
    <div className="widgets">
      <div className="row">
        <div className="col-md-12">
          <Panel title="Editable Rows" panelClass="with-scroll">
            <EditableRowTable />
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
            <SmartTableWithFiltering />
          </Panel>
        </div>
      </div>
    </div>
  );
}

export default SmartTables;
