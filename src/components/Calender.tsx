import React, { useState } from 'react';

interface CalendarProps {
  streakDates: Date[];
}

const Calendar: React.FC<CalendarProps> = ({ streakDates }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(() => new Date());

  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();
  const startOfMonth = new Date(year, currentMonth.getMonth(), 1);
  const endOfMonth = new Date(year, currentMonth.getMonth() + 1, 0);

  const daysInMonth = [];
  const monthStart = new Date(startOfMonth);
  while (monthStart <= endOfMonth) {
    daysInMonth.push(new Date(monthStart));
    monthStart.setDate(monthStart.getDate() + 1);
  }

  const isStreakDate = (date: Date) => {
    return streakDates.some(streakDate => 
      streakDate.toDateString() === date.toDateString()
    );
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className="calendar-container bg-white/20 backdrop-blur-md p-3">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2 className="month-name">{monthName} {year}</h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar">
        <div className="days">
          {daysInMonth.map((date, index) => (
            <div
              key={index}
              className={`day ${isStreakDate(date) ? 'highlight' : ''}`}
            >
              {date.getDate()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;