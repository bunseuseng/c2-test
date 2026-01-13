import { useNavigate } from "react-router-dom";

export default function ProductNew() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const newProduct = {
    title: formData.get("title"),
    price: Number(formData.get("price")),
    categoryId: Number(formData.get("categoryId")),
    images: [formData.get("image")], 
    description: formData.get("description"),
  };

  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (res.ok) {
      alert("Successfully saved a new product");
      navigate("/products");
    } else {
      alert("Saved a new product is failed");
    }
  } catch (error) {
    console.error("Error submitting product:", error);
    alert("Saved a new product is failed");
  }
}


  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Add new product</h1>
        <p className="text-sm text-slate-600">
          Fill in the product information
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            required
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="Product title"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            name="price"
            type="number"
            required
            min={0}
            step="0.01"
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="0.00"
          />
        </div>

        {/* Category ID (1–5 only) */}
        <div>
          <label className="block text-sm font-medium">Category ID</label>
          <input
            name="categoryId"
            type="number"
            required
            min={1}
            max={5}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="1 - 5"
          />
          <p className="mt-1 text-xs text-slate-500">Allowed values: 1 to 5</p>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            name="image"
            type="url"
            required
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            rows={3}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="Product description"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Save product
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm text-slate-600 hover:underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
