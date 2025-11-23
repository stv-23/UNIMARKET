"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching user", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background px-6 text-center">
      <h1 className="text-5xl font-extrabold text-primary tracking-tight">UniMarket</h1>
      <p className="mt-4 text-muted-foreground max-w-lg text-lg">
        El marketplace estudiantil donde puedes comprar, vender e intercambiar productos dentro de tu universidad.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        {!user ? (
          <>
            <Link
              href="/auth/register"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg shadow-lg shadow-blue-900/20 hover:bg-blue-600 transition-all transform hover:scale-105 font-medium"
            >
              Registrarme
            </Link>

            <Link
              href="/auth/login"
              className="px-8 py-3 bg-transparent text-primary border border-primary rounded-lg hover:bg-primary/10 transition-all font-medium"
            >
              Iniciar Sesión
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/market/create"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg shadow-lg shadow-blue-900/20 hover:bg-blue-600 transition-all transform hover:scale-105 font-medium"
            >
              Vender
            </Link>

            <Link
              href="/chat"
              className="px-8 py-3 bg-emerald-600 text-white rounded-lg shadow-lg shadow-emerald-900/20 hover:bg-emerald-700 transition-all transform hover:scale-105 font-medium"
            >
              Mis Chats
            </Link>

            <Link
              href="/profile/edit"
              className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg shadow-lg hover:bg-secondary/80 transition-all transform hover:scale-105 font-medium"
            >
              Editar Perfil
            </Link>
          </>
        )}
      </div>
    </main>
  );
}





