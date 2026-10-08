import { motion } from 'motion/react';
import { Sparkles, BrainCircuit, Zap, HeartPulse, ArrowUpRight, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();

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
          viewport={{ once: false, margin: "-12% 0px" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E9ECF5] border border-[#D5DAE8] text-[#4E60A2] text-xs font-bold mb-4 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.about.badge}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-12% 0px" }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold heading-display text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight"
        >
          {t.about.title}
        </motion.h2>
      </div>

      {/* Main Stack: Narrative card on top, 3 value cards side by side below */}
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Narrative & Mission Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-12% 0px" }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl border border-[#CFD5E4]/80 p-8 sm:p-12 flex flex-col justify-center relative overflow-hidden shadow-lg shadow-[#4E60A2]/5"
        >
          {/* Subtle watermarked pulse waveform */}
          <div className="absolute -top-12 end-0 w-64 h-64 bg-[#4E60A2]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center">
            <p className="text-base sm:text-xl lg:text-2xl text-slate-800 leading-relaxed font-medium">
              {t.about.p2}
            </p>
          </div>
        </motion.div>

        {/* 3 Pillars Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlightCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-12% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card group rounded-2xl border border-[#CFD5E4]/80 p-6 hover:border-[#4E60A2]/50 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-center relative overflow-hidden flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E9ECF5] to-white border border-[#D5DAE8] text-[#4E60A2] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:from-[#DDE4F5] group-hover:to-[#EEF2FA] group-hover:border-[#849CC6] group-hover:text-[#1E285A] transition-all shadow-2xs">
                <card.icon className="w-6 h-6" />
              </div>

              <h3 className="text-base font-bold text-slate-900 group-hover:text-[#4E60A2] transition-colors">
                {card.title}
              </h3>
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-[#4E60A2]/10 text-[#4E60A2]">
                {card.badge}
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {card.desc}
              </p>

              <div className="absolute top-4 end-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#4E60A2]">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Medical Ethics & Disclaimer Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-12% 0px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card group rounded-2xl border border-[#CFD5E4]/80 p-6 hover:border-[#4E60A2]/50 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-center relative overflow-hidden flex flex-col items-center gap-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E9ECF5] to-white border border-[#D5DAE8] text-[#4E60A2] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:from-[#DDE4F5] group-hover:to-[#EEF2FA] group-hover:border-[#849CC6] group-hover:text-[#1E285A] transition-all shadow-2xs">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            {t.vision.disclaimer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
