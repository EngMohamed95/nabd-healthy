import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Sparkles, Menu, X, LogIn } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import logoImg from '../images/nabd_logo.png';

export default function Navbar() {
  const { language, setLanguage, t, dir } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: language === 'ar' ? "نبذة عن نبض" : "About" },
    { href: "#features", label: language === 'ar' ? "ماذا تقدم نبض؟" : "Features" },
    { href: "#safety", label: language === 'ar' ? "دقة المعلومات" : "Safety" },
    { href: "#efficiency", label: language === 'ar' ? "توفير الوقت" : "Efficiency" },
    { href: "#kpi", label: language === 'ar' ? "المؤشرات" : "KPIs" },
    { href: "#ecosystem", label: language === 'ar' ? "المنظومة" : "Ecosystem" },
    { href: "#pricing", label: language === 'ar' ? "الأسعار" : "Pricing" },
  ];

  return (
    <motion.nav 
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-[#D5DAE8]/70 shadow-sm py-2.5'
          : 'bg-transparent border-b border-white/0 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-2.5 shrink-0 group">
          <img src={logoImg} alt="Nabd Logo" className="w-9 h-9 object-contain rounded-xl shadow-md group-hover:scale-105 transition-transform shrink-0" />
          <div className="flex flex-col text-start">
            <div className="flex items-center gap-1.5 leading-none">
              <span className={`text-xl font-extrabold tracking-tight heading-display transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                {t.navbar.brand}
              </span>
              <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded border font-mono transition-colors ${scrolled ? 'bg-[#E6E9F2] text-[#4E60A2] border-[#D5DAE8]' : 'bg-white/10 text-white border-white/20'}`}>
                v2.0
              </span>
            </div>
            <span className={`text-[10px] font-medium hidden sm:block mt-0.5 transition-colors ${scrolled ? 'text-slate-500' : 'text-slate-300'}`}>
              {t.navbar.subtitle}
            </span>
          </div>
        </a>

        {/* Navigation Links Pill */}
        <div className={`hidden lg:flex items-center gap-1 p-1 rounded-full px-3 backdrop-blur-md border transition-colors ${scrolled ? 'bg-slate-100/80 border-slate-200/70' : 'bg-white/10 border-white/20'}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-150 whitespace-nowrap ${scrolled ? 'text-slate-700 hover:text-[#4E60A2] hover:bg-white' : 'text-white/90 hover:text-white hover:bg-white/10'}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher Button */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border rounded-full transition-all shadow-2xs cursor-pointer ${scrolled ? 'text-slate-700 bg-white hover:bg-[#E9ECF5] hover:text-[#4E60A2] border-slate-200' : 'text-white bg-white/10 hover:bg-white/20 border-white/20'}`}
            title="تبديل اللغة / Switch Language"
          >
            <Globe className={`w-3.5 h-3.5 ${scrolled ? 'text-[#4E60A2]' : 'text-white'}`} />
            <span className="font-sans">{language === 'en' ? 'العربية' : 'EN'}</span>
          </button>

          {/* Login Link */}
          <a
            href="https://aidocotr.runasp.net/login"
            target="_blank"
            rel="noreferrer"
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-colors ${scrolled ? 'text-slate-700 hover:text-[#4E60A2]' : 'text-white/90 hover:text-white'}`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{t.navbar.login}</span>
          </a>

          {/* Primary CTA */}
          <a
            href="#demo"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#4E60A2] to-[#1E285A] hover:from-[#5E70B2] hover:to-[#283264] rounded-full transition-all shadow-md hover:shadow-[#4E60A2]/25 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.navbar.getStarted}</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-[#D5DAE8] px-6 py-4 overflow-hidden shadow-lg"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-[#4E60A2] hover:bg-[#E9ECF5]/60 rounded-xl transition-all text-start"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 mt-1 border-t border-slate-100 flex flex-col gap-2">
                <a
                  href="https://aidocotr.runasp.net/login"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-slate-700 bg-slate-100 rounded-xl"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{t.navbar.login}</span>
                </a>
                <a
                  href="#demo"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-white bg-[#4E60A2] hover:bg-[#1E285A] rounded-xl shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t.navbar.getStarted}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
