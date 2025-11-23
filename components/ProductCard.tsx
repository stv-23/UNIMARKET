import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  category: { name: string };
  seller: { name: string };
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/market/${product.id}`} className="group">
      <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 transform hover:-translate-y-1">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-muted xl:aspect-w-7 xl:aspect-h-8 h-48 relative">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover object-center group-hover:opacity-90 transition-opacity"
          />
          <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-md px-2 py-1 rounded text-xs font-semibold text-foreground border border-border">
            {product.category.name}
          </div>
        </div>
        <div className="p-4">
          <h3 className="mt-1 text-lg font-bold text-foreground truncate">{product.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground truncate">Vendedor: {product.seller.name}</p>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xl font-extrabold text-primary">${product.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
