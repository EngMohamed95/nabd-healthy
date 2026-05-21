import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Mic, FileText, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { img1, img2 } from '../images';

export default function AIShowcase() {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const [isRecording, setIsRecording] = useState(true);
  const [typedText, setTypedText] = useState("");
  const fullText = t.aiShowcase.patientText;

  useEffect(() => {
    setTypedText("");
    setIsRecording(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(prev => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsRecording(false);
        }, 1000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [fullText, language]);

  return (
    <section id="demo" className="relative w-full max-w-7xl mx-auto pt-8 pb-16 px-6 xl:px-0" ref={containerRef}>
      <motion.div style={{ opacity }} className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold heading-display mb-6">{t.aiShowcase.title}</h2>
        <p className="text-xl text-slate-650 max-w-2xl mx-auto">{t.aiShowcase.desc}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        {/* Left Side: Recording UI */}
        <motion.div style={{ y: y1 }} className="glass-card rounded-3xl p-8 border border-blue-100/50 relative overflow-hidden group">
          <img 
            src={img1} 
            alt="AI Acoustic Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-[0.02] pointer-events-none mix-blend-overlay"
          />
          <div className="absolute top-0 inset-x-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-50" />
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors shrink-0 ${isRecording ? 'bg-red-500/20 text-red-500 glow-box' : 'bg-green-500/20 text-green-500'}`}>
                {isRecording ? <Mic className="w-6 h-6 animate-pulse" /> : <CheckCircle2 className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-medium text-slate-900">{isRecording ? t.aiShowcase.listening : t.aiShowcase.processingComplete}</h3>
                <p className="text-sm text-slate-500">{isRecording ? t.aiShowcase.status1 : t.aiShowcase.status2}</p>
              </div>
            </div>
            {isRecording && (
              <div className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-mono font-medium animate-pulse border border-red-500/20 shrink-0" dir="ltr">
                REC 02:44
              </div>
            )}
          </div>

          <div className="min-h-[200px] p-6 bg-slate-50 rounded-2xl border border-blue-100/40 font-mono text-sm leading-relaxed text-slate-800" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {typedText}
            {isRecording && <span className="inline-block w-2 h-4 bg-[var(--color-primary)] mx-1 animate-pulse" />}
          </div>

          {/* Audio Visualizer */}
          <div className="mt-8 flex items-end justify-center gap-1 h-16 opacity-70">
            {Array.from({ length: 48 }).map((_, i) => (
              <motion.div 
                key={i}
                animate={isRecording ? { height: ['10%', '100%', '40%', '80%', '20%'][Math.floor(Math.random() * 5)] } : { height: '5%' }}
                transition={isRecording ? { duration: 0.2 + Math.random() * 0.3, repeat: Infinity, repeatType: 'reverse' } : { duration: 0.5 }}
                className="w-1.5 bg-gradient-to-t from-[var(--color-secondary)] to-[var(--color-primary)] rounded-t-full"
                style={{ height: '5%' }}
              />
            ))}
          </div>
        </motion.div>

        {/* Right Side: Generated Report */}
        <motion.div style={{ y: y2 }} className="glass-card rounded-3xl p-8 border border-blue-100/50 flex flex-col justify-between relative overflow-hidden">
          <img 
            src={img2} 
            alt="Medical Report Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-[0.02] pointer-events-none mix-blend-overlay"
          />
          <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-blue-50/50 to-transparent pointer-events-none rounded-b-3xl" />
          
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-100 rounded-xl">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg text-slate-900">{t.aiShowcase.generatedReport}</h3>
              <p className="text-sm text-slate-650 bg-blue-50/50 px-2 py-0.5 rounded font-mono mt-1 w-max">{t.aiShowcase.soapFormat}</p>
            </div>
          </div>

          <div className="space-y-6 relative z-10 flex-1 text-start">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={!isRecording ? { opacity: 1, x: 0 } : { opacity: 0.2, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <h4 className="text-xs uppercase tracking-wider text-[var(--color-primary)] font-semibold">{t.aiShowcase.subjective}</h4>
              <p className="text-sm text-slate-700 p-4 bg-slate-50 rounded-xl border border-blue-100/40">
                {t.aiShowcase.subText}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={!isRecording ? { opacity: 1, x: 0 } : { opacity: 0.2, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <h4 className="text-xs uppercase tracking-wider text-[var(--color-primary)] font-semibold">{t.aiShowcase.objective}</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-slate-700" dir="ltr">
                <div className="p-3 bg-slate-50 rounded-lg border border-blue-100/40 text-center">{t.aiShowcase.obj1}</div>
                <div className="p-3 bg-slate-50 rounded-lg border border-blue-100/40 text-center">{t.aiShowcase.obj2}</div>
                <div className="p-3 bg-slate-50 rounded-lg border border-blue-100/40 text-center">{t.aiShowcase.obj3}</div>
                <div className="p-3 bg-slate-50 rounded-lg border border-blue-100/40 text-center">{t.aiShowcase.obj4}</div>
              </div>
            </motion.div>
            
             <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={!isRecording ? { opacity: 1, x: 0 } : { opacity: 0.2, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <h4 className="text-xs uppercase tracking-wider text-[var(--color-primary)] font-semibold">{t.aiShowcase.assessmentPlan}</h4>
              <p className="text-sm text-slate-700 p-4 bg-slate-50 rounded-xl border border-blue-100/40 blur-[1px] hover:blur-none transition-all whitespace-pre-wrap">
                {t.aiShowcase.plan}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
