import React from 'react';

interface CalendarProps {
  streakDates: Date[];
}

const Calendar: React.FC<CalendarProps> = ({ streakDates }) => {
  return (
    <div className="calendar">
      <h2 className="text-xl font-semibold mb-4">Streak Calendar</h2>
      <div className="calendar-grid">
        {streakDates.map((date, index) => (
          <div key={index} className="calendar-date">
            {date.toDateString()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;