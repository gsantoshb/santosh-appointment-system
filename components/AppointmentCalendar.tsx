import { getSlots } from "@/lib/appointments";
import React, { useState, useEffect } from "react";
import { Database } from '@/types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Slots = Database['public']['Tables']['slots']['Row'];

const EST_TIME_ZONE='America/New_York';

const AppointmentCalendar = ({userId}:{userId:string|undefined}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<Slots[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slots | null>(null);
  const [name, setName] = useState('');
  const [userSlot, setUserSlot] = useState<Slots>();

  const supabase = createClientComponentClient();

 

  useEffect(() => {
    // Fetch available slots when the component mounts
    fetchUserSlot(userId);

    fetchAvailableSlots();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      // Fetch available slots when the selectedDate changes
      fetchAvailableSlots();
    }
  }, [selectedDate]);

  // Function to fetch user's booked slot
  const fetchUserSlot = async (userId:string|undefined) => {
    try {
      const { data: userSlotData, error } = await supabase
        .from('slots')
        .select('id, appointment_date, appointment_time')
        .eq('booked_user_id', userId)
        .single();

      if (error) {
        throw new Error(`Error fetching user slot: ${error.message}`);
      }

      setUserSlot(userSlotData);

    } catch (error) {
      console.error('Error:', error.message);
    }
  };


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

  const handleBookSlot = async (userId: string | undefined) => {
    // Add your logic to book the selected slot

    console.log(`Booking slot ${selectedSlot?.appointment_time} on ${selectedSlot?.appointment_date} for ${name}`);
    handleBookSlotQuery(selectedSlot?.id, userId, name).then(()=>{
      // Reset state
      setSelectedDate(null);
      setSelectedSlot(null);
      setName('');
    });
  };

  async function handleBookSlotQuery(slotId: number | undefined, userId: string | undefined, userName: string) {
    try {


      // Insert a row into the appointment_details table
      const { data: appointmentDetails, error: insertError } = await supabase
        .from('appointment_details')
        .insert([
          {
            user_id: userId,
            user_name: userName,
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

  
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error as needed
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="mb-4">
      {userSlot && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
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
                onClick={()=> handleBookSlot(userId)}
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
