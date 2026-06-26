// src/pages/AdminPage.jsx
// Admin panel for managing the product catalog. Uses the storage utility for persistence.

import { useState, useEffect } from "react";
import { getProducts, saveProducts } from "../utils/storage";
import { useAuth } from "../context/AuthContext";

export default function AdminPage() {
  const { logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", category: "", description: "", dimensions: "", price: "", tag: "", color: "" });
  const [editing, setEditing] = useState(false);

  // Load products on mount
  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const resetForm = () => {
    setForm({ id: "", name: "", category: "", description: "", dimensions: "", price: "", tag: "", color: "" });
    setEditing(false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newProduct = { ...form, id: Date.now() };
    const updated = [...products, newProduct];
    saveProducts(updated);
    setProducts(updated);
    resetForm();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updated = products.map((p) => (p.id === form.id ? { ...form, id: p.id } : p));
    saveProducts(updated);
    setProducts(updated);
    resetForm();
  };

  const handleEdit = (p) => {
    setForm({ ...p });
    setEditing(true);
  };

  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
    setProducts(updated);
    // If we were editing this product, clear the form
    if (editing && form.id === id) resetForm();
  };

  return (
    <section className="min-h-screen bg-cream-100 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif text-mocha-400">Admin Panel – Product Management</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-mocha-300 text-cream-50 rounded hover:bg-mocha-400"
          >
            Sign Out
          </button>
        </header>

        {/* Product Form */}
        <form
          onSubmit={editing ? handleUpdate : handleAdd}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded shadow mb-8"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleInput}
            placeholder="Name"
            required
            className="border border-sand-200 p-2"
          />
          <input
            name="category"
            value={form.category}
            onChange={handleInput}
            placeholder="Category"
            required
            className="border border-sand-200 p-2"
          />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleInput}
            placeholder="Price"
            required
            className="border border-sand-200 p-2"
          />
          <input
            name="tag"
            value={form.tag}
            onChange={handleInput}
            placeholder="Tag (optional)"
            className="border border-sand-200 p-2"
          />
          <input
            name="color"
            value={form.color}
            onChange={handleInput}
            placeholder="Color"
            className="border border-sand-200 p-2"
          />
          <input
            name="dimensions"
            value={form.dimensions}
            onChange={handleInput}
            placeholder="Dimensions"
            className="border border-sand-200 p-2"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleInput}
            placeholder="Description"
            rows={3}
            className="border border-sand-200 p-2 md:col-span-2"
          />
          <button
            type="submit"
            className="col-span-2 bg-mocha-300 text-cream-50 py-2 hover:bg-mocha-400"
          >
            {editing ? "Update Product" : "Add Product"}
          </button>
        </form>

        {/* Product Table */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full table-auto">
            <thead className="bg-cream-50">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-sand-100">
                  <td className="px-4 py-2">{p.id}</td>
                  <td className="px-4 py-2 font-medium text-mocha-400">{p.name}</td>
                  <td className="px-4 py-2">{p.category}</td>
                  <td className="px-4 py-2">LKR {p.price.toLocaleString()}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="px-2 py-1 bg-mocha-200 text-cream-50 hover:bg-mocha-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-2 py-1 bg-red-500 text-cream-50 hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
