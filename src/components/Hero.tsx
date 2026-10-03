import { useEffect, useState, type PointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { Activity, ArrowLeft, ArrowRight, Play, Sparkles } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { SHOW_PRICING } from '../lib/featureFlags';
import { nabdCover } from '../images';

export default function Hero() {
  const { t, dir, language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glowX = useSpring(pointerX, { stiffness: 55, damping: 22 });
  const glowY = useSpring(pointerY, { stiffness: 55, damping: 22 });

  const phrases = (t.hero as { typingPhrases?: string[] }).typingPhrases || [
    'دقة أكبر للمعلومات …',
    'وقت أقل للإجراءات …',
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setCurrentText('');
    setIsDeleting(false);
    setPhraseIndex(0);
  }, [language]);

  useEffect(() => {
    const fullText = phrases[phraseIndex % phrases.length];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (currentText.length < fullText.length) {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, 85);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else if (currentText.length > 0) {
      timer = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length - 1));
      }, 40);
    } else {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((previous) => (previous + 1) % phrases.length);
      }, 350);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, phrases]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left - bounds.width / 2) * 0.08);
    pointerY.set((event.clientY - bounds.top - bounds.height / 2) * 0.08);
  };

  return (
    <section
      className="relative flex w-full flex-col items-center justify-center overflow-hidden"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <div className="absolute inset-x-[10px] bottom-[10px] top-[10px] z-0 overflow-hidden rounded-[24px]">
        <div
          role="img"
          aria-label={language === 'ar' ? 'غلاف منصة نبض الطبية' : 'Nabd medical platform cover'}
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${nabdCover})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1030]/85 via-[#141838]/65 to-[#0B1030]/90" />

        <motion.div
          aria-hidden="true"
          style={{ x: glowX, y: glowY }}
          animate={reduceMotion ? undefined : { scale: [0.92, 1.12, 0.92], opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 top-[44%] h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(172,197,245,0.42)_0%,rgba(78,96,162,0.2)_42%,transparent_72%)] blur-xl sm:h-[42rem] sm:w-[42rem]"
        />

        <motion.div
          aria-hidden="true"
          initial={{ x: '-45vw', opacity: 0 }}
          animate={reduceMotion ? { opacity: 0 } : { x: ['-45vw', '145vw'], opacity: [0, 0.28, 0.28, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
          className="absolute -top-[15%] h-[130%] w-28 -skew-x-12 bg-gradient-to-r from-transparent via-[#D9E7FF] to-transparent blur-2xl sm:w-44"
        />

        <motion.div
          aria-hidden="true"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
          className="absolute left-1/2 top-[43%] h-[23rem] w-[23rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#C8D8F6]/40 shadow-[0_0_45px_rgba(132,156,198,0.12)] sm:h-[38rem] sm:w-[38rem]"
        >
          <span className="absolute left-[12%] top-[8%] h-2.5 w-2.5 rounded-full bg-[#BFD0F1] shadow-[0_0_22px_rgba(191,208,241,0.95)]" />
          <span className="absolute bottom-[16%] right-[5%] h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_16px_rgba(255,255,255,0.8)]" />
        </motion.div>

        <svg
          aria-hidden="true"
          viewBox="0 0 1200 260"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-[34%] h-[260px] w-full opacity-90 sm:top-[38%]"
        >
          <defs>
            <linearGradient id="hero-pulse-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#849CC6" stopOpacity="0" />
              <stop offset="48%" stopColor="#DCE7FF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#849CC6" stopOpacity="0" />
            </linearGradient>
            <filter id="hero-pulse-glow" x="-20%" y="-100%" width="140%" height="300%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M0 132 H410 L445 132 L466 98 L491 178 L521 52 L550 144 L575 118 L602 132 H1200"
            fill="none"
            stroke="rgba(190,211,250,0.26)"
            strokeWidth="2.5"
          />
          <motion.path
            d="M0 132 H410 L445 132 L466 98 L491 178 L521 52 L550 144 L575 118 L602 132 H1200"
            fill="none"
            stroke="url(#hero-pulse-gradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="170 1030"
            filter="url(#hero-pulse-glow)"
            initial={{ strokeDashoffset: 1200 }}
            animate={reduceMotion ? { strokeDashoffset: 420 } : { strokeDashoffset: [1200, -1200] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'linear' }}
          />
        </svg>

        {[18, 50, 82].map((position, index) => (
          <motion.span
            key={position}
            aria-hidden="true"
            className="absolute top-[66%] h-2.5 w-2.5 rounded-full border border-white/70 bg-[#C9DAFA] shadow-[0_0_26px_rgba(191,211,250,1)]"
            style={{ left: `${position}%` }}
            animate={reduceMotion ? undefined : { y: [0, -14, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3.6 + index, delay: index * 0.7, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-4 pb-28 pt-44 text-center sm:px-6 sm:pb-36 sm:pt-52 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="mb-4 inline-flex items-center gap-3 rounded-full border border-[#C8D8F6]/35 bg-[#101836]/75 px-3.5 py-2 text-white shadow-[0_0_34px_rgba(132,156,198,0.32)] backdrop-blur-xl sm:mb-5 sm:px-4"
        >
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? undefined : {
              scale: [1, 1.18, 1],
              boxShadow: [
                '0 0 0 0 rgba(169,188,225,0.15)',
                '0 0 0 9px rgba(169,188,225,0.02)',
                '0 0 0 0 rgba(169,188,225,0.15)',
              ],
            }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#A9BCE1] to-[#4E60A2]"
          >
            <Activity className="h-4 w-4" strokeWidth={2.6} />
          </motion.span>
          <span className="text-xs font-bold tracking-wide sm:text-sm">
            {language === 'ar' ? 'نبض الذكاء الطبي' : 'Medical AI Pulse'}
          </span>
          <span className="flex h-5 items-center gap-1" aria-hidden="true">
            {[0, 1, 2, 3].map((bar) => (
              <motion.span
                key={bar}
                className="h-4 w-1 origin-center rounded-full bg-[#C8D8F6]"
                animate={reduceMotion ? undefined : { scaleY: [0.35, 1, 0.35] }}
                transition={{ duration: 0.85, delay: bar * 0.12, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="heading-display flex min-h-[120px] max-w-5xl flex-wrap items-center justify-center text-4xl font-extrabold leading-[1.35] tracking-tight text-white sm:min-h-[160px] sm:text-6xl lg:min-h-[190px] lg:text-7xl"
        >
          <span className="bg-gradient-to-r from-white via-[#C7D3ED] to-[#849CC6] bg-clip-text text-transparent drop-shadow-md">
            {currentText || '\u00A0'}
          </span>
          <span className="ms-2 inline-block h-[0.82em] w-[3px] rounded-full bg-[#849CC6] align-middle shadow-[0_0_16px_rgba(132,156,198,0.9)] animate-pulse sm:ms-3 sm:w-[5px]" aria-hidden="true" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="mt-6 max-w-3xl text-base font-normal leading-relaxed text-slate-200 sm:text-lg lg:text-xl"
        >
          {t.hero.desc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
          className="mt-8 flex w-full flex-col items-center gap-4 sm:mt-10 sm:w-auto sm:flex-row"
        >
          <a href={SHOW_PRICING ? "#pricing" : "#cta"} className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#4E60A2] to-[#1E285A] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-[#4E60A2]/25 transition-all hover:-translate-y-0.5 hover:from-[#5E70B2] hover:to-[#283264] hover:shadow-[#4E60A2]/40 active:scale-[0.98] sm:w-auto">
            <Sparkles className="h-4 w-4" />
            <span>{t.hero.startFreeTrial}</span>
            {dir === 'rtl' ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </a>
          <a href="#video" className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/90 px-7 py-4 text-sm font-bold text-slate-800 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-[#4E60A2]/30 hover:bg-slate-50 sm:w-auto">
            <Play className="h-4 w-4 fill-[#4E60A2] text-[#4E60A2]" />
            <span>{t.hero.bookDemo}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
