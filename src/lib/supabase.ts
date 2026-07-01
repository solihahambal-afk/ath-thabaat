import { createClient } from '@supabase/supabase-js';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
let supabaseUrl = rawUrl;
if (rawUrl) {
  if (!rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
    supabaseUrl = `https://${rawUrl}`;
  }
  // Try to parse and remove any extra path like /rest/v1/
  try {
    const parsedUrl = new URL(supabaseUrl);
    supabaseUrl = `${parsedUrl.protocol}//${parsedUrl.host}`;
  } catch (e) {
    // Ignore invalid URLs
  }
}
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables via the Settings menu.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
