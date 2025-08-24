import { apiClient, type ApiResponse, type PaginatedResponse } from './apiClient';

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'moderator';
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  name: string;
  password: string;
  role: User['role'];
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  name?: string;
  role?: User['role'];
  isActive?: boolean;
}

export interface UsersFilters {
  role?: User['role'];
  isActive?: boolean;
  search?: string;
  sortBy?: 'name' | 'email' | 'createdAt' | 'lastLogin';
  sortOrder?: 'asc' | 'desc';
}

class UserService {
  async getUsers(
    page: number = 1,
    limit: number = 10,
    filters?: UsersFilters
  ): Promise<PaginatedResponse<User>> {
    const params: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
    };

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params[key] = value.toString();
        }
      });
    }

    return apiClient.getPaginated<User>('/users', params);
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    return apiClient.get<User>(`/users/${id}`);
  }

  async createUser(userData: CreateUserRequest): Promise<ApiResponse<User>> {
    return apiClient.post<User>('/users', userData);
  }

  async updateUser(id: string, userData: UpdateUserRequest): Promise<ApiResponse<User>> {
    return apiClient.put<User>(`/users/${id}`, userData);
  }

  async deleteUser(id: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/users/${id}`);
  }

  async toggleUserStatus(id: string): Promise<ApiResponse<User>> {
    return apiClient.put<User>(`/users/${id}/toggle-status`);
  }

  async resetUserPassword(id: string): Promise<ApiResponse<{ temporaryPassword: string }>> {
    return apiClient.post<{ temporaryPassword: string }>(`/users/${id}/reset-password`);
  }

  async getUserStats(): Promise<ApiResponse<{
    total: number;
    active: number;
    inactive: number;
    byRole: Record<User['role'], number>;
    recentSignups: number;
  }>> {
    return apiClient.get('/users/stats');
  }

  async exportUsers(format: 'csv' | 'xlsx' = 'csv'): Promise<ApiResponse<{ downloadUrl: string }>> {
    return apiClient.get<{ downloadUrl: string }>(`/users/export?format=${format}`);
  }

  async bulkAction(
    action: 'activate' | 'deactivate' | 'delete',
    userIds: string[]
  ): Promise<ApiResponse<{ processed: number; failed: number }>> {
    return apiClient.post<{ processed: number; failed: number }>('/users/bulk-action', {
      action,
      userIds,
    });
  }
}

export const userService = new UserService();
