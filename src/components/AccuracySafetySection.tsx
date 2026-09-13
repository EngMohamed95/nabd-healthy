import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, AlertTriangle, Pill, Activity, FileQuestion, CheckCircle2, XCircle, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function AccuracySafetySection() {
  const { t, dir } = useLanguage();
  const [activeAlert, setActiveAlert] = useState<number>(0);

  const alerts = [
    {
      id: 0,
      icon: Pill,
      title: t.accuracySafety.alert1Title,
      desc: t.accuracySafety.alert1Desc,
      severity: "CRITICAL",
      severityBg: "bg-red-500/10 text-red-600 border-red-200",
      sampleTitle: "تنبيه حساسية: مادة البنسلين (Penicillin Allergy)",
      sampleDetail: "المريض مسجل لديه تحسس جلدي حاد من مشتقات البنسلين. تم منع إضافة Amoxicillin تلقائياً واقتراح بديل آمن (Azithromycin 500mg).",
      actionText: "تم تحويل الوصفة للبديل الآمن بنجاح"
    },
    {
      id: 1,
      icon: AlertTriangle,
      title: t.accuracySafety.alert2Title,
      desc: t.accuracySafety.alert2Desc,
      severity: "WARNING",
      severityBg: "bg-amber-500/10 text-amber-600 border-amber-200",
      sampleTitle: "تداخل دوائي حرج: Warfarin + NSAID",
      sampleDetail: "تزامن عقار Warfarin مع مسكن Ibuprofen يزيد من احتمالية النزيف المعوي بنسبة 3.8x. ينصح بمراجعة الجرعة أو استبداله بـ Paracetamol.",
      actionText: "تم استبدال المسكن واعتماد الجرعة الآمنة"
    },
    {
      id: 2,
      icon: Activity,
      title: t.accuracySafety.alert3Title,
      desc: t.accuracySafety.alert3Desc,
      severity: "ABNORMAL",
      severityBg: "bg-rose-500/10 text-rose-600 border-rose-200",
      sampleTitle: "قيمة مخبرية شاذة: Serum Potassium (6.1 mEq/L)",
      sampleDetail: "مستوى البوتاسيوم مرتفع بشكل ملحوظ عن النطاق الآمن (3.5 - 5.0). تم لفت انتباه الطبيب فوراً وإدراج تخطيط ECG ضمن الفحوصات العاجلة.",
      actionText: "تم إدراج فحص الـ ECG وتنبيه التمريض"
    },
    {
      id: 3,
      icon: FileQuestion,
      title: t.accuracySafety.alert4Title,
      desc: t.accuracySafety.alert4Desc,
      severity: "REVIEW",
      severityBg: "bg-sky-500/10 text-sky-600 border-sky-200",
      sampleTitle: "معلومات ناقصة: قياس ضغط الدم وتاريخ التدخين",
      sampleDetail: "لم يتم تسجيل قراءة ضغط الدم الحالية، والشكوى تتضمن صداعاً خلفياً. تم تنبيه الطبيب لقياس الضغط قبل تحديد التشخيص النهائي.",
      actionText: "تم استكمال العلامات الحيوية واعتمادها"
    }
  ];

  return (
    <section id="safety" className="relative w-full max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Soft Radial Glow */}
      <div className="absolute top-1/3 end-0 w-[550px] h-[550px] bg-[#849CC6]/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E9ECF5] border border-[#D5DAE8] text-[#4E60A2] text-xs font-bold mb-4 shadow-xs"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{t.accuracySafety.badge}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold heading-display text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight mb-4"
        >
          {t.accuracySafety.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-650 max-w-3xl mx-auto leading-relaxed"
        >
          {t.accuracySafety.desc}
        </motion.p>
      </div>

      {/* 4 Interactive Safety Alert Pillars + Interactive Clinical Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Column: 4 Safety Cards (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="text-start mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {dir === 'rtl' ? "رادار الأمان السريري الذكي — اضغط للاستعراض:" : "Clinical Safety Radar — Click to preview:"}
            </span>
          </div>

          {alerts.map((alert) => {
            const isSelected = activeAlert === alert.id;
            return (
              <motion.div
                key={alert.id}
                onClick={() => setActiveAlert(alert.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`cursor-pointer rounded-2xl p-5 border transition-all text-start relative overflow-hidden ${
                  isSelected
                    ? 'bg-white border-[#4E60A2] shadow-md shadow-[#4E60A2]/10 ring-2 ring-[#4E60A2]/20'
                    : 'glass-card border-[#CFD5E4]/80 hover:border-[#4E60A2]/40 bg-white/70'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#1E285A] text-white shadow-sm'
                        : 'bg-[#E9ECF5] text-[#4E60A2]'
                    }`}
                  >
                    <alert.icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className={`text-sm sm:text-base font-bold ${isSelected ? 'text-[#1E285A]' : 'text-slate-900'}`}>
                        {alert.title}
                      </h3>
                      <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-md border ${alert.severityBg}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {alert.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Live Clinical Radar Simulation Window (6 cols) */}
        <div className="lg:col-span-6">
          <div className="text-start mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {dir === 'rtl' ? "المحاكاة السريرية الحية لمنع السهو والأخطاء:" : "Live Clinical Safety Simulation:"}
            </span>
          </div>

          <div className="glass-card rounded-3xl border border-[#CFD5E4] p-6 sm:p-8 bg-gradient-to-b from-white to-[#F8F9FD] shadow-xl relative overflow-hidden text-start">
            {/* Simulation Header */}
            <div className="flex items-center justify-between border-b border-[#D5DAE8] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800 font-mono">NABD PATIENT SAFETY SHIELD</span>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#E9ECF5] text-[#4E60A2]">
                {dir === 'rtl' ? "فحص سريري آني" : "Real-time Verification"}
              </span>
            </div>

            {/* Dynamic Alert View with AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAlert}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Active Alert Banner */}
                <div className="p-4 rounded-2xl bg-white border border-[#D5DAE8] shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${alerts[activeAlert].severityBg}`}>
                      {alerts[activeAlert].severity} DETECTED
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-700">{dir === 'rtl' ? "تنبيه مساند للطبيب قبل اتخاذ القرار" : "Supportive Pre-Decision Alert"}</span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 mb-2 leading-snug">
                    {alerts[activeAlert].sampleTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                    {alerts[activeAlert].sampleDetail}
                  </p>
                </div>

                {/* Resolution Status Bar */}
                <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-800 text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{alerts[activeAlert].actionText}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-600 text-white shrink-0">
                    RESOLVED
                  </span>
                </div>

                {/* Safety Metric Pills */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-white rounded-xl border border-[#CFD5E4] text-center">
                    <span className="text-[10px] text-slate-500 font-bold block">
                      {dir === 'rtl' ? "الحد من احتمالات السهو" : "Error Reduction Rate"}
                    </span>
                    <span className="text-xl font-extrabold text-[#1E285A] font-mono">99.8%</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#CFD5E4] text-center">
                    <span className="text-[10px] text-slate-500 font-bold block">
                      {dir === 'rtl' ? "سرعة التنبيه السريري" : "Alert Latency"}
                    </span>
                    <span className="text-xl font-extrabold text-emerald-600 font-mono">&lt; 0.2s</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Comparison Row: Traditional Fragmented Records vs. Nabd Unified Intelligence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Traditional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 sm:p-7 rounded-3xl border border-rose-200 bg-rose-50/20 text-start relative overflow-hidden"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase mb-3">
            <XCircle className="w-4 h-4 shrink-0" />
            <span>{t.accuracySafety.tradTitle}</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {t.accuracySafety.tradDesc}
          </p>
        </motion.div>

        {/* Nabd Unified */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card-active p-6 sm:p-7 rounded-3xl border-2 border-[#4E60A2] bg-white text-start relative overflow-hidden shadow-lg shadow-[#4E60A2]/10"
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#4E60A2] uppercase">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{t.accuracySafety.nabdTitle}</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#1E285A] text-white text-[10px] font-bold font-mono">
              ZERO MISSING DATA
            </span>
          </div>
          <p className="text-sm text-slate-800 font-medium leading-relaxed">
            {t.accuracySafety.nabdDesc}
          </p>
        </motion.div>
      </div>

      {/* Golden Rule Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-[#1E285A] to-[#4E60A2] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md text-start"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#849CC6] block">
              {t.accuracySafety.ruleBadge}
            </span>
            <p className="text-xs sm:text-sm font-bold text-white">
              "{t.accuracySafety.ruleText}"
            </p>
          </div>
        </div>
        <a
          href="#demo"
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#1E285A] text-xs font-bold hover:bg-slate-100 transition-colors shadow-xs"
        >
          <span>{dir === 'rtl' ? "شاهد الفحص السريري الآن" : "View Live Clinical Demo"}</span>
          {dir === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
        </a>
      </motion.div>
    </section>
  );
}
