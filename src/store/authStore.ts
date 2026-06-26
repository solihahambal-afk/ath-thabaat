import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  role: string | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setRole: (role: string | null) => void;
  fetchUserRole: (userId: string) => Promise<void>;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  role: null,
  loading: true,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setRole: (role) => set({ role }),
  fetchUserRole: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (data && !error) {
        set({ role: data.role });
      } else {
        set({ role: null });
      }
    } catch (err) {
      console.error('Error fetching user role:', err);
      set({ role: null });
    }
  },
  initialize: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (session) {
        set({ session, user: session.user });
        
        // Fetch role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
          
        if (profile) {
          set({ role: profile.role });
        }
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    } finally {
      set({ loading: false });
    }

    // Setup auth listener
    supabase.auth.onAuthStateChange(async (event, session) => {
      set({ session, user: session?.user || null });
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        set({ role: profile?.role || null });
      } else {
        set({ role: null });
      }
    });
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, role: null });
  },
}));
