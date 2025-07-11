import React, { useState, useRef } from 'react';

function pad(n) {
  return n.toString().padStart(2, '0');
}

export default function PomodoroWidget() {
  const [workMins, setWorkMins] = useState(25);
  const [breakMins, setBreakMins] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(workMins * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const intervalRef = useRef(null);

  React.useEffect(() => {
    setSecondsLeft(workMins * 60);
  }, [workMins]);

  React.useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((sec) => {
        if (sec > 0) return sec - 1;
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setIsWork((w) => {
          if (w) setSecondsLeft(breakMins * 60);
          else setSecondsLeft(workMins * 60);
          return !w;
        });
        return 0;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning, workMins, breakMins]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setSecondsLeft(isWork ? workMins * 60 : breakMins * 60);
  };

  const handleWorkChange = (e) => {
    setWorkMins(Number(e.target.value));
    if (isWork) setSecondsLeft(Number(e.target.value) * 60);
  };
  const handleBreakChange = (e) => {
    setBreakMins(Number(e.target.value));
    if (!isWork) setSecondsLeft(Number(e.target.value) * 60);
  };

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-red-600">Pomodoro Timer</h2>
      <div className="flex items-center justify-center mb-4">
        <span className="text-4xl font-mono text-gray-800">
          {pad(mins)}:{pad(secs)}
        </span>
      </div>
      <div className="flex justify-center gap-2 mb-4">
        {isRunning ? (
          <button onClick={pause} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Pause</button>
        ) : (
          <button onClick={start} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Start</button>
        )}
        <button onClick={reset} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition">Reset</button>
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2">
          <span className="text-gray-700">Work (min):</span>
          <input
            type="number"
            min="1"
            max="60"
            value={workMins}
            onChange={handleWorkChange}
            className="w-16 border rounded px-2 py-1"
            disabled={isRunning}
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="text-gray-700">Break (min):</span>
          <input
            type="number"
            min="1"
            max="30"
            value={breakMins}
            onChange={handleBreakChange}
            className="w-16 border rounded px-2 py-1"
            disabled={isRunning}
          />
        </label>
      </div>
      <div className="mt-2 text-center text-sm text-gray-500">
        {isWork ? 'Work session' : 'Break session'}
      </div>
    </div>
  );
} 