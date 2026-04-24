import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Star, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star
          key={i}
          size={12}
          className={i <= Math.round(rating) ? 'star-filled fill-yellow-400' : 'star-empty'}
        />
      ))}
    </div>
  );
}

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const [liked, setLiked] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addToCart(product);
    setTimeout(() => setAdding(false), 600);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const tagColors = {
    hot: 'from-red-500 to-orange-500',
    new: 'from-green-400 to-teal-500',
    sale: 'from-purple-500 to-pink-500',
    bestseller: 'from-yellow-400 to-orange-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="product-card group"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-52 bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-700 dark:to-gray-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Tag */}
        {product.tag && (
          <div className={`absolute top-3 left-3 bg-gradient-to-r ${tagColors[product.tag] || 'from-orange-500 to-pink-500'} text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-10 shadow-md`}>
            {product.badge}
          </div>
        )}

        {/* Discount badge */}
        {discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">
            -{discount}%
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(l => !l); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
          style={discount ? { top: '2.5rem' } : {}}
        >
          <Heart size={14} className={liked ? 'text-red-500 fill-red-500' : 'text-gray-500'} />
        </button>

        {/* Quick View & Add to Cart overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-white text-xs font-bold py-2 rounded-full flex items-center justify-center gap-1.5 hover:bg-white transition-colors shadow-md"
            onClick={e => e.stopPropagation()}
          >
            <Eye size={12} /> Quick View
          </Link>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold py-2 rounded-full flex items-center justify-center gap-1.5 shadow-md hover:opacity-90 transition-opacity"
          >
            {adding ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-sm"
              >✓</motion.span>
            ) : (
              <><ShoppingCart size={12} /> Add</>
            )}
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <Link to={`/product/${product.id}`} className="block p-4">
        <p className="text-xs font-semibold text-orange-500 uppercase tracking-wide mb-1 capitalize">{product.category}</p>
        <h3 className="font-bold text-gray-800 dark:text-white text-sm leading-tight mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-xl text-orange-500">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          {product.stock < 20 && (
            <span className="text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full">
              Only {product.stock} left!
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
