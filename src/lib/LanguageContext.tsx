import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from './i18n';
import { LEGAL_PAGES, type LegalPageId } from './legal';

export type Page = 'home' | LegalPageId;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  dir: 'ltr' | 'rtl';
  page: Page;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Arabic lives at "/", English at "/en/" — each URL is a separately indexable page.
 * Legal pages sit under each language root: /privacy/, /en/privacy/, ...
 */
export const pathFor = (lang: Language, page: Page = 'home') =>
  (lang === 'en' ? '/en/' : '/') + (page === 'home' ? '' : `${page}/`);

const languageFromPath = (): Language =>
  typeof window !== 'undefined' && /^\/en(\/|$)/.test(window.location.pathname) ? 'en' : 'ar';

const pageFromPath = (): Page => {
  if (typeof window === 'undefined') return 'home';
  const slug = window.location.pathname.replace(/^\/en(?=\/|$)/, '').replace(/^\/|\/$/g, '');
  return (LEGAL_PAGES as readonly string[]).includes(slug) ? (slug as LegalPageId) : 'home';
};

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
  initialLanguage?: Language;
  initialPage?: Page;
}> = ({ children, initialLanguage, initialPage }) => {
  const [language, setLanguageState] = useState<Language>(() => initialLanguage ?? languageFromPath());
  const [page] = useState<Page>(() => initialPage ?? pageFromPath());

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    const path = pathFor(lang, page);
    if (window.location.pathname !== path) {
      window.history.replaceState(null, '', path + window.location.hash);
    }
  };

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language], dir, page }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

/** Link to a section of the home page that works from any page (plain "#id" on home). */
export const useHomeHref = () => {
  const { language, page } = useLanguage();
  return (hash: string) => (page === 'home' ? hash : pathFor(language, 'home') + (hash === '#' ? '' : hash));
};
