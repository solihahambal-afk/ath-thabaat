import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables via the Settings menu.'
  );
}

// Clean up the URL in case the user accidentally included /rest/v1/ or similar paths
const cleanSupabaseUrl = supabaseUrl ? new URL(supabaseUrl).origin : '';

export const supabase = createClient(
  cleanSupabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    },
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        return fetch(input, init).catch(err => {
          if (err instanceof TypeError && err.message === 'Failed to fetch') {
            return Promise.reject(new Error("Unable to connect to Supabase. Please verify your VITE_SUPABASE_URL in the Settings menu, or ensure your Supabase project is active and accessible."));
          }
          return Promise.reject(err);
        });
      }
    }
  }
);
