import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { img5 } from '../images';

export default function DashboardPreview() {
  const { t, dir } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [20, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section className="relative w-full py-20 overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 text-center mb-20 relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold heading-display mb-6">
          {t.dashboard.titleLine1}<br/>{t.dashboard.titleLine2}
        </h2>
      </div>

      <motion.div 
        style={{ scale, rotateX, opacity }}
        className="w-full max-w-[1400px] mx-auto px-6 relative perspective-[2000px]"
      >
        <div className="relative rounded-3xl overflow-hidden glass border border-blue-100/50 p-2 shadow-[0_8px_32px_rgba(37,99,235,0.06)]" dir="ltr">
          {/* Header Bar Mock */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-blue-100/30 bg-slate-100/70">
             <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
             </div>
             <div className="h-6 w-48 bg-slate-200/60 rounded-full"></div>
             <div className="h-8 w-8 rounded-full bg-slate-200"></div>
          </div>
          
          <div className="grid grid-cols-12 gap-px bg-blue-100/30 h-[600px]" dir={dir}>
            {/* Sidebar */}
            <div className="col-span-2 bg-slate-50/90 p-6 flex flex-col gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-6 w-full bg-slate-200/50 rounded-md"></div>
              ))}
              <div className="mt-auto h-24 w-full bg-[var(--color-primary)]/5 rounded-xl border border-[var(--color-primary)]/10 p-4">
                 <div className="h-2 w-full bg-slate-350/40 rounded-full mb-3" />
                 <div className="h-2 w-2/3 bg-slate-350/40 rounded-full" />
              </div>
            </div>

            {/* Main Canvas */}
            <div className="col-span-7 bg-white p-8 flex flex-col gap-6 overflow-hidden relative">
              <img 
                src={img5} 
                alt="EMR Interactive Panel" 
                className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-multiply pointer-events-none"
              />
              <div className="absolute top-0 end-0 w-64 h-64 bg-[var(--color-accent)]/5 blur-[100px]" />
              
              <div className="flex justify-between items-end mb-4">
                 <div>
                    <div className="h-8 w-64 bg-slate-100 rounded-lg mb-2" />
                    <div className="h-4 w-32 bg-slate-50 rounded" />
                 </div>
                 <div className="h-10 w-32 bg-[var(--color-primary)]/10 rounded-lg" />
              </div>

              {/* Chart Mock */}
              <div className="h-64 w-full bg-slate-50/50 rounded-2xl border border-blue-100/30 p-6 flex items-end gap-4" dir="ltr">
                {[...Array(12)].map((_, i) => (
                   <motion.div 
                     key={i} 
                     initial={{ height: 0 }}
                     whileInView={{ height: `${20 + Math.random() * 80}%` }}
                     transition={{ duration: 1, delay: i * 0.1 }}
                     className="flex-1 bg-gradient-to-t from-[var(--color-secondary)]/40 to-[var(--color-primary)]/70 rounded-t-sm"
                   />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6 h-full">
                <div className="bg-slate-50/50 rounded-2xl border border-blue-100/30 p-6" />
                <div className="bg-slate-50/50 rounded-2xl border border-blue-100/30 p-6" />
              </div>
            </div>

            {/* Right Sidebar (Patient details) */}
            <div className="col-span-3 bg-slate-50/90 p-6 border-s border-blue-100/30">
              <div className="flex items-center gap-4 mb-8 text-center flex-col pt-8">
                 <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-slate-100" />
                 <div className="h-6 w-32 bg-slate-250 rounded-md" />
                 <div className="h-3 w-20 bg-[var(--color-primary)]/20 rounded-md" />
              </div>

              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 w-full bg-white/70 rounded-xl border border-blue-100/30 flex items-center px-4 gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100" />
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="h-2 w-3/4 bg-slate-200/80 rounded" />
                      <div className="h-2 w-1/2 bg-slate-200/40 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
