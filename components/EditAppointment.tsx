import React, { useState } from "react";
import { useRouter } from "next/router";

interface Appointment {
  id: number;
  user_id: string;
  date: string;
  start_time: string;
  end_time: string;
}

interface EditAppointmentProps {
  appointment: Appointment;
  mutateAppointment: (updatedAppointment: Appointment) => Promise<void>;
}

const EditAppointment: React.FC<EditAppointmentProps> = ({ appointment, mutateAppointment }) => {
  const router = useRouter();

  const [date, setDate] = useState(new Date(appointment.date));
  const [startTime, setStartTime] = useState(new Date(appointment.start_time));
  const [endTime, setEndTime] = useState(new Date(appointment.end_time));

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(event.target.value));
  };

  const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(new Date(event.target.value));
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(new Date(event.target.value));
  };

  const handleEditClick = async () => {
    const updatedAppointment = {
      ...appointment,
      date: date.toISOString().split("T")[0],
      start_time: startTime.toISOString().split("T")[1],
      end_time: endTime.toISOString().split("T")[1],
    };

    try {
      await mutateAppointment(updatedAppointment);
      alert("Appointment updated successfully!");
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Error updating appointment.");
    }
  };

  return (
    <div className="flex flex-col p-4">
      <h3 className="text-xl font-semibold mb-4">Edit Appointment</h3>
      <div className="flex flex-row mb-4 gap-2">
        <label htmlFor="date" className="text-sm font-medium">
          Date:
        </label>
        <input
          type="date"
          id="date"
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
          value={date.toISOString().split("T")[0]}
          onChange={handleDateChange}
        />
      </div>
      <div className="flex flex-row mb-4 gap-2">
        <label htmlFor="start_time" className="text-sm font-medium">
          Start Time:
        </label>
        <input
          type="time"
          id="start_time"
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
          value={startTime.toISOString().split("T")[1]}
          onChange={handleStartTimeChange}
        />
      </div>
      <div className="flex flex-row mb-4 gap-2">
        <label htmlFor="end_time" className="text-sm font-medium">
          End Time:
        </label>
        <input
          type="time"
          id="end_time"
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
          value={endTime.toISOString().split("T")[1]}
          onChange={handleEndTimeChange}
        />
      </div>
      <button className="bg-blue-500 text-white rounded px-4 py-2 shadow-md hover:bg-blue-700" onClick={handleEditClick}>
        Save Changes
      </button>
    </div>
  );
};

export default EditAppointment;
