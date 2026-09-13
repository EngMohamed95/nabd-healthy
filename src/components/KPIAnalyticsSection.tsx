import { useState } from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Users, UserPlus, PieChart, CalendarCheck, FileSpreadsheet, Bot, Timer, TrendingUp, Sparkles, BarChart2 } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function KPIAnalyticsSection() {
  const { t, dir } = useLanguage();
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('month');

  // Realistic dynamic metrics based on selected period
  const periodData = {
    today: {
      totalPatients: "42",
      totalGrowth: "+12% اليوم",
      newPatientsRatio: "64% جديد / 36% متابعة",
      newPatientsVal: 64,
      topDiagnoses: [
        { label: "ارتفاع ضغط الدم", percent: 35 },
        { label: "متابعة السكري", percent: 30 },
        { label: "عدوى تنفسية", percent: 20 },
        { label: "أعراض أخرى", percent: 15 }
      ],
      appointmentAdherence: "98.1%",
      avgWait: "4.5 دقائق",
      ordersIssued: "128 طلب",
      aiUsage: "96.5%",
      timeEfficiency: "4.2 ساعات موفرة",
      timeReduction: "-68%"
    },
    week: {
      totalPatients: "284",
      totalGrowth: "+16% هذا الأسبوع",
      newPatientsRatio: "66% جديد / 34% متابعة",
      newPatientsVal: 66,
      topDiagnoses: [
        { label: "ارتفاع ضغط الدم", percent: 32 },
        { label: "متابعة السكري", percent: 28 },
        { label: "عدوى تنفسية", percent: 24 },
        { label: "أعراض أخرى", percent: 16 }
      ],
      appointmentAdherence: "97.3%",
      avgWait: "5.8 دقائق",
      ordersIssued: "845 طلب",
      aiUsage: "95.2%",
      timeEfficiency: "21 ساعة موفرة",
      timeReduction: "-66%"
    },
    month: {
      totalPatients: "1,248",
      totalGrowth: "+18% هذا الشهر",
      newPatientsRatio: "68% جديد / 32% متابعة",
      newPatientsVal: 68,
      topDiagnoses: [
        { label: "ارتفاع ضغط الدم (I10)", percent: 34 },
        { label: "السكري النوع 2 (E11)", percent: 28 },
        { label: "عدوى تنفسية (J06)", percent: 22 },
        { label: "أمراض الجهاز الهضمي (K29)", percent: 16 }
      ],
      appointmentAdherence: "96.4%",
      avgWait: "6.2 دقائق",
      ordersIssued: "3,820 طلب",
      aiUsage: "94.2%",
      timeEfficiency: "88 ساعة موفرة",
      timeReduction: "-65%"
    }
  };

  const current = periodData[period];

  return (
    <section id="kpi" className="relative w-full max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 start-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#4E60A2]/10 rounded-full blur-[170px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E9ECF5] border border-[#D5DAE8] text-[#4E60A2] text-xs font-bold mb-4 shadow-xs"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>{t.kpiAnalytics.badge}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold heading-display text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight mb-4"
        >
          {t.kpiAnalytics.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-650 max-w-3xl mx-auto leading-relaxed"
        >
          {t.kpiAnalytics.desc}
        </motion.p>

        {/* Time Period Filter Pills */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <div className="inline-flex p-1 rounded-2xl bg-white border border-[#D5DAE8] shadow-xs">
            <button
              onClick={() => setPeriod('today')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                period === 'today'
                  ? 'bg-[#1E285A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.kpiAnalytics.periodToday}
            </button>
            <button
              onClick={() => setPeriod('week')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                period === 'week'
                  ? 'bg-[#1E285A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.kpiAnalytics.periodWeek}
            </button>
            <button
              onClick={() => setPeriod('month')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                period === 'month'
                  ? 'bg-[#1E285A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.kpiAnalytics.periodMonth}
            </button>
          </div>
        </div>
      </div>

      {/* The 7 Interactive KPI Cards (Bento Dashboard Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch mb-12">
        {/* KPI 1: Total Patients & Consultations (4 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-4 glass-card rounded-3xl border border-[#CFD5E4]/80 p-6 text-start flex flex-col justify-between shadow-xs hover:border-[#4E60A2]/40 transition-all"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#E9ECF5] text-[#4E60A2] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold font-mono">
                {current.totalGrowth}
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              {t.kpiAnalytics.k1Title}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {t.kpiAnalytics.k1Desc}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-baseline justify-between">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#1E285A] heading-display">
              {current.totalPatients}
            </span>
            <span className="text-xs text-slate-500 font-bold">كشف مسجل</span>
          </div>
        </motion.div>

        {/* KPI 2: New Patients vs. Follow-up (4 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="lg:col-span-4 glass-card rounded-3xl border border-[#CFD5E4]/80 p-6 text-start flex flex-col justify-between shadow-xs hover:border-[#4E60A2]/40 transition-all"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <UserPlus className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-500 font-mono">DISTRIBUTION</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              {t.kpiAnalytics.k2Title}
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              {t.kpiAnalytics.k2Desc}
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>{dir === 'rtl' ? "جديد:" : "New:"} {current.newPatientsVal}%</span>
              <span>{dir === 'rtl' ? "متابعة:" : "Follow-up:"} {100 - current.newPatientsVal}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden flex">
              <div style={{ width: `${current.newPatientsVal}%` }} className="bg-[#4E60A2] h-full" />
              <div style={{ width: `${100 - current.newPatientsVal}%` }} className="bg-emerald-500 h-full" />
            </div>
          </div>
        </motion.div>

        {/* KPI 3: Top Diagnoses (4 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16 }}
          className="lg:col-span-4 glass-card rounded-3xl border border-[#CFD5E4]/80 p-6 text-start flex flex-col justify-between shadow-xs hover:border-[#4E60A2]/40 transition-all"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <PieChart className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-amber-100/70 text-amber-800">
                ICD-10 MAPPED
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              {t.kpiAnalytics.k3Title}
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              {t.kpiAnalytics.k3Desc}
            </p>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            {current.topDiagnoses.map((diag, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-slate-700 font-medium truncate max-w-[170px]">{diag.label}</span>
                <span className="font-bold text-slate-900 font-mono">{diag.percent}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* KPI 4: Appointment Indicators (3 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 glass-card rounded-3xl border border-[#CFD5E4]/80 p-5 text-start shadow-xs flex flex-col justify-between"
        >
          <div className="flex items-center gap-2 text-[#4E60A2] mb-2">
            <CalendarCheck className="w-5 h-5" />
            <h4 className="text-xs font-bold text-slate-800 uppercase">{t.kpiAnalytics.k4Title}</h4>
          </div>
          <div className="my-2">
            <div className="text-2xl font-extrabold text-[#1E285A] font-mono">{current.appointmentAdherence}</div>
            <span className="text-[11px] text-slate-500 font-bold block">{dir === 'rtl' ? "الالتزام بالمواعيد" : "Schedule Adherence"}</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-bold font-mono bg-emerald-50 px-2 py-0.5 rounded w-fit">
            {dir === 'rtl' ? `وقت الانتظار: ${current.avgWait}` : `Avg wait: ${current.avgWait}`}
          </span>
        </motion.div>

        {/* KPI 5: Orders & Requisitions Issued (3 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.24 }}
          className="lg:col-span-3 glass-card rounded-3xl border border-[#CFD5E4]/80 p-5 text-start shadow-xs flex flex-col justify-between"
        >
          <div className="flex items-center gap-2 text-[#4E60A2] mb-2">
            <FileSpreadsheet className="w-5 h-5" />
            <h4 className="text-xs font-bold text-slate-800 uppercase">{t.kpiAnalytics.k5Title}</h4>
          </div>
          <div className="my-2">
            <div className="text-2xl font-extrabold text-[#1E285A] font-mono">{current.ordersIssued}</div>
            <span className="text-[11px] text-slate-500 font-bold block">{dir === 'rtl' ? "فحوصات وتقارير معتمدة" : "Certified Requisitions"}</span>
          </div>
          <span className="text-[10px] text-[#4E60A2] font-bold font-mono bg-[#E9ECF5] px-2 py-0.5 rounded w-fit">
            BARCODE VERIFIED
          </span>
        </motion.div>

        {/* KPI 6: AI Utilization (3 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.28 }}
          className="lg:col-span-3 glass-card rounded-3xl border border-[#CFD5E4]/80 p-5 text-start shadow-xs flex flex-col justify-between"
        >
          <div className="flex items-center gap-2 text-[#4E60A2] mb-2">
            <Bot className="w-5 h-5" />
            <h4 className="text-xs font-bold text-slate-800 uppercase">{t.kpiAnalytics.k6Title}</h4>
          </div>
          <div className="my-2">
            <div className="text-2xl font-extrabold text-emerald-600 font-mono">{current.aiUsage}</div>
            <span className="text-[11px] text-slate-500 font-bold block">{dir === 'rtl' ? "اعتماد الذكاء السريري" : "Clinical AI Adoption"}</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-bold font-mono bg-emerald-50 px-2 py-0.5 rounded w-fit">
            TRUSTED ASSISTANT
          </span>
        </motion.div>

        {/* KPI 7: Operational Time & Efficiency (3 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.32 }}
          className="lg:col-span-3 glass-card rounded-3xl border border-[#CFD5E4]/80 p-5 text-start shadow-xs flex flex-col justify-between"
        >
          <div className="flex items-center gap-2 text-[#4E60A2] mb-2">
            <Timer className="w-5 h-5" />
            <h4 className="text-xs font-bold text-slate-800 uppercase">{t.kpiAnalytics.k7Title}</h4>
          </div>
          <div className="my-2">
            <div className="text-2xl font-extrabold text-[#4E60A2] font-mono">{current.timeEfficiency}</div>
            <span className="text-[11px] text-slate-500 font-bold block">{dir === 'rtl' ? "ساعات توثيق تم توفيرها" : "Admin Hours Reclaimed"}</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-bold font-mono bg-emerald-50 px-2 py-0.5 rounded w-fit">
            {current.timeReduction} وقت الإجراءات
          </span>
        </motion.div>
      </div>

      {/* Note from Document */}
      <div className="text-center">
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl mx-auto">
          {t.kpiAnalytics.subNote}
        </p>
      </div>
    </section>
  );
}
