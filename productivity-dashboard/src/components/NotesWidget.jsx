import React, { useState } from 'react';

export default function NotesWidget() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  const [editText, setEditText] = useState('');

  const addNote = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setNotes([...notes, input]);
      setInput('');
    }
  };

  const startEdit = (idx) => {
    setEditIdx(idx);
    setEditText(notes[idx]);
  };

  const saveEdit = (idx) => {
    setNotes(notes.map((n, i) => (i === idx ? editText : n)));
    setEditIdx(null);
    setEditText('');
  };

  const removeNote = (idx) => {
    setNotes(notes.filter((_, i) => i !== idx));
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-yellow-600">Notes</h2>
      <form onSubmit={addNote} className="flex mb-4">
        <input
          className="flex-1 border rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new note..."
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded-r hover:bg-yellow-600 transition"
        >
          Add
        </button>
      </form>
      <ul className="space-y-2">
        {notes.map((note, idx) => (
          <li key={idx} className="flex items-center justify-between bg-gray-50 rounded p-2">
            {editIdx === idx ? (
              <>
                <input
                  className="flex-1 border px-2 py-1 rounded mr-2"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                />
                <button
                  className="text-green-500 hover:text-green-700 mr-2"
                  onClick={() => saveEdit(idx)}
                >
                  Save
                </button>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setEditIdx(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 cursor-pointer" onClick={() => startEdit(idx)}>
                  {note}
                </span>
                <button
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => removeNote(idx)}
                  aria-label="Remove"
                >
                  &times;
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
} 