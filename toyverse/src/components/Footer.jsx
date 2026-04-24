import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';

const social = [
  { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-500' },
  { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-sky-400' },
  { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-500' },
  { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-500' },
];

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

const categories = [
  { to: '/shop?cat=action', label: 'Action Figures' },
  { to: '/shop?cat=building', label: 'Building Sets' },
  { to: '/shop?cat=educational', label: 'Educational' },
  { to: '/shop?cat=outdoor', label: 'Outdoor Toys' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500" />

      {/* Background blobs */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-10 right-10 w-48 h-48 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-xl">🧸</span>
              </div>
              <span className="font-display text-2xl text-white">Toy<span className="text-orange-500">Verse</span></span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Where every toy tells a story and every child's imagination takes flight. Premium toys for curious minds since 2019.
            </p>
            <div className="flex gap-3">
              {social.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className={`w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 ${color} transition-colors duration-200`}
                  aria-label={label}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white text-base mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50 group-hover:bg-orange-500 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-white text-base mb-4 uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2.5">
              {categories.map(cat => (
                <li key={cat.to}>
                  <Link
                    to={cat.to}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500/50 group-hover:bg-pink-500 transition-colors" />
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white text-base mb-4 uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={16} className="text-orange-400 mt-0.5 shrink-0" />
                <span>42 Play Street, Toy Town<br />Dhaka 1205, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size={16} className="text-orange-400 shrink-0" />
                <a href="tel:+8801234567890" className="hover:text-orange-400 transition-colors">+880 123 456 7890</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={16} className="text-orange-400 shrink-0" />
                <a href="mailto:hello@toyverse.com" className="hover:text-orange-400 transition-colors">hello@toyverse.com</a>
              </li>
            </ul>
            {/* Newsletter mini */}
            <div className="mt-5">
              <p className="text-xs font-bold text-white uppercase tracking-wider mb-2">Newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-gray-800 border border-gray-700 text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                />
                <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm px-3 py-2 rounded-lg hover:opacity-90 transition-opacity font-bold">
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-500">
            © 2026 ToyVerse. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500 fill-red-500 mx-1 animate-pulse" /> for children everywhere by Golam Rabby
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link to="#" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-gray-300 transition-colors">Terms</Link>
            <Link to="#" className="hover:text-gray-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
