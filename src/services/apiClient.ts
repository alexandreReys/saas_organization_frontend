// Configuração base da API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    
    // Verifica se há token salvo no localStorage
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    // Adiciona token de autenticação se disponível
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        mode: 'cors', // Explicitly set CORS mode
        credentials: 'omit', // Don't send credentials unless needed
      });

      // Se não autorizado, limpa o token
      if (response.status === 401) {
        this.clearToken();
        throw new Error('Não autorizado - Token inválido ou expirado');
      }

      if (!response.ok) {
        // Tratamento específico para diferentes tipos de erro
        if (response.status === 404) {
          throw new Error(`Endpoint não encontrado: ${endpoint}`);
        }
        if (response.status >= 500) {
          throw new Error(`Erro interno do servidor (${response.status})`);
        }
        throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Detecta especificamente erros CORS e de rede
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('API Connection Error - Backend may not be running:', {
          url,
          error: error.message
        });
        throw new Error('Não foi possível conectar com a API. Verifique se o backend está rodando.');
      }
      
      // Detecta erros CORS especificamente
      if (error instanceof TypeError && error.message.includes('CORS')) {
        console.error('CORS Error:', {
          url,
          error: error.message
        });
        throw new Error('Erro de CORS - Verifique a configuração do backend.');
      }

      // Log detalhado para debug
      console.error('API Request Error:', {
        url,
        endpoint,
        error: error instanceof Error ? error.message : error
      });
      
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async getPaginated<T>(
    endpoint: string,
    params?: Record<string, string>
  ): Promise<PaginatedResponse<T>> {
    const searchParams = params ? new URLSearchParams(params).toString() : '';
    const url = searchParams ? `${endpoint}?${searchParams}` : endpoint;
    return this.request<T[]>(url, { method: 'GET' }) as Promise<PaginatedResponse<T>>;
  }
}

// Instância singleton do cliente API
export const apiClient = new ApiClient();

export type { ApiResponse, PaginatedResponse };
