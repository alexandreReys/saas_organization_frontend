"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { authService, type AuthUser } from "@/services";
import { useToast } from "@/lib/toast";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();

  // Verifica se há login salvo no localStorage na inicialização
  useEffect(() => {
    const initAuth = async () => {
      const savedAuth = localStorage.getItem('isAuthenticated');
      const savedUser = localStorage.getItem('user');
      
      if (savedAuth === 'true' && savedUser) {
        try {
          // Valida o token com a API
          const user = await authService.validateToken();
          if (user) {
            setIsAuthenticated(true);
            setUser(user);
          } else {
            // Token inválido, limpa dados locais
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.login({ email, password });
      
      setIsAuthenticated(true);
      setUser(response.user);
      
      // Salva no localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(response.user));
      
      addToast({
        type: 'success',
        title: 'Login realizado com sucesso!',
        message: `Bem-vindo, ${response.user.name}`
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Erro de conexão com o servidor');
      addToast({
        type: 'error',
        title: 'Erro no login',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      
      // Remove do localStorage
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      
      addToast({
        type: 'info',
        title: 'Logout realizado',
        message: 'Você foi desconectado com sucesso'
      });
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
