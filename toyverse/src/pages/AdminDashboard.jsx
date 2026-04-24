import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Package, Plus, Edit3, Trash2, X, Save, Star,
  TrendingUp, ShoppingBag, Users, DollarSign, Flame, Award, Search, Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { products as initialProducts } from '../data/products';
import toast from 'react-hot-toast';

const EMPTY_FORM = { name: '', category: 'action', price: '', originalPrice: '', description: '', image: '', stock: '', isBestSeller: false, isHotDeal: false, isNew: false };

function StatCard({ icon: Icon, label, value, sub, color, bg }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${bg} rounded-2xl p-5 flex items-center gap-4`}
    >
      <div className={`w-12 h-12 ${color} bg-white/20 rounded-xl flex items-center justify-center`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-white/70 text-xs font-semibold uppercase tracking-wide">{label}</p>
        <p className="text-white font-display text-2xl leading-tight">{value}</p>
        <p className="text-white/60 text-xs">{sub}</p>
      </div>
    </motion.div>
  );
}

function ProductForm({ form, setForm, onSave, onCancel, isEditing }) {
  const cats = ['action', 'building', 'educational', 'outdoor', 'plush', 'vehicles', 'art'];
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-700"
    >
      <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-5 flex items-center gap-2">
        {isEditing ? <Edit3 size={18} className="text-orange-500" /> : <Plus size={18} className="text-green-500" />}
        {isEditing ? 'Edit Product' : 'Add New Product'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">Product Name *</label>
          <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Enter product name" className="input-field text-sm" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">Category</label>
          <select value={form.category} onChange={e => update('category', e.target.value)} className="input-field text-sm">
            {cats.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">Price ($) *</label>
          <input type="number" step="0.01" value={form.price} onChange={e => update('price', e.target.value)} placeholder="0.00" className="input-field text-sm" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">Original Price ($)</label>
          <input type="number" step="0.01" value={form.originalPrice} onChange={e => update('originalPrice', e.target.value)} placeholder="0.00 (optional)" className="input-field text-sm" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">Stock Quantity</label>
          <input type="number" value={form.stock} onChange={e => update('stock', e.target.value)} placeholder="0" className="input-field text-sm" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">Image URL</label>
          <input value={form.image} onChange={e => update('image', e.target.value)} placeholder="https://... or /assets/images/..." className="input-field text-sm" />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">Description</label>
          <textarea value={form.description} onChange={e => update('description', e.target.value)} rows={3} placeholder="Product description..." className="input-field text-sm resize-none" />
        </div>
        <div className="md:col-span-2 flex flex-wrap gap-4">
          {[
            { key: 'isBestSeller', label: '⭐ Best Seller', icon: Award },
            { key: 'isHotDeal', label: '🔥 Hot Deal', icon: Flame },
            { key: 'isNew', label: '✨ New Arrival', icon: Star },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={() => update(key, !form[key])}
                className={`w-10 h-6 rounded-full transition-all duration-300 flex items-center ${form[key] ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 mx-1 ${form[key] ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button onClick={onSave} className="btn-primary flex items-center gap-2 text-sm py-2.5">
          <Save size={15} /> {isEditing ? 'Update Product' : 'Add Product'}
        </button>
        <button onClick={onCancel} className="btn-secondary flex items-center gap-2 text-sm py-2.5">
          <X size={15} /> Cancel
        </button>
      </div>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />;

  const [products, setProducts] = useState(initialProducts);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const startEdit = (p) => {
    setForm({ ...p, price: String(p.price), originalPrice: String(p.originalPrice || ''), stock: String(p.stock) });
    setEditingId(p.id);
    setShowForm(true);
    setActiveTab('products');
  };

  const handleSave = () => {
    if (!form.name || !form.price) { toast.error('Name and price are required'); return; }
    const payload = {
      ...form,
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
      stock: parseInt(form.stock) || 0,
      rating: form.rating || 4.5,
      reviews: form.reviews || 0,
      tag: form.isHotDeal ? 'hot' : form.isBestSeller ? 'bestseller' : form.isNew ? 'new' : null,
      badge: form.isHotDeal ? '🔥 Hot Deal' : form.isBestSeller ? '⭐ Best Seller' : form.isNew ? '✨ New' : null,
    };
    if (editingId) {
      setProducts(ps => ps.map(p => p.id === editingId ? { ...p, ...payload } : p));
      toast.success('Product updated!');
    } else {
      setProducts(ps => [...ps, { ...payload, id: Date.now(), images: [payload.image] }]);
      toast.success('Product added!');
    }
    setForm(EMPTY_FORM); setEditingId(null); setShowForm(false);
  };

  const handleDelete = (id) => {
    setProducts(ps => ps.filter(p => p.id !== id));
    toast.success('Product deleted');
  };

  const stats = [
    { icon: DollarSign, label: 'Revenue', value: '$48,290', sub: '+12% this month', color: 'text-green-300', bg: 'bg-gradient-to-br from-green-500 to-emerald-600' },
    { icon: ShoppingBag, label: 'Orders', value: '1,284', sub: '42 pending', color: 'text-blue-300', bg: 'bg-gradient-to-br from-blue-500 to-indigo-600' },
    { icon: Package, label: 'Products', value: products.length, sub: `${products.filter(p => p.stock < 20).length} low stock`, color: 'text-orange-300', bg: 'bg-gradient-to-br from-orange-500 to-red-500' },
    { icon: Users, label: 'Customers', value: '3,671', sub: '+87 this week', color: 'text-pink-300', bg: 'bg-gradient-to-br from-pink-500 to-rose-600' },
  ];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex pt-16">
      {/* Sidebar */}
      <aside className="w-60 bg-white dark:bg-gray-900 shadow-lg flex-shrink-0 hidden md:flex flex-col fixed top-16 bottom-0 left-0 z-30">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-orange-400" />
            <div>
              <p className="font-bold text-sm text-gray-800 dark:text-white">{user.name}</p>
              <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold px-2 py-0.5 rounded-full">Admin</span>
            </div>
          </div>
        </div>
        <nav className="p-3 flex-1">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => { setActiveTab(t.id); setShowForm(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 mb-1 ${
                activeTab === t.id
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <t.icon size={17} />
              {t.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-60 p-4 md:p-8 overflow-auto">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="font-display text-3xl text-gray-800 dark:text-white mb-2">Dashboard</h1>
            <p className="text-gray-500 mb-6">Welcome back, {user.name}! Here's what's happening.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              {stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                  <StatCard {...s} />
                </motion.div>
              ))}
            </div>
            {/* Recent products */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-gray-800 dark:text-white">Recent Products</h2>
                <button onClick={() => setActiveTab('products')} className="text-orange-500 text-sm font-bold hover:underline">View All</button>
              </div>
              <div className="space-y-3">
                {products.slice(0, 5).map(p => (
                  <div key={p.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-800 dark:text-white truncate">{p.name}</p>
                      <p className="text-xs text-gray-400 capitalize">{p.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-orange-500 text-sm">${p.price}</p>
                      <p className="text-xs text-gray-400">{p.stock} in stock</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <h1 className="font-display text-3xl text-gray-800 dark:text-white">Products ({products.length})</h1>
              <button
                onClick={() => { setForm(EMPTY_FORM); setEditingId(null); setShowForm(s => !s); }}
                className="btn-primary flex items-center gap-2 text-sm py-2.5 self-start sm:self-auto"
              >
                <Plus size={16} /> Add Product
              </button>
            </div>

            <AnimatePresence>
              {showForm && (
                <motion.div className="mb-6" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <ProductForm form={form} setForm={setForm} onSave={handleSave} onCancel={() => setShowForm(false)} isEditing={!!editingId} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search */}
            <div className="relative mb-4">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="input-field pl-10 text-sm" />
            </div>

            {/* Products Table */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                      <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Product</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Category</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Price</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Stock</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Tags</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                    <AnimatePresence>
                      {filteredProducts.map((p, i) => (
                        <motion.tr
                          key={p.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                              <span className="font-semibold text-gray-800 dark:text-white text-xs line-clamp-2 max-w-[150px]">{p.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="capitalize text-gray-500 dark:text-gray-400 text-xs">{p.category}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <span className="font-bold text-orange-500">${p.price}</span>
                              {p.originalPrice && <span className="text-xs text-gray-400 line-through ml-1">${p.originalPrice}</span>}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`font-semibold text-xs ${p.stock < 20 ? 'text-red-500' : 'text-green-500'}`}>{p.stock}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {p.isBestSeller && <span className="text-[10px] bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-0.5 rounded-full font-bold">⭐ BS</span>}
                              {p.isHotDeal && <span className="text-[10px] bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-2 py-0.5 rounded-full font-bold">🔥 Hot</span>}
                              {p.isNew && <span className="text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full font-bold">✨ New</span>}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => startEdit(p)}
                                className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 hover:bg-blue-100 transition-colors"
                              >
                                <Edit3 size={14} />
                              </button>
                              <button
                                onClick={() => handleDelete(p.id)}
                                className="p-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    <Package size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="font-semibold">No products found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
