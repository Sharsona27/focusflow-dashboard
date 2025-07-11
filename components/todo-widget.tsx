"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Plus, CheckCircle2 } from "lucide-react"

interface Todo {
  id: string
  text: string
  completed: boolean
}

interface TodoWidgetProps {
  selectedDate: Date
  tasks: Record<string, Todo[]>;
  onAddTask: (date: Date, text: string) => void;
  onToggleTask: (date: Date, id: string) => void;
  onDeleteTask: (date: Date, id: string) => void;
}

export function TodoWidget({ selectedDate, tasks, onAddTask, onToggleTask, onDeleteTask }: TodoWidgetProps) {
  const [newTodo, setNewTodo] = useState("");
  const dateKey = selectedDate.toISOString().slice(0, 10);
  const todos = tasks[dateKey] || [];

  const addTodo = () => {
    if (newTodo.trim()) {
      onAddTask(selectedDate, newTodo.trim());
      setNewTodo("");
    }
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <Card className="h-[400px] flex flex-col border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 shadow-lg hover:shadow-2xl transition-shadow neumorphic-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          To-Do List
        </CardTitle>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          {completedCount}/{todos.length} completed
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            className="flex-1"
          />
          <Button onClick={addTodo} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 group neumorphic-task"
            >
              <Checkbox checked={todo.completed} onCheckedChange={() => onToggleTask(selectedDate, todo.id)} />
              <span
                className={`flex-1 text-sm ${
                  todo.completed
                    ? "line-through text-slate-500 dark:text-slate-400"
                    : "text-slate-900 dark:text-slate-100"
                }`}
              >
                {todo.text}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteTask(selectedDate, todo.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4 text-red-500 dark:text-red-400" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
