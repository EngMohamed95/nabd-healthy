import { motion } from 'motion/react';
import { Sparkles, BrainCircuit, Zap, HeartPulse, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function AboutSection() {
  const { t, dir } = useLanguage();

  const highlightCards = [
    {
      icon: BrainCircuit,
      title: t.about.card1Title,
      desc: t.about.card1Desc,
      badge: "تكامل موحد"
    },
    {
      icon: Zap,
      title: t.about.card2Title,
      desc: t.about.card2Desc,
      badge: "سرعة فائقة"
    },
    {
      icon: HeartPulse,
      title: t.about.card3Title,
      desc: t.about.card3Desc,
      badge: "رعاية إنسانية"
    }
  ];

  return (
    <section id="about" className="relative w-full max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 start-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-[#4E60A2]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Badge */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E9ECF5] border border-[#D5DAE8] text-[#4E60A2] text-xs font-bold mb-4 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.about.badge}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold heading-display text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight"
        >
          {t.about.title}
        </motion.h2>
      </div>

      {/* Main Grid: Narrative Column + 3 Interactive Value Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Narrative & Mission Column (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 glass-card rounded-3xl border border-[#CFD5E4]/80 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-lg shadow-[#4E60A2]/5"
        >
          {/* Subtle watermarked pulse waveform */}
          <div className="absolute -top-12 end-0 w-64 h-64 bg-[#4E60A2]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6 text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#4E60A2]/10 text-[#4E60A2] text-xs font-bold font-mono">
              <span>NABD HEALTHCARE OS</span>
              <span>•</span>
              <span>GLOBAL HEALTHCARE AI</span>
            </div>

            <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium">
              {t.about.p1}
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t.about.p2}
            </p>
          </div>

          {/* Golden Medical Covenant Card */}
          <div className="relative z-10 mt-8 pt-6 border-t border-[#D5DAE8]/70">
            <div className="flex items-start sm:items-center gap-3.5 p-4 rounded-2xl bg-gradient-to-r from-[#1E285A]/5 via-[#4E60A2]/10 to-transparent border border-[#4E60A2]/20">
              <div className="w-10 h-10 rounded-xl bg-[#1E285A] text-white flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-start">
                <span className="text-[11px] font-bold text-[#4E60A2] uppercase tracking-wider block">
                  ميثاق التمكين الطبي
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                  "{t.about.disclaimer}"
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3 Pillars Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          {highlightCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card group rounded-2xl border border-[#CFD5E4]/80 p-5 hover:border-[#4E60A2]/50 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-start relative overflow-hidden flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E9ECF5] to-white border border-[#D5DAE8] text-[#4E60A2] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#4E60A2] group-hover:text-white transition-all shadow-2xs">
                <card.icon className="w-6 h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#4E60A2] transition-colors">
                    {card.title}
                  </h3>
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-[#4E60A2]/10 text-[#4E60A2] shrink-0">
                    {card.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[#4E60A2] shrink-0 pt-1">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
