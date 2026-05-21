import { useLanguage } from '../lib/LanguageContext';
import { Activity } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full py-12 border-t border-blue-100/50 mt-20 relative z-10 bg-slate-100/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-4" dir="ltr">
            <Activity className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="text-xl font-bold heading-display text-slate-900">Nabd</span>
          </div>
          <p className="text-slate-500 text-sm">
            {t.footer.desc}
          </p>
        </div>
        <div>
          <h4 className="text-slate-800 font-semibold mb-4">{t.footer.product}</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li><a href="#" className="hover:text-blue-600 transition-colors">{t.navbar.features}</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">{t.navbar.pricing}</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">{t.footer.security}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-slate-800 font-semibold mb-4">{t.footer.company}</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li><a href="#" className="hover:text-blue-600 transition-colors">{t.footer.about}</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">{t.footer.blog}</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">{t.footer.contact}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-slate-800 font-semibold mb-4">{t.footer.legal}</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li><a href="#" className="hover:text-blue-600 transition-colors">{t.footer.privacy}</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">{t.footer.terms}</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">{t.footer.hipaa}</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-blue-100/50 text-sm text-slate-400 text-center" dir="ltr">
        © 2026 Nabd. All rights reserved.
      </div>
    </footer>
  );
}
