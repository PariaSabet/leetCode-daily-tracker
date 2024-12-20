import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Function to fetch streak data
export const fetchStreakData = async () => {
  const { data, error } = await supabase
    .from('streaks')
    .select('*');
  if (error) {
    console.error('Error fetching streak data:', error);
  }
  return data;
};

// Function to add a new streak date
export const addStreakDate = async (date: Date) => {
  const { error } = await supabase
    .from('streaks')
    .insert([{ date }]);
  if (error) console.error('Error adding streak date:', error);
}; 