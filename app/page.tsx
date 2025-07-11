"use client"

import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 bg-gradient-to-br from-blue-100/60 via-purple-100/60 to-pink-100/60 dark:from-slate-900/80 dark:via-slate-800/80 dark:to-slate-700/80 neumorphic-card">
      <div className="max-w-2xl w-full text-center">
        <div className="flex justify-center mb-8">
          {/* Illustration/Icon set */}
          <span className="inline-flex gap-2 text-6xl">
            <span role="img" aria-label="checklist">📝</span>
            <span role="img" aria-label="calendar">📅</span>
            <span role="img" aria-label="timer">⏲️</span>
            <span role="img" aria-label="note">🗒️</span>
          </span>
        </div>
        <h1 className="text-5xl font-extrabold mb-4 neumorphic-title text-slate-900 dark:text-white">FocusFlow</h1>
        <p className="text-xl mb-8 text-slate-700 dark:text-slate-200">Your all-in-one productivity companion</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/dashboard" className="px-8 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition">Try Dashboard</Link>
          <Link href="#learn-more" className="px-8 py-3 rounded-full bg-white/70 dark:bg-slate-800/70 text-blue-700 dark:text-blue-300 font-semibold shadow-lg hover:bg-blue-100 dark:hover:bg-slate-700 transition border border-blue-200 dark:border-blue-800">Learn More</Link>
        </div>
        <div id="learn-more" className="mt-12 text-slate-600 dark:text-slate-300 text-base max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Why FocusFlow?</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Organize your tasks and schedule with ease</li>
            <li>Stay focused using the Pomodoro timer</li>
            <li>Take quick notes and never lose your ideas</li>
            <li>Modern, responsive, and beautiful UI</li>
            <li>All your productivity tools in one place</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
