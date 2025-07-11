"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, Dot } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

interface Todo {
  id: string
  text: string
  completed: boolean
}

interface CalendarWidgetProps {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  tasks: Record<string, Todo[]>;
  onAddTask: (date: Date, text: string) => void;
}

export function CalendarWidget({ selectedDate, setSelectedDate, tasks, onAddTask }: CalendarWidgetProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showPopover, setShowPopover] = useState(false)
  const [popoverDay, setPopoverDay] = useState<number | null>(null)
  const [newTask, setNewTask] = useState("");
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const isToday = (day: number) => {
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year
  }

  const handleDayClick = (day: number) => {
    setSelectedDate(new Date(year, month, day));
    setPopoverDay(day);
    setShowPopover(true);
  };

  const handleAddTask = () => {
    if (popoverDay && newTask.trim()) {
      onAddTask(new Date(year, month, popoverDay), newTask.trim());
      setNewTask("");
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(<div key={`empty-${i}`} className="h-8" />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = new Date(year, month, day).toISOString().slice(0, 10);
      const hasTasks = tasks[dateKey] && tasks[dateKey].length > 0;
      days.push(
        <Popover key={day} open={showPopover && popoverDay === day} onOpenChange={setShowPopover}>
          <PopoverTrigger asChild>
            <div
              onClick={() => handleDayClick(day)}
              className={`relative h-8 flex items-center justify-center text-sm rounded-md cursor-pointer transition-colors neumorphic-day ${
                isToday(day)
                  ? "bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
                  : "text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
              } ${selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year ? "ring-2 ring-blue-400" : ""}`}
            >
              {day}
              {hasTasks && <Dot className="absolute bottom-0 right-0 h-2 w-2 text-green-500" />}
            </div>
          </PopoverTrigger>
          <PopoverContent align="center" className="w-64">
            <div className="mb-2 font-semibold">Tasks for {monthNames[month]} {day}, {year}</div>
            <ul className="mb-2 max-h-32 overflow-y-auto">
              {(tasks[dateKey] || []).map((task) => (
                <li key={task.id} className="text-sm py-1">{task.text}</li>
              ))}
            </ul>
            <div className="flex gap-2">
              <Input
                placeholder="Add a task..."
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                onKeyPress={e => e.key === "Enter" && handleAddTask()}
                className="flex-1"
              />
              <Button onClick={handleAddTask} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      );
    }
    return days;
  };

  // Animate month transitions
  const handleMonthChange = (next: boolean) => {
    setDirection(next ? "right" : "left");
    setAnimating(true);
    setTimeout(() => {
      setCurrentDate(new Date(year, month + (next ? 1 : -1), 1));
      setAnimating(false);
    }, 250);
  };

  return (
    <Card className="h-[400px] border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 shadow-lg hover:shadow-2xl transition-shadow neumorphic-card overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-slate-900 dark:text-slate-100">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
            Calendar
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleMonthChange(false)}
              className="hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[120px] text-center text-slate-900 dark:text-slate-100">
              {monthNames[month]} {year}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleMonthChange(true)}
              className="hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="h-8 flex items-center justify-center text-xs font-medium text-slate-500 dark:text-slate-400"
            >
              {day}
            </div>
          ))}
        </div>
        <div className={`grid grid-cols-7 gap-1 transition-all duration-300 ${animating ? (direction === "right" ? "animate-slide-left" : "animate-slide-right") : ""}`}>{renderCalendarDays()}</div>
      </CardContent>
    </Card>
  );
}
