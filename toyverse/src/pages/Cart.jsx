import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm"
    >
      <Link to={`/product/${item.id}`} className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-xl hover:opacity-90 transition-opacity"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div>
            <p className="text-xs font-bold text-orange-500 uppercase tracking-wide capitalize mb-0.5">{item.category}</p>
            <Link to={`/product/${item.id}`}>
              <h3 className="font-bold text-gray-800 dark:text-white text-sm hover:text-orange-500 transition-colors line-clamp-2">{item.name}</h3>
            </Link>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex-shrink-0"
          >
            <Trash2 size={15} />
          </button>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-full p-0.5">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-orange-50 shadow-sm transition-colors"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center text-sm font-bold text-gray-800 dark:text-white">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-orange-50 shadow-sm transition-colors"
            >
              <Plus size={12} />
            </button>
          </div>
          <div className="text-right">
            <p className="font-display text-lg text-orange-500">${(item.price * item.quantity).toFixed(2)}</p>
            <p className="text-xs text-gray-400">${item.price.toFixed(2)} each</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Cart() {
  const { items, subtotal, clearCart, itemCount } = useCart();
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    toast.success('🎉 Order placed! (Demo only)', {
      duration: 4000,
      style: { background: '#1a1a2e', color: '#fff', border: '1px solid #f97316' },
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFBF7] dark:bg-gray-950 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="font-display text-4xl text-gray-900 dark:text-white">
              🛒 My Cart
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 font-semibold">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Link
            to="/shop"
            className="flex items-center gap-2 text-orange-500 font-bold text-sm hover:gap-3 transition-all duration-200"
          >
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              🛒
            </motion.div>
            <h2 className="font-display text-3xl text-gray-700 dark:text-white mb-3">Your cart is empty!</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any toys yet.</p>
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
              <ShoppingBag size={18} /> Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Products</p>
                <button
                  onClick={clearCart}
                  className="text-sm text-red-400 hover:text-red-500 font-semibold flex items-center gap-1"
                >
                  <Trash2 size={14} /> Clear All
                </button>
              </div>
              <AnimatePresence>
                {items.map(item => <CartItem key={item.id} item={item} />)}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card sticky top-24">
                <h2 className="font-bold text-lg text-gray-800 dark:text-white mb-5 flex items-center gap-2">
                  <Tag size={18} className="text-orange-500" /> Order Summary
                </h2>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal ({itemCount} items)</span>
                    <span className="font-bold text-gray-800 dark:text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className={`font-bold ${shipping === 0 ? 'text-green-500' : 'text-gray-800 dark:text-white'}`}>
                      {shipping === 0 ? 'FREE 🎉' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax (8%)</span>
                    <span className="font-bold text-gray-800 dark:text-white">${tax.toFixed(2)}</span>
                  </div>
                  {shipping > 0 && (
                    <div className="text-xs text-orange-500 font-semibold bg-orange-50 dark:bg-orange-900/20 p-2 rounded-lg">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping! 🚚
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-800 dark:text-white">Total</span>
                    <span className="font-display text-2xl text-orange-500">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="flex gap-2 mb-5">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 input-field text-sm py-2.5"
                  />
                  <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    Apply
                  </button>
                </div>

                <motion.button
                  onClick={handleCheckout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 shadow-glow hover:opacity-90 transition-opacity text-base"
                >
                  Checkout <ArrowRight size={18} />
                </motion.button>

                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">🔒 Secure</span>
                  <span className="flex items-center gap-1">💳 All cards</span>
                  <span className="flex items-center gap-1">📦 Fast delivery</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
