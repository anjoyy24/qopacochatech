'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { JWTPayload } from '@/lib/auth';
import { getTokenFromLocalStorage } from '@/lib/auth';

interface AuthContextType {
  user: JWTPayload | null;
  isLoading: boolean;
  setUser: (user: JWTPayload | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<JWTPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay token en localStorage
    async function checkAuth() {
      const token = await getTokenFromLocalStorage();
      if (token) {
        // Decodificar token para obtener datos del usuario
        try {
          const parts = token.split('.');
          const payload = JSON.parse(atob(parts[1]));
          setUser(payload);
        } catch (error) {
          console.log('Token inválido');
          setUser(null);
        }
      }
      setIsLoading(false);
    }

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
}
