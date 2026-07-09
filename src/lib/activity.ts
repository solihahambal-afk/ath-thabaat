import { supabase } from './supabase';

export async function logActivity(action: string, details?: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Get client IP if possible, or null
    let ip_address = null;
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      ip_address = data.ip;
    } catch (e) {
      console.warn('Could not fetch IP');
    }

    await supabase.from('activity_logs').insert({
      user_id: user.id,
      action,
      details,
      ip_address
    });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
}
