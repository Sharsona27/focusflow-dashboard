"use client"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SettingsPage() {
  const [workDuration, setWorkDuration] = useState(25)
  const [breakDuration, setBreakDuration] = useState(5)
  const [soundOn, setSoundOn] = useState(true)

  return (
    <div className="max-w-xl mx-auto neumorphic-card p-8 mt-8">
      <h1 className="text-3xl font-bold mb-6 neumorphic-title text-slate-900 dark:text-slate-100">Settings</h1>
      <div className="space-y-6">
        <div>
          <label className="block text-lg font-medium mb-2">Theme</label>
          <ThemeToggle />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Pomodoro Work Duration (minutes)</label>
          <input
            type="number"
            min={10}
            max={90}
            value={workDuration}
            onChange={e => setWorkDuration(Number(e.target.value))}
            className="w-24 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Break Duration (minutes)</label>
          <input
            type="number"
            min={1}
            max={30}
            value={breakDuration}
            onChange={e => setBreakDuration(Number(e.target.value))}
            className="w-24 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100"
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="block text-lg font-medium">Notification Sound</label>
          <button
            onClick={() => setSoundOn(v => !v)}
            className={`px-4 py-2 rounded-full font-semibold transition ${soundOn ? "bg-green-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"}`}
          >
            {soundOn ? "On" : "Off"}
          </button>
        </div>
      </div>
    </div>
  )
} 