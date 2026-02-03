"use client";

import { useState, useCallback, KeyboardEvent } from "react";
import styles from "./DashboardTodo.module.css";

interface TodoItem {
  id: number;
  text: string;
  color: string;
  checked: boolean;
  deleted: boolean;
}

const DASHBOARD_COLORS = [
  "#209e91",
  "#90b900",
  "#e85656",
  "#dfb81c",
  "#2dacd1",
];

function getRandomColor(): string {
  const i = Math.floor(Math.random() * DASHBOARD_COLORS.length);
  return DASHBOARD_COLORS[i];
}

const initialTodos: Omit<TodoItem, "id" | "color" | "checked" | "deleted">[] = [
  { text: "Check me out" },
  { text: "Lorem ipsum dolor sit amet, possit denique oportere at his, etiam corpora deseruisse te pro" },
  { text: "Ex has semper alterum, expetenda dignissim" },
  { text: "Vim an eius ocurreret abhorreant, id nam aeque persius ornatus." },
  { text: "Simul erroribus ad usu" },
  { text: "Ei cum solet appareat, ex est graeci mediocritatem" },
  { text: "Get in touch with akveo team" },
  { text: "Write email to business cat" },
  { text: "Have fun with blur admin" },
  { text: "What do you think?" },
];

export default function DashboardTodo() {
  const [todoList, setTodoList] = useState<TodoItem[]>(() =>
    initialTodos.map((item, index) => ({
      ...item,
      id: index,
      color: getRandomColor(),
      checked: false,
      deleted: false,
    }))
  );
  const [newTodoText, setNewTodoText] = useState("");
  const [activeItemId, setActiveItemId] = useState<number | null>(null);

  const addTodoItem = useCallback(() => {
    if (newTodoText.trim()) {
      const newItem: TodoItem = {
        id: Date.now(),
        text: newTodoText.trim(),
        color: getRandomColor(),
        checked: false,
        deleted: false,
      };
      setTodoList((prev) => [newItem, ...prev]);
      setNewTodoText("");
    }
  }, [newTodoText]);

  const handleKeyUp = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        addTodoItem();
      }
    },
    [addTodoItem]
  );

  const toggleChecked = useCallback((id: number) => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }, []);

  const deleteItem = useCallback((id: number) => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, deleted: true } : item
      )
    );
  }, []);

  const visibleTodos = todoList.filter((item) => !item.deleted);

  return (
    <div className={styles.taskTodoContainer}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.taskTodoInput}
          placeholder="Task to do.."
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyUp={handleKeyUp}
        />
        <button
          className={styles.addItemIcon}
          onClick={addTodoItem}
          aria-label="Add todo item"
        >
          +
        </button>
      </div>
      <div className={styles.boxShadowBorder}></div>
      <ul className={styles.todoList}>
        {visibleTodos.map((item) => (
          <li
            key={item.id}
            className={`${styles.todoItem} ${item.checked ? styles.checked : ""} ${activeItemId === item.id ? styles.active : ""}`}
            onMouseEnter={() => setActiveItemId(item.id)}
            onMouseLeave={() => setActiveItemId(null)}
          >
            <i
              className={styles.mark}
              style={{ backgroundColor: item.color }}
            ></i>
            <label className={styles.todoCheckbox}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleChecked(item.id)}
              />
              <span className={styles.cutWithDots}>{item.text}</span>
            </label>
            <button
              className={styles.removeTodo}
              onClick={() => deleteItem(item.id)}
              aria-label="Remove todo item"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
