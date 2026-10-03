import { motion } from 'motion/react';
import { PlayCircle, CheckCircle2, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { nabdCover } from '../images';

export default function VideoSection() {
  const { t, dir } = useLanguage();

  return (
    <section id="video" className="relative w-full max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#4E60A2]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
        {/* Text Column */}
        <motion.div
          initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 text-start"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E9ECF5] border border-[#D5DAE8] text-[#4E60A2] text-xs font-bold mb-5 shadow-xs">
            <PlayCircle className="w-3.5 h-3.5" />
            <span>{t.video.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold heading-display text-slate-900 tracking-tight leading-tight mb-4">
            {t.video.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 max-w-xl">
            {t.video.desc}
          </p>

          <div className="space-y-2.5 mb-8">
            {t.video.points.map((point, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm sm:text-base text-slate-800 font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <a
            href="#demo"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#4E60A2] to-[#1E285A] hover:from-[#5E70B2] hover:to-[#283264] text-white rounded-2xl font-bold text-sm shadow-xl shadow-[#4E60A2]/25 hover:shadow-[#4E60A2]/40 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.video.cta}</span>
            {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </a>
        </motion.div>

        {/* Video Column */}
        <motion.div
          initial={{ opacity: 0, x: dir === 'rtl' ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5 relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#1E285A] via-[#4E60A2] to-[#849CC6] rounded-3xl blur-2xl opacity-20" />
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#CFD5E4] bg-slate-900 shadow-2xl shadow-[#4E60A2]/20">
            <video
              src="/intro.mp4"
              poster={nabdCover}
              controls
              playsInline
              className="w-full h-auto block"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
