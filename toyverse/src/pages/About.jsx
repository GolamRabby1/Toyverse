import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Award, Users, Globe, Sparkles, ArrowRight } from 'lucide-react';

const team = [
  { name: 'Emma Chen', role: 'Founder & CEO', emoji: '👩‍💼', desc: 'Toy enthusiast and mom of 2, on a mission to make play magical.', avatar: 'https://i.pravatar.cc/200?img=47' },
  { name: 'Marcus Lee', role: 'Head of Curation', emoji: '🎨', desc: 'Former toy designer with 15 years of bringing joy to children worldwide.', avatar: 'https://i.pravatar.cc/200?img=11' },
  { name: 'Sofia Patel', role: 'Safety Director', emoji: '🛡️', desc: 'Child safety expert ensuring every toy meets the highest standards.', avatar: 'https://i.pravatar.cc/200?img=45' },
  { name: 'Jake Kim', role: 'Tech Lead', emoji: '💻', desc: 'Building the smoothest toy shopping experience on the internet.', avatar: 'https://i.pravatar.cc/200?img=25' },
];

const values = [
  { icon: Heart, title: 'Safety First', desc: 'Every toy in our store passes rigorous safety testing. Your child\'s wellbeing is our top priority.', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
  { icon: Award, title: 'Quality Guaranteed', desc: 'We only stock toys from trusted brands with proven track records of excellence and durability.', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
  { icon: Users, title: 'Family Focused', desc: 'Every decision we make starts with one question: will this benefit families and children?', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { icon: Globe, title: 'Sustainable Play', desc: 'We prioritize eco-friendly toys and packaging to protect the world our children will inherit.', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
];

const milestones = [
  { year: '2019', event: 'ToyVerse founded in a small Dhaka apartment' },
  { year: '2020', event: 'Reached 1,000 happy families in our first year' },
  { year: '2021', event: 'Expanded to 500+ products across 8 categories' },
  { year: '2022', event: 'Won "Best Kids Store" award three years running' },
  { year: '2023', event: '10,000 customers and growing every day' },
  { year: '2024', event: 'Launched ToyVerse 2.0 with a brand new experience' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#FFFBF7] dark:bg-gray-950 pt-16">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="absolute top-10 left-10 text-8xl opacity-10 animate-float">🧸</div>
        <div className="absolute bottom-10 right-10 text-8xl opacity-10 animate-float-slow">🌈</div>
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
              <Sparkles size={14} className="text-yellow-300" />
              <span className="text-white/90 text-sm font-semibold">Our Story</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl text-white mb-6">About ToyVerse</h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              We're on a mission to make childhood magical — one toy at a time. Since 2019, we've been curating the finest toys to spark curiosity, creativity, and pure joy in children everywhere.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0 30C360 60 720 0 1080 30C1260 45 1380 38 1440 36V60H0V30Z" fill="#FFFBF7" className="dark:fill-gray-950" /></svg>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-2">💡 Our Mission</p>
              <h2 className="section-title text-3xl md:text-4xl mb-5">We believe every child deserves the best play experience</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                ToyVerse was born from a simple belief: that the right toy at the right moment can change a child's life. We've spent years building relationships with the world's best toy makers, testing thousands of products, and listening to parents and educators to curate a collection that truly delights.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Every toy on our platform has been hand-selected for safety, quality, educational value, and — most importantly — the pure joy it brings to children.
              </p>
              <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
                Shop Our Collection <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
              {[
                { num: '10K+', label: 'Happy Families', emoji: '👨‍👩‍👧‍👦' },
                { num: '500+', label: 'Curated Toys', emoji: '🧸' },
                { num: '4.9★', label: 'Avg Rating', emoji: '⭐' },
                { num: '99%', label: 'Satisfaction', emoji: '😊' },
              ].map(s => (
                <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl p-5 text-center shadow-card">
                  <div className="text-3xl mb-1">{s.emoji}</div>
                  <div className="font-display text-2xl text-orange-500">{s.num}</div>
                  <div className="text-xs text-gray-500 font-semibold">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-pink-500 font-bold uppercase tracking-widest text-sm mb-2">🌟 What We Stand For</p>
            <h2 className="section-title">Our Core Values</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-card transition-shadow text-center">
                <div className={`w-14 h-14 ${v.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <v.icon size={26} className={v.color} />
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-purple-500 font-bold uppercase tracking-widest text-sm mb-2">📅 Our Journey</p>
            <h2 className="section-title">How We Got Here</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 to-pink-500" />
            {milestones.map((m, i) => (
              <motion.div key={m.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative flex gap-6 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-glow z-10">
                  <span className="text-white font-display text-sm">{m.year}</span>
                </div>
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-card">
                  <p className="text-gray-700 dark:text-gray-200 font-semibold">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-2">👥 The People Behind ToyVerse</p>
            <h2 className="section-title">Meet Our Team</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-card hover:shadow-card-hover transition-shadow group">
                <div className="relative inline-block mb-4">
                  <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-2xl object-cover mx-auto border-4 border-orange-100 dark:border-orange-900/30 group-hover:border-orange-400 transition-colors" />
                  <div className="absolute -bottom-2 -right-2 text-xl">{member.emoji}</div>
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-0.5">{member.name}</h3>
                <p className="text-orange-500 font-semibold text-xs mb-3">{member.role}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '25px 25px' }} />
        <div className="max-w-2xl mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">Ready to find the perfect toy?</h2>
            <p className="text-white/80 mb-8">Join 10,000+ happy families who trust ToyVerse for the best in play.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-4 rounded-full shadow-xl hover:bg-orange-50 transition-colors">
              Start Shopping <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
