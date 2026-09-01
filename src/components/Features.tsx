import { motion } from 'motion/react';
import { Mic, FileText, Users, FolderHeart, Printer, BarChart3, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { img1, img2, img3, img6, img7, img11 } from '../images';

export default function Features() {
  const { t, language, dir } = useLanguage();
  
  const featureList = [
    {
      icon: Mic,
      title: t.features.f1_title,
      desc: t.features.f1_desc,
      image: img1,
      tag: "Speech-to-Text AI",
      colSpan: "md:col-span-8"
    },
    {
      icon: FileText,
      title: t.features.f2_title,
      desc: t.features.f2_desc,
      image: img2,
      tag: "SOAP & ICD-10",
      colSpan: "md:col-span-4"
    },
    {
      icon: Users,
      title: t.features.f3_title,
      desc: t.features.f3_desc,
      image: img7,
      tag: "Waiting List & Triage",
      colSpan: "md:col-span-4"
    },
    {
      icon: FolderHeart,
      title: t.features.f4_title,
      desc: t.features.f4_desc,
      image: img6,
      tag: "Unified EMR",
      colSpan: "md:col-span-8"
    },
    {
      icon: Printer,
      title: t.features.f5_title,
      desc: t.features.f5_desc,
      image: img11,
      tag: "Requisition & Barcode",
      colSpan: "md:col-span-6"
    },
    {
      icon: BarChart3,
      title: t.features.f6_title,
      desc: t.features.f6_desc,
      image: img3,
      tag: "Clinic Insights",
      colSpan: "md:col-span-6"
    }
  ];

  return (
    <section id="features" className="relative w-full max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 end-0 w-[500px] h-[500px] bg-[#849CC6]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E9ECF5] border border-[#D5DAE8] text-[#4E60A2] text-xs font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.features.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold heading-display text-slate-900 mb-4 tracking-tight">
          {t.features.title}
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          {t.features.desc}
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {featureList.map((feat, i) => {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`glass-card rounded-3xl ${feat.colSpan} relative overflow-hidden flex flex-col justify-between group border border-[#CFD5E4]/70 p-6 sm:p-8 min-h-[360px]`}
            >
              {/* Top Details */}
              <div className="relative z-10 text-start">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E9ECF5] text-[#4E60A2] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#4E60A2] group-hover:text-white transition-all shadow-xs">
                    <feat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold font-mono px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
                    {feat.tag}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold heading-display text-slate-900 mb-2 group-hover:text-[#4E60A2] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
                  {feat.desc}
                </p>
              </div>

              {/* Bottom Image Preview with fading mask */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden mt-6 bg-slate-900">
                <img 
                  src={feat.image} 
                  alt={feat.title}
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-white text-xs font-bold">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[#849CC6]">
                    <span>استكشف في البرنامج</span>
                    {dir === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
