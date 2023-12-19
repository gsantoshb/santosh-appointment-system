import { createClient } from '@/utils/supabase/client'
import { Database } from '@/types';

type AppointmentDetails = Database['public']['Tables']['appointment_details']['Row'];
type Slots = Database['public']['Tables']['slots']['Row'];
type ContactUs = Database['public']['Tables']['contact_us']['Row'];

const supabase = createClient();


export const getSlots = async () => {

  const { data, error } = await supabase
    .from("slots")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("Error fetching available times");
  }

  return data;
};
