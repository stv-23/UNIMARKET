"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          setProduct(await res.json());
        } else {
          router.push("/market");
        }
      } catch (error) {
        console.error("Error fetching product", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };

    if (id) fetchProduct();
    fetchUser();
  }, [id, router]);

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de que quieres eliminar este producto?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/market");
      } else {
        alert("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  if (!product) return null;

  return (

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen bg-background">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Image gallery */}
        <div className="flex flex-col-reverse">
          <div className="w-full aspect-w-1 aspect-h-1 bg-muted rounded-xl overflow-hidden sm:aspect-w-2 sm:aspect-h-3 relative h-96 border border-border shadow-lg">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-center object-cover"
              priority
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary">{product.title}</h1>

          <div className="mt-4">
            <h2 className="sr-only">Product information</h2>
            <p className="text-4xl font-bold text-foreground">${product.price.toFixed(2)}</p>
          </div>

          <div className="mt-8">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-muted-foreground space-y-6" dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>

          <div className="mt-8 flex items-center p-4 bg-card rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              Vendido por: <span className="font-bold text-foreground ml-1">{product.seller.name}</span>
            </p>
          </div>
          
          <div className="mt-4 flex items-center">
             <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30">
               {product.category.name}
             </span>
          </div>

          <div className="mt-10 flex flex-col gap-4">
            <button
              type="button"
              className="w-full bg-primary border border-transparent rounded-lg py-4 px-8 flex items-center justify-center text-lg font-bold text-primary-foreground hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg shadow-blue-900/20"
              onClick={async () => {
                if (!currentUser) {
                  router.push("/auth/login");
                  return;
                }
                try {
                  const res = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ otherUserId: product.sellerId }),
                  });
                  if (res.ok) {
                    const conversation = await res.json();
                    router.push(`/chat?id=${conversation.id}`);
                  }
                } catch (error) {
                  console.error("Error starting chat", error);
                }
              }}
            >
              Contactar Vendedor
            </button>
            
            {currentUser && currentUser.id === product.sellerId && (
              <div className="flex flex-col gap-3 w-full mt-4 pt-6 border-t border-border">
                 {!product.isSold ? (
                   <button
                    type="button"
                    className="w-full bg-emerald-600 border border-transparent rounded-lg py-3 px-8 flex items-center justify-center text-base font-bold text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all shadow-lg shadow-emerald-900/20"
                    onClick={async () => {
                      if (!confirm("¿Marcar este producto como vendido?")) return;
                      try {
                        const res = await fetch(`/api/products/${id}`, {
                          method: "PATCH",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ isSold: true }),
                        });
                        if (res.ok) {
                          setProduct({ ...product, isSold: true });
                        }
                      } catch (error) {
                        console.error("Error updating product", error);
                      }
                    }}
                  >
                    Marcar como Vendido
                  </button>
                 ) : (
                   <div className="w-full bg-muted border border-border rounded-lg py-3 px-8 flex items-center justify-center text-base font-medium text-muted-foreground cursor-not-allowed">
                     Producto Vendido
                   </div>
                 )}

                <button
                  type="button"
                  className="w-full bg-destructive border border-transparent rounded-lg py-3 px-8 flex items-center justify-center text-base font-bold text-destructive-foreground hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-destructive transition-all shadow-lg shadow-red-900/20"
                  onClick={handleDelete}
                >
                  Eliminar Producto
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
