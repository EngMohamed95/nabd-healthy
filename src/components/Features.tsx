import { motion } from 'motion/react';
import { Users, Calendar, Activity, Pill, CreditCard, BarChart3 } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { img1, img3, img6, img7, img8, img11 } from '../images';

export default function Features() {
  const { t, language, dir } = useLanguage();
  
  const features = [
    { icon: Users, title: t.features.f1_title, desc: t.features.f1_desc, colSpan: "md:col-span-2", image: img6 },
    { icon: Calendar, title: t.features.f2_title, desc: t.features.f2_desc, colSpan: "md:col-span-1", image: img7 },
    { icon: Activity, title: t.features.f3_title, desc: t.features.f3_desc, colSpan: "md:col-span-1", image: img1 },
    { icon: Pill, title: t.features.f4_title, desc: t.features.f4_desc, colSpan: "md:col-span-2", image: img11 },
    { icon: CreditCard, title: t.features.f5_title, desc: t.features.f5_desc, colSpan: "md:col-span-2", image: img8 },
    { icon: BarChart3, title: t.features.f6_title, desc: t.features.f6_desc, colSpan: "md:col-span-1", image: img3 }
  ];

  return (
    <section id="features" className="relative w-full max-w-7xl mx-auto py-24 px-6 xl:px-0">
      <div className="absolute top-0 end-0 w-[500px] h-[500px] bg-[var(--color-secondary)]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold heading-display mb-6">{t.features.title}</h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">{t.features.desc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feat, i) => {
          const isLarge = feat.colSpan.includes("md:col-span-2");
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card rounded-3xl group hover:-translate-y-1.5 transition-all duration-500 ${feat.colSpan} relative overflow-hidden flex flex-col justify-between min-h-[380px] h-[400px] border border-blue-100/50`}
            >
              {/* Subtle background glow for each card */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-100 group-hover:opacity-80 transition-opacity" />
              
              {/* Radial glow active on hover */}
              <div className="absolute -inset-px bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />
              
              {isLarge ? (
                <div className="grid grid-cols-1 md:grid-cols-12 h-full w-full relative z-10">
                  {/* Left Side: Content */}
                  <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-between h-full text-start">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary)]/20 group-hover:border-[var(--color-primary)]/30 transition-all duration-300 shadow-inner">
                        <feat.icon className="w-6 h-6 text-slate-650 group-hover:text-[var(--color-primary)] transition-colors" />
                      </div>
                      <h3 className="text-2xl font-bold heading-display text-slate-900 mb-4 group-hover:text-[var(--color-primary)] transition-colors">{feat.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed max-w-sm">{feat.desc}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-[var(--color-primary)] font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span>{language === 'ar' ? 'تعرف على المزيد' : 'Learn more'}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={dir === 'rtl' ? 'rotate-180' : ''}><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </div>
                  </div>
                  
                  {/* Right Side: Bleeding Image */}
                  {feat.image && (
                    <div className="md:col-span-5 relative h-full min-h-[200px] md:min-h-0 overflow-hidden">
                      <img 
                        src={feat.image} 
                        alt={feat.title} 
                        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                      />
                      {/* Gradient Mask to fade image into card background */}
                      <div className="absolute inset-y-0 start-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent md:hidden pointer-events-none" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col h-full w-full justify-between relative z-10">
                  {/* Top Content */}
                  <div className="p-8 text-start">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary)]/20 group-hover:border-[var(--color-primary)]/30 transition-all duration-300 shadow-inner">
                      <feat.icon className="w-6 h-6 text-slate-650 group-hover:text-[var(--color-primary)] transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold heading-display text-slate-900 mb-3 group-hover:text-[var(--color-primary)] transition-colors">{feat.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                  
                  {/* Bottom Bleeding Image */}
                  {feat.image && (
                    <div className="relative w-full h-44 overflow-hidden mt-auto">
                      <img 
                        src={feat.image} 
                        alt={feat.title} 
                        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                      />
                      {/* Gradient Mask to fade image upwards */}
                      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none" />
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
