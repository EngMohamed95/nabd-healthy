import { motion } from 'motion/react';
import { Clock3, FileText, Search, Pill, FileCheck2, FlaskConical, FolderGit2, Sparkles, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function WorkflowEfficiencySection() {
  const { t, dir } = useLanguage();

  const tasks = [
    {
      icon: FileText,
      title: t.workflowEfficiency.t1,
      before: "15 دقيقة كتابة يدوية",
      after: "ثوانٍ معدودة بصوتك",
      reduction: "-85%"
    },
    {
      icon: Search,
      title: t.workflowEfficiency.t2,
      before: "10 دقائق تصفح مراجع",
      after: "إجابة ملخصة ومصادر فورية",
      reduction: "-90%"
    },
    {
      icon: Pill,
      title: t.workflowEfficiency.t3,
      before: "مراجعة كتيبات وجداول",
      after: "تدقيق آلي آني للتفاعلات",
      reduction: "-95%"
    },
    {
      icon: FileCheck2,
      title: t.workflowEfficiency.t4,
      before: "كتابة وطباعة ورقية",
      after: "توليد فوري واعتماد بنقرة",
      reduction: "-80%"
    },
    {
      icon: FlaskConical,
      title: t.workflowEfficiency.t5,
      before: "قراءة صفحات تقارير",
      after: "ملخص ذكي بأهم المؤشرات",
      reduction: "-75%"
    },
    {
      icon: FolderGit2,
      title: t.workflowEfficiency.t6,
      before: "أوراق وملفات متناثرة",
      after: "ملف طبي رقمي متكامل",
      reduction: "-70%"
    }
  ];

  return (
    <section id="efficiency" className="relative w-full max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 start-0 w-[500px] h-[500px] bg-[#4E60A2]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E9ECF5] border border-[#D5DAE8] text-[#4E60A2] text-xs font-bold mb-4 shadow-xs"
        >
          <Clock3 className="w-3.5 h-3.5" />
          <span>{t.workflowEfficiency.badge}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold heading-display text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight mb-4"
        >
          {t.workflowEfficiency.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-650 max-w-3xl mx-auto leading-relaxed"
        >
          {t.workflowEfficiency.desc}
        </motion.p>
      </div>

      {/* 3 Prominent Quantitative Time Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 rounded-3xl border border-[#CFD5E4]/80 text-start relative overflow-hidden shadow-xs hover:border-[#4E60A2]/40 transition-colors"
        >
          <div className="text-3xl sm:text-5xl font-extrabold text-[#4E60A2] heading-display mb-2">
            {t.workflowEfficiency.statHours}
          </div>
          <div className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
            {t.workflowEfficiency.statHoursLabel}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {dir === 'rtl' ? "تقليل إجهاد لوحة المفاتيح والتوثيق المجهد" : "Eliminating documentation fatigue"}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 rounded-3xl border border-[#CFD5E4]/80 text-start relative overflow-hidden shadow-xs hover:border-[#4E60A2]/40 transition-colors"
        >
          <div className="text-3xl sm:text-5xl font-extrabold text-emerald-600 heading-display mb-2">
            {t.workflowEfficiency.statWeekly}
          </div>
          <div className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
            {t.workflowEfficiency.statWeeklyLabel}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {dir === 'rtl' ? "وقت إضافي للاستماع للمريض وتحسين الممارسة" : "Reinvested into clinical quality"}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 rounded-3xl border border-[#CFD5E4]/80 text-start relative overflow-hidden shadow-xs hover:border-[#4E60A2]/40 transition-colors"
        >
          <div className="text-3xl sm:text-5xl font-extrabold text-[#1E285A] heading-display mb-2">
            {t.workflowEfficiency.statAccuracy}
          </div>
          <div className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
            {t.workflowEfficiency.statAccuracyLabel}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {dir === 'rtl' ? "أكواد ICD-10 واستخراج SOAP دقيق" : "Precise SOAP notes & ICD-10 coding"}
          </span>
        </motion.div>
      </div>

      {/* The 6 Daily Tasks Grid with Time Saved Comparison */}
      <div className="mb-14">
        <div className="text-start mb-6">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            {t.workflowEfficiency.tasksHeading}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tasks.map((task, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl border border-[#CFD5E4]/80 p-5 text-start hover:border-[#4E60A2]/50 transition-all hover:shadow-md hover:-translate-y-0.5 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E9ECF5] text-[#4E60A2] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#4E60A2] group-hover:text-white transition-all shadow-2xs">
                    <task.icon className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold font-mono">
                    {task.reduction}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug mb-3">
                  {task.title}
                </h3>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] space-y-1.5 font-medium">
                <div className="flex items-center justify-between text-slate-400 line-through">
                  <span>{dir === 'rtl' ? "سابقاً:" : "Before:"}</span>
                  <span>{task.before}</span>
                </div>
                <div className="flex items-center justify-between text-[#1E285A] font-bold">
                  <span className="flex items-center gap-1 text-emerald-600">
                    <Check className="w-3 h-3" />
                    <span>{dir === 'rtl' ? "مع نبض:" : "With Nabd:"}</span>
                  </span>
                  <span>{task.after}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Goal Callout Box from Document */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-3xl border border-[#D5DAE8] p-6 sm:p-8 bg-gradient-to-r from-white via-[#F8F9FD] to-white text-center shadow-md max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E285A] text-white text-[11px] font-bold font-mono mb-3">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>{t.workflowEfficiency.goalBadge}</span>
        </div>
        <p className="text-sm sm:text-base text-slate-800 font-semibold leading-relaxed max-w-2xl mx-auto">
          "{t.workflowEfficiency.goalText}"
        </p>
      </motion.div>
    </section>
  );
}
