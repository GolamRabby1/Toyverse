import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Share2, Star, ChevronLeft, Plus, Minus, Check, Truck, Shield, RefreshCw, Package } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

function StarRating({ rating, reviews }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map(i => (
          <Star key={i} size={16} className={i <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
        ))}
      </div>
      <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{rating}</span>
      <span className="text-sm text-gray-400">({reviews} reviews)</span>
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === Number(id));
  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [adding, setAdding] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="font-display text-3xl text-gray-700 dark:text-white mb-4">Product not found</h2>
        <Link to="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const images = product.images || [product.image];

  const handleAdd = () => {
    setAdding(true);
    for (let i = 0; i < qty; i++) addToCart(product);
    setTimeout(() => setAdding(false), 1000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="min-h-screen bg-[#FFFBF7] dark:bg-gray-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm text-gray-500 mb-8"
        >
          <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-orange-500 transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-gray-800 dark:text-white font-semibold truncate max-w-[200px]">{product.name}</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImg}
                  src={images[selectedImg]}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              {discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{discount}%
                </div>
              )}
              {product.badge && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      selectedImg === i ? 'border-orange-500 scale-105 shadow-md' : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <p className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-2 capitalize">{product.category}</p>
            <h1 className="font-display text-3xl md:text-4xl text-gray-900 dark:text-white mb-4 leading-tight">{product.name}</h1>

            <StarRating rating={product.rating} reviews={product.reviews} />

            <div className="flex items-baseline gap-3 mt-5 mb-6">
              <span className="font-display text-4xl text-orange-500">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
              {discount && (
                <span className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-sm font-bold px-2 py-0.5 rounded-full">Save {discount}%</span>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{product.description}</p>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 dark:text-white text-sm uppercase tracking-wide mb-3">What's Included</h3>
              <ul className="grid grid-cols-1 gap-2">
                {product.features?.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Check size={15} className="text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stock indicator */}
            <div className="mb-5">
              {product.stock > 20 ? (
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-semibold">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  In Stock ({product.stock} available)
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400 font-semibold">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  Only {product.stock} left — hurry!
                </div>
              )}
            </div>

            {/* Quantity + Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm hover:bg-orange-50 transition-colors"
                >
                  <Minus size={15} />
                </button>
                <span className="w-10 text-center font-bold text-gray-800 dark:text-white">{qty}</span>
                <button
                  onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                  className="w-9 h-9 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm hover:bg-orange-50 transition-colors"
                >
                  <Plus size={15} />
                </button>
              </div>

              <motion.button
                onClick={handleAdd}
                whileTap={{ scale: 0.96 }}
                className="flex-1 min-w-[160px] bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-glow hover:opacity-90 transition-opacity"
              >
                {adding ? (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                    <Check size={18} /> Added!
                  </motion.span>
                ) : (
                  <><ShoppingCart size={18} /> Add to Cart</>
                )}
              </motion.button>

              <button
                onClick={() => setLiked(l => !l)}
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                  liked ? 'bg-red-500 border-red-500 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-500 hover:border-red-400 hover:text-red-400'
                }`}
              >
                <Heart size={18} className={liked ? 'fill-white' : ''} />
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-5 border-t border-gray-100 dark:border-gray-800">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Over $50' },
                { icon: Shield, label: 'Safe & Certified', sub: 'Quality tested' },
                { icon: RefreshCw, label: '30-Day Returns', sub: 'Hassle-free' },
                { icon: Package, label: 'Gift Wrapping', sub: 'Available' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <item.icon size={14} className="text-orange-500 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-gray-700 dark:text-gray-300">{item.label}</p>
                    <p>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="section-title text-3xl">You Might Also Like</h2>
              <Link to="/shop" className="text-orange-500 font-bold text-sm hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
