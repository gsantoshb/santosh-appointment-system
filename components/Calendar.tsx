import React from "react";

interface CalendarProps {
  selectedDate: Date;
  onDateChange: (newDate: Date) => void;
  availableTimes: string[];
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange, availableTimes }) => {
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(new Date(event.target.value));
  };

  return (
    <div className="flex flex-col border border-gray-300 rounded p-4">
      <h3 className="text-sm font-medium mb-2">Select Date:</h3>
      <input
        type="date"
        value={selectedDate.toISOString().split("T")[0]}
        onChange={handleDateChange}
        className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
      />
      <ul className="mt-4">
        {availableTimes.map((time) => (
          <li key={time} className="flex items-center justify-between mb-2">
            <span>{time}</span>
            {selectedDate.toISOString().split("T")[0] === new Date().toISOString().split("T")[0] && time > new Date().getHours().toString() + ":00" ? (
              <button
                className="bg-blue-500 text-white rounded px-2 py-1 shadow-sm hover:bg-blue-700"
                onClick={() => onDateChange(new Date(selectedDate.toISOString().split("T")[0]), time)}
              >
                Book {time}
              </button>
            ) : (
              <span className="text-gray-400">Unavailable</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
