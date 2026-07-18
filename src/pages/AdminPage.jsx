import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, saveProducts, getCategories, saveCategories } from "../utils/storage";
import { useAuth } from "../context/AuthContext";

const TABS = ["Dashboard", "Products", "Categories"];

export default function AdminPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("Dashboard");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", category: "", description: "", dimensions: "", price: "", tag: "", color: "", imageUrl: "" });
  const [editing, setEditing] = useState(false);
  const [catInput, setCatInput] = useState("");
  const [catEdit, setCatEdit] = useState({ active: false, oldName: "" });

  useEffect(() => {
    setProducts(getProducts());
    setCategories(getCategories());
  }, []);

  const resetForm = () => {
    setForm({ id: "", name: "", category: "", description: "", dimensions: "", price: "", tag: "", color: "", imageUrl: "" });
    setEditing(false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const updated = [...products, { ...form, id: Date.now() }];
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
    setTab("Products");
  };

  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
    setProducts(updated);
    if (editing && form.id === id) resetForm();
  };

  const addCategory = () => {
    const name = catInput.trim();
    if (!name || categories.includes(name)) return;
    const updated = [...categories, name];
    saveCategories(updated);
    setCategories(updated);
    setCatInput("");
  };

  const startEditCategory = (name) => {
    setCatInput(name);
    setCatEdit({ active: true, oldName: name });
  };

  const saveCategoryEdit = () => {
    const name = catInput.trim();
    if (!name || (name !== catEdit.oldName && categories.includes(name))) return;
    const updated = categories.map((c) => (c === catEdit.oldName ? name : c));
    saveCategories(updated);
    setCategories(updated);
    setCatInput("");
    setCatEdit({ active: false, oldName: "" });
  };

  const deleteCategory = (name) => {
    const updated = categories.filter((c) => c !== name);
    saveCategories(updated);
    setCategories(updated);
  };

  const categoryCounts = {};
  products.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  return (
    <section className="min-h-screen bg-cream-100 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-sand-200 px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-lg sm:text-2xl font-serif text-mocha-400">Admin Dashboard</h1>
          <button
            onClick={() => { logout(); navigate("/"); }}
            className="px-4 py-2 bg-mocha-300 text-cream-50 text-xs tracking-widest uppercase hover:bg-mocha-400"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
        <nav className="flex gap-1 border-b border-sand-200 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 font-sans text-[10px] sm:text-xs tracking-widest uppercase transition-colors whitespace-nowrap ${
                tab === t
                  ? "bg-white text-mocha-400 border-t border-l border-r border-sand-200 -mb-px"
                  : "text-dusty-400 hover:text-mocha-300"
              }`}
            >
              {t}
            </button>
          ))}
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">

        {/* ── Dashboard Tab ── */}
        {tab === "Dashboard" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              <div className="bg-white border border-sand-200 p-6">
                <p className="font-sans text-xs tracking-widest uppercase text-dusty-400 mb-1">Total Products</p>
                <p className="font-serif text-4xl text-mocha-400">{products.length}</p>
              </div>
              <div className="bg-white border border-sand-200 p-6">
                <p className="font-sans text-xs tracking-widest uppercase text-dusty-400 mb-1">Categories</p>
                <p className="font-serif text-4xl text-mocha-400">{categories.length}</p>
              </div>
              <div className="bg-white border border-sand-200 p-6">
                <p className="font-sans text-xs tracking-widest uppercase text-dusty-400 mb-1">Gift Sets</p>
                <p className="font-serif text-4xl text-mocha-400">5</p>
              </div>
              <div className="bg-white border border-sand-200 p-6">
                <p className="font-sans text-xs tracking-widest uppercase text-dusty-400 mb-1">Blessing Kits</p>
                <p className="font-serif text-4xl text-mocha-400">7</p>
              </div>
            </div>

            <div className="bg-white border border-sand-200 p-6">
              <h2 className="font-serif text-lg text-mocha-400 font-light mb-4">Products per Category</h2>
              <div className="space-y-3">
                {Object.entries(categoryCounts).map(([cat, count]) => (
                  <div key={cat} className="flex items-center gap-4">
                    <span className="font-sans text-xs text-mocha-300 w-32">{cat}</span>
                    <div className="flex-1 h-4 bg-sand-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-mocha-300 rounded-full transition-all"
                        style={{ width: `${(count / products.length) * 100}%` }}
                      />
                    </div>
                    <span className="font-sans text-xs text-dusty-400 w-8 text-right">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Products Tab ── */}
        {tab === "Products" && (
          <div>
            {/* Product Form */}
            <form
              onSubmit={editing ? handleUpdate : handleAdd}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border border-sand-200 p-6 mb-8"
            >
              <input name="name" value={form.name} onChange={handleInput} placeholder="Name" required className="border border-sand-200 p-2 text-sm" />
              <div>
                <select name="category" value={form.category} onChange={handleInput} required className="w-full border border-sand-200 p-2 text-sm bg-white">
                  <option value="">Select category</option>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <input name="price" type="number" value={form.price} onChange={handleInput} placeholder="Price" required className="border border-sand-200 p-2 text-sm" />
              <input name="tag" value={form.tag} onChange={handleInput} placeholder="Tag (optional)" className="border border-sand-200 p-2 text-sm" />
              <input name="color" value={form.color} onChange={handleInput} placeholder="Color" className="border border-sand-200 p-2 text-sm" />
              <div className="md:col-span-2">
                <label className="block font-sans text-xs tracking-widest uppercase text-dusty-400 mb-2">Product Image</label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer px-4 py-2 bg-sand-100 border border-sand-200 text-mocha-400 text-xs tracking-widest uppercase hover:bg-sand-200 transition-colors">
                    Choose File
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  {form.imageUrl && (
                    <div className="flex items-center gap-3 flex-1">
                      <img src={form.imageUrl} alt="Preview" className="w-12 h-12 object-cover border border-sand-200" />
                      <span className="font-sans text-xs text-dusty-400 truncate">Image selected</span>
                      <button type="button" onClick={() => setForm((prev) => ({ ...prev, imageUrl: "" }))} className="ml-auto font-sans text-xs text-red-400 hover:text-red-500">Remove</button>
                    </div>
                  )}
                </div>
              </div>
              <input name="dimensions" value={form.dimensions} onChange={handleInput} placeholder="Dimensions" className="border border-sand-200 p-2 text-sm" />
              <textarea name="description" value={form.description} onChange={handleInput} placeholder="Description" rows={3} className="border border-sand-200 p-2 text-sm md:col-span-2" />
              <div className="md:col-span-2 flex gap-3">
                <button type="submit" className="flex-1 bg-mocha-300 text-cream-50 py-2.5 text-xs tracking-widest uppercase hover:bg-mocha-400">
                  {editing ? "Update Product" : "Add Product"}
                </button>
                {editing && (
                  <button type="button" onClick={resetForm} className="px-6 border border-sand-200 text-dusty-400 text-xs tracking-widest uppercase hover:bg-sand-100">
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {/* Product Table */}
            <div className="bg-white border border-sand-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-cream-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-sans text-xs tracking-widest uppercase text-dusty-400">Image</th>
                      <th className="px-4 py-3 text-left font-sans text-xs tracking-widest uppercase text-dusty-400">Name</th>
                      <th className="px-4 py-3 text-left font-sans text-xs tracking-widest uppercase text-dusty-400">Category</th>
                      <th className="px-4 py-3 text-left font-sans text-xs tracking-widest uppercase text-dusty-400">Price</th>
                      <th className="px-4 py-3 text-right font-sans text-xs tracking-widest uppercase text-dusty-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} className="border-t border-sand-100 hover:bg-cream-50/50">
                        <td className="px-4 py-3">
                          {p.imageUrl ? (
                            <img src={p.imageUrl} alt={p.name} className="w-10 h-10 object-cover border border-sand-200" />
                          ) : (
                            <div className="w-10 h-10 bg-sand-100 border border-sand-200 flex items-center justify-center">
                              <span className="font-serif text-xs text-dusty-300">—</span>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 font-medium text-mocha-400 text-sm">{p.name}</td>
                        <td className="px-4 py-3 text-sm text-dusty-400">{p.category}</td>
                        <td className="px-4 py-3 text-sm text-mocha-400">LKR {p.price.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <button onClick={() => handleEdit(p)} className="px-3 py-1.5 bg-mocha-200 text-cream-50 text-xs tracking-widest uppercase hover:bg-mocha-300">Edit</button>
                          <button onClick={() => handleDelete(p.id)} className="px-3 py-1.5 bg-red-400 text-cream-50 text-xs tracking-widest uppercase hover:bg-red-500">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Categories Tab ── */}
        {tab === "Categories" && (
          <div className="max-w-lg">
            <div className="bg-white border border-sand-200 p-6 mb-8">
              <h2 className="font-serif text-lg text-mocha-400 font-light mb-4">
                {catEdit.active ? "Edit Category" : "Add Category"}
              </h2>
              <div className="flex gap-3">
                <input
                  value={catInput}
                  onChange={(e) => setCatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (catEdit.active ? saveCategoryEdit() : addCategory())}
                  placeholder="Category name"
                  className="flex-1 border border-sand-200 p-2 text-sm"
                />
                <button
                  onClick={catEdit.active ? saveCategoryEdit : addCategory}
                  className="px-5 bg-mocha-300 text-cream-50 text-xs tracking-widest uppercase hover:bg-mocha-400"
                >
                  {catEdit.active ? "Save" : "Add"}
                </button>
                {catEdit.active && (
                  <button
                    onClick={() => { setCatInput(""); setCatEdit({ active: false, oldName: "" }); }}
                    className="px-5 border border-sand-200 text-dusty-400 text-xs tracking-widest uppercase hover:bg-sand-100"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white border border-sand-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-sand-100">
                <p className="font-sans text-xs tracking-widest uppercase text-dusty-400">
                  {categories.length} {categories.length === 1 ? "Category" : "Categories"}
                </p>
              </div>
              <ul className="divide-y divide-sand-100">
                {categories.map((c) => (
                  <li key={c} className="flex items-center justify-between px-6 py-3 hover:bg-cream-50/50">
                    <span className="font-sans text-sm text-mocha-400">{c}</span>
                    <div className="flex gap-2">
                      <button onClick={() => startEditCategory(c)} className="px-3 py-1 bg-mocha-200 text-cream-50 text-xs tracking-widest uppercase hover:bg-mocha-300">Edit</button>
                      <button onClick={() => deleteCategory(c)} className="px-3 py-1 bg-red-400 text-cream-50 text-xs tracking-widest uppercase hover:bg-red-500">Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}