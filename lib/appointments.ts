import { createClient } from '@/utils/supabase/client'
import { cookies } from 'next/headers'

export const getAvailableTimes = async (date: Date) => {

  const supabase = createClient();

  const { data, error } = await supabase
    .from("available_times")
    .select("*")
    .match({ date: date.toISOString().split("T")[0] });

  if (error) {
    console.error(error);
    throw new Error("Error fetching available times");
  }

  return data.map((time) => time.time);
};

export const bookAppointment = async (appointment: Appointment) => {
  const { error } = await supabase
    .from("appointments")
    .insert([appointment]);

  if (error) {
    console.error(error);
    throw new Error("Error booking appointment");
  }
};

interface Appointment {
  user_id: string; // Replace with user ID retrieval logic
  date: string;
  start_time: string;
  end_time: string; // Implement end time logic
  code: string;
  email: string;
}
