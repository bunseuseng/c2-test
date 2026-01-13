import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { 
    fetch("https://api.escuelajs.co/api/v1/products?limit=12&offset=1")
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setItems(data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-slate-600">Manage your product catalog</p>
        </div>

        <Link
          to="/products/new"
          className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          + Add product
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2">
        {items.map((p) => (
          <Link
            key={p.id}
            to={`/products/${p.id}`}
            className="rounded-xl border bg-white p-4 hover:shadow-sm transition"
          >
            <img
              src={p.images?.[0] ?? "https://placehold.co/600x400"}
              alt={p.title}
              className="h-40 w-full rounded-lg object-cover"
              loading="lazy"
            />
            <div className="mt-3 flex items-start justify-between gap-3">
              <div>
                <div className="font-medium line-clamp-1">{p.title}</div>
                <div className="text-sm text-slate-600 line-clamp-1">
                  {p.category?.name}
                </div>
              </div>
              <div className="shrink-0 font-semibold">${p.price}</div>
            </div>

            <p className="mt-2 text-sm text-slate-600 line-clamp-2">
              {p.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
