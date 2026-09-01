import { useLanguage } from '../lib/LanguageContext';
import { ShieldCheck, Heart, Sparkles, ExternalLink } from 'lucide-react';
import logoImg from '../images/nabd_logo.png';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="w-full py-14 border-t border-[#CFD5E4]/60 mt-20 relative z-10 bg-white/90 backdrop-blur-xl text-start">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Brand Col */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-4">
            <img src={logoImg} alt="Nabd Logo" className="w-10 h-10 object-contain rounded-xl shadow-md" />
            <div>
              <span className="text-xl font-bold heading-display text-slate-900">
                {t.navbar.brand}
              </span>
              <span className="text-xs text-slate-500 block">
                {t.navbar.subtitle}
              </span>
            </div>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm font-sans mb-6">
            {t.footer.brandDesc}
          </p>

          <a 
            href="https://aidocotr.runasp.net" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4E60A2] hover:underline"
          >
            <span>aidocotr.runasp.net</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Links Col 1 */}
        <div className="md:col-span-2">
          <h4 className="text-slate-900 font-bold text-sm mb-4">{t.footer.quickLinks}</h4>
          <ul className="space-y-2.5 text-xs font-medium text-slate-600">
            <li><a href="#features" className="hover:text-[#4E60A2] transition-colors">{t.footer.features}</a></li>
            <li><a href="#demo" className="hover:text-[#4E60A2] transition-colors">{t.footer.liveDemo}</a></li>
            <li><a href="#requisition" className="hover:text-[#4E60A2] transition-colors">{t.navbar.requisition}</a></li>
            <li><a href="#pricing" className="hover:text-[#4E60A2] transition-colors">{t.footer.pricing}</a></li>
          </ul>
        </div>

        {/* Links Col 2 */}
        <div className="md:col-span-2">
          <h4 className="text-slate-900 font-bold text-sm mb-4">{t.footer.security}</h4>
          <ul className="space-y-2.5 text-xs font-medium text-slate-600">
            <li><a href="#" className="hover:text-[#4E60A2] transition-colors">{t.footer.hipaa}</a></li>
            <li><a href="#" className="hover:text-[#4E60A2] transition-colors">{t.footer.privacy}</a></li>
            <li><a href="#" className="hover:text-[#4E60A2] transition-colors">{t.footer.terms}</a></li>
          </ul>
        </div>

        {/* App Portal Col */}
        <div className="md:col-span-3">
          <h4 className="text-slate-900 font-bold text-sm mb-4">{t.footer.loginApp}</h4>
          <p className="text-xs text-slate-500 mb-4">
            الوصول المباشر إلى واجهة الطبيب، قائمة الانتظار، وطباعة الروشتات.
          </p>
          <a
            href="https://aidocotr.runasp.net/login"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-[#4E60A2] hover:bg-[#1E285A] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
          >
            <span>فتح برنامج نبض السريري</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>{t.footer.copyright}</div>
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <span>Built with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>for Healthcare Professionals</span>
        </div>
      </div>
    </footer>
  );
}
