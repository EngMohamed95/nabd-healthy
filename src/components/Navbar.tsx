import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Globe, Sparkles, Menu, X, LogIn } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

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
    { href: "#features", label: language === 'ar' ? "المميزات" : "Features" },
    { href: "#demo", label: language === 'ar' ? "المختبر الذكي" : "AI Lab" },
    { href: "#requisition", label: language === 'ar' ? "الفحوصات" : "Requisitions" },
    { href: "#gallery", label: language === 'ar' ? "المعرض" : "Gallery" },
    { href: "#pricing", label: language === 'ar' ? "الأسعار" : "Pricing" },
  ];

  return (
    <motion.nav 
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-xl border-b border-indigo-100/70 shadow-sm py-2.5' 
          : 'bg-white/60 backdrop-blur-md border-b border-indigo-50/50 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7E6FFF] to-[#60A5FA] p-0.5 shadow-md group-hover:scale-105 transition-transform shrink-0">
            <div className="w-full h-full bg-white rounded-[9px] flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#7E6FFF] group-hover:animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col text-start">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 heading-display">
                {t.navbar.brand}
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-indigo-50 text-[#7E6FFF] border border-indigo-100 font-mono">
                v2.0
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium hidden sm:block mt-0.5">
              {t.navbar.subtitle}
            </span>
          </div>
        </a>
        
        {/* Navigation Links Pill */}
        <div className="hidden lg:flex items-center gap-1 p-1 bg-slate-100/80 border border-slate-200/70 rounded-full px-3 backdrop-blur-md">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-[#7E6FFF] hover:bg-white rounded-full transition-all duration-150 whitespace-nowrap"
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
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-indigo-50 hover:text-[#7E6FFF] border border-slate-200 rounded-full transition-all shadow-2xs cursor-pointer"
            title="تبديل اللغة / Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#7E6FFF]" />
            <span className="font-sans">{language === 'en' ? 'العربية' : 'EN'}</span>
          </button>

          {/* Login Link */}
          <a 
            href="https://aidocotr.runasp.net/login"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-[#7E6FFF] transition-colors"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{t.navbar.login}</span>
          </a>

          {/* Primary CTA */}
          <a 
            href="#demo"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#7E6FFF] to-[#5A47FF] hover:from-[#6b5bf7] hover:to-[#4e39f5] rounded-full transition-all shadow-md hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.navbar.getStarted}</span>
          </a>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
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
            className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-indigo-100 px-6 py-4 overflow-hidden shadow-lg"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-[#7E6FFF] hover:bg-indigo-50/60 rounded-xl transition-all text-start"
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
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-white bg-[#7E6FFF] rounded-xl shadow-md"
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
