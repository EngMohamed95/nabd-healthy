import { motion } from 'motion/react';
import { Clock3, LayoutDashboard, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function EfficiencyKPISection() {
  const { t } = useLanguage();

  const efficiencyItems = [t.efficiency.i1, t.efficiency.i2, t.efficiency.i3, t.efficiency.i4, t.efficiency.i5, t.efficiency.i6];
  const kpiItems = [t.kpi.i1, t.kpi.i2, t.kpi.i3, t.kpi.i4, t.kpi.i5, t.kpi.i6, t.kpi.i7];

  return (
    <section className="relative w-full py-20 border-t border-[#CFD5E4]/40 bg-slate-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Efficiency Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl border border-[#CFD5E4]/70 p-6 sm:p-8 text-start"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E9ECF5] border border-[#D5DAE8] text-[#4E60A2] text-xs font-bold mb-4">
            <Clock3 className="w-3.5 h-3.5" />
            <span>{t.efficiency.badge}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold heading-display text-slate-900 mb-3 leading-snug">
            {t.efficiency.title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            {t.efficiency.desc}
          </p>
          <ul className="space-y-2.5">
            {efficiencyItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#4E60A2] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* KPI Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-3xl border border-[#CFD5E4]/70 p-6 sm:p-8 text-start"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E9ECF5] border border-[#D5DAE8] text-[#4E60A2] text-xs font-bold mb-4">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{t.kpi.badge}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold heading-display text-slate-900 mb-3 leading-snug">
            {t.kpi.title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            {t.kpi.desc}
          </p>
          <ul className="space-y-2.5">
            {kpiItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
