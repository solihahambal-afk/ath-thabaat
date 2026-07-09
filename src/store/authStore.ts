import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

export type Profile = {
  id: string;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  full_name: string | null;
  username: string | null;
  email: string;
  avatar_url: string | null;
  phone: string | null;
  address: string | null;
  date_of_birth: string | null;
  gender: string | null;
  bio: string | null;
  role: string;
  status: string;
  created_at?: string;
  updated_at?: string;
};

interface AuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  initialized: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  fetchProfile: (user: User) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  loading: true,
  initialized: false,

  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),

  fetchProfile: async (user: User) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) {
        if (error.code === 'PGRST116') {
          // Profile not found, this is fine, might be first login
          set({ profile: null });
        } else {
          console.error('Error fetching profile:', error);
          set({ profile: null });
        }
      } else {
        set({ profile });
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      set({ profile: null });
    }
  },

  initialize: () => {
    if (get().initialized) return;

    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.warn('Supabase auth error:', error.message);
      }
      const user = session?.user ?? null;
      set({ user });
      
      if (user) {
        get().fetchProfile(user).finally(() => {
          set({ loading: false, initialized: true });
        });
      } else {
        set({ loading: false, initialized: true });
      }
    }).catch(err => {
      console.warn('Failed to reach Supabase. Check your configuration.', err);
      set({ loading: false, initialized: true });
    });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user ?? null;
      set({ user });
      
      if (user) {
        await get().fetchProfile(user);
      } else {
        set({ profile: null });
      }
    });
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, profile: null });
  },
}));
