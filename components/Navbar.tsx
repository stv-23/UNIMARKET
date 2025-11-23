"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import UserSidebar from "./UserSidebar";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

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
      }
    };
    fetchUser();
  }, []);

  if (pathname === "/") return null;

  // Show login/register buttons only on auth pages
  const isAuthPage = pathname?.startsWith("/auth");

  return (
    <>
      <UserSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} user={user} />
      
      <nav className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {user && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="flex-shrink-0 flex items-center mr-4 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Abrir menú"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              )}
              <Link href="/home" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-primary">UniMarket</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {user && (
                  <>
                    <Link href="/market" className="text-muted-foreground hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-primary text-sm font-medium transition-colors">
                      Mercado
                    </Link>
                    <Link href="/chat" className="text-muted-foreground hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-primary text-sm font-medium transition-colors">
                      Chat
                    </Link>
                  </>
                )}
                {/* Add more links here */}
              </div>
            </div>
            <div className="flex items-center">
              {user ? (
                <div className="ml-3 relative flex items-center gap-4">
                  <Link href="/market/create" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20">
                    Vender
                  </Link>
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <span>{user.name}</span>
                  </div>
                </div>
              ) : isAuthPage ? (
                <div className="flex gap-4">
                  <Link href="/auth/login" className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Iniciar Sesión
                  </Link>
                  <Link href="/auth/register" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20">
                    Registrarse
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
