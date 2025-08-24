// API Client
export { apiClient } from './apiClient';
export type { ApiResponse, PaginatedResponse } from './apiClient';

// Auth Service
export { authService } from './authService';
export type {
  User as AuthUser,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from './authService';

// Dashboard Service
export { dashboardService } from './dashboardService';
export type {
  DashboardStats,
  RecentSale,
  SystemActivity,
  ChartData,
  DashboardData,
} from './dashboardService';

// User Service
export { userService } from './userService';
export type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UsersFilters,
} from './userService';
