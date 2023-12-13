import { createClient } from '@/utils/supabase/client'
import { Database } from '@/types';

type Appointments = Database['public']['Tables']['appointments']['Row'];
type AvailableTimes = Database['public']['Tables']['available_times']['Row'];
type ContactUs = Database['public']['Tables']['contact_us']['Row'];

const supabase = createClient();

export const getAvailableTimes = async () => {

  const { data, error } = await supabase
    .from("available_times")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("Error fetching available times");
  }

  return data.map((time) => time.time);
};

export const bookAppointment = async (appointment: Appointments) => {
  const { error } = await supabase
    .from("appointments")
    .insert([appointment]);

  if (error) {
    console.error(error);
    throw new Error("Error booking appointment");
  }
};
