import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { 
  Activity, Users, FileText, Sparkles, CreditCard, 
  Search, Filter, Calendar, UploadCloud, Play, Send, 
  Bot, RefreshCw, ZoomIn, ZoomOut, CheckCircle2, AlertTriangle, 
  X, Laptop, HelpCircle, ArrowLeft, ArrowRight, MessageSquare
} from 'lucide-react';
import { 
  img1, img2, img3, img4, img5, img6, img7, img8, img11 
} from '../images';

// Interface for Hotspots
interface Hotspot {
  x: number; // percentage from left
  y: number; // percentage from top
  title_ar: string;
  title_en: string;
  desc_ar: string;
  desc_en: string;
}

// Interface for Gallery Module Tabs
interface GalleryModule {
  id: string;
  icon: any;
  title_ar: string;
  title_en: string;
  desc_ar: string;
  desc_en: string;
  img: string;
  hotspots: Hotspot[];
}

export default function ShowcaseGallery() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('diagnostics');
  const [viewMode, setViewMode] = useState<'screenshot' | 'simulator'>('simulator');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Diagnostics Live Simulator States
  const [diagSearch, setDiagSearch] = useState<string>('');
  const [diagFilter, setDiagFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [diagPatients, setDiagPatients] = useState([
    { id: '1-20260810', checkNum: 604, name: 'علي بكر', name_en: 'Ali Bakr', date: '2026-08-10 16:34', tests: '11 تحليل', tests_en: '11 Tests', status: 'pending' },
    { id: '2-20260811', checkNum: 559, name: 'خالد فارس', name_en: 'Khaled Fares', date: '2026-08-10 14:58', tests: '11 تحليل', tests_en: '11 Tests', status: 'pending' },
    { id: 'MRN-20260714-FF17C4', checkNum: 534, name: 'Test (مريض تجريبي)', name_en: 'Test Patient', date: '2026-08-10 12:15', tests: '3 تحاليل + 2 أشعة', tests_en: '3 Tests + 2 Scans', status: 'pending' },
    { id: '4-20260809', checkNum: 521, name: 'منى إبراهيم حامد', name_en: 'Mona Ibrahim', date: '2026-08-09 09:45', tests: '4 تحاليل', tests_en: '4 Tests', status: 'completed' },
  ]);
  const [selectedDiagPatient, setSelectedDiagPatient] = useState<any>(null);
  const [uploadStep, setUploadStep] = useState<number>(0); // 0: Idle, 1: Uploading, 2: AI Parsing, 3: Completed Report
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [aiReportDetails, setAiReportDetails] = useState<any>(null);

  // AI Assistant Live Simulator States
  const [chatMessages, setChatMessages] = useState<any[]>([
    {
      sender: 'bot',
      text_ar: 'مرحباً دكتور! أنا مساعد نبض السريري الذكي. كيف يمكنني مساعدتك اليوم؟ يمكنك اختياري لتحليل حالة مريض، أو كتابة وصفة طبية، أو الاستعلام عن الأكواد الطبية.',
      text_en: 'Hello Doctor! I am Nabd Clinical AI Assistant. How can I assist you today? You can ask me to analyze a case, formulate prescriptions, or look up medical codes.'
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const modules: GalleryModule[] = [
    {
      id: 'dashboard',
      icon: Activity,
      title_ar: "لوحة التحكم الرئيسية",
      title_en: "Executive Dashboard",
      desc_ar: "مراقبة مؤشرات الأداء الحيوية، أعداد الكشوفات اليومية، ونشاط الأطباء والعيادات في شاشة تفاعلية واحدة.",
      desc_en: "Monitor key clinical performance indicators, daily consultation volume, and clinic operations in one screen.",
      img: img3,
      hotspots: [
        {
          x: 10, y: 15,
          title_ar: "لوحة إحصائيات سريعة",
          title_en: "Quick Metrics Panel",
          desc_ar: "مؤشرات حيوية تلخص إجمالي الكشوفات والتقارير المكتملة لليوم مع نسب الأداء.",
          desc_en: "Dashboard metrics summarizing total checkups, completed SOAP notes, and diagnostics."
        },
        {
          x: 25, y: 55,
          title_ar: "قائمة الانتظار اللحظية",
          title_en: "Live Triage Queue",
          desc_ar: "ترتيب فوري للمرضى المتواجدين في صالة الانتظار حسب درجة الخطورة والفرز الطبي.",
          desc_en: "Real-time list of waiting patients ordered by medical urgency and triage priority."
        },
        {
          x: 75, y: 35,
          title_ar: "التقارير السريرية اللحظية",
          title_en: "Dynamic Encounter Charts",
          desc_ar: "رسومات بيانية لمتابعة متوسط وقت الكشف وتدفق المرضى وتفادي التكدس.",
          desc_en: "Analytical graphs to track average visit times, patient flow, and reduce bottleneck times."
        }
      ]
    },
    {
      id: 'diagnostics',
      icon: FileText,
      title_ar: "التحاليل والأشعة الطبية",
      title_en: "Diagnostics & Lab Portal",
      desc_ar: "إدارة ورفع وفحص نتائج تحاليل وأشعة المرضى، مع تحليلها الفوري بالذكاء الاصطناعي وإدراجها في ملف المريض.",
      desc_en: "Manage, upload, and process patient lab and scan reports with instant AI-powered translation and mapping.",
      img: img6,
      hotspots: [
        {
          x: 82, y: 69,
          title_ar: "رفع وتحليل النتائج",
          title_en: "Upload & Analyze Results",
          desc_ar: "رفع ملفات التقارير الطبية (PDF/صورة) ليقوم الذكاء الاصطناعي بفلترتها وتحليلها واستخراج التوصيات.",
          desc_en: "Upload scan/lab files (PDF/images) for the AI to extract findings, diagnoses, and medical codes."
        },
        {
          x: 52, y: 23,
          title_ar: "مؤشرات حالة التحاليل",
          title_en: "Diagnostic Status Indicators",
          desc_ar: "بطاقات تلخص الفحوصات المكتملة وتلك التي ما زالت بانتظار رفع نتائجها من المختبر.",
          desc_en: "Summarized counters of completed examinations and those pending document uploads."
        },
        {
          x: 48, y: 55,
          title_ar: "قائمة الفحوصات المطلوبة",
          title_en: "Required Examinations List",
          desc_ar: "تحديد الفحوصات الطبية المطلوبة لكل مريض وعرض حالتها (مكتمل / بانتظار النتائج).",
          desc_en: "View ordered diagnostic tests for each patient and track their real-time completion status."
        }
      ]
    },
    {
      id: 'emr',
      icon: Users,
      title_ar: "السجلات الطبية EMR",
      title_en: "Electronic Medical Records",
      desc_ar: "ملف طبي إلكتروني موحد يضم العلامات الحيوية، التاريخ المرضي، الحساسية، والوصفات الطبية السابقة.",
      desc_en: "A unified digital patient file displaying lifelong medical histories, allergy alerts, and past encounters.",
      img: img5,
      hotspots: [
        {
          x: 18, y: 25,
          title_ar: "الملف الديموغرافي والطبي",
          title_en: "Demographics & Medical Profile",
          desc_ar: "البيانات الأساسية للمريض وفصيلة الدم والتنبيهات الطبية الهامة مثل الحساسية لبعض الأدوية.",
          desc_en: "Core patient details, blood type, and critical safety warnings like drug allergies."
        },
        {
          x: 55, y: 48,
          title_ar: "خط الزمن السريري",
          title_en: "Clinical Timeline",
          desc_ar: "سجل كامل للزيارات السابقة والتشخيصات والعمليات السابقة التي خضع لها المريض.",
          desc_en: "Chronological registry of previous clinic visits, surgeries, and chronic diagnoses."
        }
      ]
    },
    {
      id: 'assistant',
      icon: Sparkles,
      title_ar: "مساعد نبض بالذكاء الاصطناعي",
      title_en: "Clinical AI Assistant",
      desc_ar: "مساعد طبي ذكي يجيب على الاستفسارات المعقدة، ويقترح الجرعات الدوائية وأكواد الترميز الطبي ICD-10.",
      desc_en: "Clinical reasoning assistant responding to complex medical queries, verifying drug doses, and looking up ICD-10 codes.",
      img: img11,
      hotspots: [
        {
          x: 65, y: 42,
          title_ar: "الدردشة السريرية التفاعلية",
          title_en: "Interactive Dialogue",
          desc_ar: "تواصل مباشر مع محرك نبض السريري للاستفسار عن الحالات المعقدة وطلب تحليلاتها.",
          desc_en: "Direct interface with Nabd AI engine to query complex diagnostic cases and drug compliance."
        },
        {
          x: 35, y: 78,
          title_ar: "توصيات التشخيص والعلاج",
          title_en: "Differential Diagnoses",
          desc_ar: "اقتراح قائمة تشخيص تفريقي تفصيلية مدعومة بالأدلة والمراجع الطبية المعتمدة.",
          desc_en: "Differential diagnoses generated instantly and backed by standard evidence-based medical sources."
        }
      ]
    },
    {
      id: 'payments',
      icon: CreditCard,
      title_ar: "بوابة المدفوعات والاشتراكات",
      title_en: "Payments & Moyasar Portal",
      desc_ar: "تكامل سلس مع بوابة مدفوعات Moyasar لتحصيل رسوم الكشوفات وإصدار الفواتير والدعم لمدى وApple Pay.",
      desc_en: "Seamless integration with Moyasar gateway for clinic subscription, e-invoicing, and local Mada payments.",
      img: img8,
      hotspots: [
        {
          x: 22, y: 30,
          title_ar: "سجل الفواتير والإيصالات",
          title_en: "Invoices & Receipts Ledger",
          desc_ar: "متابعة الفواتير الصادرة للمرضى وحالة دفعها مع إمكانية تصديرها محاسبيًا وطباعتها.",
          desc_en: "Ledger tracking patient invoices, payments status, with options to export and print receipts."
        },
        {
          x: 78, y: 55,
          title_ar: "نافذة السداد الفوري",
          title_en: "Moyasar Direct Checkout",
          desc_ar: "خيارات دفع مرنة للمرضى تشمل مدى، فيزا، وآبل باي مباشرة من شاشة الاستقبال.",
          desc_en: "Flexible point-of-sale options supporting local Mada cards, Visa, and Apple Pay."
        }
      ]
    }
  ];

  const currentModule = modules.find(m => m.id === activeTab) || modules[0];

  // Simulated upload progress logic
  useEffect(() => {
    let interval: any;
    if (uploadStep === 1) {
      setUploadProgress(0);
      interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploadStep(2);
            return 100;
          }
          return prev + 15;
        });
      }, 200);
    } else if (uploadStep === 2) {
      setTimeout(() => {
        setUploadStep(3);
        // Generate AI report findings
        const report = getMockReportForPatient(selectedDiagPatient);
        setAiReportDetails(report);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [uploadStep, selectedDiagPatient]);

  const getMockReportForPatient = (patient: any) => {
    if (!patient) return null;
    const name = patient.name;
    if (name.includes('علي')) {
      return {
        patientName: 'علي بكر',
        diagnosis: 'اشتباه بمتلازمة الشريان التاجي الحادة (Rule out Acute Coronary Syndrome)',
        findings: [
          'ارتفاع ملحوظ في مستوى إنزيمات القلب Troponin I (1.4 ng/mL - الحد الطبيعي 0.04)',
          'تغيرات غير طبيعية في تخطيط القلب الكهربائي (ST-segment elevation in leads V1-V4)',
          'ارتفاع طفيف في عدد خلايا الدم البيضاء WBC: 11.2 x10^9/L'
        ],
        plan: [
          'إحالة فورية إلى الطوارئ / وحدة العناية المركزة للقلب (CCU).',
          'وصف جرعة تحميلية من الأسبرين 300 ملغ مضغاً مع Clopidogrel 300 ملغ.',
          'حجز موعد عاجل لقسطرة تشخيصية وعلاجية للشرايين التاجية.'
        ],
        icd10: 'I21.9 - Acute myocardial infarction, unspecified'
      };
    } else if (name.includes('خالد')) {
      return {
        patientName: 'خالد فارس',
        diagnosis: 'عدوى بكتيرية حادة في المسالك البولية (Acute Bacterial Urinary Tract Infection)',
        findings: [
          'تحليل البول يظهر كثرة الخلايا الصديدية (Pus cells > 50/HPF) وبكتيريا إيجابية.',
          'ارتفاع مستوى البروتين التفاعلي CRP: 42 mg/L.',
          'وظائف الكلى مستقرة (Serum Creatinine: 0.9 mg/dL).'
        ],
        plan: [
          'وصف مضاد حيوي مناسب (Ciprofloxacin 500mg) مرتين يومياً لمدة 7 أيام.',
          'التأكيد على زيادة شرب السوائل والمياه (لا يقل عن 3 لتر يومياً).',
          'إعادة تحليل ومزرعة البول بعد انتهاء العلاج بثلاثة أيام للتحقق من الشفاء.'
        ],
        icd10: 'N39.0 - Urinary tract infection, site not specified'
      };
    } else {
      return {
        patientName: 'تجربة (مريض تجريبي)',
        diagnosis: 'فحوصات عامة مستقرة مع نقص طفيف في فيتامين د (Vitamin D Deficiency)',
        findings: [
          'مستوى فيتامين د منخفض (25-Hydroxyvitamin D: 18 ng/mL - الحد الكافي > 30).',
          'مستويات السكر الصائم والدهون والوظائف الحيوية في الحدود الطبيعية تماماً.',
          'صورة الدم الكاملة والهيموجلوبين مستقر (Hb: 13.8 g/dL).'
        ],
        plan: [
          'وصف فيتامين د3 بجرعة 50,000 وحدة دولية مرة أسبوعياً لمدة 8 أسابيع.',
          'النصح بالتعرض المعتدل لأشعة الشمس وتناول الأغذية الغنية بالكالسيوم.',
          'إعادة قياس مستوى فيتامين د بعد 3 أشهر لضبط جرعة الصيانة.'
        ],
        icd10: 'E55.9 - Vitamin D deficiency, unspecified'
      };
    }
  };

  const handleStartUpload = (patient: any) => {
    setSelectedDiagPatient(patient);
    setUploadStep(1);
  };

  const handleSaveReport = () => {
    // Update patient status in list
    setDiagPatients(prev => prev.map(p => {
      if (p.id === selectedDiagPatient.id) {
        return { ...p, status: 'completed' };
      }
      return p;
    }));
    // Reset wizard
    setUploadStep(0);
    setSelectedDiagPatient(null);
    setAiReportDetails(null);
  };

  // AI Assistant trigger text typing effect
  const handleChatTrigger = (promptTextAr: string, promptTextEn: string) => {
    if (isTyping) return;
    
    // Add user message
    const userMsg = { sender: 'user', text_ar: promptTextAr, text_en: promptTextEn };
    setChatMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Get response details
    let responseTextAr = '';
    let responseTextEn = '';

    if (promptTextAr.includes('علي بكر')) {
      responseTextAr = `تحليل حالة المريض **علي بكر** (عمر 45 سنة):\n\n**1. الحالة السريرية:** اشتباه بمتلازمة شريان تاجي حادة (STEMI) بناءً على:\n- ارتفاع إنزيمات القلب: hs-Troponin I (1.4 ng/mL).\n- تخطيط القلب: ارتفاع ST-segment في leads V1-V4.\n\n**2. الإجراءات الموصى بها فورا:**\n- إحالة طارئة للعناية المركزة للقلب (CCU).\n- وصف Aspirin 300mg + Clopidogrel 300mg فموياً.\n- تجهيز المريض لقسطرة تشخيصية وعلاجية عاجلة.\n\n**3. الترميز الطبي ICD-10:**\n- \`I21.9\` (احتشاء عضلة القلب الحاد).`;
      responseTextEn = `Clinical Case Review for **Ali Bakr** (45y):\n\n**1. Assessment:** Suspected acute coronary syndrome (STEMI) based on:\n- Cardiac enzymes: Elevated hs-Troponin I (1.4 ng/mL).\n- ECG: ST-segment elevation in leads V1-V4.\n\n**2. Urgent Orders:**\n- Immediate transfer to Cardiac Care Unit (CCU).\n- Load Aspirin 300mg + Clopidogrel 300mg orally.\n- Prepare for emergency coronary angiography.\n\n**3. Coding Suggestion:**\n- \`I21.9\` (Acute myocardial infarction, unspecified).`;
    } else if (promptTextAr.includes('جرعة دواء')) {
      responseTextAr = `جرعة دواء **بانتوبرازول (Pantoprazole)** للأطفال والبالغين:\n\n- **للبالغين (التهاب المريء الارتجاعي):** 40 ملغ مرة واحدة يومياً قبل الفطور بـ 30-60 دقيقة لمدة 4-8 أسابيع.\n- **للأطفال (أكبر من 5 سنوات، للارتجاع):** 20 ملغ مرة واحدة يومياً قبل الأكل بـ 30 دقيقة. لا ينصح بتجاوز الجرعة دون إشراف أخصائي أطفال.\n\n**تنبيه:** يوصى بمراقبة مستويات المغنيسيوم في الدم عند الاستخدام الطويل لأكثر من عام.`;
      responseTextEn = `Dosage specifications for **Pantoprazole**:\n\n- **Adults (GERD / Erosive Esophagitis):** 40mg PO daily 30-60 mins before breakfast for 4-8 weeks.\n- **Pediatric (>= 5 years, acid reflux):** 20mg PO daily. Avoid exceeding recommended dose without specialist guidance.\n\n**Precaution:** Check serum magnesium levels if therapy exceeds 1 year.`;
    } else {
      responseTextAr = `أكواد التصنيف الدولي للأمراض **ICD-10** لالتهاب المفاصل الروماتويدي (Rheumatoid Arthritis):\n\n- \`M05\` - التهاب المفاصل الروماتويدي مصل الإيجاب (Rheumatoid arthritis with rheumatoid factor).\n- \`M05.9\` - التهاب مفاصل روماتويدي مصل الإيجاب غير محدد.\n- \`M06\` - أنواع التهاب المفاصل الروماتويدي الأخرى (Other rheumatoid arthritis).\n- \`M06.9\` - التهاب المفاصل الروماتويدي غير المحدد.`;
      responseTextEn = `ICD-10 Diagnostic Codes for **Rheumatoid Arthritis**:\n\n- \`M05\` - Rheumatoid arthritis with rheumatoid factor.\n- \`M05.9\` - Seropositive rheumatoid arthritis, unspecified.\n- \`M06\` - Other rheumatoid arthritis.\n- \`M06.9\` - Rheumatoid arthritis, unspecified.`;
    }

    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, {
        sender: 'bot',
        text_ar: responseTextAr,
        text_en: responseTextEn
      }]);
    }, 1500);
  };

  const filteredDiagPatients = diagPatients.filter(p => {
    const matchSearch = p.name.includes(diagSearch) || p.id.includes(diagSearch);
    const matchFilter = diagFilter === 'all' ? true : p.status === diagFilter;
    return matchSearch && matchFilter;
  });

  return (
    <section id="gallery" className="relative w-full py-24 border-t border-indigo-100/40 bg-[#f8fafc]">
      {/* Background radial glow */}
      <div className="absolute top-1/3 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#3B51A3]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-[#3B51A3] text-xs font-bold mb-4">
            <Laptop className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'عرض النظام التفاعلي' : 'Interactive System Tour'}</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold heading-display mb-4 text-slate-900 tracking-tight">
            {language === 'ar' ? 'جولة تفاعلية داخل نظام نبض' : 'Interactive Tour of Nabd System'}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'تصفح شاشات البرنامج الحقيقية وتعرف على كل تفاصيل عيادتك الذكية عبر المحاكي التفاعلي أو من لقطات الشاشة الحية.' 
              : 'Browse actual software interfaces and explore your smart clinic features through live emulators or screenshots.'}
          </p>
        </div>

        {/* Outer Tour Window Frame */}
        <div className="glass-card rounded-3xl overflow-hidden border border-indigo-100/80 shadow-2xl flex flex-col lg:flex-row relative z-10 min-h-[650px] bg-white">
          
          {/* 1. Module Selector Sidebar (Right in RTL, Left in LTR) */}
          <div className="w-full lg:w-72 bg-slate-50 border-b lg:border-b-0 lg:border-e border-slate-200/80 p-4 flex flex-col justify-between shrink-0 font-sans" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div>
              <div className="pb-4 mb-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#3B51A3] text-white flex items-center justify-center font-bold">ن</div>
                  <span className="font-bold text-slate-900 text-sm font-sans tracking-tight">NABD CLINICAL OS</span>
                </div>
                <span className="text-[10px] bg-indigo-100 text-[#3B51A3] font-bold px-2 py-0.5 rounded font-mono">v2.0-Live</span>
              </div>

              {/* Sidebar Tabs */}
              <div className="space-y-1.5 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none gap-2 lg:gap-0">
                {modules.map((mod) => {
                  const Icon = mod.icon;
                  const isActive = activeTab === mod.id;
                  const label = language === 'ar' ? mod.title_ar : mod.title_en;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => {
                        setActiveTab(mod.id);
                        setActiveHotspot(null);
                      }}
                      className={`w-auto lg:w-full px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-[#3B51A3]/10 text-[#3B51A3] border-s-0 lg:border-s-4 lg:border-s-[#3B51A3]'
                          : 'bg-transparent text-slate-600 hover:bg-slate-200/60 hover:text-slate-800'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#3B51A3]' : 'text-slate-400'}`} />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* View Mode Toggle Controls */}
            <div className="mt-6 pt-4 border-t border-slate-200 hidden lg:block">
              <div className="bg-slate-200/80 p-1 rounded-xl flex items-center justify-between gap-1">
                <button
                  onClick={() => setViewMode('simulator')}
                  className={`flex-1 text-center py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    viewMode === 'simulator' 
                      ? 'bg-white text-slate-900 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  {language === 'ar' ? 'محاكي تفاعلي' : 'Live Emulator'}
                </button>
                <button
                  onClick={() => setViewMode('screenshot')}
                  className={`flex-1 text-center py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    viewMode === 'screenshot' 
                      ? 'bg-white text-slate-900 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  {language === 'ar' ? 'صورة الشاشة' : 'Real Screen'}
                </button>
              </div>
            </div>
          </div>

          {/* 2. Main Tour Content Window */}
          <div className="flex-1 bg-[#F4F6FA] flex flex-col justify-between overflow-hidden">
            
            {/* Mockup Browser Header Bar */}
            <div className="bg-white border-b border-slate-200/80 px-5 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>

              {/* Mockup Address Bar */}
              <div className="w-96 max-w-full bg-slate-100 rounded-lg py-1 px-3 text-[10px] text-slate-500 text-center font-mono border border-slate-200 hidden sm:block">
                https://app.nabd.com/clinic/{currentModule.id}
              </div>

              {/* Mobile Toggle Switches */}
              <div className="flex items-center gap-2 lg:hidden">
                <button
                  onClick={() => setViewMode(viewMode === 'simulator' ? 'screenshot' : 'simulator')}
                  className="px-3 py-1 bg-indigo-50 border border-indigo-200 text-[#3B51A3] rounded-lg text-[10px] font-bold"
                >
                  {viewMode === 'simulator' 
                    ? (language === 'ar' ? 'عرض لقطة الشاشة' : 'Show Screenshot') 
                    : (language === 'ar' ? 'عرض المحاكي الحي' : 'Show Live Emulator')}
                </button>
              </div>
            </div>

            {/* Mockup Content Body Canvas */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto min-h-[450px] relative flex flex-col">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab + viewMode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full flex-1 flex flex-col"
                >
                  {/* VIEW MODE: REAL SCREENSHOT WITH HOTSPOTS */}
                  {viewMode === 'screenshot' && (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-lg bg-slate-900 group/screen max-w-4xl mx-auto flex-1 flex items-center justify-center">
                      <img 
                        src={currentModule.img} 
                        alt={currentModule.title_ar} 
                        className="w-full h-auto object-contain cursor-zoom-in"
                        onClick={() => setLightboxImg(currentModule.img)}
                      />
                      
                      {/* Zoom Indicator overlay on screen */}
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white p-2 rounded-lg text-xs flex items-center gap-1.5 opacity-0 group-hover/screen:opacity-100 transition-opacity">
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'انقر لتكبير الصورة' : 'Click to enlarge'}</span>
                      </div>

                      {/* Hotspots overlays */}
                      {currentModule.hotspots.map((hs, index) => {
                        const isHotspotActive = activeHotspot === index;
                        return (
                          <div
                            key={index}
                            className="absolute z-20"
                            style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                          >
                            {/* Pulsing Dot */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveHotspot(isHotspotActive ? null : index);
                              }}
                              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                                isHotspotActive 
                                  ? 'bg-red-500 ring-4 ring-red-200 scale-110' 
                                  : 'bg-[#3B51A3] ring-4 ring-indigo-200 animate-pulse'
                              }`}
                            >
                              <span className="text-white text-[10px] font-bold">{index + 1}</span>
                            </button>

                            {/* Floating Tooltip Card */}
                            {isHotspotActive && (
                              <div 
                                className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 bg-white border border-slate-200/80 rounded-xl p-4 shadow-xl z-30 text-start"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
                                  <span className="font-bold text-xs text-[#3B51A3]">
                                    {language === 'ar' ? hs.title_ar : hs.title_en}
                                  </span>
                                  <button onClick={() => setActiveHotspot(null)} className="cursor-pointer">
                                    <X className="w-3 h-3 text-slate-400 hover:text-slate-600" />
                                  </button>
                                </div>
                                <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                                  {language === 'ar' ? hs.desc_ar : hs.desc_en}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* VIEW MODE: INTERACTIVE LIVE EMULATORS */}
                  {viewMode === 'simulator' && (
                    <div className="w-full flex-1 flex flex-col justify-between">
                      
                      {/* SIMULATOR 1: DIAGNOSTICS & LABS PORTAL */}
                      {activeTab === 'diagnostics' && (
                        <div className="bg-[#f8fafc] rounded-2xl border border-slate-200 p-4 shadow-sm text-start flex-1 flex flex-col justify-between font-sans">
                          <div>
                            {/* Simulator Portal Header */}
                            <div className="bg-white border border-slate-200/80 rounded-xl p-4 mb-4">
                              <h3 className="text-lg font-bold text-[#3B51A3] flex items-center gap-2 mb-1">
                                <FileText className="w-5 h-5 text-[#3B51A3]" />
                                <span>{language === 'ar' ? 'التحاليل والأشعة الطبية' : 'Diagnostics & Lab Portal'}</span>
                              </h3>
                              <p className="text-xs text-slate-500">
                                {language === 'ar' 
                                  ? 'بوابة إدارة، رفع وتحليل نتائج التحاليل والأشعة الطبية للمرضى بالذكاء الاصطناعي' 
                                  : 'AI-assisted medical laboratory & diagnostic reports interpretation portal'}
                              </p>
                            </div>

                            {/* Counters / Stats cards */}
                            <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                              <div className="bg-[#eff6ff] border border-blue-200/40 rounded-xl p-3">
                                <div className="text-[10px] text-slate-500 font-bold">{language === 'ar' ? 'إجمالي الكشوفات' : 'Total Checkups'}</div>
                                <div className="text-xl font-extrabold text-[#3B51A3] mt-0.5">10</div>
                              </div>
                              <div className="bg-[#ecfdf5] border border-emerald-200/40 rounded-xl p-3">
                                <div className="text-[10px] text-slate-500 font-bold">{language === 'ar' ? 'نتائج مكتملة ومحللة' : 'Completed & Analyzed'}</div>
                                <div className="text-xl font-extrabold text-emerald-600 mt-0.5">
                                  {diagPatients.filter(p => p.status === 'completed').length}
                                </div>
                              </div>
                              <div className="bg-[#fffbeb] border border-amber-200/40 rounded-xl p-3">
                                <div className="text-[10px] text-slate-500 font-bold">{language === 'ar' ? 'بانتظار رفع النتائج' : 'Pending Upload'}</div>
                                <div className="text-xl font-extrabold text-amber-600 mt-0.5">
                                  {diagPatients.filter(p => p.status === 'pending').length}
                                </div>
                              </div>
                            </div>

                            {/* Filtering / Search controls */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
                              <div className="relative">
                                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                  type="text"
                                  placeholder={language === 'ar' ? 'بحث باسم المريض أو الكود...' : 'Search name or code...'}
                                  value={diagSearch}
                                  onChange={(e) => setDiagSearch(e.target.value)}
                                  className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#3B51A3]"
                                />
                              </div>
                              <div className="flex bg-slate-200/60 p-0.5 rounded-lg border border-slate-200">
                                <button
                                  onClick={() => setDiagFilter('all')}
                                  className={`flex-1 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                                    diagFilter === 'all' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-700'
                                  }`}
                                >
                                  {language === 'ar' ? 'الكل' : 'All'}
                                </button>
                                <button
                                  onClick={() => setDiagFilter('pending')}
                                  className={`flex-1 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                                    diagFilter === 'pending' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-700'
                                  }`}
                                >
                                  {language === 'ar' ? 'الانتظار' : 'Pending'}
                                </button>
                                <button
                                  onClick={() => setDiagFilter('completed')}
                                  className={`flex-1 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                                    diagFilter === 'completed' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-700'
                                  }`}
                                >
                                  {language === 'ar' ? 'مكتمل' : 'Done'}
                                </button>
                              </div>
                              <div className="text-[11px] text-slate-500 flex items-center justify-end font-mono">
                                {language === 'ar' ? 'المزامنة: نشطة وتلقائية' : 'Sync: Active Auto'}
                              </div>
                            </div>

                            {/* Patient Records Cards list */}
                            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                              {filteredDiagPatients.map((p) => {
                                const isPending = p.status === 'pending';
                                return (
                                  <div
                                    key={p.id}
                                    className="bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-indigo-300 transition-all shadow-xs"
                                  >
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <span className="font-bold text-xs text-slate-900">
                                          {language === 'ar' ? p.name : p.name_en}
                                        </span>
                                        <span className="text-[10px] text-slate-400 font-mono">#{p.checkNum}</span>
                                      </div>
                                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                        <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100 text-[#3B51A3] text-[10px] font-mono">
                                          {language === 'ar' ? p.tests : p.tests_en}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                          isPending 
                                            ? 'bg-amber-50 border border-amber-100 text-amber-700' 
                                            : 'bg-emerald-50 border border-emerald-100 text-emerald-700'
                                        }`}>
                                          {isPending 
                                            ? (language === 'ar' ? 'بانتظار النتائج' : 'Awaiting results') 
                                            : (language === 'ar' ? 'مكتمل ومحلل' : 'Analyzed')}
                                        </span>
                                      </div>
                                    </div>

                                    <div>
                                      {isPending ? (
                                        <button
                                          onClick={() => handleStartUpload(p)}
                                          className="px-3 py-1.5 bg-[#3B51A3] hover:bg-[#2C3D7A] text-white rounded-lg text-[10px] font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                                        >
                                          <UploadCloud className="w-3.5 h-3.5" />
                                          <span>{language === 'ar' ? 'رفع وتحليل النتائج' : 'Upload & Analyze'}</span>
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => {
                                            setSelectedDiagPatient(p);
                                            setAiReportDetails(getMockReportForPatient(p));
                                            setUploadStep(3);
                                          }}
                                          className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 border border-slate-200 text-[#3B51A3] rounded-lg text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                                        >
                                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                          <span>{language === 'ar' ? 'عرض التقرير السريري' : 'View Report'}</span>
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Instruction Note */}
                          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
                            <HelpCircle className="w-3.5 h-3.5 text-[#3B51A3]" />
                            <span>{language === 'ar' ? 'انقر على "رفع وتحليل النتائج" لتجربة عملية القراءة الذكية للتقارير والملفات.' : 'Click "Upload & Analyze" to experience clinical document OCR extraction.'}</span>
                          </div>
                        </div>
                      )}

                      {/* SIMULATOR 2: NABD AI CLINICAL ASSISTANT */}
                      {activeTab === 'assistant' && (
                        <div className="bg-[#f8fafc] rounded-2xl border border-slate-200 p-4 shadow-sm text-start flex-1 flex flex-col justify-between min-h-[450px]">
                          <div>
                            {/* Header */}
                            <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 mb-4 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                                <Bot className="w-5 h-5" />
                              </div>
                              <div>
                                <h3 className="font-bold text-xs text-slate-900">{language === 'ar' ? 'مساعد نبض السريري الذكي' : 'Nabd Clinical AI Assistant'}</h3>
                                <p className="text-[10px] text-slate-500">
                                  {language === 'ar' ? 'طبيب مساعد مدعوم بالذكاء الاصطناعي للاستفسارات الطبية' : 'AI Clinical Copilot for decision-making'}
                                </p>
                              </div>
                            </div>

                            {/* Chat Thread */}
                            <div className="space-y-3 max-h-[220px] overflow-y-auto mb-4 p-2 bg-white rounded-xl border border-slate-200/60 font-sans">
                              {chatMessages.map((msg, i) => {
                                const isBot = msg.sender === 'bot';
                                const text = language === 'ar' ? msg.text_ar : msg.text_en;
                                return (
                                  <div
                                    key={i}
                                    className={`flex gap-2.5 max-w-[85%] ${isBot ? 'mr-auto text-start' : 'ml-auto flex-row-reverse text-end'}`}
                                  >
                                    <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold ${
                                      isBot ? 'bg-purple-100 text-purple-600' : 'bg-[#3B51A3] text-white'
                                    }`}>
                                      {isBot ? 'ن' : 'د'}
                                    </div>
                                    <div className={`p-3 rounded-2xl text-[11px] leading-relaxed whitespace-pre-line ${
                                      isBot ? 'bg-slate-100 text-slate-800 rounded-tl-none' : 'bg-[#3B51A3] text-white rounded-tr-none'
                                    }`}>
                                      {text}
                                    </div>
                                  </div>
                                );
                              })}
                              {isTyping && (
                                <div className="flex items-center gap-2 text-slate-400 text-xs pl-2">
                                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-500" />
                                  <span>{language === 'ar' ? 'نبض يفكر ويكتب...' : 'Nabd is typing...'}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div>
                            {/* Suggestions Prompt Cards */}
                            <div className="mb-3">
                              <span className="text-[10px] text-slate-400 font-bold block mb-1.5">
                                {language === 'ar' ? 'الأسئلة السريرية المقترحة السريعة:' : 'Quick Suggested Clinical Queries:'}
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                <button
                                  onClick={() => handleChatTrigger('أعطني تحليل حالة المريض علي بكر والتشخيص والتوصيات.', 'Give me analysis, diagnosis, and recommendations for patient Ali Bakr.')}
                                  className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 rounded-lg text-[10px] font-semibold transition-all text-start cursor-pointer"
                                >
                                  {language === 'ar' ? '🔬 تحليل حالة علي بكر' : '🔬 Analyze Ali Bakr case'}
                                </button>
                                <button
                                  onClick={() => handleChatTrigger('ما هي جرعة دواء بانتوبرازول للأطفال؟ وما هي المحاذير؟', 'What is the dosage of Pantoprazole for children and warnings?')}
                                  className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 rounded-lg text-[10px] font-semibold transition-all text-start cursor-pointer"
                                >
                                  {language === 'ar' ? '💊 جرعة بانتوبرازول' : '💊 Pantoprazole Dose'}
                                </button>
                                <button
                                  onClick={() => handleChatTrigger('ما هو كود ICD-10 لالتهاب المفاصل الروماتويدي؟', 'What is the ICD-10 code for rheumatoid arthritis?')}
                                  className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 rounded-lg text-[10px] font-semibold transition-all text-start cursor-pointer"
                                >
                                  {language === 'ar' ? '🏷️ كود ICD-10 للروماتويد' : '🏷️ ICD-10 for Rheumatoid'}
                                </button>
                              </div>
                            </div>

                            {/* Chat Input Field */}
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                placeholder={language === 'ar' ? 'اكتب سؤالك الطبي لمساعد نبض...' : 'Type clinical question for Nabd...'}
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && chatInput.trim()) {
                                    handleChatTrigger(chatInput, chatInput);
                                    setChatInput('');
                                  }
                                }}
                                className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-purple-500"
                              />
                              <button
                                onClick={() => {
                                  if (chatInput.trim()) {
                                    handleChatTrigger(chatInput, chatInput);
                                    setChatInput('');
                                  }
                                }}
                                className="w-8 h-8 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                              >
                                <Send className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SIMULATORS FALLBACK: EMBEDDED PREVIEWS */}
                      {['dashboard', 'emr', 'payments'].includes(activeTab) && (
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center flex-1 flex flex-col justify-center items-center font-sans">
                          <Laptop className="w-12 h-12 text-slate-300 mb-3" />
                          <h3 className="font-bold text-sm text-slate-800 mb-1">
                            {language === 'ar' 
                              ? `محاكاة شاشة ${currentModule.title_ar} التفاعلية` 
                              : `${currentModule.title_en} Interactive Simulator`}
                          </h3>
                          <p className="text-xs text-slate-500 max-w-sm mb-4 leading-relaxed">
                            {language === 'ar'
                              ? `لقد تم تصميم محاكي حي تفاعلي لصفحة التحاليل ومساعد نبض خصيصًا. لتصفح هذه شاشة بدقة، يرجى التبديل لنمط "صورة الشاشة" لمشاهدتها بكامل تفاصيلها الحقيقية.`
                              : `A custom live emulator is configured for Labs and AI Assistant. To view this screen in full high-fidelity, please select the "Real Screen" mode.`}
                          </p>
                          <button
                            onClick={() => setViewMode('screenshot')}
                            className="px-4 py-2 bg-[#3B51A3] hover:bg-[#2A3B78] text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                          >
                            {language === 'ar' ? 'عرض لقطة الشاشة الحقيقية' : 'View Real Screenshot'}
                          </button>
                        </div>
                      )}

                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mockup Footer / Description Bar */}
            <div className="bg-white border-t border-slate-200/80 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 text-start font-sans">
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 mb-1">
                  {language === 'ar' ? currentModule.title_ar : currentModule.title_en}
                </h4>
                <p className="text-xs text-slate-500">
                  {language === 'ar' ? currentModule.desc_ar : currentModule.desc_en}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setLightboxImg(currentModule.img)}
                  className="px-3.5 py-1.5 border border-slate-200 rounded-xl bg-slate-55 hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'تكبير كامل' : 'Enlarge'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DIAGNOSTICS PORTAL UPLOAD / AI REPORT MODAL */}
      <AnimatePresence>
        {uploadStep > 0 && selectedDiagPatient && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full p-6 shadow-2xl text-start font-sans"
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <UploadCloud className="w-5 h-5 text-[#3B51A3]" />
                  <span className="font-bold text-sm text-slate-900">
                    {language === 'ar' ? `رفع وتحليل نتائج المريض: ${selectedDiagPatient.name}` : `Upload & Analyze: ${selectedDiagPatient.name_en}`}
                  </span>
                </div>
                {uploadStep !== 1 && uploadStep !== 2 && (
                  <button 
                    onClick={() => {
                      setUploadStep(0);
                      setSelectedDiagPatient(null);
                      setAiReportDetails(null);
                    }}
                    className="p-1 rounded-full hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                  </button>
                )}
              </div>

              {/* STEP 1: UPLOADING FILE */}
              {uploadStep === 1 && (
                <div className="py-8 text-center">
                  <RefreshCw className="w-10 h-10 text-[#3B51A3] animate-spin mx-auto mb-4" />
                  <h4 className="font-bold text-sm text-slate-800 mb-2">
                    {language === 'ar' ? 'جاري رفع الملف الطبي للغيمة المشفرة...' : 'Uploading medical report to encrypted cloud...'}
                  </h4>
                  <div className="w-64 bg-slate-100 rounded-full h-2 mx-auto overflow-hidden">
                    <div 
                      className="bg-[#3B51A3] h-2 rounded-full transition-all duration-200" 
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-400 font-mono block mt-2">{uploadProgress}%</span>
                </div>
              )}

              {/* STEP 2: AI REASONING / PARSING */}
              {uploadStep === 2 && (
                <div className="py-8 text-center">
                  <Bot className="w-12 h-12 text-purple-600 animate-bounce mx-auto mb-4" />
                  <h4 className="font-bold text-sm text-slate-800 mb-2">
                    {language === 'ar' ? 'مستند طبي تم كشفه! جاري تشغيل معالج نبض للذكاء الاصطناعي...' : 'Medical document detected! Running Nabd Clinical AI...'}
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    {language === 'ar' 
                      ? 'جاري قراءة النتائج الحيوية وتصنيف المصطلحات وتعيين أكواد ICD-10 الطبية.' 
                      : 'Extracting lab values, mapping terminologies, and suggesting clinical codes.'}
                  </p>
                </div>
              )}

              {/* STEP 3: EXTRACTED REPORT SCREEN */}
              {uploadStep === 3 && aiReportDetails && (
                <div className="space-y-4">
                  {/* Diagnosis */}
                  <div className="bg-[#eff6ff] border border-blue-200/40 p-4 rounded-2xl">
                    <span className="text-[10px] font-bold text-[#3B51A3] uppercase tracking-wider block mb-1">
                      {language === 'ar' ? 'التشخيص المستخرج بالذكاء الاصطناعي (AI Assessment)' : 'AI Assessment / Diagnosis'}
                    </span>
                    <h5 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{aiReportDetails.diagnosis}</span>
                    </h5>
                  </div>

                  {/* Findings */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      {language === 'ar' ? 'أبرز القراءات والنتائج المستخلصة:' : 'Key Extracted Lab Readings:'}
                    </span>
                    <ul className="space-y-2">
                      {aiReportDetails.findings.map((f: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-xs text-slate-700 leading-relaxed">
                          <span className="text-[#3B51A3] font-bold">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Plan */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      {language === 'ar' ? 'التوصيات وخطة المتابعة المقترحة:' : 'Suggested Clinical Plan:'}
                    </span>
                    <ul className="space-y-1.5">
                      {aiReportDetails.plan.map((p: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ICD-10 Tag */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold text-purple-900 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded animate-pulse">
                      ICD-10 Code
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-800">
                      {aiReportDetails.icd10}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2.5">
                    <button
                      onClick={() => {
                        setUploadStep(0);
                        setSelectedDiagPatient(null);
                        setAiReportDetails(null);
                      }}
                      className="px-4 py-2 border border-slate-200 text-slate-600 hover:text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      {language === 'ar' ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      onClick={handleSaveReport}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      {language === 'ar' ? 'اعتماد وحفظ بملف المريض' : 'Approve & Save to EMR'}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULL SCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4"
          >
            <button 
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 end-6 text-white hover:text-[#3B51A3] p-2 bg-white/5 rounded-full cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightboxImg} 
              alt="Screenshot Zoom" 
              className="max-w-full max-h-[85vh] rounded-2xl object-contain border border-white/10 shadow-2xl"
            />
            <span className="text-white/60 text-xs mt-4">
              {language === 'ar' ? 'انقر في أي مكان للإغلاق' : 'Click anywhere to close'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
