import { supabase } from './supabase';
import { useAuthStore } from '../store/authStore';

export const logActivity = async (action: string, details: string) => {
  try {
    const { user, profile } = useAuthStore.getState();
    if (!user || !profile) return;

    await supabase.from('activity_logs').insert([{
      user_id: user.id,
      user_name: profile.full_name || profile.username || user.email?.split('@')[0] || 'Unknown',
      action,
      details,
      created_at: new Date().toISOString()
    }]);
  } catch (error) {
    console.error('Failed to log activity:', error);
    // Fail silently so it doesn't break app flow if table is missing
  }
};
