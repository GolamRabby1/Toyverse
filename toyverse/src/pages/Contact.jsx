import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Loader2, Check } from 'lucide-react';

const faqs = [
  { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available at checkout.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return policy. If you\'re not satisfied, we\'ll make it right.' },
  { q: 'Are all toys safety certified?', a: 'Yes! Every toy in our store is tested and certified to meet international safety standards.' },
  { q: 'Do you offer gift wrapping?', a: 'Absolutely! Gift wrapping is available for $2.99. Just select the option at checkout.' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  const contactInfo = [
    { icon: MapPin, label: 'Address', value: '42 Play Street, Toy Town, Dhaka 1205', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
    { icon: Phone, label: 'Phone', value: '+880 123 456 7890', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
    { icon: Mail, label: 'Email', value: 'hello@toyverse.com', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { icon: Clock, label: 'Hours', value: 'Mon–Sat, 9AM – 6PM', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF7] dark:bg-gray-950 pt-16">
      {/* Header */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '25px 25px' }} />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-5xl md:text-6xl text-white mb-4">💬 Get In Touch</h1>
            <p className="text-white/80 text-lg max-w-lg mx-auto">Have a question? We'd love to hear from you. Our friendly team is always here to help.</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0 30C360 60 720 0 1080 30C1260 45 1380 38 1440 36V60H0V30Z" fill="#FFFBF7" className="dark:fill-gray-950" /></svg>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left: Info + FAQ */}
          <div className="space-y-6">
            <div>
              <h2 className="font-bold text-xl text-gray-800 dark:text-white mb-4">Contact Information</h2>
              {contactInfo.map(({ icon: Icon, label, value, color, bg }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 mb-4 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
                >
                  <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} className={color} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* FAQs */}
            <div>
              <h2 className="font-bold text-xl text-gray-800 dark:text-white mb-4">Quick FAQs</h2>
              {faqs.map((faq, i) => (
                <div key={i} className="mb-2 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left px-4 py-3 flex items-center justify-between text-sm font-bold text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    {faq.q}
                    <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} className="text-orange-500 ml-2 flex-shrink-0">▼</motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <MessageCircle size={18} className="text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-xl text-gray-800 dark:text-white">Send Us a Message</h2>
                  <p className="text-sm text-gray-400">We'll get back to you within 24 hours</p>
                </div>
              </div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1 }}
                    className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Check size={36} className="text-green-500" />
                  </motion.div>
                  <h3 className="font-display text-2xl text-gray-800 dark:text-white mb-2">Message Sent! 🎉</h3>
                  <p className="text-gray-500 mb-6">Thanks for reaching out! We'll reply within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="btn-primary">Send Another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Full Name *</label>
                      <input
                        required
                        value={form.name}
                        onChange={e => update('name', e.target.value)}
                        placeholder="John Smith"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => update('email', e.target.value)}
                        placeholder="you@example.com"
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Subject *</label>
                    <select value={form.subject} onChange={e => update('subject', e.target.value)} required className="input-field">
                      <option value="">Select a topic</option>
                      <option>Order Inquiry</option>
                      <option>Return / Refund</option>
                      <option>Product Question</option>
                      <option>Shipping Issue</option>
                      <option>General Feedback</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Message *</label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={e => update('message', e.target.value)}
                      placeholder="Tell us how we can help..."
                      className="input-field resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 shadow-glow hover:opacity-90 transition-opacity disabled:opacity-70"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    {loading ? 'Sending...' : 'Send Message 🚀'}
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
