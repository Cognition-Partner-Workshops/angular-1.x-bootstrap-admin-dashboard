"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { colors } from "@/lib/theme";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  color: string;
}

const dashboardColors = Object.values(colors.dashboard);

function getRandomColor() {
  return dashboardColors[Math.floor(Math.random() * dashboardColors.length)];
}

const initialTodos: TodoItem[] = [
  { id: 1, text: "Check me out", completed: false, color: getRandomColor() },
  { id: 2, text: "Lorem ipsum dolor sit amet, possit denique oportere at his", completed: false, color: getRandomColor() },
  { id: 3, text: "Ex has semper alterum, expetenda dignissim", completed: false, color: getRandomColor() },
  { id: 4, text: "Vim an eius ocurreret abhorreant, id nam aeque persius ornatus", completed: false, color: getRandomColor() },
  { id: 5, text: "Simul erroribus ad usu", completed: false, color: getRandomColor() },
  { id: 6, text: "Ei cum solet appareat, ex est graeci mediocritatem", completed: false, color: getRandomColor() },
  { id: 7, text: "Get in touch with akveo team", completed: false, color: getRandomColor() },
  { id: 8, text: "Write email to business cat", completed: false, color: getRandomColor() },
  { id: 9, text: "Have fun with blur admin", completed: false, color: getRandomColor() },
  { id: 10, text: "What do you think?", completed: false, color: getRandomColor() },
];

export function TodoWidget() {
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);
  const [newTodoText, setNewTodoText] = useState("");

  const addTodo = () => {
    if (newTodoText.trim()) {
      setTodos([
        { id: Date.now(), text: newTodoText, completed: false, color: getRandomColor() },
        ...todos,
      ]);
      setNewTodoText("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add new task..."
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#209e91]"
        />
        <button
          onClick={addTodo}
          className="p-2 bg-[#209e91] text-white rounded-lg hover:bg-[#1b867b] transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group"
          >
            <div
              className="w-1 h-8 rounded-full flex-shrink-0"
              style={{ backgroundColor: todo.color }}
            />
            <label className="flex items-center gap-3 flex-1 cursor-pointer">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-4 h-4 rounded border-gray-300 text-[#209e91] focus:ring-[#209e91]"
              />
              <span
                className={`text-sm ${todo.completed ? "line-through text-gray-400" : "text-gray-700"}`}
              >
                {todo.text}
              </span>
            </label>
            <button
              onClick={() => removeTodo(todo.id)}
              className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
