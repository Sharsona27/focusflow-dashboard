"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, RotateCcw, Timer } from "lucide-react"

export function PomodoroWidget() {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const workDuration = 25 * 60 // 25 minutes
  const breakDuration = 5 * 60 // 5 minutes

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      // Timer finished
      if (!isBreak) {
        setSessions((prev) => prev + 1)
        setIsBreak(true)
        setTimeLeft(breakDuration)
      } else {
        setIsBreak(false)
        setTimeLeft(workDuration)
      }
      setIsActive(false)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, timeLeft, isBreak, workDuration, breakDuration])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setIsBreak(false)
    setTimeLeft(workDuration)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getProgress = () => {
    const totalTime = isBreak ? breakDuration : workDuration
    return ((totalTime - timeLeft) / totalTime) * 100
  }

  return (
    <Card className="h-[400px] flex flex-col border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 neumorphic-card shadow-lg hover:shadow-2xl transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <Timer className="h-5 w-5 text-red-600 dark:text-red-400" />
          Pomodoro Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center space-y-6">
        <div className="text-center">
          <div className="text-4xl font-mono font-bold text-slate-900 dark:text-slate-100 mb-2">
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">{isBreak ? "Break Time" : "Focus Time"}</div>
        </div>

        <div className="w-full max-w-xs">
          <Progress value={getProgress()} className="h-2 bg-slate-200 dark:bg-slate-700" />
        </div>

        <div className="flex gap-3">
          <Button onClick={toggleTimer} variant={isActive ? "secondary" : "default"} size="lg">
            {isActive ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start
              </>
            )}
          </Button>
          <Button onClick={resetTimer} variant="outline" size="lg">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="text-center">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Sessions completed: <span className="font-semibold text-slate-900 dark:text-slate-100">{sessions}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
