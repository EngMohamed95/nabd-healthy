import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { X, ZoomIn } from 'lucide-react';
import { 
  img1, img2, img3, img4, img5, img6, img7, img8, img11 
} from '../images';

export default function ShowcaseGallery() {
  const { language } = useLanguage();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const galleryItems = [
    {
      src: img5,
      title_en: "Next-Gen EMR Workspaces",
      title_ar: "مساحات عمل السجلات الطبية المستقبلية",
      desc_en: "Futuristic clinical control panels designed for hands-free charting.",
      desc_ar: "لوحات تحكم سريرية مستقبلية مصممة للتوثيق الطبي دون استخدام اليدين."
    },
    {
      src: img4,
      title_en: "Holographic Anatomy Analytics",
      title_ar: "تحليلات التشريح الهولوغرامية",
      desc_en: "Collaborative 3D anatomical models for surgery preparation.",
      desc_ar: "نماذج تشريحية ثلاثية الأبعاد تعاونية للتحضير للعمليات الجراحية."
    },
    {
      src: img6,
      title_en: "Interactive Diagnostic Interfaces",
      title_ar: "واجهات التشخيص التفاعلية",
      desc_en: "High-precision diagnostic screens for anatomy and physiotherapy.",
      desc_ar: "شاشات تشخيصية عالية الدقة للتشريح والعلاج الطبيعي."
    },
    {
      src: img7,
      title_en: "Mobile Vitals Tracker",
      title_ar: "تتبع المؤشرات الحيوية للهاتف",
      desc_en: "Real-time clinic companion app displaying patient status.",
      desc_ar: "تطبيق الهاتف المصاحب للعيادة لعرض حالة المريض في الوقت الفعلي."
    },
    {
      src: img1,
      title_en: "Bio-Acoustic Scribing",
      title_ar: "النسخ الصوتي البيولوجي",
      desc_en: "Stethoscope input integration with advanced neural processors.",
      desc_ar: "تكامل إدخال سماعة الطبيب مع معالجات عصبية متطورة."
    },
    {
      src: img11,
      title_en: "Molecular Tablet Diagnostics",
      title_ar: "تشخيصات الأدوية الجزيئية",
      desc_en: "Tablet-assisted drug-interaction checks with secure gloves.",
      desc_ar: "فحص تعارض الأدوية بمساعدة التابلت تحت ظروف سريرية معقمة."
    },
    {
      src: img2,
      title_en: "Clinical Knowledge Engine",
      title_ar: "محرك المعرفة السريرية",
      desc_en: "Smart hexagon cognitive networks mapping symptoms to ICD codes.",
      desc_ar: "شبكات معرفية سداسية ذكية لربط الأعراض بأكواد الترميز الطبي."
    },
    {
      src: img3,
      title_en: "Physician Flow Dashboard",
      title_ar: "لوحة تدفق عمل الطبيب",
      desc_en: "Interactive clinic operation screens mapping daily patient flows.",
      desc_ar: "شاشات تشغيل عيادة تفاعلية لتخطيط التدفق اليومي للمرضى."
    },
    {
      src: img8,
      title_en: "Neural Billing Grid",
      title_ar: "شبكة الفوترة العصبية",
      desc_en: "Automatic coding and insurance claim processing directly from voice.",
      desc_ar: "ترميز وتجهيز مطالبات التأمين تلقائيًا مباشرة من الصوت."
    }
  ];

  const title = language === 'ar' ? "الذكاء الاصطناعي في العمل السريري" : "AI in Clinical Action";
  const desc = language === 'ar' 
    ? "مجموعة صور كاملة توضح مساحات عمل الرعاية الصحية الذكية المدعومة بنظام NexusAI Health." 
    : "A full gallery showcase of smart healthcare workspaces powered by NexusAI Health.";

  return (
    <section id="gallery" className="relative w-full py-20 border-t border-white/5 bg-black/20">
      {/* Background glow */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-primary)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold heading-display mb-4 text-white">
            {title}
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            {desc}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, i) => {
            const itemTitle = language === 'ar' ? item.title_ar : item.title_en;
            const itemDesc = language === 'ar' ? item.desc_ar : item.desc_en;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedImg(item.src)}
                className="glass-card rounded-2xl overflow-hidden border border-white/10 group cursor-pointer relative aspect-video shadow-lg hover:shadow-2xl transition-all"
              >
                <img 
                  src={item.src} 
                  alt={itemTitle} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-6 text-start">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-lg group-hover:text-[var(--color-primary)] transition-colors">
                      {itemTitle}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-xs text-white/60 mt-1 line-clamp-2">
                    {itemDesc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          >
            <button 
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 end-6 text-white hover:text-[var(--color-primary)] p-2 bg-white/5 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImg} 
              alt="Preview" 
              className="max-w-full max-h-[85vh] rounded-xl object-contain border border-white/10 shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
