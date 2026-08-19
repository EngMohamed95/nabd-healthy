/**
 * Nabd AI Doctor API Client Layer
 * Prepared for live integration with https://aidocotr.runasp.net/api
 * Includes robust mock fallbacks for instant interactive landing page demonstrations.
 */

export interface SoapReport {
  subjective: string;
  history: string;
  objective: {
    bloodPressure: string;
    heartRate: string;
    oxygenSaturation: string;
    temperature: string;
    respiratoryRate?: string;
  };
  assessment: string[];
  plan: string[];
  suggestedICD10: { code: string; name: string }[];
  suggestedMedications?: { name: string; dosage: string; frequency: string }[];
  requiresRequisition?: boolean;
}

export interface WaitingListPatient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  chiefComplaint: string;
  arrivalTime: string;
  status: 'waiting' | 'in_exam' | 'completed' | 'urgent';
  triagePriority: 'low' | 'medium' | 'high' | 'critical';
  assignedDoctor: string;
  waitingMinutes: number;
}

export interface RequisitionOrder {
  orderId: string;
  barcode: string;
  patientName: string;
  patientId: string;
  age: number;
  gender: string;
  date: string;
  doctorName: string;
  clinicBranch: string;
  clinicalDiagnosis: string;
  labTests: { category: string; testName: string; notes?: string }[];
  radiologyTests: { type: string; area: string; instructions?: string }[];
  urgency: 'routine' | 'urgent' | 'stat';
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://aidocotr.runasp.net/api';

/**
 * Service to generate AI SOAP Medical Report from speech text
 */
export async function generateSoapReport(transcript: string, language: 'ar' | 'en' = 'ar'): Promise<SoapReport> {
  // If a live backend endpoint is configured, try calling it
  if (import.meta.env.VITE_USE_LIVE_API === 'true') {
    try {
      const response = await fetch(`${API_BASE_URL}/clinical/generate-soap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript, language }),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.warn('[Nabd API] Live endpoint unavailable, falling back to client processor.', err);
    }
  }

  // Realistic AI Clinical Processor simulation
  await new Promise((res) => setTimeout(res, 600));

  if (language === 'ar') {
    return {
      subjective: "مريض يبلغ من العمر 45 عامًا، يشكو من ألم ضاغط خلف عظم القص مستمر منذ 48 ساعة مترافق مع ضيق تنفس خفيف عند المجهود. ينفي وجود تعرق بارد أو انتشار للألم للذراع الأيسر.",
      history: "تاريخ مرضي لارتفاع ضغط الدم (مسيطر عليه بالأدوية)، لا يوجد تاريخ لجلطات سابقة. غير مدخن.",
      objective: {
        bloodPressure: "135/85 mmHg",
        heartRate: "78 bpm (منتظم)",
        oxygenSaturation: "98% (هواء الغرفة)",
        temperature: "37.1 °C",
        respiratoryRate: "16 /min"
      },
      assessment: [
        "ألم صدري غير نمطي (Atypical Chest Pain) - يُرجح منشأ عضلي هيكلي أو ارتجاع مريئي GERD.",
        "استبعاد متلازمة الشريان التاجي الحادة (Rule out ACS)."
      ],
      plan: [
        "إجراء تخطيط قلب كهربائي فوري (12-Lead ECG).",
        "طلب فحص إنزيمات القلب (High-Sensitivity Troponin I) وصورة دم كاملة.",
        "وصف مضاد للحموضة (Pantoprazole 40mg) ومسكن خفيف عند الحاجة.",
        "إعادة التقييم والمراجعة بعد أسبوع أو فوراً عند اشتداد الألم."
      ],
      suggestedICD10: [
        { code: "R07.89", name: "Other chest pain" },
        { code: "K21.9", name: "Gastro-esophageal reflux disease" },
        { code: "I10", name: "Essential (primary) hypertension" }
      ],
      suggestedMedications: [
        { name: "Pantoprazole 40mg", dosage: "قرص واحد", frequency: "صباحاً قبل الإفطار" },
        { name: "Paracetamol 500mg", dosage: "قرص عند اللزوم", frequency: "كل 8 ساعات" }
      ],
      requiresRequisition: true
    };
  }

  return {
    subjective: "45-year-old male presents with retrosternal pressure-like chest pain for 48 hours, accompanied by mild exertional dyspnea. Denies diaphoresis or radiation to the left arm.",
    history: "Known history of essential hypertension (medicated). No previous CAD or MI history. Non-smoker.",
    objective: {
      bloodPressure: "135/85 mmHg",
      heartRate: "78 bpm (regular)",
      oxygenSaturation: "98% on room air",
      temperature: "37.1 °C",
      respiratoryRate: "16 /min"
    },
    assessment: [
      "Atypical Chest Pain - Musculoskeletal origin vs. GERD.",
      "Rule out Acute Coronary Syndrome (ACS)."
    ],
    plan: [
      "Immediate 12-Lead ECG examination.",
      "Order High-Sensitivity Troponin I & Complete Blood Count (CBC).",
      "Prescribe PPI (Pantoprazole 40mg) and mild analgesia.",
      "Follow-up in 7 days or immediate ED presentation if symptoms worsen."
    ],
    suggestedICD10: [
      { code: "R07.89", name: "Other chest pain" },
      { code: "K21.9", name: "Gastro-esophageal reflux disease" },
      { code: "I10", name: "Essential (primary) hypertension" }
    ],
    suggestedMedications: [
      { name: "Pantoprazole 40mg", dosage: "1 Tablet", frequency: "Daily before breakfast" }
    ],
    requiresRequisition: true
  };
}

/**
 * Service to fetch active waiting list
 */
export async function getLiveWaitingList(): Promise<WaitingListPatient[]> {
  return [
    {
      id: "PAT-1082",
      name: "أحمد محمود سالم",
      age: 45,
      gender: "male",
      chiefComplaint: "ألم ضاغط بالصدر وضيق تنفس",
      arrivalTime: "10:15 ص",
      status: "in_exam",
      triagePriority: "high",
      assignedDoctor: "د. طارق الجابري",
      waitingMinutes: 8
    },
    {
      id: "PAT-1083",
      name: "سارة عبد الرحمن",
      age: 29,
      gender: "female",
      chiefComplaint: "صداع نصفي مستمر مع غثيان",
      arrivalTime: "10:30 ص",
      status: "waiting",
      triagePriority: "medium",
      assignedDoctor: "د. طارق الجابري",
      waitingMinutes: 14
    },
    {
      id: "PAT-1084",
      name: "يوسف خالد النجار",
      age: 8,
      gender: "male",
      chiefComplaint: "ارتفاع حرارة وسعال جاف",
      arrivalTime: "10:42 ص",
      status: "waiting",
      triagePriority: "medium",
      assignedDoctor: "د. فاطمة الزهراء",
      waitingMinutes: 5
    },
    {
      id: "PAT-1080",
      name: "منى إبراهيم حامد",
      age: 52,
      gender: "female",
      chiefComplaint: "متابعة سكري وفحص دوري",
      arrivalTime: "09:45 ص",
      status: "completed",
      triagePriority: "low",
      assignedDoctor: "د. طارق الجابري",
      waitingMinutes: 0
    }
  ];
}

/**
 * Generates printable medical requisition data matching medical-requisition-print.js
 */
export function createMockRequisition(patientName = "أحمد محمود سالم", examId = "EXAM-2026-9481"): RequisitionOrder {
  return {
    orderId: examId,
    barcode: `REQ-${Math.floor(100000 + Math.random() * 900000)}`,
    patientName,
    patientId: "PAT-1082",
    age: 45,
    gender: "ذكر",
    date: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }),
    doctorName: "د. طارق الجابري (استشاري الأمراض الباطنية)",
    clinicBranch: "فرع القاهرة - عيادات نبض التخصصية",
    clinicalDiagnosis: "Atypical Chest Pain / Rule out Cardiac Etiology",
    labTests: [
      { category: "Cardiac Biomarkers", testName: "High-Sensitivity Cardiac Troponin I (hs-cTnI)" },
      { category: "Hematology", testName: "Complete Blood Count (CBC with Diff)" },
      { category: "Biochemistry", testName: "Serum Electrolytes (Na+, K+, Cl-)" },
      { category: "Lipid Profile", testName: "Total Cholesterol, HDL, LDL, Triglycerides" }
    ],
    radiologyTests: [
      { type: "ECG", area: "12-Lead Electrocardiogram at Rest" },
      { type: "Chest X-Ray", area: "CXR PA View (Heart & Lung Fields)" }
    ],
    urgency: "urgent"
  };
}
