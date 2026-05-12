import { motion } from 'motion/react';
import { Users, Calendar, Activity, Pill, CreditCard, BarChart3 } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Features() {
  const { t, dir } = useLanguage();
  
  const features = [
    { icon: Users, title: t.features.f1_title, desc: t.features.f1_desc, colSpan: "md:col-span-2" },
    { icon: Calendar, title: t.features.f2_title, desc: t.features.f2_desc, colSpan: "md:col-span-1" },
    { icon: Activity, title: t.features.f3_title, desc: t.features.f3_desc, colSpan: "md:col-span-1" },
    { icon: Pill, title: t.features.f4_title, desc: t.features.f4_desc, colSpan: "md:col-span-2" },
    { icon: CreditCard, title: t.features.f5_title, desc: t.features.f5_desc, colSpan: "md:col-span-2" },
    { icon: BarChart3, title: t.features.f6_title, desc: t.features.f6_desc, colSpan: "md:col-span-1" }
  ];

  return (
    <section id="features" className="relative w-full max-w-7xl mx-auto py-16 px-6 xl:px-0">
      <div className="absolute top-0 end-0 w-[500px] h-[500px] bg-[var(--color-secondary)]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold heading-display mb-6">{t.features.title}</h2>
        <p className="text-xl text-white/50 max-w-2xl mx-auto">{t.features.desc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`glass-card rounded-3xl p-8 group hover:-translate-y-2 transition-all duration-300 ${feat.colSpan} relative overflow-hidden`}
          >
            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary)]/20 group-hover:border-[var(--color-primary)]/30 transition-colors duration-300 relative z-10">
              <feat.icon className="w-7 h-7 text-white/70 group-hover:text-[var(--color-primary)] transition-colors" />
            </div>
            
            <h3 className="text-2xl font-semibold mb-3 relative z-10">{feat.title}</h3>
            <p className="text-white/50 relative z-10">{feat.desc}</p>

            <div className="absolute bottom-4 end-4 opacity-0 rtl:translate-x-4 ltr:-translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
               <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={dir === 'rtl' ? 'rotate-180' : ''}><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
