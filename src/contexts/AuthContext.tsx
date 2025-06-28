
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

// Demo user creator function
const createDemoUser = (email: string, fullName?: string): User => ({
  id: `demo-${email}`,
  email,
  aud: 'authenticated',
  role: 'authenticated',
  email_confirmed_at: new Date().toISOString(),
  phone: '',
  confirmed_at: new Date().toISOString(),
  last_sign_in_at: new Date().toISOString(),
  app_metadata: {},
  user_metadata: { full_name: fullName || email.split('@')[0] },
  identities: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
});

// Demo session creator function
const createDemoSession = (user: User): Session => ({
  access_token: `demo-token-${user.id}`,
  refresh_token: `demo-refresh-${user.id}`,
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  token_type: 'bearer',
  user
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for demo session in localStorage
    const demoSession = localStorage.getItem('demo-auth-session');
    if (demoSession) {
      try {
        const parsedSession = JSON.parse(demoSession);
        setSession(parsedSession);
        setUser(parsedSession.user);
      } catch (error) {
        localStorage.removeItem('demo-auth-session');
      }
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, metadata?: any) => {
    // For demo purposes, accept any email/password and create a demo user
    const demoUser = createDemoUser(email, metadata?.full_name);
    const demoSession = createDemoSession(demoUser);
    
    // Store demo session
    localStorage.setItem('demo-auth-session', JSON.stringify(demoSession));
    
    setSession(demoSession);
    setUser(demoUser);

    return { data: { user: demoUser, session: demoSession }, error: null };
  };

  const signIn = async (email: string, password: string) => {
    // For demo purposes, accept any email/password and create a demo user
    const demoUser = createDemoUser(email);
    const demoSession = createDemoSession(demoUser);
    
    // Store demo session
    localStorage.setItem('demo-auth-session', JSON.stringify(demoSession));
    
    setSession(demoSession);
    setUser(demoUser);

    return { data: { user: demoUser, session: demoSession }, error: null };
  };

  const signOut = async () => {
    localStorage.removeItem('demo-auth-session');
    setSession(null);
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    // For demo purposes, just return success
    return { data: null, error: null };
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
