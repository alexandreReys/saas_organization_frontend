"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { dashboardService, type DashboardData } from "@/services";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Tenta carregar dados da API
        const response = await dashboardService.getDashboardData();
        
        if (response.success) {
          setDashboardData(response.data);
        } else {
          throw new Error(response.message || 'Erro ao carregar dados');
        }
      } catch (error) {
        console.error('Dashboard data loading error:', error);
        setError('Erro ao carregar dados do dashboard');
        
        // Fallback para dados mockados se a API falhar
        setDashboardData({
          stats: {
            totalUsers: 1234,
            totalSales: 45231,
            totalProducts: 573,
            conversionRate: 12.5,
            salesGrowth: 15.1,
            usersGrowth: 20.1,
            productsGrowth: 2.1,
            conversionGrowth: 3.2,
          },
          recentSales: [
            { id: "1", customerName: "João Silva", customerEmail: "joao@email.com", amount: 1234, currency: "BRL", date: "2024-01-01", status: "completed" },
            { id: "2", customerName: "Maria Santos", customerEmail: "maria@email.com", amount: 2345, currency: "BRL", date: "2024-01-01", status: "completed" },
            { id: "3", customerName: "Pedro Costa", customerEmail: "pedro@email.com", amount: 987, currency: "BRL", date: "2024-01-01", status: "pending" },
            { id: "4", customerName: "Ana Lima", customerEmail: "ana@email.com", amount: 1567, currency: "BRL", date: "2024-01-01", status: "completed" },
          ],
          systemActivities: [
            { id: "1", action: "Novo usuário cadastrado", description: "João Silva se cadastrou", timestamp: "2024-01-01T10:00:00Z", type: "user" },
            { id: "2", action: "Produto atualizado", description: "Produto X foi modificado", timestamp: "2024-01-01T09:55:00Z", type: "product" },
            { id: "3", action: "Venda realizada", description: "Venda #123 concluída", timestamp: "2024-01-01T09:50:00Z", type: "sale" },
            { id: "4", action: "Backup do sistema", description: "Backup automático executado", timestamp: "2024-01-01T09:00:00Z", type: "system" },
          ],
          salesChart: [],
          usersChart: [],
        });
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-lg text-slate-600 dark:text-slate-400">Carregando dashboard...</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error} - Exibindo dados de exemplo
          </div>
        )}
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Painel administrativo com métricas e informações importantes.
          </p>
        </div>

        {dashboardData && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total de Usuários
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +{dashboardData.stats.usersGrowth}% em relação ao mês passado
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Vendas
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {dashboardData.stats.totalSales.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +{dashboardData.stats.salesGrowth}% em relação ao mês passado
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Produtos Ativos
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.stats.totalProducts}</div>
                  <p className="text-xs text-muted-foreground">
                    +{dashboardData.stats.productsGrowth}% em relação ao mês passado
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Taxa de Conversão
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M8 6h13" />
                    <path d="M6 12h13" />
                    <path d="M4 18h13" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.stats.conversionRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    +{dashboardData.stats.conversionGrowth}% em relação ao mês passado
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vendas Recentes</CardTitle>
                  <CardDescription>
                    Últimas transações realizadas no sistema.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.recentSales.map((sale) => (
                      <div key={sale.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{sale.customerName}</p>
                          <p className="text-xs text-muted-foreground">{sale.customerEmail}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">R$ {sale.amount.toLocaleString()}</div>
                          <div className={`text-xs ${
                            sale.status === 'completed' ? 'text-green-600' :
                            sale.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {sale.status === 'completed' ? 'Concluída' :
                             sale.status === 'pending' ? 'Pendente' : 'Cancelada'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Atividades do Sistema</CardTitle>
                  <CardDescription>
                    Principais eventos e atividades recentes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.systemActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.description}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}
