import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft, Clock, Zap, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { img4 } from '../images';

export default function WhyChooseUs() {
  const { t, dir } = useLanguage();

  const stats = [
    { value: t.whyChooseUs.s1_val, label: t.whyChooseUs.s1_label, color: "text-[#7E6FFF]" },
    { value: t.whyChooseUs.s2_val, label: t.whyChooseUs.s2_label, color: "text-emerald-600" },
    { value: t.whyChooseUs.s3_val, label: t.whyChooseUs.s3_label, color: "text-[#FF4081]" },
    { value: t.whyChooseUs.s4_val, label: t.whyChooseUs.s4_label, color: "text-sky-600" },
  ];

  return (
    <section className="relative w-full py-24 border-t border-indigo-100/40 bg-slate-50/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Copy and Metrics */}
        <div className="text-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-[#7E6FFF] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.whyChooseUs.badge}</span>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold heading-display mb-6 leading-tight text-slate-900 tracking-tight"
          >
            {t.whyChooseUs.titleLine1} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7E6FFF] via-[#5A47FF] to-[#0ea5e9]">
              {t.whyChooseUs.titleLine2}
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-slate-600 mb-10 leading-relaxed font-sans"
          >
            {t.whyChooseUs.desc}
          </motion.p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 mb-10">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="p-4 bg-white rounded-2xl border border-indigo-100/70 shadow-xs"
              >
                <div className={`text-3xl sm:text-4xl font-extrabold heading-display mb-1 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <a 
            href="#demo"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7E6FFF] text-white text-xs font-bold shadow-md hover:bg-[#5A47FF] transition-all hover:gap-3"
          >
            <span>جرب الفارق السريري الآن</span>
            {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </a>
        </div>

        {/* Right Side: Comparison Cards & Collaboration Image */}
        <div className="relative flex flex-col gap-6">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#7E6FFF]/15 to-[#FF4081]/15 rounded-full blur-[120px] pointer-events-none" />
          
          {/* Clinical Team Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-64 rounded-3xl overflow-hidden border border-indigo-100 shadow-xl"
          >
            <img 
              src={img4} 
              alt="Medical Team Collaboration" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 start-6 text-start z-10">
              <span className="px-2.5 py-0.5 bg-[#7E6FFF]/30 border border-[#7E6FFF]/40 rounded-md text-[11px] font-mono font-bold text-[#A399FF]">
                AI-Assisted Precision
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white mt-1">
                التركيز على رعاية المريض بدلاً من شاشة الكمبيوتر
              </h4>
            </div>
          </motion.div>

          {/* Side-by-Side Comparison */}
          <div className="relative space-y-3.5 text-start">
            {/* Traditional EMR */}
            <motion.div 
              initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-5 rounded-2xl border border-red-200 bg-red-50/20"
            >
              <div className="flex items-center gap-2 text-xs text-red-600 font-bold mb-1.5 uppercase">
                <XCircle className="w-4 h-4" />
                <span>{t.whyChooseUs.tradEMR}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{t.whyChooseUs.tradEMRDesc}</p>
            </motion.div>

            {/* Nabd AI Flow */}
            <motion.div 
              initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="glass-card-active p-6 rounded-2xl border-2 border-[#7E6FFF] shadow-xl relative"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs text-[#7E6FFF] font-bold uppercase">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>{t.whyChooseUs.nexusFlow}</span>
                </div>
                <span className="px-2 py-0.5 bg-[#7E6FFF] text-white rounded text-[10px] font-bold font-mono">
                  0 ACTIVE MINUTES
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                {t.whyChooseUs.nexusFlowDesc}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
