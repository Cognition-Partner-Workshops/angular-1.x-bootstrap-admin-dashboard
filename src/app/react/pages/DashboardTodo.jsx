/**
 * DashboardTodo — React port of the AngularJS dashboard-todo directive
 * (DashboardTodoCtrl + dashboardTodo.html). The "To Do List" widget.
 *
 * Supports adding items (Enter key or the plus icon), per-item checkboxes,
 * and removing items.
 */
import React, { useState, useRef, useCallback } from 'react';

var INITIAL_TEXTS = [
  'Check me out',
  'Lorem ipsum dolor sit amet, possit denique oportere at his, etiam corpora deseruisse te pro',
  'Ex has semper alterum, expetenda dignissim',
  'Vim an eius ocurreret abhorreant, id nam aeque persius ornatus.',
  'Simul erroribus ad usu',
  'Ei cum solet appareat, ex est graeci mediocritatem',
  'Get in touch with akveo team',
  'Write email to business cat',
  'Have fun with blur admin',
  'What do you think?',
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

  var getRandomColor = useCallback(function () {
    var i = Math.floor(Math.random() * colors.length);
    return colors[i];
  }, [colors]);

  var idRef = useRef(0);
  var nextId = useCallback(function () {
    idRef.current += 1;
    return idRef.current;
  }, []);

  var [todoList, setTodoList] = useState(function () {
    return INITIAL_TEXTS.map(function (text) {
      idRef.current += 1;
      var i = Math.floor(Math.random() * colors.length);
      return { id: idRef.current, text: text, color: colors[i], checked: false };
    });
  });

  var [newTodoText, setNewTodoText] = useState('');

  var addToDoItem = useCallback(function (event, clickPlus) {
    if (clickPlus || event.which === 13) {
      setTodoList(function (prev) {
        return [{ id: nextId(), text: newTodoText, color: getRandomColor(), checked: false }].concat(prev);
      });
      setNewTodoText('');
    }
  }, [newTodoText, getRandomColor, nextId]);

  var toggleChecked = useCallback(function (id) {
    setTodoList(function (prev) {
      return prev.map(function (item) {
        if (item.id !== id) {
          return item;
        }
        return Object.assign({}, item, { checked: !item.checked });
      });
    });
  }, []);

  var removeItem = useCallback(function (id) {
    setTodoList(function (prev) {
      return prev.filter(function (item) { return item.id !== id; });
    });
  }, []);

  return (
    <dashboard-todo>
      <div className={'task-todo-container' + (transparent ? ' transparent' : '')}>
        <input
          type="text"
          className="form-control task-todo"
          placeholder="Task to do.."
          value={newTodoText}
          onChange={function (e) { setNewTodoText(e.target.value); }}
          onKeyUp={function (e) { addToDoItem(e); }}
        />
        <i onClick={function () { addToDoItem('', true); }} className="add-item-icon ion-plus-round"></i>
        <div className="box-shadow-border"></div>
        <ul className="todo-list">
          {todoList.map(function (item) {
            return (
              <li key={item.id} className={item.checked ? 'checked' : ''}>
                <div className="blur-container"><div className="blur-box"></div></div>
                <i className="mark" style={{ backgroundColor: item.color }}></i>
                <label className="todo-checkbox custom-checkbox custom-input-success">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={function () { toggleChecked(item.id); }}
                  />
                  <span className="cut-with-dots">{item.text}</span>
                </label>
                <i className="remove-todo ion-ios-close-empty" onClick={function () { removeItem(item.id); }}></i>
              </li>
            );
          })}
        </ul>
      </div>
    </dashboard-todo>
  );
}
