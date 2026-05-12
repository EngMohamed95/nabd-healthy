import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft, Mic, Play } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

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
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border-white/10"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
          <span className="text-sm font-medium text-white/80">{t.hero.live}</span>
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
          className="max-w-2xl mt-8 text-lg md:text-xl text-white/60 font-light"
        >
          {t.hero.desc}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-12"
        >
          <button className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]">
            {t.hero.startFreeTrial} {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
          <button className="flex items-center gap-2 px-8 py-4 bg-transparent text-white rounded-full font-medium border border-white/20 hover:bg-white/5 transition-all">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-darker)] via-transparent to-transparent z-10" />
          <div className="relative glass-card w-full aspect-video rounded-2xl overflow-hidden border border-white/10 p-2 flex" dir="ltr">
            {/* Sidebar Mock */}
            <div className="hidden md:flex flex-col w-48 border-r border-white/5 px-4 py-8 gap-4 opacity-50">
               <div className="w-full h-8 bg-white/5 rounded" />
               <div className="w-3/4 h-4 bg-white/5 rounded mt-4" />
               <div className="w-full h-4 bg-white/5 rounded" />
               <div className="w-2/3 h-4 bg-white/5 rounded" />
            </div>
            {/* Main Content Mock */}
            <div className="flex-1 p-8 opacity-80" dir={dir}>
               <div className="flex justify-between items-center mb-8">
                  <div className="w-48 h-8 bg-white/10 rounded-lg" />
                  <div className="flex gap-4">
                     <div className="w-10 h-10 bg-[var(--color-primary)]/20 rounded-full flex items-center justify-center">
                        <Mic className="w-5 h-5 text-[var(--color-primary)]" />
                     </div>
                  </div>
               </div>
               {/* Waveform Mock - we'll implement a better one in AI showcase */}
               <div className="flex items-end gap-1 h-32 w-full mt-10">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: ['20%', '80%', '40%', '100%', '30%'][i % 5] }}
                      transition={{ duration: 0.5 + Math.random(), repeat: Infinity, repeatType: 'reverse' }}
                      className="flex-1 bg-[var(--color-primary)]/40 rounded-t-sm"
                    />
                  ))}
               </div>
               
               <div className="w-full h-px bg-white/10 my-8" />
               <div className="w-full h-32 bg-white/5 rounded-xl border border-white/5 p-6">
                 <div className="w-1/3 h-4 bg-white/20 rounded mb-4" />
                 <div className="w-full h-3 bg-white/10 rounded mb-2" />
                 <div className="w-5/6 h-3 bg-white/10 rounded" />
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
