import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export interface Profile {
  id: string;
  full_name?: string;
  username?: string;
  email?: string;
  avatar_url?: string;
  phone?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  role: string | null;
  profile: Profile | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setRole: (role: string | null) => void;
  setProfile: (profile: Profile | null) => void;
  fetchUserRole: (userId: string) => Promise<void>;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  role: null,
  profile: null,
  loading: true,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setRole: (role) => set({ role }),
  setProfile: (profile) => set({ profile }),
  fetchUserRole: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (data && !error) {
        set({ role: data.role, profile: data });
      } else {
        set({ role: null, profile: null });
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      set({ role: null, profile: null });
    }
  },
  initialize: async () => {
    try {
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('Skipping auth initialization: Supabase credentials missing.');
        set({ loading: false });
        return;
      }

      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (session) {
        set({ session, user: session.user });
        
        let { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();
          
        if (!profile && session.user.email) {
            // Auto generate profile
            const email = session.user.email;
            const username = email.split('@')[0];
            const newProfile = {
                id: session.user.id,
                email: email,
                username: username,
                role: 'User'
            };
            const { data: insertedProfile, error: insertError } = await supabase.from('profiles').insert([newProfile]).select().single();
            if (!insertError) {
                profile = insertedProfile;
            }
        }

        if (profile) {
          set({ role: profile.role, profile: profile });
        }
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    } finally {
      set({ loading: false });
    }

    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      supabase.auth.onAuthStateChange(async (event, session) => {
        set({ session, user: session?.user || null });
        if (session?.user) {
          let { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();
            
          if (!profile && session.user.email) {
            const email = session.user.email;
            const username = email.split('@')[0];
            const newProfile = {
                id: session.user.id,
                email: email,
                username: username,
                role: 'User'
            };
            const { data: insertedProfile, error: insertError } = await supabase.from('profiles').insert([newProfile]).select().single();
            if (!insertError) {
                profile = insertedProfile;
            }
          }

          set({ role: profile?.role || null, profile: profile || null });
        } else {
          set({ role: null, profile: null });
        }
      });
    }
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, role: null, profile: null });
  },
}));
