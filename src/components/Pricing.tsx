import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Pricing() {
  const { t, dir } = useLanguage();

  const plans = [
    {
      name: t.pricing.p1_name,
      price: t.pricing.p1_price,
      period: t.pricing.p1_period,
      desc: t.pricing.p1_desc,
      features: [t.pricing.p1_f1, t.pricing.p1_f2, t.pricing.p1_f3, t.pricing.p1_f4]
    },
    {
      name: t.pricing.p2_name,
      price: t.pricing.p2_price,
      period: t.pricing.p2_period,
      desc: t.pricing.p2_desc,
      features: [t.pricing.p2_f1, t.pricing.p2_f2, t.pricing.p2_f3, t.pricing.p2_f4, t.pricing.p2_f5],
      popular: true
    },
    {
      name: t.pricing.p3_name,
      price: t.pricing.p3_price,
      period: t.pricing.p3_period,
      desc: t.pricing.p3_desc,
      features: [t.pricing.p3_f1, t.pricing.p3_f2, t.pricing.p3_f3, t.pricing.p3_f4, t.pricing.p3_f5]
    }
  ];

  return (
    <section id="pricing" className="relative w-full py-20 border-t border-blue-100/40 bg-slate-100/20">
      <div className="absolute top-0 end-1/4 w-[600px] h-[600px] bg-[var(--color-secondary)]/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
         <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold heading-display mb-6 text-slate-900">{t.pricing.title}</h2>
          <p className="text-slate-600 text-xl">{t.pricing.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-3xl p-8 border ${plan.popular ? 'bg-gradient-to-b from-blue-50/80 to-white/90 border-[var(--color-primary)]/50 scale-105 shadow-[0_8px_32px_rgba(37,99,235,0.08)] relative z-10' : 'glass-card border-blue-100/50'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 px-4 py-1 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold uppercase tracking-wider">
                  {t.pricing.mostPopular}
                </div>
              )}
              
              <div className="mb-8 relative text-start">
                <h3 className="text-xl font-medium mb-2 text-slate-900">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-6">{plan.desc}</p>
                <div className="flex items-baseline gap-1 text-slate-900" dir="ltr">
                  <span className="text-5xl font-bold heading-display">{plan.price}</span>
                  <span className="text-slate-500 font-medium">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8 text-start">
                {plan.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                    <span className="text-sm text-slate-700">{f}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-xl font-semibold transition-all ${plan.popular ? 'bg-blue-650 text-white hover:bg-blue-700 shadow-md hover:shadow-lg' : 'bg-blue-50 hover:bg-blue-100 text-blue-600'}`}>
                {t.pricing.getStarted}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
