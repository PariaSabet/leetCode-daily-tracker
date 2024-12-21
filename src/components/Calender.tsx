import React, { useState } from 'react';

interface CalendarProps {
  streakDates: Date[];
}

const Calendar: React.FC<CalendarProps> = ({ streakDates }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();
  const startOfMonth = new Date(year, currentMonth.getMonth(), 1);
  const endOfMonth = new Date(year, currentMonth.getMonth() + 1, 0);

  const daysInMonth = [];
  for (let day = startOfMonth; day <= endOfMonth; day.setDate(day.getDate() + 1)) {
    daysInMonth.push(new Date(day));
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
    <div className="calendar-container">
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