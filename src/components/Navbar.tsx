import { motion } from 'motion/react';
import { Activity, Globe } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Navbar() {
  const { language, setLanguage, t, dir } = useLanguage();

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-black/20 border-b border-white/5"
    >
      <div className="flex items-center gap-2" dir="ltr">
        <Activity className="w-6 h-6 text-[var(--color-primary)]" />
        <span className="text-xl font-bold heading-display text-white">NexusAI</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
        <a href="#features" className="hover:text-white transition-colors">{t.navbar.features}</a>
        <a href="#demo" className="hover:text-white transition-colors">{t.navbar.demo}</a>
        <a href="#testimonials" className="hover:text-white transition-colors">{t.navbar.testimonials}</a>
        <a href="#pricing" className="hover:text-white transition-colors">{t.navbar.pricing}</a>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} 
          className="flex items-center gap-2 p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
        >
          <Globe className="w-5 h-5" />
          <span className="text-sm font-medium uppercase">{language === 'en' ? 'AR' : 'EN'}</span>
        </button>
        <button className="hidden md:block text-sm font-medium text-white/70 hover:text-white transition-colors">
          {t.navbar.login}
        </button>
        <button className="px-5 py-2 text-sm font-semibold text-black bg-white rounded-full hover:bg-gray-200 transition-colors">
          {t.navbar.getStarted}
        </button>
      </div>
    </motion.nav>
  );
}
