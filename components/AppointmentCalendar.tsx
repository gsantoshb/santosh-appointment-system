import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";

const AppointmentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    // Fetch available slots for the selected date
    fetchAvailableSlots(selectedDate).then((slots) => setAvailableSlots(slots));
  }, [selectedDate]);

  const handleDateChange = (newDate) => setSelectedDate(newDate);

  return (
    <div className="flex flex-col">
      <h2>Select an appointment slot:</h2>
      {/* <BigCalendar
        events={availableSlots}
        defaultDate={selectedDate}
        onSelectSlot={(slot) => console.log("Selected slot:", slot)}
      /> */}
      <button className="bg-blue-500 text-white rounded px-4 py-2 shadow-md hover:bg-blue-700 mb-4">
        Book Appointment
      </button>
    </div>
  );
};

const fetchAvailableSlots = async (date) => {
  // Implement logic to fetch available slots for a specific date using Supabase API
  // Replace this with your actual implementation
  const response = await fetch("/api/available-slots", {
    method: "POST",
    body: JSON.stringify({ date }),
  });
  const data = await response.json();
  return data;
};

export default AppointmentCalendar;
