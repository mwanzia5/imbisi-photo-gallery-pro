
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata?: any) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Generate a proper UUID v4
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already "logged in" (stored in localStorage)
    const demoUser = localStorage.getItem('demo-user');
    if (demoUser) {
      const userData = JSON.parse(demoUser);
      setUser(userData);
      setSession({ user: userData } as Session);
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, metadata?: any) => {
    // Create a demo user object with proper UUID
    const demoUser = {
      id: generateUUID(),
      email,
      user_metadata: metadata || {},
      created_at: new Date().toISOString(),
    } as User;

    localStorage.setItem('demo-user', JSON.stringify(demoUser));
    setUser(demoUser);
    setSession({ user: demoUser } as Session);
    
    return { data: { user: demoUser }, error: null };
  };

  const signIn = async (email: string, password: string) => {
    // Accept any email/password combination with proper UUID
    const demoUser = {
      id: generateUUID(),
      email,
      user_metadata: {},
      created_at: new Date().toISOString(),
    } as User;

    localStorage.setItem('demo-user', JSON.stringify(demoUser));
    setUser(demoUser);
    setSession({ user: demoUser } as Session);
    
    return { data: { user: demoUser }, error: null };
  };

  const signOut = async () => {
    localStorage.removeItem('demo-user');
    setUser(null);
    setSession(null);
  };

  const resetPassword = async (email: string) => {
    // Just return success for demo purposes
    return { data: {}, error: null };
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
