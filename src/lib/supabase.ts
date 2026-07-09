import { createClient } from '@supabase/supabase-js';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
let supabaseUrl = rawUrl;
if (rawUrl) {
  if (!rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
    supabaseUrl = `https://${rawUrl}`;
  }
  try {
    const parsedUrl = new URL(supabaseUrl);
    supabaseUrl = `${parsedUrl.protocol}//${parsedUrl.host}`;
  } catch (e) {}
}

const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://placeholder.supabase.co') {
  console.warn(
    'Supabase credentials are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables via the Settings menu.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    },
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        if (!supabaseUrl || supabaseUrl === 'https://placeholder.supabase.co') {
          return Promise.reject(new Error("Supabase credentials are not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the Settings menu to use Supabase."));
        }
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
