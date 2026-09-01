import { motion } from 'motion/react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      quote: t.testimonials.t1_quote,
      author: t.testimonials.t1_author,
      role: t.testimonials.t1_role,
      rating: 5
    },
    {
      quote: t.testimonials.t2_quote,
      author: t.testimonials.t2_author,
      role: t.testimonials.t2_role,
      rating: 5
    },
    {
      quote: t.testimonials.t3_quote,
      author: t.testimonials.t3_author,
      role: t.testimonials.t3_role,
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="relative w-full py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E9ECF5] border border-[#D5DAE8] text-[#4E60A2] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.testimonials.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold heading-display text-slate-900 mb-4 tracking-tight">
            {t.testimonials.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="glass-card rounded-3xl p-8 flex flex-col justify-between border border-[#CFD5E4]/70 relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1 text-amber-400" dir="ltr">
                    {[...Array(item.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#849CC6] group-hover:text-[#4E60A2] transition-colors" />
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-8 text-start font-sans">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100 text-start">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#E9ECF5] to-[#D2D7E6] border border-[#D5DAE8]/60 flex items-center justify-center font-bold text-base text-[#4E60A2]">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">{item.author}</div>
                  <div className="text-xs text-slate-500">{item.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
