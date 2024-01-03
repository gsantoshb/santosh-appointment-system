import { getSlots } from "@/lib/appointments";
import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Slots = Database['public']['Tables']['slots']['Row'];

const EST_TIME_ZONE = 'America/New_York';

const AppointmentCalendar = ({ userId }: { userId: string | undefined }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<Slots[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slots | null>(null);
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [userSlot, setUserSlot] = useState<Slots | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const supabase = createClientComponentClient();

  useEffect(() => {
    // Fetch available slots when the component mounts
    fetchUserSlot(userId);
    fetchAvailableSlots();
  }, [userId]);

  useEffect(() => {
    // Fetch available slots when the selectedDate changes
    if (selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDate]);

  const fetchUserSlot = async (userId: string | undefined) => {
    try {
      const { data, error } = await supabase
        .from('slots')
        .select('id, appointment_date, appointment_time, appointment_details_id')
        .eq('booked_user_id', userId)
        .single();

      if (!error) {
        setUserSlot(data);
      } else {
        console.error('Error fetching user slot:', error.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      const slots = await getSlots();
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Error fetching available slots:', error.message);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setName('');
    setNotes('');
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotClick = (slot: Slots) => {
    setSelectedSlot(slot);
  };

  const handleBookSlotQuery = async (slotId: number | undefined, userId: string | undefined, userName: string, userNotes: string) => {
    try {

      // Update the existing booked slot if available
      if (userSlot) {
        const { error: updateError } = await supabase
          .from('slots')
          .update({
            booked: 'available',
            booked_user_id: null,
            appointment_details_id: null
          })
          .eq('id', userSlot.id);

        if (updateError) {
          throw new Error(`Error updating existing slot: ${updateError.message}`);
        }
      }


// Insert a row into the appointment_details table
const { data: appointmentDetails, error: insertError } = await supabase
  .from('appointment_details')
  .insert([
    {
      user_id: userId,
      user_name: userName,
      notes: userNotes
    },
  ])
  .select('*').single();

if (insertError) {
  throw new Error(`Error inserting into appointment_details: ${insertError.message}`);
}

console.log('Appointment details inserted:', appointmentDetails);


// Update the slots table
const { data: updatedSlot, error: updateError } = await supabase
  .from('slots')
  .update({
    booked: 'reserved',
    booked_user_id: userId,
    appointment_details_id: appointmentDetails.id
  })
  .eq('id', slotId)
  .select('*').single();

if (updateError) {
  throw new Error(`Error updating slot: ${updateError.message}`);
}

console.log('Slot updated:', updatedSlot);

fetchUserSlot(userId);


}  catch (error) {
      console.error('Error:', error.message);
      // Handle error as needed
    }
  };

  const handleBookSlot = async (userId: string | undefined) => {
    try {
      console.log(`Booking slot ${selectedSlot?.appointment_time} on ${selectedSlot?.appointment_date} for ${name}`);
      await handleBookSlotQuery(selectedSlot?.id, userId, name, notes);
      // Reset state
      setSelectedDate(null);
      setSelectedSlot(null);
      setName('');
      setNotes('');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleUpdateAppointmentDetailsModal = async (name: string, notes: string) => {
    try {
      // Update the row in the appointment_details table
      await supabase
        .from('appointment_details')
        .update([
          {
            user_name: name,
            notes: notes
          },
        ])
        .eq('id', userSlot?.appointment_details_id);

      // Reset state
      setSelectedDate(null);
      setSelectedSlot(null);
      setName('');
      setNotes('');
      closeModal();
    } catch (error) {
      console.error('Error updating appointment details:', error.message);
    }
  };

  const openModal = async () => {
    try {
      setIsModalOpen(true);
      setIsEditMode(true);

      const { data: appointmentDetails, error } = await supabase
        .from('appointment_details')
        .select('user_name, notes')
        .eq('id', userSlot?.appointment_details_id)
        .single();

      if (error) {
        throw new Error(`Error fetching appointment details: ${error.message}`);
      }

      // Update state with the fetched data
      setName(appointmentDetails?.user_name || '');
      setNotes(appointmentDetails?.notes || '');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="mb-4">
        {userSlot && (
          <div onClick={openModal} className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
            <h2 className="text-lg font-semibold">Your Current Slot:</h2>
            <p>Date: {userSlot.appointment_date}</p>
            <p>Time: {userSlot.appointment_time}</p>
          </div>
        )}

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
              .filter((slot) => slot.appointment_date === selectedDate.toISOString().split('T')[0] && slot.booked === 'available')
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

              <label className="block mb-2">Notes:</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border p-2 w-full"
              />

              <button
                onClick={() => handleBookSlot(userId)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Book Slot
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 w-1/3 relative">
            <button onClick={closeModal} className="absolute top-0 right-0 p-2 cursor-pointer">
              <span className="text-2xl text-gray-800">x</span>
            </button>

            <h2 className="text-lg font-semibold">Appointment Details</h2>

            {isEditMode && (
              <>
                <label className="block mb-2">Edit Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border p-2 w-full bg-gray-300 text-gray-800"
                />

                <label className="block mb-2">Edit Notes:</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="border p-2 w-full bg-gray-300 text-gray-800"
                />

                <button
                  onClick={() => handleUpdateAppointmentDetailsModal(name, notes)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Update Info
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;
