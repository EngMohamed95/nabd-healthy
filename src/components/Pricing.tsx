import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, Zap, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Pricing() {
  const { t, dir } = useLanguage();
  const [isYearly, setIsYearly] = useState<boolean>(true);

  const plans = [
    {
      name: t.pricing.p1_name,
      price: isYearly ? "$39" : "$49",
      period: isYearly ? "/mo (billed annually)" : t.pricing.p1_period,
      desc: t.pricing.p1_desc,
      features: [t.pricing.p1_f1, t.pricing.p1_f2, t.pricing.p1_f3, t.pricing.p1_f4],
      popular: false
    },
    {
      name: t.pricing.p2_name,
      price: isYearly ? "$99" : "$129",
      period: isYearly ? "/mo (billed annually)" : t.pricing.p2_period,
      desc: t.pricing.p2_desc,
      features: [t.pricing.p2_f1, t.pricing.p2_f2, t.pricing.p2_f3, t.pricing.p2_f4, t.pricing.p2_f5],
      popular: true
    },
    {
      name: t.pricing.p3_name,
      price: t.pricing.p3_price,
      period: t.pricing.p3_period,
      desc: t.pricing.p3_desc,
      features: [t.pricing.p3_f1, t.pricing.p3_f2, t.pricing.p3_f3, t.pricing.p3_f4, t.pricing.p3_f5],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="relative w-full py-24 border-t border-[#CFD5E4]/40 bg-slate-50/50">
      <div className="absolute top-0 end-1/4 w-[600px] h-[600px] bg-[#4E60A2]/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E9ECF5] border border-[#D5DAE8] text-[#4E60A2] text-xs font-bold mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>{t.pricing.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold heading-display mb-4 text-slate-900 tracking-tight">
            {t.pricing.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
            {t.pricing.desc}
          </p>

          {/* Billing Switcher Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-xs font-bold ${!isYearly ? 'text-slate-900' : 'text-slate-500'}`}>
              {t.pricing.monthly}
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="w-14 h-8 bg-[#4E60A2] rounded-full p-1 transition-colors relative"
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${isYearly ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-0'}`} />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-bold ${isYearly ? 'text-slate-900' : 'text-slate-500'}`}>
                {t.pricing.yearly}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                SAVE 20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-3xl p-8 border flex flex-col justify-between transition-all ${
                plan.popular 
                  ? 'glass-card-active border-[#4E60A2] scale-105 shadow-2xl relative z-10' 
                  : 'glass-card border-[#CFD5E4]/60 hover:border-[#CFD5E4]'
              }`}
            >
              <div>
                {plan.popular && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#4E60A2] text-white text-[11px] font-bold uppercase tracking-wider mb-4 shadow-sm">
                    <Sparkles className="w-3 h-3" />
                    <span>{t.pricing.mostPopular}</span>
                  </div>
                )}
                
                <div className="mb-6 text-start">
                  <h3 className="text-xl font-bold mb-2 text-slate-900">{plan.name}</h3>
                  <p className="text-slate-500 text-xs mb-6 min-h-[36px]">{plan.desc}</p>
                  <div className="flex items-baseline gap-1 text-slate-900" dir="ltr">
                    <span className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight text-slate-900">
                      {plan.price}
                    </span>
                    <span className="text-slate-500 text-xs font-medium">{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-3.5 mb-8 text-start">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs text-slate-700 font-medium leading-tight">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#demo"
                className={`w-full py-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  plan.popular 
                    ? 'bg-[#4E60A2] hover:bg-[#1E285A] text-white shadow-lg shadow-[#4E60A2]/25 hover:shadow-[#4E60A2]/40 hover:scale-[1.02]' 
                    : 'bg-[#E9ECF5] hover:bg-[#D2D7E6] text-[#4E60A2]'
                }`}
              >
                <span>{t.pricing.getStarted}</span>
                {dir === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
