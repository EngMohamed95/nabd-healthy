import { useLanguage } from '../lib/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full py-12 border-t border-white/5 mt-20 relative z-10 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <span className="text-xl font-bold heading-display text-white" dir="ltr">Nabd.</span>
          <p className="mt-4 text-white/50 text-sm">
            {t.footer.desc}
          </p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">{t.footer.product}</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="#" className="hover:text-white transition-colors">{t.navbar.features}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t.navbar.pricing}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t.footer.security}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">{t.footer.company}</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="#" className="hover:text-white transition-colors">{t.footer.about}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t.footer.blog}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t.footer.contact}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">{t.footer.legal}</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t.footer.hipaa}</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-sm text-white/30 text-center" dir="ltr">
        © 2026 Nabd. All rights reserved.
      </div>
    </footer>
  );
}
