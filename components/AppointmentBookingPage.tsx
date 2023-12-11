"use client";

import React, { useState, useEffect } from "react";
import Calendar from "@/components/Calendar";
import CodeInput from "@/components/CodeInput";
import EmailInput from "@/components/EmailInput";
import { getAvailableTimes, bookAppointment } from "@/lib/appointments";

const AppointmentBookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      setIsLoading(true);
      const times = await getAvailableTimes(selectedDate);
      setAvailableTimes(times);
      setIsLoading(false);
    };
    fetchAvailableTimes();
  }, [selectedDate]);

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  const handleTimeChange = (newTime: string) => {
    setSelectedTime(newTime);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handleBookClick = async () => {
    setIsLoading(true);
    try {
      await bookAppointment({
        user_id: "user_id", // Replace with actual user ID
        date: selectedDate.toISOString().split("T")[0],
        start_time: selectedTime,
        end_time: "", // Implement end time logic
        code,
        email,
      });
      alert("Appointment booked successfully!");
      setSelectedTime("");
      setCode("");
      setEmail("");
    } catch (error) {
      console.error(error);
      alert("Error booking appointment");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading available times...</p>;
  }

  return (
    <div className="flex flex-col p-4">
      <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>
      <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} availableTimes={availableTimes} />
      <div className="flex flex-col mb-4 gap-2">
        <label htmlFor="code" className="text-sm font-medium">
          Code:
        </label>
        <CodeInput value={code} onChange={handleCodeChange} />
      </div>
      <div className="flex flex-col mb-4 gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email:
        </label>
        <EmailInput value={email} onChange={handleEmailChange} />
      </div>
      <button
        className="bg-blue-500 text-white rounded px-4 py-2 shadow-md hover:bg-blue-700"
        onClick={handleBookClick}
        disabled={!selectedTime || !availableTimes.includes(selectedTime)}
      >
        Book Appointment
      </button>
    </div>
  );
};

export default AppointmentBookingPage;
