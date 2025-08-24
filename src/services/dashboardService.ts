import { apiClient, type ApiResponse } from './apiClient';

export interface DashboardStats {
  totalUsers: number;
  totalSales: number;
  totalProducts: number;
  conversionRate: number;
  salesGrowth: number;
  usersGrowth: number;
  productsGrowth: number;
  conversionGrowth: number;
}

export interface RecentSale {
  id: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface SystemActivity {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  user?: string;
  type: 'user' | 'product' | 'sale' | 'system';
}

export interface ChartData {
  label: string;
  value: number;
  date?: string;
}

export interface DashboardData {
  stats: DashboardStats;
  recentSales: RecentSale[];
  systemActivities: SystemActivity[];
  salesChart: ChartData[];
  usersChart: ChartData[];
}

class DashboardService {
  async getDashboardData(): Promise<ApiResponse<DashboardData>> {
    return apiClient.get<DashboardData>('/dashboard');
  }

  async getStats(): Promise<ApiResponse<DashboardStats>> {
    return apiClient.get<DashboardStats>('/dashboard/stats');
  }

  async getRecentSales(limit: number = 10): Promise<ApiResponse<RecentSale[]>> {
    return apiClient.get<RecentSale[]>(`/dashboard/recent-sales?limit=${limit}`);
  }

  async getSystemActivities(limit: number = 10): Promise<ApiResponse<SystemActivity[]>> {
    return apiClient.get<SystemActivity[]>(`/dashboard/activities?limit=${limit}`);
  }

  async getSalesChart(period: 'week' | 'month' | 'year' = 'month'): Promise<ApiResponse<ChartData[]>> {
    return apiClient.get<ChartData[]>(`/dashboard/sales-chart?period=${period}`);
  }

  async getUsersChart(period: 'week' | 'month' | 'year' = 'month'): Promise<ApiResponse<ChartData[]>> {
    return apiClient.get<ChartData[]>(`/dashboard/users-chart?period=${period}`);
  }

  async exportData(type: 'sales' | 'users' | 'products', format: 'csv' | 'xlsx' = 'csv'): Promise<ApiResponse<{ downloadUrl: string }>> {
    return apiClient.get<{ downloadUrl: string }>(`/dashboard/export/${type}?format=${format}`);
  }
}

export const dashboardService = new DashboardService();
