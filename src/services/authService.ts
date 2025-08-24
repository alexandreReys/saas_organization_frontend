import { apiClient } from './apiClient';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Mock data para fallback
const MOCK_USER: User = {
  id: '1',
  name: 'Admin Usuário',
  email: 'admin@exemplo.com',
  role: 'admin',
  avatar: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const MOCK_TOKEN = 'mock_jwt_token_12345';

// Verifica se deve usar mock API
const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      
      if (response.success && response.data) {
        apiClient.setToken(response.data.token);
        return response.data;
      }
      
      throw new Error(response.message || 'Falha no login');
    } catch (error) {
      console.warn('API login failed, using fallback:', error);
      
      // Fallback para mock quando API não estiver disponível
      if (USE_MOCK_API || (error instanceof Error && error.message.includes('conectar com a API'))) {
        // Simula validação de credenciais
        if (credentials.email === 'admin@exemplo.com' && credentials.password === 'admin123') {
          const mockResponse: AuthResponse = {
            user: MOCK_USER,
            token: MOCK_TOKEN
          };
          apiClient.setToken(MOCK_TOKEN);
          return mockResponse;
        }
        throw new Error('Email ou senha inválidos');
      }
      
      throw error;
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', data);
      
      if (response.success && response.data) {
        apiClient.setToken(response.data.token);
        return response.data;
      }
      
      throw new Error(response.message || 'Falha no cadastro');
    } catch (error) {
      console.warn('API register failed, using fallback:', error);
      
      // Fallback para mock quando API não estiver disponível
      if (USE_MOCK_API || (error instanceof Error && error.message.includes('conectar com a API'))) {
        // Simula criação de usuário
        const mockUser: User = {
          ...MOCK_USER,
          name: data.name,
          email: data.email,
          id: Math.random().toString(36).substr(2, 9)
        };
        
        const mockResponse: AuthResponse = {
          user: mockUser,
          token: MOCK_TOKEN
        };
        
        apiClient.setToken(MOCK_TOKEN);
        return mockResponse;
      }
      
      throw error;
    }
  }

  async validateToken(): Promise<User | null> {
    try {
      const response = await apiClient.get<User>('/auth/me');
      
      if (response.success && response.data) {
        return response.data;
      }
      
      return null;
    } catch (error) {
      console.warn('API token validation failed, using fallback:', error);
      
      // Fallback para mock quando API não estiver disponível
      if (USE_MOCK_API || (error instanceof Error && error.message.includes('conectar com a API'))) {
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
        
        if (token === MOCK_TOKEN) {
          return MOCK_USER;
        }
      }
      
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.warn('API logout failed, clearing local data:', error);
    } finally {
      // Sempre limpa os dados locais
      apiClient.clearToken();
    }
  }

  async getUserProfile(): Promise<User> {
    try {
      const response = await apiClient.get<User>('/auth/profile');
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Falha ao obter perfil');
    } catch (error) {
      console.warn('API profile failed, using fallback:', error);
      
      // Fallback para mock quando API não estiver disponível
      if (USE_MOCK_API || (error instanceof Error && error.message.includes('conectar com a API'))) {
        return MOCK_USER;
      }
      
      throw error;
    }
  }
}

export const authService = new AuthService();
