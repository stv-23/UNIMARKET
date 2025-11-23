"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  category: { name: string };
  seller: { name: string };
}

interface Category {
  id: number;
  name: string;
}

export default function MarketPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Pagination & Sorting State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          search,
          categoryId: selectedCategory,
          page: page.toString(),
          limit: "12",
          sort,
        });

        const [productsRes, categoriesRes] = await Promise.all([
          fetch(`/api/products?${queryParams}`),
          fetch("/api/categories"),
        ]);
        
        if (productsRes.ok) {
          const data = await productsRes.json();
          setProducts(data.products);
          setTotalPages(data.metadata.totalPages);
        }
        
        if (categoriesRes.ok) setCategories(await categoriesRes.json());
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchData, 300);
    return () => clearTimeout(debounce);
  }, [search, selectedCategory, page, sort]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, selectedCategory, sort]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-background">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-primary">Mercado</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-card border border-border rounded-md px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-64 transition-all"
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-card border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-card border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          >
            <option value="newest">Más Recientes</option>
            <option value="price_asc">Precio: Menor a Mayor</option>
            <option value="price_desc">Precio: Mayor a Menor</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-12 gap-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-card border border-border rounded-md text-foreground disabled:opacity-50 hover:bg-muted transition-colors"
            >
              Anterior
            </button>
            <span className="text-foreground font-medium">
              Página {page} de {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-card border border-border rounded-md text-foreground disabled:opacity-50 hover:bg-muted transition-colors"
            >
              Siguiente
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No se encontraron productos.</p>
        </div>
      )}
    </main>
  );
}
