import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Globe2,
  LoaderCircle,
  MapPin,
  RefreshCw,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import {
  getSubscriptionPlans,
  type SubscriptionCountryCode,
  type SubscriptionPlan,
} from '../lib/api';

const countries: { code: SubscriptionCountryCode; ar: string; en: string }[] = [
  { code: 'EG', ar: 'مصر', en: 'Egypt' },
  { code: 'SA', ar: 'السعودية', en: 'Saudi Arabia' },
  { code: 'GLOBAL', ar: 'باقي الدول', en: 'Other countries' },
];

function detectCountry(): SubscriptionCountryCode {
  const locale = navigator.language.toUpperCase();
  if (locale.endsWith('-EG')) return 'EG';
  if (locale.endsWith('-SA')) return 'SA';
  return 'GLOBAL';
}

export default function Pricing() {
  const { t, dir, language } = useLanguage();
  const [countryCode, setCountryCode] = useState<SubscriptionCountryCode>(detectCountry);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(false);

    getSubscriptionPlans(countryCode, controller.signal)
      .then(setPlans)
      .catch((requestError: unknown) => {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
        console.error('[Nabd API] Could not load subscription plans.', requestError);
        setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [countryCode, reloadKey]);

  const copy = useMemo(() => language === 'ar' ? {
    sectionDescription: 'اختر الباقة المناسبة لاحتياجات عيادتك؛ تُحدّث الخطط والأسعار تلقائيًا من نظام نبض.',
    countryLabel: 'اختر بلدك لعرض السعر المناسب',
    loading: 'جارٍ تحميل أحدث الباقات والأسعار...',
    error: 'تعذر تحميل الأسعار حاليًا. حاول مرة أخرى.',
    retry: 'إعادة المحاولة',
    perMonth: '/ شهريًا',
    perYear: '/ سنويًا',
    exams: (count: string) => `${count} كشف طبي`,
    messages: (count: string) => `${count} رسالة مع نبضة`,
    clinics: (count: string) => `${count} عيادة`,
    assistants: (count: string) => `${count} حساب مساعد`,
    selectPlan: 'اشترك في هذه الباقة',
  } : {
    sectionDescription: 'Choose the right plan for your clinic. Plans and prices update automatically from Nabd.',
    countryLabel: 'Choose your country to see local pricing',
    loading: 'Loading the latest plans and prices...',
    error: 'Prices are unavailable right now. Please try again.',
    retry: 'Try again',
    perMonth: '/ month',
    perYear: '/ year',
    exams: (count: string) => `${count} examinations`,
    messages: (count: string) => `${count} Nabda messages`,
    clinics: (count: string) => `${count} clinics`,
    assistants: (count: string) => `${count} assistant accounts`,
    selectPlan: 'Subscribe to this plan',
  }, [language]);

  const formatCount = (value: number) => new Intl.NumberFormat(language === 'ar' ? 'ar' : 'en').format(value);

  const formatPrice = (plan: SubscriptionPlan) => {
    const price = plan.Prices.find((item) => item.IsActive);
    if (!price) return '—';
    return new Intl.NumberFormat(language === 'ar' ? 'ar' : 'en', {
      style: 'currency',
      currency: price.Currency,
      maximumFractionDigits: price.Amount % 1 === 0 ? 0 : 2,
    }).format(price.Amount);
  };

  const getPeriod = (plan: SubscriptionPlan) => {
    if (language === 'ar' && plan.BillingPeriodName) return `/ ${plan.BillingPeriodName}`;
    return plan.DurationInDays >= 365 ? copy.perYear : copy.perMonth;
  };

  return (
    <section id="pricing" className="relative w-full py-24 border-t border-[#CFD5E4]/40 bg-slate-50/50 overflow-x-hidden">
      <div className="absolute top-0 end-1/4 w-[600px] h-[600px] bg-[#4E60A2]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E9ECF5] border border-[#D5DAE8] text-[#4E60A2] text-xs font-bold mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>{t.pricing.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold heading-display mb-4 text-slate-900 tracking-tight">
            {t.pricing.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
            {copy.sectionDescription}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <MapPin className="w-4 h-4 text-[#4E60A2]" />
              <span>{copy.countryLabel}</span>
            </div>
            <div className="inline-flex flex-wrap justify-center gap-1 rounded-2xl border border-[#D5DAE8] bg-white/90 p-1.5 shadow-sm" role="group" aria-label={copy.countryLabel}>
              {countries.map((country) => (
                <button
                  type="button"
                  key={country.code}
                  onClick={() => setCountryCode(country.code)}
                  aria-pressed={countryCode === country.code}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    countryCode === country.code
                      ? 'bg-[#4E60A2] text-white shadow-md'
                      : 'text-slate-600 hover:bg-[#E9ECF5] hover:text-[#1E285A]'
                  }`}
                >
                  {country.code === 'GLOBAL' ? <Globe2 className="w-3.5 h-3.5" /> : <Building2 className="w-3.5 h-3.5" />}
                  {language === 'ar' ? country.ar : country.en}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-[#4E60A2]" role="status">
            <LoaderCircle className="h-8 w-8 animate-spin" />
            <span className="text-sm font-semibold">{copy.loading}</span>
          </div>
        )}

        {!isLoading && error && (
          <div className="mx-auto flex min-h-64 max-w-lg flex-col items-center justify-center gap-4 rounded-3xl border border-red-200 bg-red-50/70 p-8 text-center" role="alert">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <p className="text-sm font-semibold text-red-800">{copy.error}</p>
            <button type="button" onClick={() => setReloadKey((key) => key + 1)} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-red-700 shadow-sm transition hover:bg-red-100">
              <RefreshCw className="h-3.5 w-3.5" />
              {copy.retry}
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 items-stretch">
            {plans.map((plan, index) => {
              const isPopular = plan.Code.toLowerCase() === 'pro';
              const features = [
                copy.exams(formatCount(plan.BaseMaxExaminations)),
                copy.messages(formatCount(plan.BaseMaxNabdaMessages)),
                copy.clinics(formatCount(plan.BaseMaxClinics)),
                copy.assistants(formatCount(plan.BaseMaxAssistants)),
              ];

              return (
                <motion.div
                  key={plan.Id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-12% 0px" }}
                  transition={{ delay: index * 0.08 }}
                  className={`rounded-3xl p-6 border flex flex-col justify-between transition-all ${
                    isPopular
                      ? 'glass-card-active border-[#4E60A2] shadow-2xl relative z-10'
                      : 'glass-card border-[#CFD5E4]/60 hover:border-[#CFD5E4]'
                  }`}
                >
                  <div>
                    {isPopular && (
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#4E60A2] text-white text-[11px] font-bold uppercase tracking-wider mb-4 shadow-sm">
                        <Sparkles className="w-3 h-3" />
                        <span>{t.pricing.mostPopular}</span>
                      </div>
                    )}

                    <div className="mb-6 text-start">
                      <h3 className="text-xl font-bold mb-2 text-slate-900">{language === 'ar' ? plan.NameAr : plan.NameEn}</h3>
                      <p className="text-[#4E60A2] text-xs mb-6 min-h-[18px]" dir="ltr">
                        {language === 'ar' ? plan.NameEn : plan.NameAr}
                      </p>
                      <div className="flex flex-wrap items-baseline gap-1 text-slate-900" dir={dir}>
                        <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                          {formatPrice(plan)}
                        </span>
                        <span className="text-slate-500 text-xs font-medium">{getPeriod(plan)}</span>
                      </div>
                    </div>

                    <div className="space-y-3.5 mb-8 text-start">
                      {features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs text-slate-700 font-medium leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href="https://aidocotr.runasp.net/login"
                    className={`w-full py-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      isPopular
                        ? 'bg-[#4E60A2] hover:bg-[#1E285A] text-white shadow-lg shadow-[#4E60A2]/25 hover:shadow-[#4E60A2]/40 hover:scale-[1.02]'
                        : 'bg-[#E9ECF5] hover:bg-[#D2D7E6] text-[#4E60A2]'
                    }`}
                  >
                    <span>{copy.selectPlan}</span>
                    {dir === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </a>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
