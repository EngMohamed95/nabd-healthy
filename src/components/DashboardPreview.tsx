import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Clock, Activity, CheckCircle2, QrCode, AlertCircle, FileText } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { getLiveWaitingList, WaitingListPatient } from '../lib/api';

export default function DashboardPreview() {
  const { t, language } = useLanguage();
  const [patients, setPatients] = useState<WaitingListPatient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<WaitingListPatient | null>(null);

  useEffect(() => {
    getLiveWaitingList().then(data => {
      setPatients(data);
      if (data.length > 0) {
        setSelectedPatient(data[0]);
      }
    });
  }, []);

  return (
    <section className="relative w-full max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E9ECF5] border border-[#D5DAE8] text-[#4E60A2] text-xs font-bold mb-4">
          <Activity className="w-3.5 h-3.5" />
          <span>{t.dashboard.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold heading-display text-slate-900 mb-4 leading-tight tracking-tight">
          {t.dashboard.titleLine1} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E285A] via-[#4E60A2] to-[#849CC6]">
            {t.dashboard.titleLine2}
          </span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          {t.dashboard.desc}
        </p>
      </div>

      {/* Main Dashboard Interactive Mockup */}
      <div className="glass-card rounded-3xl p-3 sm:p-5 border border-[#CFD5E4] shadow-2xl overflow-hidden relative" dir="ltr">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-900 text-white rounded-2xl mb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold font-mono">NABD CLINICAL OPERATING SYSTEM</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-300 font-mono">DR. TAREK AL-JABERI</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#849CC6]" />
              <span>Queue: {patients.length} Patients</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Avg Time: 6.2 mins</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#4E60A2]/30 px-2.5 py-1 rounded-lg border border-[#4E60A2]/40 text-[#849CC6]">
              <QrCode className="w-3.5 h-3.5" />
              <span>Scanner: Active</span>
            </div>
          </div>
        </div>

        {/* 3-Column Workstation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Column 1: Live Waiting List */}
          <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-4 border border-slate-200 text-start flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#4E60A2]" />
                  <span>قائمة الانتظار والفرز (Live Queue)</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-[#E9ECF5] text-[#4E60A2] rounded-md font-mono">
                  {patients.length} مرضى
                </span>
              </div>

              {/* Patient Queue Cards */}
              <div className="space-y-2.5">
                {patients.map((p) => {
                  const isSelected = selectedPatient?.id === p.id;
                  const isUrgent = p.triagePriority === 'high' || p.triagePriority === 'critical';
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPatient(p)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-white border-[#4E60A2] shadow-md shadow-[#4E60A2]/10 ring-2 ring-[#E9ECF5]' 
                          : 'bg-white/70 border-slate-200/80 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{p.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">({p.age}y)</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          p.status === 'in_exam'
                            ? 'bg-emerald-100 text-emerald-700'
                            : p.status === 'completed'
                            ? 'bg-slate-200 text-slate-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {p.status === 'in_exam' ? 'بالكشف الآن' : p.status === 'completed' ? 'اكتمل الكشف' : 'في الانتظار'}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 line-clamp-1 mb-2">
                        {p.chiefComplaint}
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-100 font-mono">
                        <span>Arrival: {p.arrivalTime}</span>
                        {isUrgent && (
                          <span className="text-red-500 font-bold flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>PRIORITY</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
              <span>تحديث تلقائي كل 10 ثوانٍ</span>
              <span className="text-[#4E60A2] font-bold">Auto-Sync On</span>
            </div>
          </div>

          {/* Column 2: Active Clinical Encounter & SOAP Charting */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-slate-200 text-start flex flex-col justify-between shadow-xs">
            <div>
              {/* Encounter Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E9ECF5] text-[#4E60A2] flex items-center justify-center font-bold font-mono">
                    {selectedPatient ? selectedPatient.id.replace('PAT-', '#') : '#1082'}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {selectedPatient ? selectedPatient.name : 'أحمد محمود سالم'}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      File ID: {selectedPatient?.id} • Consultant: {selectedPatient?.assignedDoctor}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>SOAP Generated</span>
                  </span>
                </div>
              </div>

              {/* Consultation Body */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#4E60A2] mb-1">
                    Subjective (الشكوى والتاريخ)
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedPatient?.chiefComplaint}. ألم مستمر منذ 48 ساعة يزداد بالمجهود بدون انتشار، مع استقرار في العلامات الحيوية.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 mb-1">
                    Objective (العلامات الحيوية)
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-800">
                    <div className="bg-white p-2 rounded border border-slate-200 text-center">BP: 135/85</div>
                    <div className="bg-white p-2 rounded border border-slate-200 text-center">HR: 78 bpm</div>
                    <div className="bg-white p-2 rounded border border-slate-200 text-center">O2: 98%</div>
                    <div className="bg-white p-2 rounded border border-slate-200 text-center">Temp: 37.1°C</div>
                  </div>
                </div>
              </div>

              {/* Treatment Plan & Requisition Quick Trigger */}
              <div className="p-3.5 ai-suggested-field mb-2">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#849CC6]">Assessment & Orders (الخطة والتحاليل)</span>
                  <span className="ai-suggestion-badge">مقترح تلقائي</span>
                </div>
                <div className="text-xs text-slate-800 leading-relaxed space-y-1">
                  <div>1. طلب تخطيط قلب (12-Lead ECG) وفحص إنزيمات القلب (hs-Troponin).</div>
                  <div>2. وصف Pantoprazole 40mg قبل الإفطار ومسكن عند اللزوم.</div>
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">Barcode: REQ-849102 Generated</span>
              <a 
                href="#requisition"
                className="px-4 py-2 bg-[#4E60A2] hover:bg-[#1E285A] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                طباعة الفحص الفوري
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
