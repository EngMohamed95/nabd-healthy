import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      quote: t.testimonials.t1_quote,
      author: t.testimonials.t1_author,
      role: t.testimonials.t1_role,
    },
    {
      quote: t.testimonials.t2_quote,
      author: t.testimonials.t2_author,
      role: t.testimonials.t2_role,
    },
    {
      quote: t.testimonials.t3_quote,
      author: t.testimonials.t3_author,
      role: t.testimonials.t3_role,
    }
  ];

  return (
    <section id="testimonials" className="relative w-full py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold heading-display mb-6 text-slate-900">{t.testimonials.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card rounded-3xl p-8 flex flex-col justify-between border border-blue-100/50"
            >
              <div>
                <div className="flex gap-1 mb-6 text-amber-450" dir="ltr">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-lg text-slate-700 leading-relaxed mb-8">"{testimonial.quote}"</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-sky-100 border border-blue-100/60 flex items-center justify-center font-bold text-lg text-blue-600">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
