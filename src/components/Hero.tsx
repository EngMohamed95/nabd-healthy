import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Mic, Play, Sparkles, CheckCircle, ShieldCheck, Clock, Zap, FileText } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { img5, img7 } from '../images';

export default function Hero() {
  const { t, dir, language } = useLanguage();
  
  return (
    <section className="relative w-full max-w-7xl mx-auto pt-32 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      {/* Soft Center Radial Glow */}
      <div className="absolute top-1/4 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 w-[700px] h-[500px] bg-[#7E6FFF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center text-center">
        {/* Top Live Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-indigo-200/70 shadow-xs mb-8 backdrop-blur-md"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#7E6FFF] animate-pulse" />
          <span className="text-xs font-bold text-slate-800 tracking-wide">{t.hero.badge}</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#7E6FFF]/10 text-[#7E6FFF]">NEW</span>
        </motion.div>

        {/* Main Hero Headings */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold heading-display max-w-5xl leading-[1.15] text-slate-900 tracking-tight"
        >
          {t.hero.title1} <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7E6FFF] via-[#5A47FF] to-[#0ea5e9]">
            {t.hero.title2}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="max-w-3xl mt-6 text-base sm:text-xl text-slate-650 leading-relaxed font-normal"
        >
          {t.hero.desc}
        </motion.p>

        {/* Call to Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto"
        >
          <a 
            href="#demo"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#7E6FFF] to-[#5A47FF] hover:from-[#6b5bf7] hover:to-[#4e39f5] text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.hero.startFreeTrial}</span>
            {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </a>
          <a 
            href="#requisition"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 bg-white/90 text-slate-800 rounded-2xl font-bold text-sm border border-slate-200 hover:bg-slate-50 hover:border-indigo-200 transition-all shadow-2xs hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 text-[#7E6FFF] fill-[#7E6FFF]" />
            <span>{t.hero.bookDemo}</span>
          </a>
        </motion.div>

        {/* Live Metrics Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 w-full max-w-3xl"
        >
          <div className="glass p-4 rounded-2xl border border-indigo-100/60 flex items-center gap-3 text-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900 heading-display" dir="ltr">{t.hero.stats.accuracy}</div>
              <div className="text-xs text-slate-500 font-medium">{t.hero.stats.accuracyLabel}</div>
            </div>
          </div>

          <div className="glass p-4 rounded-2xl border border-indigo-100/60 flex items-center gap-3 text-start">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#7E6FFF] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900 heading-display">{t.hero.stats.timeSaved}</div>
              <div className="text-xs text-slate-500 font-medium">{t.hero.stats.timeSavedLabel}</div>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 glass p-4 rounded-2xl border border-indigo-100/60 flex items-center gap-3 text-start">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900 heading-display" dir="ltr">{t.hero.stats.patients}</div>
              <div className="text-xs text-slate-500 font-medium">{t.hero.stats.patientsLabel}</div>
            </div>
          </div>
        </motion.div>

        {/* Hero Interactive Workspace Canvas */}
        <motion.div
           initial={{ opacity: 0, y: 60 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
           className="w-full max-w-5xl mt-14 relative"
        >
          {/* Main Workspace Frame */}
          <div className="relative glass-card w-full rounded-3xl overflow-hidden border border-indigo-100/80 p-2 sm:p-3 shadow-2xl shadow-indigo-500/10">
            {/* Window titlebar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100/80 border-b border-slate-200/60 rounded-t-2xl mb-2" dir="ltr">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-lg border border-slate-200 text-slate-600 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#7E6FFF] animate-pulse" />
                <span>nabd.health/consultation/active</span>
              </div>
              <div className="text-[11px] font-bold text-slate-500">Nabd Clinic OS v2.0</div>
            </div>

            {/* Inner Dashboard Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 min-h-[420px] rounded-2xl overflow-hidden bg-slate-50/70 p-3">
              {/* Left Column: Real-time Audio Transcription Stream */}
              <div className="md:col-span-5 bg-white rounded-2xl p-5 border border-indigo-100/60 flex flex-col justify-between text-start shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shadow-xs">
                        <Mic className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{t.hero.listenFast}</div>
                        <div className="text-[10px] text-slate-500 font-mono">AR-EG 44.1kHz • Live Scribe</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-[10px] font-bold animate-pulse" dir="ltr">
                      REC 01:24
                    </span>
                  </div>

                  <div className="p-3.5 bg-indigo-50/40 rounded-xl border border-indigo-100/50 text-xs text-slate-700 leading-relaxed font-sans">
                    <span className="font-bold text-[#7E6FFF] block mb-1">
                      {language === 'ar' ? 'المريض:' : 'Patient:'}
                    </span>
                    {language === 'ar' 
                      ? "يا دكتور بحس بوجع ضاغط في صدري بقاله يومين خصوصاً لما أطلع السلم، ومعاه كتمة نفس بسيطة..."
                      : "Doctor, I've had this pressure-like pain in my chest for the last 2 days, especially when climbing stairs..."
                    }
                  </div>

                  <div className="mt-3 p-3 bg-emerald-50/40 rounded-xl border border-emerald-100/50 text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold text-emerald-600 block mb-1">
                      {language === 'ar' ? 'تحليل الذكاء الاصطناعي:' : 'AI Diagnostic Engine:'}
                    </span>
                    {language === 'ar'
                      ? "استخراج تلقائي: علامات حيوية طبيعية، استبعاد ACS، طلب فحص EKG و Troponin I."
                      : "Extracted: Stable vitals, rule out ACS, ordered 12-lead ECG & hs-Troponin I."
                    }
                  </div>
                </div>

                {/* Animated Mini Waves */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 h-6">
                    {[12, 24, 16, 32, 20, 28, 14, 36, 22, 18, 30, 16, 26].map((h, idx) => (
                      <span 
                        key={idx} 
                        className="w-1 bg-[#7E6FFF] rounded-full animate-pulse" 
                        style={{ height: `${h}px`, animationDelay: `${idx * 0.1}s` }} 
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-[#7E6FFF] bg-indigo-50 px-2.5 py-1 rounded-lg">
                    {t.hero.noTyping}
                  </span>
                </div>
              </div>

              {/* Right Column: EMR Workstation Preview */}
              <div className="md:col-span-7 bg-slate-900 rounded-2xl p-4 text-white relative overflow-hidden flex flex-col justify-between">
                <img 
                  src={img5} 
                  alt="Clinical EMR Workstation" 
                  className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="px-2.5 py-1 rounded-lg bg-[#7E6FFF]/30 text-[#A399FF] text-[11px] font-bold border border-[#7E6FFF]/40">
                      Active Encounter #1082
                    </div>
                    <span className="text-xs text-slate-300 font-semibold">أحمد محمود سالم (45 سنة)</span>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800">
                    ● SOAP Generated (0.4s)
                  </div>
                </div>

                <div className="relative z-10 grid grid-cols-2 gap-2 my-auto pt-6 text-start">
                  <div className="bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-white/10">
                    <div className="text-[10px] text-[#A399FF] font-bold uppercase mb-1">Subjective (الشكوى)</div>
                    <div className="text-xs text-slate-200 line-clamp-2">ألم ضاغط بالصدر مستمر منذ 48 ساعة مترافق مع ضيق تنفس خفيف.</div>
                  </div>
                  <div className="bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-white/10">
                    <div className="text-[10px] text-emerald-400 font-bold uppercase mb-1">Objective (الفحص)</div>
                    <div className="text-xs text-slate-200 font-mono">BP: 135/85 • HR: 78 • O2: 98%</div>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-slate-300">مزامنة فورية مع السجل الطبي (EMR)</span>
                  </div>
                  <a 
                    href="#demo" 
                    className="text-xs font-bold text-[#A399FF] hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>فتح التقرير الكامل</span>
                    <ArrowLeft className="w-3.5 h-3.5 rtl:block hidden" />
                    <ArrowRight className="w-3.5 h-3.5 rtl:hidden block" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Companion App Card */}
          <motion.div 
            initial={{ opacity: 0, x: 40, y: 40 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="absolute -bottom-8 -end-2 md:-end-6 w-48 sm:w-60 glass rounded-2xl p-2 border border-indigo-100 shadow-2xl z-20 hover:scale-105 transition-transform hidden sm:block"
            dir="ltr"
          >
            <div className="relative aspect-[9/14] rounded-xl overflow-hidden bg-slate-900">
              <img 
                src={img7} 
                alt="Nabd Companion Mobile App" 
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-3 inset-x-3 text-start">
                <div className="text-[9px] text-[#A399FF] font-bold uppercase tracking-wider mb-0.5">Mobile Doctor Companion</div>
                <div className="text-xs font-bold text-white">Live Patient Vitals & Queue</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
