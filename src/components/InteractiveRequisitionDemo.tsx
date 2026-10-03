import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Barcode, FileCheck, ZoomIn, X, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import medicalReportImg from '../images/medical_report.jpg';

export default function InteractiveRequisitionDemo() {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="requisition" className="relative w-full max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
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
      <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-8 border border-[#CFD5E4] shadow-2xl relative">
        {/* Floating Action Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-3 text-start">
            <div className="w-11 h-11 rounded-2xl bg-[#E9ECF5] text-[#4E60A2] flex items-center justify-center">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base font-bold text-slate-900">نموذج التقرير والفحص الطبي المعتمد</div>
              <div className="text-xs text-slate-500 font-mono">Official Nabd Medical Laboratory & Radiology Report</div>
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#4E60A2] hover:bg-[#1E285A] text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-[#4E60A2]/25 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
            <span>معاينة وتكبير التقرير</span>
          </button>
        </div>

        {/* Real Document Photo Frame */}
        <div
          onClick={() => setModalOpen(true)}
          className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 group cursor-pointer"
        >
          <img
            src={medicalReportImg}
            alt="نموذج التقرير الطبي المعتمد - منصة نبض"
            className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-slate-900 shadow-lg flex items-center gap-2">
              <ZoomIn className="w-4 h-4 text-[#4E60A2]" />
              <span>انقر لتكبير التقرير بالكامل</span>
            </div>
          </div>
        </div>

        {/* Bottom Trust Badge */}
        <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>متوافق مع قوارئ الباركود والـ QR الطبي والطباعة الحرارية المعتمدة</span>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 sm:p-10 flex items-center justify-center cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] overflow-auto rounded-2xl shadow-2xl bg-white p-3"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 end-5 z-10 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={medicalReportImg}
                alt="التقرير الطبي المعتمد - منصة نبض"
                className="w-full h-auto rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
