import { getSlots } from "@/lib/appointments";
import React, { useState, useEffect } from "react";
import { Database } from '@/types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

type Slots = Database['public']['Tables']['slots']['Row'];

const EST_TIME_ZONE='America/New_York';

const AppointmentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<Slots[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slots | null>(null);
  const [name, setName] = useState('');

  useEffect(() => {
    // Fetch available slots when the component mounts
    fetchAvailableSlots();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      // Fetch available slots when the selectedDate changes
      fetchAvailableSlots();
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async () => {
    try {
      // Assuming getSlots returns a Promise
      const slots = await getSlots();
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Error fetching available slots:', error.message);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotClick = (slot: Slots) => {
    setSelectedSlot(slot);
  };

  const handleBookSlot = () => {
    // Add your logic to book the selected slot
    console.log(`Booking slot ${selectedSlot?.appointment_time} on ${selectedSlot?.appointment_date} for ${name}`);
    // Reset state
    setSelectedDate(null);
    setSelectedSlot(null);
    setName('');
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="mb-4">
        <label className="block mb-2 text-lg font-bold">Choose a Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          dateFormat="yyyy-MM-dd"
          className="border p-2 w-full"
        />
      </div>

      {selectedDate && (
        <div>
          <div className="grid grid-cols-2 gap-4">
            {availableSlots
            .filter((slot) => {return slot.appointment_date === selectedDate.toISOString().split('T')[0] && slot.booked === 'available';})
            .map((slot, index) => (
              <button
                key={index}
                onClick={() => handleSlotClick(slot)}
                className={`py-2 px-4 border focus:outline-none ${selectedSlot?.appointment_date === slot.appointment_date && selectedSlot?.appointment_time === slot.appointment_time ? 'bg-blue-500 text-white' : ''}`}
              >
                {slot.appointment_time}
              </button>
            ))}
          </div>

          {selectedSlot && (
            <div className="mt-4">
              <label className="block mb-2">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full"
              />

              <button
                onClick={handleBookSlot}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Book Slot
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};



export default AppointmentCalendar;
