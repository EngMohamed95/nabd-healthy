import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Play, Sparkles, ShieldCheck, Clock, Zap } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Hero() {
  const { t, dir, language } = useLanguage();
  
  return (
    <section className="relative w-full max-w-7xl mx-auto pt-32 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center overflow-x-hidden">
      {/* Soft Center Radial Glow */}
      <div className="absolute top-1/4 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 w-[700px] h-[500px] bg-[#4E60A2]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center text-center">
        {/* Top Live Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#D5DAE8]/70 shadow-xs mb-8 backdrop-blur-md"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#4E60A2] animate-pulse" />
          <span className="text-xs font-bold text-slate-800 tracking-wide">{t.hero.badge}</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#4E60A2]/10 text-[#4E60A2]">NEW</span>
        </motion.div>

        {/* Main Hero Headings */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold heading-display max-w-5xl leading-[1.15] text-slate-900 tracking-tight"
        >
          {t.hero.title1} <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E285A] via-[#4E60A2] to-[#849CC6]">
            {t.hero.title2}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="max-w-3xl mt-6 text-base sm:text-xl text-slate-650 leading-relaxed font-normal"
        >
          {t.hero.desc}
        </motion.p>

        {/* Call to Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto"
        >
          <a 
            href="#demo"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#4E60A2] to-[#1E285A] hover:from-[#5E70B2] hover:to-[#283264] text-white rounded-2xl font-bold text-sm shadow-xl shadow-[#4E60A2]/25 hover:shadow-[#4E60A2]/40 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.hero.startFreeTrial}</span>
            {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </a>
          <a 
            href="#requisition"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 bg-white/90 text-slate-800 rounded-2xl font-bold text-sm border border-slate-200 hover:bg-slate-50 hover:border-[#4E60A2]/30 transition-all shadow-2xs hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 text-[#4E60A2] fill-[#4E60A2]" />
            <span>{t.hero.bookDemo}</span>
          </a>
        </motion.div>

        {/* Live Metrics Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 w-full max-w-3xl"
        >
          <div className="glass p-4 rounded-2xl border border-[#CFD5E4]/60 flex items-center gap-3 text-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900 heading-display" dir="ltr">{t.hero.stats.accuracy}</div>
              <div className="text-xs text-slate-500 font-medium">{t.hero.stats.accuracyLabel}</div>
            </div>
          </div>

          <div className="glass p-4 rounded-2xl border border-[#CFD5E4]/60 flex items-center gap-3 text-start">
            <div className="w-10 h-10 rounded-xl bg-[#E9ECF5] text-[#4E60A2] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900 heading-display">{t.hero.stats.timeSaved}</div>
              <div className="text-xs text-slate-500 font-medium">{t.hero.stats.timeSavedLabel}</div>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 glass p-4 rounded-2xl border border-[#CFD5E4]/60 flex items-center gap-3 text-start">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900 heading-display" dir="ltr">{t.hero.stats.patients}</div>
              <div className="text-xs text-slate-500 font-medium">{t.hero.stats.patientsLabel}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
