import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please connect to Supabase using the "Connect to Supabase" button in the top right.'
  );
}

// Validate Supabase URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(
    'Invalid Supabase URL. Please make sure your VITE_SUPABASE_URL environment variable is a valid URL starting with http:// or https://'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);