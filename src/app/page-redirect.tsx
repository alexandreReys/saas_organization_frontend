"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Se não estiver autenticado, redireciona para o login
    if (!isAuthenticated) {
      router.push('/auth/login');
    } else {
      // Se estiver autenticado, redireciona para o dashboard
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  // Página de loading enquanto redireciona
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-lg text-slate-600 dark:text-slate-400">Carregando...</p>
      </div>
    </div>
  );
}
