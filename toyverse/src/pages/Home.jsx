import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Truck, Shield, RefreshCw, Headphones, ChevronRight, Sparkles, Zap, Award } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories, testimonials } from '../data/products';

const floatingEmojis = ['🧸', '🚀', '🎨', '🦕', '🤖', '🏰', '🎯', '⭐', '🌈', '🎪'];

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-orange-950 via-purple-950 to-pink-950">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/20 blob filter blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-500/20 blob filter blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/15 blob filter blur-3xl"
        />
      </div>

      {/* Floating emoji particles */}
      {floatingEmojis.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl select-none pointer-events-none hidden md:block"
          style={{
            left: `${8 + (i * 9.5) % 90}%`,
            top: `${10 + (i * 17) % 75}%`,
          }}
          animate={{
            y: [0, -25, 0],
            rotate: [-5, 5, -5],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Dot grid overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles size={14} className="text-yellow-400 animate-spin-slow" />
              <span className="text-white/90 text-sm font-semibold">New arrivals every week ✨</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-none mb-6"
            >
              Where<br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                Play
              </span>{' '}
              Comes<br />
              <span className="text-orange-400">Alive!</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-white/70 text-lg leading-relaxed mb-8 max-w-md"
            >
              Discover thousands of premium toys that spark creativity, fuel imagination, and create memories that last a lifetime.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/shop"
                className="group bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold px-8 py-4 rounded-full shadow-glow flex items-center gap-2 hover:scale-105 transition-transform duration-300"
              >
                <Zap size={18} className="animate-wiggle" />
                Shop Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="btn-ghost flex items-center gap-2"
              >
                Our Story
                <ChevronRight size={18} />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex gap-8 mt-10"
            >
              {[
                { num: '10K+', label: 'Happy Kids' },
                { num: '500+', label: 'Products' },
                { num: '4.9★', label: 'Rating' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="font-display text-2xl text-white">{stat.num}</div>
                  <div className="text-white/50 text-xs font-semibold">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
            className="hidden lg:flex justify-center items-center relative"
          >
            <div className="relative w-[480px] h-[480px]">
              {/* Spinning ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-orange-500/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-8 rounded-full border-2 border-dashed border-pink-500/30"
              />

              {/* Center blob image */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-12 rounded-full overflow-hidden shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #e91e8c 100%)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&h=500&fit=crop"
                  alt="Featured toy"
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-9xl">🧸</span>
                </div>
              </motion.div>

              {/* Floating orbit items */}
              {[
                { emoji: '🚀', angle: 0, r: 200 },
                { emoji: '🦕', angle: 72, r: 200 },
                { emoji: '🎨', angle: 144, r: 200 },
                { emoji: '🤖', angle: 216, r: 200 },
                { emoji: '🏰', angle: 288, r: 200 },
              ].map(({ emoji, angle, r }, i) => {
                const rad = (angle * Math.PI) / 180;
                return (
                  <motion.div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: `calc(50% + ${r * Math.cos(rad)}px - 24px)`,
                      top: `calc(50% + ${r * Math.sin(rad)}px - 24px)`,
                    }}
                    animate={{ y: [-5, 5, -5], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                  >
                    {emoji}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 48V80H0V40Z" fill="#FFFBF7" className="dark:fill-gray-950" />
        </svg>
      </div>
    </section>
  );
}

function CategoryBar() {
  const [active, setActive] = useState('all');

  return (
    <section className="py-10 bg-[#FFFBF7] dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActive(cat.id)}
              className={`snap-start flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                active === cat.id
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-glow'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-orange-300'
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.name}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const featured = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-16 bg-[#FFFBF7] dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-2">⭐ Top Picks</p>
            <h2 className="section-title">Best Sellers</h2>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center gap-2 text-orange-500 font-bold hover:gap-3 transition-all duration-200">
            View All <ArrowRight size={18} />
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function PromoSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Hot Deals banner */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 p-8 text-white"
          >
            <div className="absolute -top-8 -right-8 text-9xl opacity-20 animate-float">🔥</div>
            <div className="absolute bottom-0 right-0 text-8xl opacity-30">🛍️</div>
            <p className="text-orange-200 font-bold uppercase tracking-widest text-xs mb-2">Limited Time</p>
            <h3 className="font-display text-4xl mb-2">Hot Deals!</h3>
            <p className="text-orange-100 mb-6 text-sm">Up to 40% off on selected toys. Don't miss out!</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-6 py-2.5 rounded-full hover:bg-orange-50 transition-colors">
              Grab Deal <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* New arrivals banner */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 p-8 text-white"
          >
            <div className="absolute -top-8 -right-8 text-9xl opacity-20 animate-float-slow">✨</div>
            <div className="absolute bottom-0 right-0 text-8xl opacity-30">🚀</div>
            <p className="text-purple-200 font-bold uppercase tracking-widest text-xs mb-2">Just Arrived</p>
            <h3 className="font-display text-4xl mb-2">New Toys!</h3>
            <p className="text-purple-100 mb-6 text-sm">Fresh toys every week — be the first to discover!</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-purple-600 font-bold px-6 py-2.5 rounded-full hover:bg-purple-50 transition-colors">
              Explore <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function NewArrivals() {
  const newItems = products.filter(p => p.isNew).slice(0, 4);
  return (
    <section className="py-16 bg-[#FFFBF7] dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="text-purple-500 font-bold uppercase tracking-widest text-sm mb-2">✨ Just In</p>
            <h2 className="section-title">New Arrivals</h2>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center gap-2 text-orange-500 font-bold hover:gap-3 transition-all duration-200">
            View All <ArrowRight size={18} />
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newItems.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: Truck, title: 'Free Shipping', desc: 'On all orders over $50', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { icon: Shield, title: 'Safe & Certified', desc: 'All toys pass safety tests', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
    { icon: RefreshCw, title: 'Easy Returns', desc: '30-day hassle-free returns', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { icon: Headphones, title: '24/7 Support', desc: 'Always here to help you', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-card transition-shadow duration-300"
            >
              <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-4`}>
                <item.icon size={26} className={item.color} />
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white text-sm mb-1">{item.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-pink-500 font-bold uppercase tracking-widest text-sm mb-2">💬 Happy Families</p>
          <h2 className="section-title">What Parents Say</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full border-2 border-orange-200" />
                <div>
                  <p className="font-bold text-gray-800 dark:text-white text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setSubmitted(true); }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />
      <div className="absolute top-0 left-0 text-[200px] opacity-5 leading-none pointer-events-none">🎉</div>
      <div className="absolute bottom-0 right-0 text-[200px] opacity-5 leading-none pointer-events-none">🧸</div>

      <div className="relative max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-white/80 font-bold uppercase tracking-widest text-sm mb-3">📬 Stay Updated</p>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">Get 15% Off Your First Order!</h2>
          <p className="text-white/70 mb-8">Join 50,000+ happy parents who get exclusive deals, new arrivals, and parenting tips.</p>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white"
            >
              <div className="text-4xl mb-2">🎉</div>
              <p className="font-bold text-xl">You're in! Check your inbox for your 15% discount code.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-5 py-3.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:bg-white/30 focus:border-white transition-all font-medium"
                required
              />
              <button
                type="submit"
                className="bg-white text-orange-600 font-bold px-7 py-3.5 rounded-full hover:bg-orange-50 transition-colors shadow-lg hover:shadow-xl whitespace-nowrap"
              >
                Subscribe 🎁
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CategoryBar />
      <Features />
      <FeaturedProducts />
      <PromoSection />
      <NewArrivals />
      <Testimonials />
      <NewsletterBanner />
    </div>
  );
}
