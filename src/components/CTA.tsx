import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle2, PhoneCall } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function CTA() {
  const { t, dir } = useLanguage();

  return (
    <section className="relative w-full py-28 overflow-hidden">
      {/* Soft Background Radiance */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E9ECF5]/40 to-[#E6E9F2]/30 pointer-events-none" />
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#4E60A2]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D5DAE8] text-[#4E60A2] text-xs font-bold mb-6 shadow-xs"
        >
          <Sparkles className="w-4 h-4" />
          <span>{t.cta.badge}</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold heading-display mb-6 text-slate-900 leading-tight tracking-tight"
        >
          {t.cta.title}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {t.cta.desc}
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0, y: 25 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.3 }}
           className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://aidocotr.runasp.net/login"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-9 py-4 bg-gradient-to-r from-[#4E60A2] to-[#1E285A] hover:from-[#5E70B2] hover:to-[#283264] text-white rounded-2xl text-sm font-bold shadow-xl shadow-[#4E60A2]/30 hover:shadow-[#4E60A2]/45 hover:scale-105 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.cta.startFreeTrial}</span>
            {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </a>
          <a
            href="#demo"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-800 rounded-2xl text-sm font-bold border border-slate-200 hover:bg-slate-50 transition-all shadow-xs"
          >
            <PhoneCall className="w-4 h-4 text-[#4E60A2]" />
            <span>{t.cta.talkToSales}</span>
          </a>
        </motion.div>

        {/* Feature Checks Row */}
        <div className="mt-12 pt-8 border-t border-[#CFD5E4]/60 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>تجربة مجانية 14 يوماً</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>بدون الحاجة لبطاقة ائتمانية</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>تفعيل فوري ودعم طبي متواصل</span>
          </div>
        </div>
      </div>
    </section>
  );
}
