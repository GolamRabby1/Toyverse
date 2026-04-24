import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown, Grid3X3, List, ShoppingCart, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { GridSkeleton } from '../components/Loader';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { categories } from '../data/products';

function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search toys by name, category..."
        className="input-field pl-11 pr-4"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

function SortSelect({ value, onChange }) {
  const options = [
    { value: 'default', label: 'Sort: Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'newest', label: 'Newest First' },
  ];
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="input-field pr-10 appearance-none cursor-pointer bg-white dark:bg-gray-800"
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}

function FilterSidebar({ category, setCategory, priceRange, setPriceRange, sort, setSort, onClose }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-gray-800 dark:text-white text-sm uppercase tracking-wider mb-3">Category</h3>
        <div className="space-y-1.5">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setCategory(cat.id); onClose?.(); }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                category === cat.id
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-800'
              }`}
            >
              <span>{cat.emoji}</span> {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-gray-800 dark:text-white text-sm uppercase tracking-wider mb-3">
          Price Range: ${priceRange[0]} – ${priceRange[1]}
        </h3>
        <input
          type="range"
          min={0}
          max={200}
          step={5}
          value={priceRange[1]}
          onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-orange-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>$0</span>
          <span>$200</span>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-gray-800 dark:text-white text-sm uppercase tracking-wider mb-3">Sort By</h3>
        <SortSelect value={sort} onChange={setSort} />
      </div>

      <button
        onClick={() => { setCategory('all'); setPriceRange([0, 200]); setSort('default'); }}
        className="w-full text-center text-sm text-orange-500 font-bold py-2 border-2 border-orange-200 dark:border-orange-900 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
}

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [gridView, setGridView] = useState(true);

  const { products, search, setSearch, category, setCategory, sort, setSort, priceRange, setPriceRange, total } = useProducts();
  const { addToCart } = useCart();

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) setCategory(cat);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBF7] dark:bg-gray-950 pt-20">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '25px 25px' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl text-white mb-2"
          >
            🧸 Toy Shop
          </motion.h1>
          <p className="text-white/80 font-semibold">Discover {total} amazing toys for every child</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Controls Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <div className="flex gap-3">
            <div className="hidden sm:block w-48">
              <SortSelect value={sort} onChange={setSort} />
            </div>
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-200"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
            <div className="hidden sm:flex gap-1 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-1">
              <button
                onClick={() => setGridView(true)}
                className={`p-2 rounded-lg transition-colors ${gridView ? 'bg-orange-500 text-white' : 'text-gray-500 hover:text-orange-500'}`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setGridView(false)}
                className={`p-2 rounded-lg transition-colors ${!gridView ? 'bg-orange-500 text-white' : 'text-gray-500 hover:text-orange-500'}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                category === cat.id
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-orange-300'
              }`}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>

        <div className="flex gap-8">
          {/* Sidebar (Desktop) */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card">
              <h2 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-orange-500" /> Filters
              </h2>
              <FilterSidebar
                category={category} setCategory={setCategory}
                priceRange={priceRange} setPriceRange={setPriceRange}
                sort={sort} setSort={setSort}
              />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                {loading ? '...' : `${total} product${total !== 1 ? 's' : ''} found`}
              </p>
            </div>

            {loading ? (
              <GridSkeleton count={8} />
            ) : products.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-display text-2xl text-gray-700 dark:text-gray-200 mb-2">No toys found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={() => { setSearch(''); setCategory('all'); }}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${category}-${search}-${gridView}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={gridView
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'flex flex-col gap-4'
                  }
                >
                  {gridView
                    ? products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)
                    : products.map((p, i) => (
                        <motion.div
                          key={p.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className="flex bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group"
                        >
                          <div className="w-36 h-36 flex-shrink-0 overflow-hidden">
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="flex-1 p-4 flex flex-col justify-between">
                            <div>
                              <p className="text-xs font-bold text-orange-500 uppercase mb-1 capitalize">{p.category}</p>
                              <h3 className="font-bold text-gray-800 dark:text-white text-sm mb-1">{p.name}</h3>
                              <p className="text-xs text-gray-400 line-clamp-2">{p.description}</p>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-display text-xl text-orange-500">${p.price}</span>
                              <button
                                onClick={() => addToCart(p)}
                                className="text-sm bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-1.5 rounded-full font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5"
                              >
                                <ShoppingCart size={13} /> Add to Cart
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))
                  }
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 z-50 overflow-y-auto p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg">Filters</h2>
                <button onClick={() => setMobileFilterOpen(false)}><X size={20} /></button>
              </div>
              <FilterSidebar
                category={category} setCategory={setCategory}
                priceRange={priceRange} setPriceRange={setPriceRange}
                sort={sort} setSort={setSort}
                onClose={() => setMobileFilterOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
