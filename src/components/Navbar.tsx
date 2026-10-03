import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Menu, X, LogIn } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import logoImg from '../images/nabd_logo.png';
import { SHOW_PRICING } from '../lib/featureFlags';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>("#");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isClickingRef = useRef(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navLinks = useMemo(() => [
    { href: "#", label: language === 'ar' ? "الرئيسية" : "Home" },
    { href: "#features", label: language === 'ar' ? "ماذا تقدم نبض؟" : "Features" },
    { href: "#about", label: language === 'ar' ? "عن المنصة" : "About" },
    ...(SHOW_PRICING ? [{ href: "#pricing", label: language === 'ar' ? "الأسعار" : "Pricing" }] : []),
    { href: "#cta", label: language === 'ar' ? "تواصل معنا" : "Contact" },
  ], [language]);

  // Handle immediate click to target section without lag or jump
  const handleNavClick = (href: string) => {
    setActiveSection(href);
    isClickingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickingRef.current = false;
    }, 1200);
  };

  // Scroll spy with accurate getBoundingClientRect calculation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Don't override active indicator while user-initiated smooth scroll is animating
      if (isClickingRef.current) return;

      if (window.scrollY < 180) {
        setActiveSection("#");
        return;
      }

      // Check sections from bottom to top of page
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const link = navLinks[i];
        if (link.href.startsWith("#") && link.href.length > 1) {
          const el = document.querySelector(link.href);
          if (el) {
            const rect = el.getBoundingClientRect();
            // A section is active when its top is within viewport header area and bottom is still visible
            if (rect.top <= 250 && rect.bottom > 120) {
              setActiveSection(link.href);
              return;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-[20px] sm:top-[22px] inset-x-0 z-50 px-[20px] sm:px-[22px] pointer-events-none"
    >
      {/* Ultra-transparent Glass Dock spanning image width with uniform margin */}
      <nav
        className={`w-full rounded-2xl border px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between pointer-events-auto transition-all duration-300 ${
          isScrolled
            ? 'bg-[#090D24]/85 backdrop-blur-xl border-white/15 shadow-2xl shadow-black/50'
            : 'bg-white/[0.03] backdrop-blur-md border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.12)]'
        }`}
      >

        {/* Right side in RTL: Brand Logo & Title */}
        <a
          href="#"
          onClick={() => handleNavClick("#")}
          className="flex items-center gap-3 shrink-0 group"
        >
          <img
            src={logoImg}
            alt="Nabd Logo"
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-xl shadow-md group-hover:scale-105 transition-transform shrink-0"
          />
          <div className="flex flex-col text-start">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-lg sm:text-xl font-extrabold text-white tracking-tight heading-display">
                {t.navbar.brand}
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-medium text-slate-300 hidden sm:block mt-0.5">
              {t.navbar.subtitle}
            </span>
          </div>
        </a>

        {/* Center: Navigation Links with Active Underline Indicator */}
        <div className="hidden lg:flex items-center gap-3 sm:gap-4 xl:gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-3 py-1.5 text-xs sm:text-sm font-bold transition-colors duration-150 whitespace-nowrap ${
                  isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 inset-x-2 h-[2.5px] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Left side in RTL: Language switcher + Action Button */}
        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white/90 hover:text-white transition-colors cursor-pointer px-2.5 py-1.5 rounded-lg hover:bg-white/10"
            title="تبديل اللغة / Switch Language"
          >
            <Globe className="w-4 h-4 text-white/80" />
            <span className="font-sans font-bold">{language === 'en' ? 'العربية' : 'EN'}</span>
          </button>

          {/* Login Link (desktop) */}
          <a
            href="https://aidocotr.runasp.net/login"
            target="_blank"
            rel="noreferrer"
            className="hidden xl:flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-300 hover:text-white px-2.5 py-1.5 transition-colors"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{t.navbar.login}</span>
          </a>

          {/* Action Button styled as the sleek dark-glass pill button */}
          <a
            href={SHOW_PRICING ? "#pricing" : "#cta"}
            onClick={() => handleNavClick(SHOW_PRICING ? "#pricing" : "#cta")}
            className="flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95 whitespace-nowrap backdrop-blur-md"
          >
            <span>{t.navbar.getStarted}</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto w-full mt-2 rounded-2xl bg-[#090D24]/95 backdrop-blur-2xl border border-white/15 p-4 shadow-2xl text-start"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    handleNavClick(link.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition-all ${
                    activeSection === link.href
                      ? 'text-white bg-white/15'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
                <a
                  href="https://aidocotr.runasp.net/login"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-white bg-white/10 rounded-xl"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{t.navbar.login}</span>
                </a>
                <a
                  href={SHOW_PRICING ? "#pricing" : "#cta"}
                  onClick={() => {
                    handleNavClick(SHOW_PRICING ? "#pricing" : "#cta");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-white bg-white/20 border border-white/30 rounded-xl shadow-md"
                >
                  <span>{t.navbar.getStarted}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
