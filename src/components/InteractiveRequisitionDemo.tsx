import { useState } from 'react';
import { motion } from 'motion/react';
import { Printer, QrCode, Barcode, FileCheck, Building2, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { createMockRequisition, RequisitionOrder } from '../lib/api';

export default function InteractiveRequisitionDemo() {
  const { t, language } = useLanguage();
  const [requisition, setRequisition] = useState<RequisitionOrder>(createMockRequisition());
  const [isPrinting, setIsPrinting] = useState<boolean>(false);

  const handlePrint = () => {
    setIsPrinting(true);
    const printWindow = window.open('', '_blank', 'width=900,height=800');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html dir="${language === 'ar' ? 'rtl' : 'ltr'}" lang="${language}">
        <head>
          <meta charset="utf-8" />
          <title>Medical Requisition - ${requisition.barcode}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap');
            * { box-sizing: border-box; font-family: 'Cairo', sans-serif; }
            body { padding: 30px; background: #fff; color: #1e293b; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #4E60A2; padding-bottom: 15px; margin-bottom: 20px; }
            .badge { background: #fee2e2; color: #991b1b; padding: 4px 10px; border-radius: 6px; font-weight: bold; font-size: 12px; }
            .table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            .table th, .table td { border: 1px solid #e2e8f0; padding: 10px; text-align: start; }
            .table th { background: #f8fafc; color: #475569; }
            .footer { margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid #e2e8f0; padding-top: 20px; }
            .barcode { font-family: monospace; font-size: 18px; letter-spacing: 4px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h2 style="margin:0; color:#4E60A2;">مساعد نبض | عيادات نبض التخصصية</h2>
              <p style="margin:4px 0 0 0; font-size:13px; color:#64748b;">Nabd Smart Health Medical Requisition Form</p>
            </div>
            <div style="text-align:end;">
              <span class="badge">عاجل / STAT URGENT</span>
              <div class="barcode" style="margin-top:6px;">*${requisition.barcode}*</div>
            </div>
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; background:#f8fafc; padding:15px; border-radius:8px;">
            <div><strong>اسم المريض:</strong> ${requisition.patientName} (${requisition.patientId})</div>
            <div><strong>العمر / الجنس:</strong> ${requisition.age} سنة / ${requisition.gender}</div>
            <div><strong>الطبيب المعالج:</strong> ${requisition.doctorName}</div>
            <div><strong>تاريخ الطلب:</strong> ${requisition.date}</div>
            <div style="grid-column: span 2;"><strong>التشخيص المبدئي:</strong> ${requisition.clinicalDiagnosis}</div>
          </div>

          <h3 style="margin-top:25px; color:#1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom:6px;">1. الفحوصات المخبرية المطلوبة (Laboratory Investigations)</h3>
          <table class="table">
            <thead>
              <tr><th>م</th><th>التصنيف</th><th>اسم الفحص المطلوب</th></tr>
            </thead>
            <tbody>
              ${requisition.labTests.map((t, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td><strong>${t.category}</strong></td>
                  <td>${t.testName}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <h3 style="margin-top:25px; color:#1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom:6px;">2. الفحوصات الإشعاعية وتخطيط القلب (Radiology & ECG)</h3>
          <table class="table">
            <thead>
              <tr><th>م</th><th>نوع الفحص</th><th>المنطقة والملاحظات</th></tr>
            </thead>
            <tbody>
              ${requisition.radiologyTests.map((r, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td><strong>${r.type}</strong></td>
                  <td>${r.area}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="footer">
            <div>
              <p style="font-size:12px; color:#64748b; margin:0;">تم إنشاء هذا الطلب آلياً بواسطة نظام نبض للذكاء الاصطناعي</p>
              <p style="font-size:11px; color:#94a3b8; margin:2px 0 0 0;">Exam Barcode: ${requisition.orderId}</p>
            </div>
            <div style="text-align:center; border: 1px dashed #cbd5e1; padding: 10px 25px; border-radius: 8px;">
              <div style="font-size:12px; color:#64748b;">ختم واعتماد الطبيب</div>
              <div style="font-weight:bold; color:#4E60A2; margin-top:4px;">د. طارق الجابري</div>
            </div>
          </div>

          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
    setTimeout(() => setIsPrinting(false), 1000);
  };

  return (
    <section id="requisition" className="relative w-full max-w-7xl mx-auto py-20 px-6 xl:px-0">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E9ECF5] border border-[#D5DAE8] text-[#4E60A2] text-xs font-bold mb-4">
          <Barcode className="w-3.5 h-3.5" />
          <span>{t.requisitionDemo.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold heading-display text-slate-900 mb-4 tracking-tight">
          {t.requisitionDemo.title}
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          {t.requisitionDemo.desc}
        </p>
      </div>

      {/* Printable Sheet Preview Box */}
      <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-[#CFD5E4] shadow-2xl relative">
        {/* Floating Print Action Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-3 text-start">
            <div className="w-11 h-11 rounded-2xl bg-[#E9ECF5] text-[#4E60A2] flex items-center justify-center">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base font-bold text-slate-900">نموذج الفحص الطبي المعتمد (Requisition Form)</div>
              <div className="text-xs text-slate-500 font-mono">Compatible with A4, Thermal & Barcode Scanners</div>
            </div>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3 bg-[#4E60A2] hover:bg-[#1E285A] text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-[#4E60A2]/25 hover:scale-105 active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>{t.requisitionDemo.printBtn}</span>
          </button>
        </div>

        {/* The Formal Document Preview Paper */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs text-start font-sans">
          {/* Top Medical Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-5 border-b-2 border-[#4E60A2]">
            <div>
              <div className="flex items-center gap-2 text-lg font-bold text-[#4E60A2]">
                <Building2 className="w-5 h-5" />
                <span>عيادات نبض التخصصية - المركز الطبي المركزي</span>
              </div>
              <div className="text-xs text-slate-500 mt-1 font-mono">
                Nabd Health Clinical OS • Automated Requisition
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="px-2.5 py-1 rounded-md bg-red-100 text-red-700 text-xs font-bold font-mono">
                ● STAT URGENT
              </span>
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-700 mt-1.5">
                <Barcode className="w-4 h-4" />
                <span>{requisition.barcode}</span>
              </div>
            </div>
          </div>

          {/* Patient Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs mb-6">
            <div>
              <span className="text-slate-500 block">اسم المريض:</span>
              <span className="font-bold text-slate-800">{requisition.patientName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">رقم الملف:</span>
              <span className="font-bold text-slate-800 font-mono">{requisition.patientId}</span>
            </div>
            <div>
              <span className="text-slate-500 block">العمر / الجنس:</span>
              <span className="font-bold text-slate-800">{requisition.age} سنة / {requisition.gender}</span>
            </div>
            <div>
              <span className="text-slate-500 block">التاريخ:</span>
              <span className="font-bold text-slate-800 font-mono">{requisition.date}</span>
            </div>
            <div className="col-span-2 sm:col-span-4 pt-2 border-t border-slate-200/60">
              <span className="text-slate-500 block">التشخيص السريري المقترح (Clinical Diagnosis):</span>
              <span className="font-bold text-[#4E60A2]">{requisition.clinicalDiagnosis}</span>
            </div>
          </div>

          {/* Lab Tests List */}
          <div className="mb-6">
            <div className="text-xs font-bold text-slate-900 mb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4E60A2]" />
              <span>فحوصات المعمل المطلوبة (Laboratory Tests):</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {requisition.labTests.map((t, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50/80 rounded-lg border border-slate-200 text-xs flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{t.testName}</span>
                  <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {t.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Radiology Tests List */}
          <div className="mb-6">
            <div className="text-xs font-bold text-slate-900 mb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>فحوصات الأشعة وتخطيط القلب (Radiology & Investigations):</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {requisition.radiologyTests.map((r, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50/80 rounded-lg border border-slate-200 text-xs flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{r.area}</span>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                    {r.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Stamps */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
              <span>{t.requisitionDemo.barcodeNotice}</span>
            </div>
            <div className="px-4 py-2 border-2 border-dashed border-[#D5DAE8] rounded-xl text-center bg-[#E9ECF5]/30">
              <div className="text-[10px] text-slate-400">{t.requisitionDemo.officialStamp}</div>
              <div className="font-bold text-[#4E60A2]">{requisition.doctorName}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
