import React, { useState } from 'react';

var dashboardColors = {
  blueStone: '#005562',
  surfieGreen: '#0e8174',
  silverTree: '#6eba8c',
  gossip: '#b9f2a1',
  white: '#10c4b5'
};

var colorValues = Object.keys(dashboardColors).map(function (key) {
  return dashboardColors[key];
});

function getRandomColor() {
  var i = Math.floor(Math.random() * colorValues.length);
  return colorValues[i];
}

var initialTodos = [
  { text: 'Check me out' },
  { text: 'Lorem ipsum dolor sit amet, possit denique oportere at his, etiam corpora deseruisse te pro' },
  { text: 'Ex has semper alterum, expetenda dignissim' },
  { text: 'Vim an eius ocurreret abhorreant, id nam aeque persius ornatus.' },
  { text: 'Simul erroribus ad usu' },
  { text: 'Ei cum solet appareat, ex est graeci mediocritatem' },
  { text: 'Get in touch with akveo team' },
  { text: 'Write email to business cat' },
  { text: 'Have fun with blur admin' },
  { text: 'What do you think?' }
].map(function (item) {
  return { text: item.text, color: getRandomColor(), deleted: false, checked: false };
});

function TodoItem({ item, onDelete, onToggle }) {
  var [active, setActive] = useState(false);

  if (item.deleted) return null;

  return (
    <li
      className={(item.checked ? 'checked ' : '') + (active ? 'active' : '')}
      onMouseEnter={function () { setActive(true); }}
      onMouseLeave={function () { setActive(false); }}
    >
      <div className="blur-container"><div className="blur-box"></div></div>
      <i className="mark" style={{ backgroundColor: item.color }}></i>
      <label className="todo-checkbox custom-checkbox custom-input-success">
        <input type="checkbox" checked={item.checked} onChange={onToggle} />
        <span className="cut-with-dots">{item.text}</span>
      </label>
      <i className="remove-todo ion-ios-close-empty" onClick={onDelete}></i>
    </li>
  );
}

function DashboardTodo() {
  var [todoList, setTodoList] = useState(initialTodos);
  var [newTodoText, setNewTodoText] = useState('');

  function addItem(e, clickPlus) {
    if (clickPlus || (e && e.which === 13)) {
      if (!newTodoText.trim()) return;
      setTodoList([{ text: newTodoText, color: getRandomColor(), deleted: false, checked: false }].concat(todoList));
      setNewTodoText('');
    }
  }

  function deleteItem(index) {
    var newList = todoList.map(function (item, i) {
      if (i === index) return Object.assign({}, item, { deleted: true });
      return item;
    });
    setTodoList(newList);
  }

  function toggleItem(index) {
    var newList = todoList.map(function (item, i) {
      if (i === index) return Object.assign({}, item, { checked: !item.checked });
      return item;
    });
    setTodoList(newList);
  }

  return (
    <div className="task-todo-container">
      <input
        type="text"
        className="form-control task-todo"
        placeholder="Task to do.."
        value={newTodoText}
        onChange={function (e) { setNewTodoText(e.target.value); }}
        onKeyUp={function (e) { addItem(e); }}
      />
      <i className="add-item-icon ion-plus-round" onClick={function () { addItem(null, true); }}></i>
      <div className="box-shadow-border"></div>
      <ul className="todo-list">
        {todoList.map(function (item, index) {
          return (
            <TodoItem
              key={index}
              item={item}
              onDelete={function () { deleteItem(index); }}
              onToggle={function () { toggleItem(index); }}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default DashboardTodo;
