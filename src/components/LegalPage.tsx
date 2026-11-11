import { ShieldCheck, FileText, Lock, ChevronLeft, ChevronRight, CalendarDays, Info, ExternalLink } from 'lucide-react';
import { useLanguage, pathFor } from '../lib/LanguageContext';
import { LEGAL_PAGES, legalContent, legalUi, type LegalPageId } from '../lib/legal';

const ICONS = { privacy: Lock, terms: FileText, security: ShieldCheck } satisfies Record<LegalPageId, unknown>;

export default function LegalPage({ id }: { id: LegalPageId }) {
  const { language, dir } = useLanguage();
  const doc = legalContent[language][id];
  const ui = legalUi[language];
  const Icon = ICONS[id];
  const Chevron = dir === 'rtl' ? ChevronLeft : ChevronRight;
  const others = LEGAL_PAGES.filter((p) => p !== id);

  return (
    <div className="w-full">
      {/* Header band: dark like the home hero so the floating navbar stays readable */}
      <section className="relative w-full overflow-hidden text-white pt-32 sm:pt-36 pb-14 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#141838] via-[#1E285A] to-[#1E285A]" />
        <div className="absolute -top-24 start-1/2 w-[640px] h-[380px] bg-[#4E60A2]/30 rounded-full blur-[160px] pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-6">
            <a href={pathFor(language)} className="hover:text-white transition-colors">{ui.home}</a>
            <Chevron className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-white">{doc.name}</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex shrink-0 w-14 h-14 rounded-2xl bg-white/10 border border-white/15 items-center justify-center backdrop-blur-md">
              <Icon className="w-7 h-7 text-[#849CC6]" />
            </div>
            <div className="min-w-0">
              <h1 className="text-3xl sm:text-5xl font-extrabold heading-display tracking-tight leading-tight mb-4">
                {doc.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">{doc.intro}</p>
              <div className="inline-flex items-center gap-2 mt-6 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-slate-200">
                <CalendarDays className="w-3.5 h-3.5 text-[#849CC6]" />
                <span>{ui.lastUpdated}: {ui.updatedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 text-start">
        {/* Table of contents (desktop only; short enough to stay sticky) */}
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
          <div className="sticky top-28 rounded-2xl bg-white border border-[#CFD5E4]/70 p-5 shadow-xs">
            <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide mb-3">{ui.onThisPage}</h2>
            <ol className="space-y-1.5 text-xs font-medium text-slate-600">
              {doc.sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex gap-2 py-0.5 hover:text-[#4E60A2] transition-colors">
                    <span className="text-slate-400 tabular-nums">{i + 1}.</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          {/* Document body */}
          <article className="rounded-3xl bg-white border border-[#CFD5E4]/70 shadow-sm p-6 sm:p-10">
            {doc.sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                className="scroll-mt-28 [&:not(:first-child)]:mt-10 [&:not(:first-child)]:pt-10 [&:not(:first-child)]:border-t border-slate-100"
              >
                <h2 className="flex items-baseline gap-3 text-lg sm:text-xl font-extrabold text-slate-900 heading-display mb-4">
                  <span className="text-[#4E60A2] tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <span>{s.title}</span>
                </h2>
                {s.paragraphs?.map((p, j) => (
                  <p key={j} className="text-sm sm:text-[15px] text-slate-600 leading-loose mb-3">{p}</p>
                ))}
                {s.bullets && (
                  <ul className="space-y-2.5 my-4">
                    {s.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4E60A2] shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.after?.map((p, j) => (
                  <p key={j} className="text-sm sm:text-[15px] text-slate-600 leading-loose mb-3">{p}</p>
                ))}
                {s.note && (
                  <div className="flex gap-3 mt-4 p-4 rounded-2xl bg-[#4E60A2]/[0.07] border border-[#4E60A2]/20 text-sm font-semibold text-[#1E285A] leading-relaxed">
                    <Info className="w-5 h-5 shrink-0 text-[#4E60A2]" />
                    <span>{s.note}</span>
                  </div>
                )}
              </section>
            ))}
          </article>

          {/* Related documents + support */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white border border-[#CFD5E4]/70 p-6 shadow-xs">
              <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide mb-3">{ui.otherDocs}</h2>
              <ul className="space-y-2.5">
                {others.map((p) => {
                  const OtherIcon = ICONS[p];
                  return (
                    <li key={p}>
                      <a
                        href={pathFor(language, p)}
                        className="flex items-center gap-2.5 text-sm font-bold text-slate-700 hover:text-[#4E60A2] transition-colors"
                      >
                        <OtherIcon className="w-4 h-4 text-[#4E60A2] shrink-0" />
                        <span>{legalContent[language][p].name}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-2xl bg-[#1E285A] text-white p-6 shadow-md">
              <h2 className="text-sm font-extrabold mb-2">{ui.questions}</h2>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{ui.questionsDesc}</p>
              <a
                href="https://app.nabdassist.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold rounded-xl transition-all"
              >
                <span>{ui.openSupport}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
