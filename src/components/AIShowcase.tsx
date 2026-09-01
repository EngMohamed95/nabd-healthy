import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mic, FileText, CheckCircle2, Copy, Sparkles, Printer, Activity, Heart, Stethoscope } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { generateSoapReport, SoapReport } from '../lib/api';

export default function AIShowcase() {
  const { t, language, dir } = useLanguage();
  const [selectedScenario, setSelectedScenario] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [report, setReport] = useState<SoapReport | null>(null);
  const [displayedText, setDisplayedText] = useState<string>("");

  const scenarios = [
    {
      id: 0,
      label_ar: "ألم بالصدر (باطنة / قلب)",
      label_en: "Chest Pain (Cardiology)",
      transcript_ar: "المريض ذكر يبلغ 45 سنة، يشتكي من نوبات ألم ضاغط خلف عظم القص مستمرة منذ 48 ساعة تزداد مع صعود الدرج، مترافقة مع ضيق تنفس خفيف. ينفي وجود تعرق بارد أو ألم في الذراع الأيسر. تاريخه المرضي يشمل ارتفاع ضغط الدم فقط.",
      transcript_en: "45-year-old male presents with retrosternal pressure chest pain for 48 hours, worse on exertion with mild shortness of breath. No cold diaphoresis or radiating arm pain. History of essential hypertension."
    },
    {
      id: 1,
      label_ar: "حرارة وسعال (أطفال)",
      label_en: "Fever & Cough (Pediatrics)",
      transcript_ar: "طفل يبلغ من العمر 7 سنوات، تعاني الأم من ارتفاع حرارته إلى 38.8 درجة منذ 3 أيام مع سعال جاف مستمر ونقص في الشهية. بالفحص: احتقان بالحلق بدون تضخم باللوزتين، وصدر سليم بدون أزيز.",
      transcript_en: "7-year-old child presenting with fever up to 38.8°C for 3 days, persistent dry cough, and reduced appetite. Examination shows pharyngeal erythema without tonsillar exudate, lungs clear."
    },
    {
      id: 2,
      label_ar: "متابعة سكري وضغط (عام)",
      label_en: "Diabetes & HTN Follow-up",
      transcript_ar: "مريضة تبلغ 52 سنة تراجع للمتابعة الدورية للسكري النوع الثاني وارتفاع الضغط. السكر التراكمي الأخير 7.4%، تشكو من تنميل خفيف في أصابع القدمين. ضغط الدم 138/86، لا توجد قرح بالقدم.",
      transcript_en: "52-year-old female for routine Type 2 Diabetes and Hypertension follow-up. Last HbA1c is 7.4%, complains of mild distal numbness in bilateral toes. BP 138/86, feet intact."
    }
  ];

  // Load report and simulate live transcription streaming
  useEffect(() => {
    let isCancelled = false;
    setIsRecording(true);
    setDisplayedText("");

    const currentTranscript = language === 'ar' 
      ? scenarios[selectedScenario].transcript_ar 
      : scenarios[selectedScenario].transcript_en;

    generateSoapReport(currentTranscript, language).then((res) => {
      if (!isCancelled) {
        setReport(res);
      }
    });

    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < currentTranscript.length) {
        setDisplayedText(currentTranscript.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsRecording(false);
      }
    }, 25);

    return () => {
      isCancelled = true;
      clearInterval(typingInterval);
    };
  }, [selectedScenario, language]);

  const handleCopy = () => {
    if (!report) return;
    const textToCopy = `
=== Nabd AI Medical Report ===
Subjective: ${report.subjective}
Objective: BP: ${report.objective.bloodPressure}, HR: ${report.objective.heartRate}, O2: ${report.objective.oxygenSaturation}, Temp: ${report.objective.temperature}
Assessment: ${report.assessment.join(', ')}
Plan: ${report.plan.join(', ')}
    `.trim();
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="demo" className="relative w-full max-w-7xl mx-auto py-20 px-6 xl:px-0">
      {/* Background glow */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4E60A2]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E9ECF5] border border-[#D5DAE8] text-[#4E60A2] text-xs font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.aiShowcase.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold heading-display text-slate-900 mb-4 tracking-tight">
          {t.aiShowcase.title}
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          {t.aiShowcase.desc}
        </p>

        {/* Interactive Scenario Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
          <span className="text-xs font-bold text-slate-500 hidden sm:inline">
            {t.aiShowcase.tryScenarios}
          </span>
          {scenarios.map((sc) => {
            const isSelected = selectedScenario === sc.id;
            const label = language === 'ar' ? sc.label_ar : sc.label_en;
            return (
              <button
                key={sc.id}
                onClick={() => setSelectedScenario(sc.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#4E60A2] text-white shadow-md shadow-[#4E60A2]/25 scale-[1.02]'
                    : 'bg-white text-slate-700 hover:bg-[#E9ECF5]/70 border border-slate-200'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Column: Real-time Audio Stream & Waveform (Col-5) */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-[#CFD5E4]/70 relative overflow-hidden">
          <div>
            {/* Header / Status */}
            <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-100">
              <div className="flex items-center gap-3 text-start">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                  isRecording 
                    ? 'bg-red-50 text-red-500 ring-4 ring-red-100' 
                    : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {isRecording ? <Mic className="w-6 h-6 animate-pulse" /> : <CheckCircle2 className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    {isRecording ? t.aiShowcase.listening : t.aiShowcase.processingComplete}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isRecording ? t.aiShowcase.status1 : t.aiShowcase.status2}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 rounded-full border border-red-100 text-red-600 text-xs font-mono font-bold" dir="ltr">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>{isRecording ? 'LIVE STREAM' : 'COMPLETED'}</span>
              </div>
            </div>

            {/* Live Captured Speech Box */}
            <div className="text-start">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>{t.aiShowcase.liveVoiceNote}</span>
                <span className="text-[10px] text-[#4E60A2] font-mono">Neural Model: Nabd-Clinical-v4</span>
              </div>
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-[#D5DAE8]/40 text-xs leading-relaxed text-slate-800 font-sans min-h-[140px] relative">
                {displayedText}
                {isRecording && (
                  <span className="inline-block w-2 h-4 bg-[#4E60A2] mx-1 animate-pulse align-middle" />
                )}
              </div>
            </div>
          </div>

          {/* Dynamic Audio Visualizer Waves */}
          <div className="mt-8 pt-5 border-t border-slate-100">
            <div className="flex items-end justify-center gap-1.5 h-14 px-2">
              {Array.from({ length: 32 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={isRecording ? {
                    height: ['15%', '95%', '35%', '80%', '20%'][i % 5]
                  } : { height: '10%' }}
                  transition={isRecording ? {
                    duration: 0.3 + (i % 4) * 0.1,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  } : { duration: 0.4 }}
                  className="w-1.5 bg-gradient-to-t from-[#1E285A] via-[#4E60A2] to-[#849CC6] rounded-full"
                  style={{ height: '15%' }}
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mt-3">
              <span>Sampling: 48kHz / 24-bit</span>
              <span className="text-[#4E60A2] font-bold">Latency: 140ms</span>
            </div>
          </div>
        </div>

        {/* Right Column: Structured AI SOAP Medical Report (Col-7) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 border border-[#CFD5E4]/70 relative flex flex-col justify-between">
          <div>
            {/* Header with Format Badge and Copy Action */}
            <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-100">
              <div className="flex items-center gap-3 text-start">
                <div className="w-10 h-10 rounded-2xl bg-[#E9ECF5] text-[#4E60A2] flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">{t.aiShowcase.generatedReport}</h3>
                  <span className="inline-block text-[11px] font-mono font-bold text-[#4E60A2] bg-[#E9ECF5]/70 px-2 py-0.5 rounded mt-0.5">
                    {t.aiShowcase.soapFormat}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-[#E9ECF5] text-slate-700 hover:text-[#4E60A2] text-xs font-bold transition-colors border border-slate-200"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t.aiShowcase.copied : t.aiShowcase.copyReport}</span>
              </button>
            </div>

            {/* Structured SOAP Sections */}
            <div className="space-y-4 text-start">
              {/* 1. Subjective */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4E60A2] flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    {t.aiShowcase.subjective}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  {report ? report.subjective : "جاري استخراج الشكوى والتاريخ المرضي..."}
                </p>
              </div>

              {/* 2. Objective / Vitals */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5" />
                    {t.aiShowcase.objective}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" dir="ltr">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <div className="text-[10px] text-slate-500 font-bold">BP (الضغط)</div>
                    <div className="text-xs font-bold text-slate-800 font-mono mt-0.5">{report?.objective.bloodPressure || "--/--"}</div>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <div className="text-[10px] text-slate-500 font-bold">HR (النبض)</div>
                    <div className="text-xs font-bold text-slate-800 font-mono mt-0.5">{report?.objective.heartRate || "-- bpm"}</div>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <div className="text-[10px] text-slate-500 font-bold">O2 Sat (الأكسجين)</div>
                    <div className="text-xs font-bold text-slate-800 font-mono mt-0.5">{report?.objective.oxygenSaturation || "--%"}</div>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <div className="text-[10px] text-slate-500 font-bold">Temp (الحرارة)</div>
                    <div className="text-xs font-bold text-slate-800 font-mono mt-0.5">{report?.objective.temperature || "-- °C"}</div>
                  </div>
                </div>
              </div>

              {/* 3. Assessment & AI Suggested Fields */}
              <div className="p-4 ai-suggested-field shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#849CC6] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {t.aiShowcase.assessment}
                  </span>
                  <span className="ai-suggestion-badge">
                    {t.aiShowcase.aiBadge}
                  </span>
                </div>
                <ul className="text-xs text-slate-800 space-y-1.5">
                  {report?.assessment.map((ass, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#849CC6] font-bold">●</span>
                      <span>{ass}</span>
                    </li>
                  ))}
                </ul>

                {/* ICD-10 Tags */}
                <div className="mt-3 pt-2.5 border-t border-[#D5DAE8]/60 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold text-[#1E285A]">{t.aiShowcase.icd10}</span>
                  {report?.suggestedICD10.map((icd, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-[#D5DAE8] text-[#4E60A2] text-[10px] font-mono font-bold">
                      {icd.code} - {icd.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* 4. Plan & Orders */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                  {t.aiShowcase.plan}
                </div>
                <ul className="text-xs text-slate-700 space-y-1">
                  {report?.plan.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#4E60A2] font-bold">{i + 1}.</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Action: Print Medical Requisition */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              جاهز للربط مع الطابعات وأجهزة الاستقبال
            </span>
            <a 
              href="#requisition"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#E9ECF5] hover:bg-[#D5DAE8] text-[#4E60A2] rounded-xl text-xs font-bold transition-all border border-[#D5DAE8]"
            >
              <Printer className="w-4 h-4" />
              <span>{t.aiShowcase.printRequisitionBtn}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
