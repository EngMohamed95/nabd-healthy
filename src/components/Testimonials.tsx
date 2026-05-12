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
          <h2 className="text-4xl md:text-5xl font-bold heading-display mb-6">{t.testimonials.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card rounded-3xl p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6 text-yellow-500" dir="ltr">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-lg text-white/80 leading-relaxed mb-8">"{testimonial.quote}"</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center font-bold text-lg">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-white/50">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
