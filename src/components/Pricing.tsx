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
    <section id="pricing" className="relative w-full py-20 border-t border-white/5 bg-black/30">
      <div className="absolute top-0 end-1/4 w-[600px] h-[600px] bg-[var(--color-secondary)]/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
         <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold heading-display mb-6">{t.pricing.title}</h2>
          <p className="text-white/50 text-xl">{t.pricing.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-3xl p-8 border ${plan.popular ? 'bg-gradient-to-b from-white/[0.08] to-transparent border-[var(--color-primary)]/50 scale-105 shadow-[0_0_40px_rgba(0,240,255,0.1)] relative z-10' : 'glass border-white/10'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 px-4 py-1 rounded-full bg-[var(--color-primary)] text-black text-xs font-bold uppercase tracking-wider">
                  {t.pricing.mostPopular}
                </div>
              )}
              
              <div className="mb-8 relative">
                <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
                <p className="text-white/50 text-sm mb-6">{plan.desc}</p>
                <div className="flex items-baseline gap-1" dir="ltr">
                  <span className="text-5xl font-bold heading-display">{plan.price}</span>
                  <span className="text-white/50 font-medium">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                    <span className="text-sm text-white/80">{f}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-xl font-semibold transition-all ${plan.popular ? 'bg-[var(--color-primary)] text-black hover:bg-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                {t.pricing.getStarted}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
