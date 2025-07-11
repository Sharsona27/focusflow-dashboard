import React from 'react';
import TodoWidget from './components/TodoWidget';
import CalendarWidget from './components/CalendarWidget';
import NotesWidget from './components/NotesWidget';
import PomodoroWidget from './components/PomodoroWidget';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Productivity Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        <TodoWidget />
        <CalendarWidget />
        <NotesWidget />
        <PomodoroWidget />
      </div>
    </div>
  );
} 