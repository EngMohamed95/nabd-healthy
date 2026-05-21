import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { img4 } from '../images';

export default function WhyChooseUs() {
  const { t, dir } = useLanguage();

  const stats = [
    { value: t.whyChooseUs.s1_val, label: t.whyChooseUs.s1_label },
    { value: t.whyChooseUs.s2_val, label: t.whyChooseUs.s2_label },
    { value: t.whyChooseUs.s3_val, label: t.whyChooseUs.s3_label },
    { value: t.whyChooseUs.s4_val, label: t.whyChooseUs.s4_label },
  ];

  return (
    <section className="relative w-full py-20 border-t border-blue-100/40 bg-slate-100/30">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold heading-display mb-8 leading-tight text-slate-900"
          >
            {t.whyChooseUs.titleLine1} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">{t.whyChooseUs.titleLine2}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-650 mb-10 leading-relaxed"
          >
            {t.whyChooseUs.desc}
          </motion.p>

          <div className="grid grid-cols-2 gap-8 mb-10">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div className="text-4xl font-bold font-mono text-slate-900 mb-2" dir="ltr" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>{stat.value}</div>
                <div className="text-sm font-medium text-[var(--color-primary)] uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.button 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="flex items-center gap-2 text-slate-800 hover:text-[var(--color-primary)] transition-colors group font-medium"
          >
             {t.whyChooseUs.readStudy} 
             {dir === 'rtl' ? <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </motion.button>
        </div>

        <div className="relative flex flex-col gap-6">
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 rounded-full blur-[100px] pointer-events-none" />
          
          {/* Clinical Team Collaboration Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-64 rounded-3xl overflow-hidden border border-blue-100/30 shadow-2xl"
          >
            <img 
              src={img4} 
              alt="Medical Team Collaboration" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 start-6 text-start z-10">
              <span className="px-2.5 py-0.5 bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/30 rounded text-xs font-mono text-[var(--color-primary)]">Collaboration</span>
              <h4 className="text-lg font-bold text-white mt-1">Focusing on the Patient, Not the Screen</h4>
            </div>
          </motion.div>

          <div className="relative space-y-4">
             {/* Comparison Cards */}
             <motion.div 
               initial={{ opacity: 0, x: dir === 'rtl' ? -30 : 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="glass-card p-6 rounded-2xl border border-red-200 bg-red-50/10 opacity-60 grayscale"
             >
               <div className="text-sm text-red-550 font-semibold mb-2 uppercase tracking-wide">{t.whyChooseUs.tradEMR}</div>
               <p className="text-slate-600">{t.whyChooseUs.tradEMRDesc}</p>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, x: dir === 'rtl' ? -30 : 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="glass-card p-8 rounded-2xl border border-[var(--color-primary)]/30 scale-105 shadow-[0_8px_32px_rgba(37,99,235,0.06)] relative z-10"
             >
               <div className="absolute top-0 end-0 p-4">
                 <span className="flex h-3 w-3">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-primary)]"></span>
                 </span>
               </div>
               <div className="text-sm text-[var(--color-primary)] font-semibold mb-2 uppercase tracking-wide">{t.whyChooseUs.nexusFlow}</div>
               <p className="text-slate-800 text-lg font-medium">{t.whyChooseUs.nexusFlowDesc}</p>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
