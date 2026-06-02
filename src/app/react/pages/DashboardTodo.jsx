/**
 * DashboardTodo — React migration of the AngularJS `dashboardTodo` directive +
 * DashboardTodoCtrl. Renders the "To Do List" panel with add / check / remove.
 */
import React, { useRef, useState } from 'react';

var INITIAL_TODOS = [
  { text: 'Check me out' },
  { text: 'Lorem ipsum dolor sit amet, possit denique oportere at his, etiam corpora deseruisse te pro' },
  { text: 'Ex has semper alterum, expetenda dignissim' },
  { text: 'Vim an eius ocurreret abhorreant, id nam aeque persius ornatus.' },
  { text: 'Simul erroribus ad usu' },
  { text: 'Ei cum solet appareat, ex est graeci mediocritatem' },
  { text: 'Get in touch with akveo team' },
  { text: 'Write email to business cat' },
  { text: 'Have fun with blur admin' },
  { text: 'What do you think?' },
];

export function DashboardTodo({ baConfig }) {
  var transparent = baConfig.theme.blur;
  var dashboardColors = baConfig.colors.dashboard;
  var colors = [];
  for (var key in dashboardColors) {
    if (Object.prototype.hasOwnProperty.call(dashboardColors, key)) {
      colors.push(dashboardColors[key]);
    }
  }

  function getRandomColor() {
    var i = Math.floor(Math.random() * colors.length);
    return colors[i];
  }

  var idRef = useRef(0);
  function nextId() {
    idRef.current += 1;
    return idRef.current;
  }

  var [todoList, setTodoList] = useState(function () {
    return INITIAL_TODOS.map(function (item) {
      return { id: nextId(), text: item.text, color: getRandomColor() };
    });
  });
  var [newTodoText, setNewTodoText] = useState('');

  function addToDoItem(clickPlus, event) {
    if (clickPlus || (event && event.which === 13)) {
      var item = { id: nextId(), text: newTodoText, color: getRandomColor() };
      setTodoList(function (prev) {
        return [item].concat(prev);
      });
      setNewTodoText('');
    }
  }

  function removeItem(id) {
    setTodoList(function (prev) {
      return prev.filter(function (item) {
        return item.id !== id;
      });
    });
  }

  return React.createElement(
    'dashboard-todo',
    null,
    React.createElement(
      'div',
      { className: 'task-todo-container' + (transparent ? ' transparent' : '') },
      React.createElement('input', {
        type: 'text',
        className: 'form-control task-todo',
        placeholder: 'Task to do..',
        value: newTodoText,
        onChange: function (e) { setNewTodoText(e.target.value); },
        onKeyUp: function (e) { addToDoItem(false, e); },
      }),
      React.createElement('i', {
        className: 'add-item-icon ion-plus-round',
        onClick: function () { addToDoItem(true); },
      }),
      React.createElement('div', { className: 'box-shadow-border' }),
      React.createElement(
        'ul',
        { className: 'todo-list' },
        todoList.map(function (item) {
          return React.createElement(
            'li',
            { key: item.id },
            React.createElement(
              'div',
              { className: 'blur-container' },
              React.createElement('div', { className: 'blur-box' })
            ),
            React.createElement('i', { className: 'mark', style: { backgroundColor: item.color } }),
            React.createElement(
              'label',
              { className: 'todo-checkbox custom-checkbox custom-input-success' },
              React.createElement('input', { type: 'checkbox', defaultChecked: false }),
              React.createElement('span', { className: 'cut-with-dots' }, item.text)
            ),
            React.createElement('i', {
              className: 'remove-todo ion-ios-close-empty',
              onClick: function () { removeItem(item.id); },
            })
          );
        })
      )
    )
  );
}
