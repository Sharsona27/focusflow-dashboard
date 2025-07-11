import React, { useState } from 'react';

export default function TodoWidget() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, { text: input, done: false }]);
      setInput('');
    }
  };

  const toggleTodo = (idx) => {
    setTodos(
      todos.map((todo, i) =>
        i === idx ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (idx) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">To-Do List</h2>
      <form onSubmit={addTodo} className="flex mb-4">
        <input
          className="flex-1 border rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition"
        >
          Add
        </button>
      </form>
      <ul className="space-y-2">
        {todos.map((todo, idx) => (
          <li key={idx} className="flex items-center justify-between bg-gray-50 rounded p-2">
            <span
              className={`flex-1 cursor-pointer ${todo.done ? 'line-through text-gray-400' : ''}`}
              onClick={() => toggleTodo(idx)}
            >
              {todo.text}
            </span>
            <button
              className="ml-2 text-red-500 hover:text-red-700"
              onClick={() => removeTodo(idx)}
              aria-label="Remove"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 