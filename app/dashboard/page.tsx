"use client"
import { useState } from "react"
import { TodoWidget } from "@/components/todo-widget"
import { CalendarWidget } from "@/components/calendar-widget"
import { NotesWidget } from "@/components/notes-widget"
import { PomodoroWidget } from "@/components/pomodoro-widget"
import { ThemeToggle } from "@/components/theme-toggle"

interface Todo {
  id: string
  text: string
  completed: boolean
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Record<string, Todo[]>>({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddTask = (date: Date, text: string) => {
    const dateKey = date.toISOString().slice(0, 10);
    setTasks((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), { id: Date.now().toString(), text, completed: false }],
    }));
  };
  const handleToggleTask = (date: Date, id: string) => {
    const dateKey = date.toISOString().slice(0, 10);
    setTasks((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].map((t) => t.id === id ? { ...t, completed: !t.completed } : t),
    }));
  };
  const handleDeleteTask = (date: Date, id: string) => {
    const dateKey = date.toISOString().slice(0, 10);
    setTasks((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((t) => t.id !== id),
    }));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2 neumorphic-title">Productivity Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Stay organized and focused with your personal productivity tools
          </p>
        </div>
        <ThemeToggle />
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-2">
          <TodoWidget
            selectedDate={selectedDate}
            tasks={tasks}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
        <div className="xl:col-span-2">
          <CalendarWidget
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            tasks={tasks}
            onAddTask={handleAddTask}
          />
        </div>
        <div className="xl:col-span-2">
          <NotesWidget />
        </div>
        <div className="xl:col-span-2">
          <PomodoroWidget />
        </div>
      </div>
    </div>
  );
} 