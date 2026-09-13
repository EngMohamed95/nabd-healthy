import { motion } from 'motion/react';
import { Globe2, ShieldAlert, Sparkles, HeartPulse, Languages, Scale, Stethoscope, Lock } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function VisionSection() {
  const { t, dir } = useLanguage();

  const globalHighlights = [
    {
      icon: Languages,
      title: "دعم لغات متعددة",
      enTitle: "Multilingual Engine",
      desc: "تصميم مرن يدعم العربية والإنجليزية ولغات أخرى للتوسع السلس."
    },
    {
      icon: Scale,
      title: "تكييف تنظيمي وتشريعي",
      enTitle: "Regulatory Compliance",
      desc: "التوافق مع الأنظمة الطبية والمتطلبات الرقابية لكل سوق ودولة."
    },
    {
      icon: Stethoscope,
      title: "مختلف التخصصات الطبية",
      enTitle: "All Specialties",
      desc: "ملاءمة لمتطلبات الباطنة، الأطفال، العظام، الجراحة والعيادات المتخصصة."
    },
    {
      icon: Lock,
      title: "أمان وخصوصية تامة",
      enTitle: "Data Privacy & Security",
      desc: "حماية مشددة لبيانات المرضى والسجلات الطبية بأحدث معايير التشفير."
    }
  ];

  return (
    <section id="vision" className="relative w-full py-24 overflow-hidden text-white">
      {/* Deep Rich Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#141838] via-[#1E285A] to-[#111633]" />
      <div className="absolute top-0 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 w-[800px] h-[500px] bg-[#4E60A2]/30 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#849CC6] text-xs font-bold mb-6 backdrop-blur-md"
        >
          <Globe2 className="w-3.5 h-3.5 text-[#849CC6]" />
          <span>{t.vision.badge}</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold heading-display text-white tracking-tight mb-6 leading-tight max-w-4xl mx-auto"
        >
          {t.vision.title}
        </motion.h2>

        {/* Vision Statement Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md max-w-4xl mx-auto mb-10 text-start shadow-xl"
        >
          <span className="text-[11px] font-bold font-mono text-[#849CC6] uppercase tracking-wider block mb-2">
            {dir === 'rtl' ? "بيان الرؤية المعتمد" : "OFFICIAL VISION STATEMENT"}
          </span>
          <p className="text-base sm:text-xl text-white font-medium leading-relaxed">
            "{t.vision.desc}"
          </p>
        </motion.div>

        {/* Philosophy Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-[#C6CCE3] max-w-3xl mx-auto leading-relaxed mb-12 font-normal"
        >
          {t.vision.philosophy}
        </motion.p>

        {/* Global Architecture Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14 text-start">
          {globalHighlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + i * 0.08 }}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all backdrop-blur-xs flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 text-[#849CC6] flex items-center justify-center mb-3">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {dir === 'rtl' ? item.title : item.enTitle}
                </h4>
                <p className="text-xs text-[#9AA3C4] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final Slogan Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="p-6 rounded-3xl bg-gradient-to-r from-[#1E285A]/80 via-[#4E60A2]/60 to-[#1E285A]/80 border border-[#4E60A2]/50 shadow-2xl max-w-3xl mx-auto mb-8"
        >
          <div className="flex items-center justify-center gap-2 text-amber-300 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold font-mono tracking-wider uppercase">NABD PLATFORM</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-xl sm:text-3xl font-extrabold text-white heading-display">
            {t.vision.slogan}
          </h3>
        </motion.div>

        {/* Medical Ethics & Disclaimer Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-start sm:items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-[#C6CCE3] leading-relaxed max-w-2xl text-start shadow-xs"
        >
          <ShieldAlert className="w-4 h-4 text-amber-300 shrink-0 mt-0.5 sm:mt-0" />
          <span>{t.vision.disclaimer}</span>
        </motion.div>
      </div>
    </section>
  );
}
