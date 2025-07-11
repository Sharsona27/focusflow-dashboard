import React from 'react';

function getMonthDays(year, month) {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export default function CalendarWidget() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const days = getMonthDays(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-green-600">Calendar</h2>
      <div className="mb-2 text-center font-medium text-gray-700">
        {today.toLocaleString('default', { month: 'long' })} {year}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 mb-1">
        {weekDays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array(firstDay).fill('').map((_, i) => (
          <div key={i}></div>
        ))}
        {days.map((date) => {
          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
          return (
            <div
              key={date.getDate()}
              className={`rounded-full w-8 h-8 flex items-center justify-center mx-auto cursor-pointer transition ${
                isToday ? 'bg-green-500 text-white font-bold' : 'hover:bg-green-100'
              }`}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
} 