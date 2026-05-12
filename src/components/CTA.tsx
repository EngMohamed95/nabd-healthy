import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function CTA() {
  const { t, dir } = useLanguage();

  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Massive Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-secondary)]/10 to-[var(--color-primary)]/20" />
      <div className="absolute bottom-[-20%] start-1/2 -translate-x-1/2 rtl:translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-primary)]/40 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold heading-display mb-8"
        >
          {t.cta.title}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/70 mb-12"
        >
          {t.cta.desc}
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="flex items-center gap-2 px-10 py-5 bg-white text-black rounded-full text-lg font-semibold hover:bg-gray-100 transition-all shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)] hover:scale-105">
            {t.cta.startFreeTrial} {dir === 'rtl' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
          </button>
          <button className="px-10 py-5 bg-black text-white rounded-full text-lg font-medium border border-white/20 hover:bg-white/10 transition-all">
            {t.cta.talkToSales}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
