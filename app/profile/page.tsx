"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [activeProducts, setActiveProducts] = useState<any[]>([]);
  const [soldProducts, setSoldProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          
          // Fetch only my products
          const prodRes = await fetch(`/api/products?sellerId=${data.user.id}&limit=100`);
          if (prodRes.ok) {
            const prodData = await prodRes.json();
            // Handle both array (old API) and object with products array (new API)
            const myProducts = Array.isArray(prodData) ? prodData : prodData.products;
            
            setActiveProducts(myProducts.filter((p: any) => !p.isSold));
            setSoldProducts(myProducts.filter((p: any) => p.isSold));
          }
        } else {
          router.push("/auth/login");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  if (loading) return <div className="p-8 text-center">Cargando perfil...</div>;
  if (!user) return null;

  return (

    <main className="max-w-7xl mx-auto px-4 py-12 min-h-screen bg-background">
      {/* User Info */}
      <div className="bg-card shadow-xl border border-border overflow-hidden sm:rounded-xl mb-12">
        <div className="px-6 py-6 sm:px-8 flex justify-between items-center bg-card/50">
          <div>
            <h3 className="text-2xl leading-6 font-bold text-primary">Perfil de Usuario</h3>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Detalles personales y cuenta.</p>
          </div>
          <div className="flex gap-3 flex-wrap justify-end">
            <Link href="/profile/edit" className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/80 text-sm font-medium transition-colors">
                Editar Perfil
            </Link>
            <Link href="/market/create" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-blue-600 text-sm font-medium transition-colors shadow-lg shadow-blue-900/20">
                Vender Producto
            </Link>
            <Link href="/chat" className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 text-sm font-medium transition-colors shadow-lg shadow-emerald-900/20">
                Mis Mensajes
            </Link>
          </div>
        </div>
        <div className="border-t border-border">
          <dl>
            <div className="bg-card px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8 border-b border-border">
              <dt className="text-sm font-medium text-muted-foreground">Nombre completo</dt>
              <dd className="mt-1 text-sm text-foreground sm:mt-0 sm:col-span-2 font-medium">{user.name}</dd>
            </div>
            <div className="bg-muted/30 px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8 border-b border-border">
              <dt className="text-sm font-medium text-muted-foreground">Correo electrónico</dt>
              <dd className="mt-1 text-sm text-foreground sm:mt-0 sm:col-span-2">{user.email}</dd>
            </div>
            {user.university && (
              <div className="bg-card px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8 border-b border-border">
                <dt className="text-sm font-medium text-muted-foreground">Universidad / Instituto</dt>
                <dd className="mt-1 text-sm text-foreground sm:mt-0 sm:col-span-2">{user.university}</dd>
              </div>
            )}
            {user.birthDate && (
              <div className="bg-muted/30 px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8 border-b border-border">
                <dt className="text-sm font-medium text-muted-foreground">Fecha de Nacimiento</dt>
                <dd className="mt-1 text-sm text-foreground sm:mt-0 sm:col-span-2">
                  {new Date(user.birthDate).toLocaleDateString()}
                </dd>
              </div>
            )}
            {user.bio && (
              <div className="bg-card px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8">
                <dt className="text-sm font-medium text-muted-foreground">Biografía</dt>
                <dd className="mt-1 text-sm text-foreground sm:mt-0 sm:col-span-2 whitespace-pre-wrap leading-relaxed">{user.bio}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
      
      {/* Active Products */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
          <span className="w-2 h-8 bg-primary rounded-full"></span>
          Mis Publicaciones Activas ({activeProducts.length})
        </h2>
        {activeProducts.length === 0 ? (
          <p className="text-muted-foreground bg-card p-6 rounded-xl border border-border text-center">No tienes productos activos en venta.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {activeProducts.map((product) => (
              <Link key={product.id} href={`/market/${product.id}`} className="group">
                <div className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-border hover:-translate-y-1">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-muted xl:aspect-w-7 xl:aspect-h-8 relative h-48">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover object-center group-hover:opacity-90 transition-opacity"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">{product.title}</h3>
                    <p className="text-lg font-bold text-foreground">${product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Sold Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-muted-foreground flex items-center gap-2">
           <span className="w-2 h-8 bg-muted-foreground rounded-full"></span>
           Historial de Ventas ({soldProducts.length})
        </h2>
        {soldProducts.length === 0 ? (
          <p className="text-muted-foreground bg-card p-6 rounded-xl border border-border text-center">No has vendido productos aún.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {soldProducts.map((product) => (
              <Link key={product.id} href={`/market/${product.id}`} className="group opacity-60 hover:opacity-100 transition-opacity">
                <div className="bg-card rounded-xl shadow-md overflow-hidden border border-border grayscale hover:grayscale-0 transition-all">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-muted xl:aspect-w-7 xl:aspect-h-8 relative h-48">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded z-10 shadow-sm">
                      VENDIDO
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm text-muted-foreground line-through">{product.title}</h3>
                    <p className="mt-1 text-lg font-medium text-muted-foreground">${product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
