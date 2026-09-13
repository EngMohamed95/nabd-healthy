import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Stethoscope, Bot, ShieldCheck, Users, BarChart3, Network, Sparkles, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function EcosystemSection() {
  const { t, dir } = useLanguage();
  const [activeSystem, setActiveSystem] = useState<number>(0);

  const systems = [
    {
      id: 0,
      icon: Stethoscope,
      title: t.ecosystem.e1_title,
      desc: t.ecosystem.e1_desc,
      color: "from-blue-600 to-indigo-600",
      accent: "#4E60A2",
      capabilities: [
        "استخلاص الأعراض والتاريخ المرضي آلياً",
        "توليد فوري لملخص الحالة بصيغة SOAP",
        "تقليل الكتابة اليدوية أثناء الكشف بنسبة 90%"
      ]
    },
    {
      id: 1,
      icon: Bot,
      title: t.ecosystem.e2_title,
      desc: t.ecosystem.e2_desc,
      color: "from-indigo-600 to-violet-600",
      accent: "#6366F1",
      capabilities: [
        "البحث السريع في الأدوية والجرعات والتداخلات",
        "الوصول المباشر للإرشادات والمراجع السريرية المعتمدة",
        "إجابات منظمة وموثقة بالدراسات والمصادر الطبية"
      ]
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: t.ecosystem.e3_title,
      desc: t.ecosystem.e3_desc,
      color: "from-emerald-600 to-teal-600",
      accent: "#10B981",
      capabilities: [
        "رادار فوري للتنبيه بالحساسية الدوائية والتداخلات",
        "اقتراح التشخيصات التفريقية والفحوصات المساندة",
        "إبراز النتائج غير الطبيعية في التحاليل والأشعة"
      ]
    },
    {
      id: 3,
      icon: Users,
      title: t.ecosystem.e4_title,
      desc: t.ecosystem.e4_desc,
      color: "from-sky-600 to-blue-600",
      accent: "#0284C7",
      capabilities: [
        "سجل طبي موحد وشامل لكل مريض",
        "تنظيم المواعيد وقائمة الانتظار والمتابعات",
        "إضافة مساعدين وتحديد الصلاحيات الطبية والإدارية"
      ]
    },
    {
      id: 4,
      icon: BarChart3,
      title: t.ecosystem.e5_title,
      desc: t.ecosystem.e5_desc,
      color: "from-violet-600 to-purple-600",
      accent: "#8B5CF6",
      capabilities: [
        "لوحة مؤشرات أداء حية للعيادة والكشوفات",
        "إحصائيات الأمراض الأكثر شيوعاً وتوزيع المرضى",
        "متابعة دقيقة للكفاءة التشغيلية وتوفير ساعات العمل"
      ]
    },
  ];

  return (
    <section id="ecosystem" className="relative w-full max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Soft Background Center Glow */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-[#4E60A2]/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E9ECF5] border border-[#D5DAE8] text-[#4E60A2] text-xs font-bold mb-4 shadow-xs"
        >
          <Network className="w-3.5 h-3.5" />
          <span>{t.ecosystem.badge}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold heading-display text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight mb-4"
        >
          {t.ecosystem.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-650 max-w-3xl mx-auto leading-relaxed"
        >
          {t.ecosystem.desc}
        </motion.p>
      </div>

      {/* Interactive 5 Systems Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
        {systems.map((sys) => {
          const isSelected = activeSystem === sys.id;
          return (
            <motion.button
              key={sys.id}
              onClick={() => setActiveSystem(sys.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-2xl border text-start transition-all cursor-pointer flex flex-col justify-between min-h-[110px] ${
                isSelected
                  ? 'bg-white border-[#4E60A2] shadow-md shadow-[#4E60A2]/10 ring-2 ring-[#4E60A2]/20'
                  : 'glass-card border-[#CFD5E4]/80 hover:border-[#4E60A2]/40 bg-white/70'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-[#1E285A] text-white'
                      : 'bg-[#E9ECF5] text-[#4E60A2]'
                  }`}
                >
                  <sys.icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold font-mono text-slate-400">
                  0{sys.id + 1}
                </span>
              </div>
              <h3 className={`text-xs sm:text-sm font-bold leading-snug ${isSelected ? 'text-[#1E285A]' : 'text-slate-800'}`}>
                {sys.title}
              </h3>
            </motion.button>
          );
        })}
      </div>

      {/* Active System Spotlight Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSystem}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="glass-card rounded-3xl border border-[#CFD5E4] p-6 sm:p-10 bg-gradient-to-br from-white via-[#F8F9FD] to-white shadow-xl text-start relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left side info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9ECF5] text-[#4E60A2] text-xs font-bold font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>NABD SUB-SYSTEM 0{activeSystem + 1}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 heading-display">
                {systems[activeSystem].title}
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {systems[activeSystem].desc}
              </p>

              <div className="pt-4 space-y-2.5">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  {dir === 'rtl' ? "أبرز إمكانيات هذا النظام:" : "Core Capabilities:"}
                </span>
                {systems[activeSystem].capabilities.map((cap, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side interactive card graphic */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-sm p-6 rounded-2xl bg-gradient-to-br from-[#1E285A] to-[#4E60A2] text-white shadow-xl relative overflow-hidden text-start">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center">
                    {(() => {
                      const Icon = systems[activeSystem].icon;
                      return <Icon className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                  <span className="text-[11px] font-bold font-mono px-2.5 py-1 rounded-full bg-white/20 text-[#849CC6]">
                    INTEGRATED
                  </span>
                </div>

                <h4 className="text-lg font-bold mb-2">
                  {systems[activeSystem].title}
                </h4>
                <p className="text-xs text-[#C6CCE3] leading-relaxed mb-6">
                  {systems[activeSystem].desc}
                </p>

                <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs text-[#849CC6] font-bold">
                  <span>منظومة متصلة وسلسة</span>
                  <span>100% متوافقة</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
