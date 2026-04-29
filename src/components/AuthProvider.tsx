import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { auth, signIn, signOut } from '../lib/firebase';
import { Loader2, LogIn } from 'lucide-react';

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const login = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black">
        <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-black p-8 text-center">
        <div className="max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="h-16 w-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-orange-600/20">
              <span className="text-white text-2xl font-bold italic">AI</span>
           </div>
           <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-white italic serif">AI Interview Pro</h1>
              <p className="text-zinc-500 italic serif leading-relaxed">
                Unlock the next stage of your career with AI-driven simulators, resume forensics, and deep-dive technical resources.
              </p>
           </div>
           <button 
             onClick={login}
             className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors uppercase tracking-widest text-xs"
           >
             <LogIn size={16} />
             Sign in with Google
           </button>
           <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono">Secure Enterprise-Grade Authentication</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
