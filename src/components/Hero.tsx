import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft, Mic, Play } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { img5, img7 } from '../images';

export default function Hero() {
  const { t, dir } = useLanguage();
  
  return (
    <section className="relative w-full max-w-7xl mx-auto pt-32 pb-8 px-6 xl:px-0 flex flex-col justify-center items-center">
      {/* Background Glows */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-primary)]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--color-secondary)]/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border-blue-100/60"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
          <span className="text-sm font-medium text-slate-700">{t.hero.live}</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold heading-display max-w-5xl leading-tight tracking-[tight]"
        >
          {t.hero.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">{t.hero.title2}</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl mt-8 text-lg md:text-xl text-slate-600 font-light"
        >
          {t.hero.desc}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-12"
        >
          <button className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
            {t.hero.startFreeTrial} {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
          <button className="flex items-center gap-2 px-8 py-4 bg-transparent text-blue-600 rounded-full font-medium border border-blue-200 hover:bg-blue-50/50 transition-all">
            <Play className="w-4 h-4" /> {t.hero.bookDemo}
          </button>
        </motion.div>

        {/* Dashboard Preview / Floating elements representation */}
        <motion.div
           initial={{ opacity: 0, y: 100 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
           className="w-full max-w-5xl mt-16 relative"
        >
          {/* Main Dashboard Frame */}
          <div className="relative glass-card w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-blue-100/50 p-2 flex" dir="ltr">
            {/* Left Sidebar Mock */}
            <div className="hidden md:flex flex-col w-48 border-r border-slate-200 px-4 py-6 gap-4 opacity-70 shrink-0 bg-slate-50/50">
               <div className="w-full h-8 bg-slate-200 rounded flex items-center px-3 gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]" />
                 <div className="w-16 h-3 bg-slate-350/80 rounded" />
               </div>
               <div className="w-3/4 h-3 bg-slate-300/80 rounded mt-4" />
               <div className="w-full h-3 bg-slate-200/80 rounded" />
               <div className="w-2/3 h-3 bg-slate-200/80 rounded" />
               <div className="w-5/6 h-3 bg-slate-200/80 rounded" />
               <div className="w-1/2 h-3 bg-slate-200/80 rounded" />
               
               <div className="mt-auto p-3 bg-blue-50/50 rounded-xl border border-blue-100/40 text-start">
                 <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-3">
                   <Mic className="w-5 h-5 text-[var(--color-primary)] animate-pulse" />
                 </div>
                 <div className="w-full h-2 bg-slate-300 rounded mb-2" />
                 <div className="w-2/3 h-2 bg-slate-200 rounded" />
               </div>
            </div>
            
            {/* Main Content Area: Show the Futuristic Medical System Image */}
            <div className="flex-1 relative overflow-hidden bg-slate-100 flex flex-col justify-end p-6 md:p-8">
              <img 
                src={img5} 
                alt="Nabd Healthcare System" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply md:mix-blend-normal"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-darker)] via-transparent to-transparent md:from-white/80 md:via-white/20" />
              
              <div className="relative z-10 max-w-lg text-start">
                <div className="px-3 py-1 bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/20 rounded-full text-[var(--color-primary)] text-[10px] font-mono font-bold w-max mb-3 uppercase tracking-wider">
                  AI-Powered Clinical Environment
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 leading-tight">
                  Seamless Integration in Clinic Workflow
                </h4>
                <p className="text-xs text-slate-600 hidden sm:block">
                  Automated documentation that fits right into your clinic room. Experience the hands-free AI medical charting that updates records instantly.
                </p>
              </div>
            </div>
          </div>

          {/* Floating Companion App Card (img7) */}
          <motion.div 
            initial={{ opacity: 0, x: 50, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute -bottom-10 -end-2 md:-end-6 w-44 sm:w-60 glass rounded-2xl p-2 border border-blue-100/50 shadow-2xl z-20 hover:scale-105 transition-transform"
            dir="ltr"
          >
            <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-slate-50">
              <img 
                src={img7} 
                alt="Nabd Companion Mobile App" 
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
              <div className="absolute bottom-3 inset-x-3 text-start">
                <div className="text-[9px] text-[var(--color-primary)] font-bold uppercase tracking-wider mb-1">Companion Mobile App</div>
                <div className="text-[11px] font-bold text-slate-800">Vitals & Patient Flow Tracking</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
