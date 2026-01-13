import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const catRes = await fetch(
          "https://api.escuelajs.co/api/v1/categories?limit=4"
        );
        const catData = await catRes.json();
        setCategories(catData);

        // Fetch products
        const prodRes = await fetch(
          "https://api.escuelajs.co/api/v1/products?limit=12&offset=1"
        );
        const prodData = await prodRes.json();
        setProducts(prodData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  // Featured: first 4 products
  const featured = products.slice(0, 4);

  // Latest: sort by creationAt desc, take 4
  const latest = [...products]
    .sort((a, b) => new Date(b.creationAt) - new Date(a.creationAt))
    .slice(0, 4);

  return (
    <div className="space-y-4">
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="rounded-2xl border bg-white p-5">
          <div className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            New arrivals
          </div>

          <h1 className="mt-3 text-2xl font-semibold leading-tight">
            Discover products you’ll love
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Browse categories, view latest items, and manage products & users in
            one simple app.
          </p>

          <div className="mt-4 flex gap-3">
            <Link
              to="/products"
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
            >
              Explore products
            </Link>
          </div>
        </section>

        {/* Featured Products */}
        <section className="space-y-3">
  <div className="flex items-end justify-between">
    <h2 className="text-lg font-semibold">Featured products</h2>
    <Link to="/products" className="text-sm text-slate-700 underline">
      View all
    </Link>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
    {featured.map((p) => (
      <Link
        key={p.id}
        to={`/products/${p.id}`}
        className="flex flex-col rounded-2xl border bg-white p-4 hover:shadow-sm transition"
      >
        {/* Image */}
        <img
          src={p.images?.[0] ?? "https://placehold.co/600x400"}
          alt={p.title}
          className="h-40 w-full rounded-xl object-cover mb-3"
          loading="lazy"
        />

        {/* Text content */}
        <div className="flex flex-col gap-1">
          <div className="font-medium">{p.title}</div>
          <div className="text-xs text-slate-600">{p.category?.name}</div>
          <div className="text-sm text-slate-600 line-clamp-2">
            {p.description}
          </div>
          <div className="mt-2 font-semibold">${p.price}</div>
        </div>
      </Link>
    ))}
  </div>
</section>


        {/* Categories */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Categories</h2>

          <div className="grid grid-cols-2 gap-4">
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/products"
                className="flex items-center gap-3 rounded-2xl border bg-white p-4 hover:bg-slate-50 transition"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="h-12 w-12 rounded-xl object-cover"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <div className="truncate font-medium">{c.name}</div>
                  <div className="text-xs text-slate-600">Tap to browse</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Products */}
        <section className="space-y-3">
          <div className="flex items-end justify-between">
            <h2 className="text-lg font-semibold">Latest products</h2>
            <Link to="/products" className="text-sm text-slate-700 underline">
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {latest.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="block rounded-2xl border bg-white p-4 hover:shadow-sm transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.images?.[0] ?? "https://placehold.co/600x400"}
                    alt={p.title}
                    className="h-14 w-14 rounded-xl object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="truncate font-medium">{p.title}</div>
                      <div className="shrink-0 text-sm font-semibold">
                        ${p.price}
                      </div>
                    </div>
                    <div className="truncate text-xs text-slate-600">
                      {p.category?.name}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
