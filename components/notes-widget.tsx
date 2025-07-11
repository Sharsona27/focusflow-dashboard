"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { StickyNote, Save } from "lucide-react"

export function NotesWidget() {
  const [notes, setNotes] = useState("")
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  useEffect(() => {
    const savedNotes = localStorage.getItem("productivity-notes")
    if (savedNotes) {
      setNotes(savedNotes)
    }
  }, [])

  const saveNotes = () => {
    localStorage.setItem("productivity-notes", notes)
    setLastSaved(new Date())
  }

  const formatLastSaved = () => {
    if (!lastSaved) return ""
    return `Saved at ${lastSaved.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`
  }

  return (
    <Card className="h-[400px] flex flex-col border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 neumorphic-card shadow-lg hover:shadow-2xl transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <StickyNote className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          Quick Notes
        </CardTitle>
        <Button
          onClick={saveNotes}
          size="sm"
          variant="outline"
          className="border-slate-200 dark:border-slate-600 bg-transparent"
        >
          <Save className="h-4 w-4 mr-1" />
          Save
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <Textarea
          placeholder="Write your notes here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="flex-1 resize-none border-0 focus-visible:ring-0 p-0 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
        />
        {lastSaved && <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">{formatLastSaved()}</div>}
      </CardContent>
    </Card>
  )
}
