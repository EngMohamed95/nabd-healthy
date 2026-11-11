// Content for the legal pages (Privacy Policy, Terms of Use, Security & HIPAA), in Arabic and English.
// Every page is prerendered at /<slug>/ (Arabic) and /en/<slug>/ (English) by scripts/prerender.js.
import type { Language } from './i18n';

export const LEGAL_PAGES = ['privacy', 'terms', 'security'] as const;
export type LegalPageId = (typeof LEGAL_PAGES)[number];

export interface LegalSection {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Paragraphs shown after the bullet list. */
  after?: string[];
  /** Highlighted callout box. */
  note?: string;
}

export interface LegalDoc {
  /** Short name used in links and the footer. */
  name: string;
  title: string;
  /** <title> and description for search engines and link previews. */
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: LegalSection[];
}

export interface LegalUi {
  home: string;
  lastUpdated: string;
  updatedDate: string;
  onThisPage: string;
  otherDocs: string;
  questions: string;
  questionsDesc: string;
  openSupport: string;
}

const APP = 'app.nabdassist.com';
const SITE = 'nabdassist.com';

export const legalUi: Record<Language, LegalUi> = {
  ar: {
    home: 'الرئيسية',
    lastUpdated: 'آخر تحديث',
    updatedDate: '11 نوفمبر 2026',
    onThisPage: 'محتويات الصفحة',
    otherDocs: 'وثائق ذات صلة',
    questions: 'لديك سؤال؟',
    questionsDesc: 'تواصل مع فريق نبض من صفحة «الدعم والمساعدة» داخل التطبيق، وسنرد عليك في أقرب وقت.',
    openSupport: 'فتح برنامج نبض',
  },
  en: {
    home: 'Home',
    lastUpdated: 'Last updated',
    updatedDate: 'November 11, 2026',
    onThisPage: 'On this page',
    otherDocs: 'Related documents',
    questions: 'Have a question?',
    questionsDesc: 'Reach the Nabd team from the "Support & Help" page inside the app, and we will get back to you as soon as possible.',
    openSupport: 'Open the Nabd app',
  },
};

export const legalContent: Record<Language, Record<LegalPageId, LegalDoc>> = {
  ar: {
    privacy: {
      name: 'سياسة الخصوصية',
      title: 'سياسة الخصوصية',
      metaTitle: 'سياسة الخصوصية | نبض - منصة الطبيب الذكية',
      metaDescription:
        'تعرّف على كيفية جمع منصة نبض للبيانات واستخدامها وحمايتها، بما في ذلك بيانات الأطباء والسجلات الطبية للمرضى ومعالجة الذكاء الاصطناعي.',
      intro: `توضح هذه السياسة كيف تجمع منصة نبض («نبض» أو «نحن») المعلومات وتستخدمها وتحميها عند استخدامك للموقع التعريفي ${SITE} وتطبيق الويب ${APP}. نحن ندرك أن البيانات الطبية من أكثر البيانات حساسية، لذلك صممنا نبض بحيث تبقى خصوصية الطبيب والمريض في صميم كل ميزة.`,
      sections: [
        {
          id: 'scope',
          title: 'من نحن ونطاق هذه السياسة',
          paragraphs: [
            'نبض منصة طبية متكاملة مدعومة بالذكاء الاصطناعي، صُممت لخدمة الأطباء والعيادات والمنشآت الصحية، وتجمع الكشف الذكي ومساعد نبض ودعم القرار السريري وإدارة الممارسة الطبية والتقارير والمؤشرات في منصة واحدة.',
            'تنطبق هذه السياسة على الأطباء والمنشآت الصحية ومساعديهم الذين يستخدمون نبض، وعلى زوار الموقع التعريفي.',
          ],
        },
        {
          id: 'roles',
          title: 'دورنا تجاه بيانات المرضى',
          paragraphs: [
            'الطبيب أو المنشأة الصحية هو صاحب العلاقة العلاجية مع المريض، وهو المسؤول عن بيانات مرضاه التي يدخلها في نبض. أما نبض فتعالج هذه البيانات نيابةً عن الطبيب ووفق تعليماته، ولغرض واحد هو تقديم الخدمة له.',
            'يتحمل الطبيب أو المنشأة مسؤولية الحصول على موافقة المريض أو الأساس النظامي اللازم لتسجيل بياناته ومعالجتها، وفق الأنظمة المعمول بها في بلده.',
          ],
        },
        {
          id: 'data-we-collect',
          title: 'المعلومات التي نجمعها',
          bullets: [
            'بيانات الحساب: الاسم، البريد الإلكتروني، رقم الهاتف، التخصص الطبي، وبيانات العيادات والفروع.',
            'بيانات المساعدين: حسابات المساعدين التي يضيفها الطبيب والصلاحيات الممنوحة لكل منهم.',
            'السجلات الطبية التي يدخلها الطبيب: البيانات الأساسية للمريض، فصيلة الدم، الحساسية الدوائية، التاريخ المرضي، الكشوفات والتشخيصات، الأدوية والوصفات، التحاليل والأشعة والملفات المرفوعة (PDF أو صور)، التقارير الطبية والإجازات المرضية والإحالات، والمواعيد وقائمة الانتظار.',
            'محتوى الكشف الذكي: المحادثة السريرية أو الملاحظات التي يقدمها الطبيب أثناء الكشف ليقوم الذكاء الاصطناعي بتنظيمها في ملخص منظم (SOAP).',
            'أسئلة مساعد نبض الذكي: الاستفسارات الطبية التي يطرحها الطبيب على المساعد.',
            'بيانات الاشتراك والاستخدام: نوع الباقة، حالة الاشتراك، ومؤشرات استخدام الخدمات.',
            'رسائل الدعم والمقترحات: تذاكر الدعم الفني والأفكار التي ترسلها لنا من داخل التطبيق.',
            'بيانات تقنية: نوع المتصفح والجهاز، عنوان IP، أوقات تسجيل الدخول، ولغة الواجهة المفضلة.',
          ],
        },
        {
          id: 'how-we-use',
          title: 'كيف نستخدم المعلومات',
          bullets: [
            'تقديم خدمات نبض وتشغيلها: الملف الطبي، قائمة الانتظار، طلبات التحاليل والأشعة، والتقارير.',
            'تشغيل ميزات الذكاء الاصطناعي: تنظيم الكشف، تلخيص النتائج، التنبيهات الدوائية، والإجابة على أسئلة الطبيب.',
            'إعداد لوحة المؤشرات والتقارير الخاصة بنشاط الطبيب وعيادته.',
            'إدارة الحساب والاشتراك والفوترة.',
            'الرد على طلبات الدعم الفني ومتابعة المقترحات.',
            'حماية المنصة ومنع الاستخدام غير المصرح به أو المسيء.',
            'تحسين الخدمة باستخدام إحصاءات مجمعة لا تكشف هوية الطبيب أو المريض.',
            'الالتزام بالمتطلبات النظامية والقانونية.',
          ],
          note: 'لا نبيع بياناتك أو بيانات مرضاك لأي جهة، ولا نستخدم البيانات الطبية لأغراض إعلانية.',
        },
        {
          id: 'ai',
          title: 'الذكاء الاصطناعي ومعالجة البيانات',
          paragraphs: [
            'تعمل تقنيات الذكاء الاصطناعي في نبض كأدوات مساندة للطبيب. كل ما تقترحه (ملخص الكشف، التشخيصات المحتملة، الفحوصات، الأدوية، أكواد ICD-10) يظهر كاقتراح يراجعه الطبيب ويعدّله ويعتمده، ويبقى التشخيص والقرار العلاجي النهائي من مسؤولية المختص الطبي.',
            'تُعالج البيانات بالقدر اللازم فقط لتقديم المخرج المطلوب. وعند الاستعانة بمزودي تقنيات أو نماذج ذكاء اصطناعي من أطراف ثالثة، نشارك الحد الأدنى الضروري من البيانات ونلزمهم بالسرية وحماية البيانات.',
          ],
        },
        {
          id: 'sharing',
          title: 'مشاركة المعلومات',
          paragraphs: ['لا نشارك المعلومات إلا في الحالات التالية:'],
          bullets: [
            'مع المساعدين المصرح لهم داخل حساب الطبيب، وفي حدود الصلاحيات التي يحددها الطبيب.',
            'مع مزودي الخدمات الذين نعتمد عليهم في تشغيل المنصة (الاستضافة والبنية السحابية، الدفع، خدمات الذكاء الاصطناعي)، وبموجب التزامات تعاقدية بالسرية.',
            'مع الجهات الرسمية عندما يُلزمنا النظام أو أمر قضائي بذلك.',
            'في حال اندماج أو استحواذ، مع استمرار حماية البيانات وفق هذه السياسة وإشعارك بذلك.',
          ],
        },
        {
          id: 'security',
          title: 'أمن المعلومات',
          paragraphs: [
            'نطبق حماية مشددة لبيانات المرضى والسجلات الطبية، تشمل تشفير الاتصال، وتشفير الملفات المخزنة، والتحكم في الصلاحيات. تفاصيل ذلك متاحة في صفحة «معايير الأمان و HIPAA».',
          ],
        },
        {
          id: 'retention',
          title: 'الاحتفاظ بالبيانات وحذفها',
          bullets: [
            'نحتفظ ببيانات الحساب والسجلات الطبية طوال فترة نشاط الحساب لتقديم الخدمة.',
            'ملفات المرضى المحذوفة تنتقل إلى قائمة «الملفات المحذوفة» حيث يمكن للطبيب مراجعتها قبل الحذف النهائي، لتفادي فقدان السجلات عن طريق الخطأ.',
            'عند إنهاء الاشتراك يمكنك طلب نسخة من بياناتك أو حذفها، مع مراعاة مدد الاحتفاظ الإلزامية بالسجلات الطبية التي تفرضها أنظمة بلدك.',
          ],
        },
        {
          id: 'rights',
          title: 'حقوقك',
          paragraphs: ['وفقًا للأنظمة المعمول بها، يحق لك:'],
          bullets: [
            'الوصول إلى بياناتك والحصول على نسخة منها.',
            'تصحيح البيانات غير الدقيقة أو استكمالها.',
            'طلب حذف بياناتك عندما لا تكون هناك حاجة نظامية للاحتفاظ بها.',
            'الاعتراض على بعض أوجه المعالجة أو طلب تقييدها.',
            'سحب موافقتك في أي وقت فيما يقوم على الموافقة.',
          ],
          after: [
            'إذا كنت مريضًا وترغب في ممارسة حقوقك على سجلك الطبي، فتوجّه إلى طبيبك أو المنشأة التي تعالجك بصفتها المسؤولة عن بياناتك، وسنساعدها في تلبية طلبك.',
          ],
        },
        {
          id: 'cookies',
          title: 'ملفات تعريف الارتباط والتخزين المحلي',
          paragraphs: [
            'لا يستخدم الموقع التعريفي ملفات تتبع إعلانية. يستخدم تطبيق الويب ملفات تعريف ارتباط وتخزينًا محليًا ضروريًا فقط لتسجيل الدخول والحفاظ على الجلسة وحفظ تفضيلاتك مثل اللغة.',
          ],
        },
        {
          id: 'international',
          title: 'نقل البيانات والأنظمة المحلية',
          paragraphs: [
            'صُممت نبض لخدمة الأطباء في دول مختلفة، وقد تُعالج البيانات أو تُخزّن في دولة غير دولتك، مع تطبيق ضمانات الحماية نفسها أينما كانت.',
            'نعمل على مواءمة ممارساتنا مع الأنظمة المعمول بها في الأسواق التي نخدمها، ومنها نظام حماية البيانات الشخصية في المملكة العربية السعودية، وقانون حماية البيانات الشخصية المصري رقم 151 لسنة 2020، ومبادئ قانون HIPAA الأمريكي.',
          ],
        },
        {
          id: 'children',
          title: 'خصوصية الأطفال',
          paragraphs: [
            'نبض موجهة للأطباء والمهنيين الصحيين، وليست موجهة للأطفال. بيانات المرضى القُصّر يدخلها الطبيب ضمن مسؤوليته المهنية ووفق موافقة ولي الأمر حسب الأنظمة.',
          ],
        },
        {
          id: 'changes',
          title: 'التغييرات على هذه السياسة',
          paragraphs: [
            'قد نحدّث هذه السياسة من وقت لآخر. سنعدّل تاريخ «آخر تحديث» أعلى الصفحة، وسنخطرك داخل التطبيق أو بالبريد الإلكتروني عند وجود تغييرات جوهرية.',
          ],
        },
        {
          id: 'contact',
          title: 'التواصل معنا',
          paragraphs: [
            `لأي استفسار أو طلب يتعلق بالخصوصية، تواصل معنا من صفحة «الدعم والمساعدة» داخل التطبيق ${APP}، أو من قسم «تواصل معنا» في الموقع.`,
          ],
        },
      ],
    },
    terms: {
      name: 'شروط الاستخدام',
      title: 'شروط الاستخدام',
      metaTitle: 'شروط الاستخدام | نبض - منصة الطبيب الذكية',
      metaDescription:
        'الشروط التي تنظم استخدام منصة نبض الطبية المدعومة بالذكاء الاصطناعي، بما في ذلك مسؤولية الطبيب عن القرار الطبي والاشتراك والاستخدام المقبول.',
      intro: `تنظم هذه الشروط استخدامك لمنصة نبض، بما في ذلك الموقع التعريفي ${SITE} وتطبيق الويب ${APP}. يُرجى قراءتها بعناية، فبإنشائك حسابًا أو استخدامك للمنصة فإنك توافق عليها.`,
      sections: [
        {
          id: 'acceptance',
          title: 'القبول بالشروط',
          paragraphs: [
            'باستخدامك نبض فإنك توافق على هذه الشروط وعلى سياسة الخصوصية. إذا كنت تستخدم المنصة نيابةً عن عيادة أو منشأة صحية، فإنك تقرّ بأن لديك الصلاحية لإلزامها بهذه الشروط.',
          ],
        },
        {
          id: 'service',
          title: 'وصف الخدمة',
          paragraphs: ['نبض منصة طبية مدعومة بالذكاء الاصطناعي تقدم للطبيب:'],
          bullets: [
            'الكشف الطبي الذكي: تنظيم المحادثة والمعلومات الطبية في ملخص منظم لمراجعة الطبيب واعتماده.',
            'مساعد نبض الذكي: البحث في المعلومات الطبية والأدوية والجرعات والإرشادات والمراجع.',
            'دعم التشخيص والقرار الطبي، والتنبيهات مثل الحساسية الدوائية والتداخلات والنتائج غير الطبيعية.',
            'التحاليل والأشعة: ربطها بملف المريض وتلخيص نتائجها.',
            'التقارير الطبية والوصفات والإجازات المرضية والإحالات وطلبات الفحوصات بالباركود.',
            'إدارة المرضى والمواعيد وقائمة الانتظار والعيادات والمساعدين، ولوحة التقارير والمؤشرات.',
          ],
        },
        {
          id: 'eligibility',
          title: 'الأهلية والحسابات',
          bullets: [
            'نبض مخصصة للأطباء والمهنيين الصحيين المرخصين والمنشآت الصحية. أنت مسؤول عن صحة بيانات ترخيصك وحسابك.',
            'يمكن للطبيب إضافة مساعدين وتحديد صلاحياتهم، ويبقى الطبيب مسؤولًا عن كل ما يتم من خلال حسابه وحسابات مساعديه.',
            'حافظ على سرية بيانات الدخول، ولا تشارك حسابك مع غيرك، وأبلغنا فورًا عند الاشتباه في أي استخدام غير مصرح به.',
          ],
        },
        {
          id: 'medical-disclaimer',
          title: 'طبيعة الذكاء الاصطناعي والمسؤولية الطبية',
          paragraphs: [
            'تعمل تقنيات الذكاء الاصطناعي في نبض كأدوات مساندة للطبيب. المخرجات (الملخصات، التشخيصات المحتملة، الفحوصات المقترحة، الأدوية والجرعات، الأكواد) اقتراحات قد تحتوي على أخطاء أو نقص، ويجب على الطبيب مراجعتها والتحقق منها قبل اعتمادها أو استخدامها.',
          ],
          bullets: [
            'يبقى التشخيص والقرار العلاجي النهائي من مسؤولية المختص الطبي وحده.',
            'نبض ليست بديلًا عن الحكم السريري أو الفحص المباشر للمريض.',
            'نبض ليست موجهة لاستخدام المرضى مباشرةً، ولا تُستخدم في حالات الطوارئ.',
          ],
          note: 'نبض لا تستبدل الطبيب، بل تمنحه أدوات إضافية تساعده على العمل بدقة وكفاءة أكبر.',
        },
        {
          id: 'patient-data',
          title: 'مسؤوليتك تجاه بيانات المرضى',
          bullets: [
            'أنت مسؤول عن الحصول على موافقة المرضى أو الأساس النظامي اللازم لتسجيل بياناتهم ومعالجتها في نبض.',
            'أنت مسؤول عن دقة البيانات التي تدخلها وعن الالتزام بأنظمة مزاولة المهنة وحماية البيانات في بلدك.',
            'تعالج نبض بيانات المرضى نيابةً عنك ولتقديم الخدمة فقط، كما هو موضح في سياسة الخصوصية.',
          ],
        },
        {
          id: 'acceptable-use',
          title: 'الاستخدام المقبول',
          paragraphs: ['يُحظر عليك:'],
          bullets: [
            'استخدام المنصة لأي غرض غير مشروع أو مخالف لأخلاقيات المهنة الطبية.',
            'إدخال بيانات لا تملك حق معالجتها، أو الوصول إلى بيانات مرضى لا علاقة علاجية لك بهم.',
            'محاولة اختراق المنصة أو تعطيلها أو تجاوز ضوابط الأمان والصلاحيات.',
            'نسخ المنصة أو إعادة بيعها أو الهندسة العكسية لها، أو استخراج بياناتها آليًا دون إذن.',
            'استخدام مخرجات الذكاء الاصطناعي دون مراجعة طبية.',
          ],
        },
        {
          id: 'subscription',
          title: 'الاشتراك والتجربة المجانية والدفع',
          bullets: [
            'قد تتاح فترة تجربة مجانية للحسابات الجديدة، وبعد انتهائها يلزم الاشتراك في إحدى الباقات للاستمرار.',
            'تفاصيل الباقات والأسعار والاستخدام معروضة في صفحة «الاشتراك والاستخدام» داخل التطبيق، وقد تختلف الأسعار حسب الدولة.',
            'تتجدد الاشتراكات تلقائيًا ما لم تُلغَ قبل نهاية الفترة الحالية، وتظل الخدمة متاحة حتى نهاية الفترة المدفوعة.',
            'الرسوم المدفوعة غير قابلة للاسترداد إلا إذا نصّت الأنظمة المعمول بها على خلاف ذلك.',
          ],
        },
        {
          id: 'ip',
          title: 'الملكية الفكرية وملكية البيانات',
          paragraphs: [
            'منصة نبض وبرمجياتها وتصميمها وعلامتها التجارية ومحتواها مملوكة لنبض. نمنحك ترخيصًا محدودًا وغير حصري وغير قابل للتحويل لاستخدامها طوال فترة اشتراكك.',
            'تظل البيانات التي تدخلها أنت أو مساعدوك ملكًا لك أو لمنشأتك، وتمنحنا الحق في معالجتها فقط بالقدر اللازم لتقديم الخدمة.',
          ],
        },
        {
          id: 'availability',
          title: 'توفر الخدمة والتحديثات',
          paragraphs: [
            'نسعى لإبقاء نبض متاحة باستمرار، لكن قد تتوقف الخدمة مؤقتًا للصيانة أو التحديث أو لأسباب خارجة عن إرادتنا. نطوّر المنصة باستمرار، وقد نضيف ميزات أو نعدّلها أو نوقفها.',
          ],
        },
        {
          id: 'liability',
          title: 'حدود المسؤولية',
          paragraphs: [
            'إلى أقصى حد تسمح به الأنظمة، تُقدَّم نبض «كما هي»، ولا نتحمل المسؤولية عن القرارات الطبية المتخذة بناءً على مخرجاتها، ولا عن الأضرار غير المباشرة أو التبعية. وفي جميع الأحوال، لا تتجاوز مسؤوليتنا الإجمالية المبالغ التي دفعتها لنا خلال الاثني عشر شهرًا السابقة للمطالبة.',
          ],
        },
        {
          id: 'termination',
          title: 'الإيقاف والإنهاء',
          paragraphs: [
            'يمكنك إلغاء اشتراكك في أي وقت. ويحق لنا تعليق الحساب أو إنهاؤه عند مخالفة هذه الشروط أو إساءة استخدام المنصة. عند الإنهاء يمكنك طلب نسخة من بياناتك خلال فترة معقولة، وفق ما هو موضح في سياسة الخصوصية.',
          ],
        },
        {
          id: 'changes',
          title: 'التعديلات على الشروط',
          paragraphs: [
            'قد نعدّل هذه الشروط من وقت لآخر، وسنخطرك بالتغييرات الجوهرية داخل التطبيق أو بالبريد الإلكتروني. استمرارك في استخدام نبض بعد سريان التعديلات يعني موافقتك عليها.',
          ],
        },
        {
          id: 'law',
          title: 'النظام الواجب التطبيق',
          paragraphs: [
            'تخضع هذه الشروط للأنظمة المعمول بها في الدولة التي تُقدَّم فيها الخدمة للمستخدم، وتُحل النزاعات وديًا قدر الإمكان قبل اللجوء إلى الجهات المختصة.',
          ],
        },
        {
          id: 'contact',
          title: 'التواصل معنا',
          paragraphs: [
            `لأي استفسار حول هذه الشروط، تواصل معنا من صفحة «الدعم والمساعدة» داخل التطبيق ${APP}، أو من قسم «تواصل معنا» في الموقع.`,
          ],
        },
      ],
    },
    security: {
      name: 'معايير الأمان و HIPAA',
      title: 'معايير الأمان و HIPAA',
      metaTitle: 'معايير الأمان و HIPAA | نبض - منصة الطبيب الذكية',
      metaDescription:
        'كيف تحمي منصة نبض بيانات المرضى والسجلات الطبية: التشفير، التحكم في الصلاحيات، سلامة السجلات، ومواءمة الضوابط مع معايير HIPAA والأنظمة المحلية.',
      intro:
        'حماية بيانات المرضى والسجلات الطبية في صميم تصميم نبض. توضح هذه الصفحة الضوابط التي نطبقها لحماية البيانات، وكيف نسترشد بمعايير HIPAA وأنظمة حماية البيانات في الأسواق التي نخدمها.',
      sections: [
        {
          id: 'commitment',
          title: 'التزامنا بالأمان والخصوصية',
          paragraphs: [
            'نتعامل مع كل سجل طبي على أنه أمانة. لذلك نطبق حماية مشددة لبيانات المرضى والسجلات الطبية بأحدث معايير التشفير، ونقصر الوصول إليها على من يحتاجه فعلًا لتقديم الرعاية.',
          ],
        },
        {
          id: 'encryption',
          title: 'التشفير',
          bullets: [
            'تشفير الاتصال: جميع الاتصالات بالموقع والتطبيق تتم عبر HTTPS (بروتوكول TLS)، ويُحوَّل أي اتصال غير مشفر تلقائيًا إلى اتصال آمن.',
            'تشفير البيانات المخزنة: تُحفظ السجلات الطبية والملفات المرفوعة (تقارير التحاليل والأشعة بصيغة PDF أو صور) في تخزين سحابي مشفر.',
            'حماية بيانات الدخول: لا تُخزَّن كلمات المرور كنص صريح.',
          ],
        },
        {
          id: 'access-control',
          title: 'التحكم في الوصول والصلاحيات',
          bullets: [
            'لكل مستخدم حساب مستقل، ولا تظهر بيانات المرضى إلا داخل حساب الطبيب أو المنشأة المسؤولة عنها.',
            'يضيف الطبيب مساعديه ويحدد صلاحياتهم الطبية والإدارية، بحيث يرى كل مساعد ما يحتاجه لعمله فقط (مبدأ الحد الأدنى من الصلاحيات).',
            'يستطيع الطبيب تعديل صلاحيات أي مساعد أو إيقاف حسابه في أي وقت.',
          ],
        },
        {
          id: 'integrity',
          title: 'سلامة السجلات وإمكانية المراجعة',
          bullets: [
            'لا تُحذف ملفات المرضى نهائيًا بنقرة واحدة؛ بل تنتقل إلى قائمة «الملفات المحذوفة» لمراجعتها، لتفادي فقدان السجلات عن طريق الخطأ.',
            'الكشوفات الملغاة تبقى محفوظة مع تفاصيلها في قائمة «الكشوفات الملغاة» بدلًا من اختفائها.',
            'طلبات التحاليل والأشعة والتقارير المعتمدة من الطبيب تُسجَّل في ملف المريض، وتُطبع طلبات الفحوصات بباركود يربطها بالمريض لتقليل أخطاء الخلط.',
          ],
        },
        {
          id: 'ai-safety',
          title: 'الذكاء الاصطناعي الآمن',
          bullets: [
            'يعمل الذكاء الاصطناعي كأداة مساندة، وكل مخرجاته تمر بمراجعة الطبيب واعتماده قبل أن تصبح جزءًا من السجل.',
            'تنبيهات السلامة السريرية (الحساسية الدوائية، التداخلات بين الأدوية، النتائج غير الطبيعية، البيانات الناقصة) تلفت انتباه الطبيب قبل اتخاذ القرار.',
            'تُعالج البيانات بالقدر اللازم فقط لتقديم المخرج المطلوب، ولا تُستخدم البيانات الطبية لأغراض إعلانية.',
          ],
        },
        {
          id: 'hipaa',
          title: 'نبض ومعايير HIPAA',
          paragraphs: [
            'قانون HIPAA هو القانون الأمريكي لحماية المعلومات الصحية، ويحدد ضمانات إدارية ومادية وتقنية لحماية المعلومات الصحية المحمية (PHI). نسترشد بهذه الضمانات في تصميم ضوابط نبض:',
          ],
          bullets: [
            'الضمانات الإدارية: تقييد الوصول إلى البيانات على من يحتاجه، وإجراءات واضحة للتعامل مع الحوادث الأمنية.',
            'الضمانات المادية: استضافة المنصة لدى مزودي بنية سحابية يطبقون ضوابط حماية مادية لمراكز البيانات.',
            'الضمانات التقنية: التشفير أثناء النقل والتخزين، والحسابات الفردية، والتحكم في الصلاحيات.',
          ],
          after: [
            'للمنشآت الصحية الخاضعة لقانون HIPAA، يمكن مناقشة اتفاقية شريك الأعمال (BAA) ضمن باقات المستشفيات والمؤسسات.',
          ],
          note: 'الالتزام بقانون HIPAA مسؤولية مشتركة بين نبض والمنشأة الصحية، ويعتمد على طبيعة المنشأة وبلدها. هذه الصفحة توضح ضوابطنا ولا تمثل شهادة اعتماد صادرة عن جهة خارجية.',
        },
        {
          id: 'local-laws',
          title: 'الأنظمة المحلية لحماية البيانات',
          paragraphs: [
            'صُممت نبض برؤية عالمية مع إمكانية تكييف الخدمات وفق المتطلبات الطبية والتنظيمية لكل سوق. ونعمل على مواءمة ممارساتنا مع نظام حماية البيانات الشخصية في المملكة العربية السعودية، وقانون حماية البيانات الشخصية المصري رقم 151 لسنة 2020.',
          ],
        },
        {
          id: 'incidents',
          title: 'الاستجابة للحوادث الأمنية',
          paragraphs: [
            'نراقب المنصة لاكتشاف أي نشاط غير معتاد. وفي حال وقوع حادث أمني يؤثر على بياناتك، نتخذ الإجراءات اللازمة لاحتوائه ونخطر الأطباء والمنشآت المتأثرة دون تأخير غير مبرر، وفق ما تتطلبه الأنظمة المعمول بها.',
          ],
        },
        {
          id: 'shared-responsibility',
          title: 'دورك في حماية البيانات',
          bullets: [
            'استخدم كلمة مرور قوية وخاصة بنبض، ولا تشاركها مع أحد.',
            'أنشئ حسابًا مستقلًا لكل مساعد بدلًا من مشاركة حسابك، وراجع صلاحياتهم بانتظام.',
            'سجّل الخروج عند استخدام جهاز مشترك داخل العيادة.',
            'أبلغنا فورًا عند الاشتباه في أي وصول غير مصرح به.',
          ],
        },
        {
          id: 'report',
          title: 'الإبلاغ عن ثغرة أمنية',
          paragraphs: [
            `إذا اكتشفت ثغرة أمنية محتملة، يُرجى إبلاغنا عبر صفحة «الدعم والمساعدة» داخل التطبيق ${APP}، وعدم الإفصاح عنها علنًا حتى نعالجها. نقدّر كل بلاغ مسؤول يساعدنا على حماية الأطباء ومرضاهم.`,
          ],
        },
      ],
    },
  },
  en: {
    privacy: {
      name: 'Privacy Policy',
      title: 'Privacy Policy',
      metaTitle: 'Privacy Policy | Nabd - AI Medical Assistant for Doctors',
      metaDescription:
        'How Nabd collects, uses and protects data, including physician accounts, patient medical records and AI processing.',
      intro: `This policy explains how Nabd ("Nabd", "we") collects, uses and protects information when you use our website ${SITE} and the web app ${APP}. Medical data is among the most sensitive data there is, so we built Nabd with doctor and patient privacy at the core of every feature.`,
      sections: [
        {
          id: 'scope',
          title: 'Who we are and what this policy covers',
          paragraphs: [
            'Nabd is a complete AI-powered medical platform built for doctors, clinics and healthcare facilities. It brings smart consultation, the Nabd AI Assistant, clinical decision support, practice management, and reports and KPIs together in one platform.',
            'This policy applies to doctors, healthcare facilities and their assistants who use Nabd, and to visitors of our website.',
          ],
        },
        {
          id: 'roles',
          title: 'Our role with patient data',
          paragraphs: [
            'The doctor or healthcare facility holds the treatment relationship with the patient and is responsible for the patient data they enter into Nabd. Nabd processes that data on the doctor\'s behalf, following their instructions, for one purpose only: providing the service to them.',
            'The doctor or facility is responsible for obtaining the patient\'s consent, or the legal basis required, to record and process their data under the laws of their country.',
          ],
        },
        {
          id: 'data-we-collect',
          title: 'Information we collect',
          bullets: [
            'Account data: name, email address, phone number, medical specialty, and clinic and branch details.',
            'Assistant data: assistant accounts added by the doctor and the permissions given to each.',
            'Medical records entered by the doctor: patient demographics, blood type, drug allergies, medical history, consultations and diagnoses, medications and prescriptions, lab tests, scans and uploaded files (PDF or images), medical reports, sick leaves and referrals, and appointments and the waiting list.',
            'Smart consultation content: the clinical conversation or notes the doctor provides during a consultation, which the AI organizes into a structured (SOAP) summary.',
            'Nabd AI Assistant questions: the medical questions the doctor asks the assistant.',
            'Subscription and usage data: plan, subscription status, and service usage metrics.',
            'Support messages and suggestions: support tickets and ideas you send us from inside the app.',
            'Technical data: browser and device type, IP address, sign-in times, and preferred interface language.',
          ],
        },
        {
          id: 'how-we-use',
          title: 'How we use information',
          bullets: [
            'To provide and run Nabd: the patient file, waiting list, lab and scan requisitions, and reports.',
            'To run AI features: organizing consultations, summarizing results, medication alerts, and answering the doctor\'s questions.',
            'To build the dashboard and reports on the doctor\'s and clinic\'s activity.',
            'To manage your account, subscription and billing.',
            'To answer support requests and follow up on suggestions.',
            'To protect the platform and prevent unauthorized or abusive use.',
            'To improve the service using aggregated statistics that do not identify any doctor or patient.',
            'To meet legal and regulatory requirements.',
          ],
          note: 'We never sell your data or your patients\' data, and we never use medical data for advertising.',
        },
        {
          id: 'ai',
          title: 'Artificial intelligence and data processing',
          paragraphs: [
            'AI in Nabd works as a supportive tool for the doctor. Everything it suggests (consultation summaries, possible diagnoses, tests, medications, ICD-10 codes) appears as a suggestion that the doctor reviews, edits and approves. The final diagnosis and treatment decision remain the responsibility of the medical professional.',
            'Data is processed only as far as needed to produce the requested output. When we use third-party technology or AI model providers, we share only the minimum data required and bind them to confidentiality and data protection obligations.',
          ],
        },
        {
          id: 'sharing',
          title: 'Sharing information',
          paragraphs: ['We share information only in these cases:'],
          bullets: [
            'With authorized assistants inside the doctor\'s account, within the permissions the doctor sets.',
            'With service providers we rely on to run the platform (hosting and cloud infrastructure, payments, AI services), under contractual confidentiality obligations.',
            'With public authorities when required by law or a court order.',
            'In a merger or acquisition, with data protection continuing under this policy and notice given to you.',
          ],
        },
        {
          id: 'security',
          title: 'Information security',
          paragraphs: [
            'We apply strong protection to patient data and medical records, including encrypted connections, encrypted file storage and permission controls. Details are on our "Security & HIPAA" page.',
          ],
        },
        {
          id: 'retention',
          title: 'Data retention and deletion',
          bullets: [
            'We keep account data and medical records for as long as the account is active, to provide the service.',
            'Deleted patient files move to the "Deleted Patients" list, where the doctor can review them before permanent deletion, so records are not lost by mistake.',
            'When your subscription ends, you can request a copy of your data or its deletion, subject to any mandatory medical-record retention periods in your country.',
          ],
        },
        {
          id: 'rights',
          title: 'Your rights',
          paragraphs: ['Under applicable law, you have the right to:'],
          bullets: [
            'Access your data and get a copy of it.',
            'Correct or complete inaccurate data.',
            'Ask us to delete your data when there is no legal need to keep it.',
            'Object to, or ask us to restrict, certain processing.',
            'Withdraw your consent at any time where processing is based on consent.',
          ],
          after: [
            'If you are a patient and want to exercise your rights over your medical record, please contact your doctor or the facility treating you, as they are responsible for your data. We will help them handle your request.',
          ],
        },
        {
          id: 'cookies',
          title: 'Cookies and local storage',
          paragraphs: [
            'Our website does not use advertising trackers. The web app uses only the cookies and local storage needed to sign you in, keep your session, and remember preferences such as language.',
          ],
        },
        {
          id: 'international',
          title: 'Data transfers and local laws',
          paragraphs: [
            'Nabd is built to serve doctors in many countries, so data may be processed or stored outside your country, with the same protections applied wherever it is.',
            'We work to align our practices with the laws of the markets we serve, including the Saudi Personal Data Protection Law, Egypt\'s Personal Data Protection Law No. 151 of 2020, and the principles of the US HIPAA law.',
          ],
        },
        {
          id: 'children',
          title: 'Children\'s privacy',
          paragraphs: [
            'Nabd is for doctors and healthcare professionals, not for children. Data of minor patients is entered by the doctor under their professional responsibility and with a guardian\'s consent where the law requires it.',
          ],
        },
        {
          id: 'changes',
          title: 'Changes to this policy',
          paragraphs: [
            'We may update this policy from time to time. We will change the "Last updated" date at the top of this page and notify you in the app or by email of any material changes.',
          ],
        },
        {
          id: 'contact',
          title: 'Contact us',
          paragraphs: [
            `For any privacy question or request, contact us from the "Support & Help" page inside the app at ${APP}, or from the "Contact" section of our website.`,
          ],
        },
      ],
    },
    terms: {
      name: 'Terms of Service',
      title: 'Terms of Service',
      metaTitle: 'Terms of Service | Nabd - AI Medical Assistant for Doctors',
      metaDescription:
        'The terms that govern use of the Nabd AI medical platform, including the doctor\'s responsibility for medical decisions, subscriptions and acceptable use.',
      intro: `These terms govern your use of Nabd, including our website ${SITE} and the web app ${APP}. Please read them carefully: by creating an account or using the platform, you agree to them.`,
      sections: [
        {
          id: 'acceptance',
          title: 'Accepting these terms',
          paragraphs: [
            'By using Nabd, you agree to these terms and to our Privacy Policy. If you use the platform on behalf of a clinic or healthcare facility, you confirm that you have the authority to bind it to these terms.',
          ],
        },
        {
          id: 'service',
          title: 'The service',
          paragraphs: ['Nabd is an AI-powered medical platform that gives doctors:'],
          bullets: [
            'Smart consultation: organizing the conversation and medical information into a structured summary for the doctor to review and approve.',
            'Nabd AI Assistant: searching medical information, medications, dosages, guidelines and references.',
            'Diagnostic and clinical decision support, with alerts such as drug allergies, drug interactions and abnormal findings.',
            'Labs and scans: linking them to the patient file and summarizing results.',
            'Medical reports, prescriptions, sick leaves, referrals and barcoded test requisitions.',
            'Management of patients, appointments, the waiting list, clinics and assistants, plus a reports and KPI dashboard.',
          ],
        },
        {
          id: 'eligibility',
          title: 'Eligibility and accounts',
          bullets: [
            'Nabd is for licensed doctors, healthcare professionals and healthcare facilities. You are responsible for the accuracy of your license and account details.',
            'Doctors can add assistants and set their permissions, and remain responsible for everything done through their account and their assistants\' accounts.',
            'Keep your sign-in details confidential, do not share your account, and tell us immediately if you suspect unauthorized use.',
          ],
        },
        {
          id: 'medical-disclaimer',
          title: 'The nature of AI and medical responsibility',
          paragraphs: [
            'AI in Nabd works as a supportive tool for the doctor. Its outputs (summaries, possible diagnoses, suggested tests, medications and dosages, codes) are suggestions that may contain errors or omissions, and the doctor must review and verify them before approving or using them.',
          ],
          bullets: [
            'The final diagnosis and treatment decision remain the sole responsibility of the medical professional.',
            'Nabd is not a substitute for clinical judgment or for examining the patient directly.',
            'Nabd is not intended for direct use by patients and must not be used for emergencies.',
          ],
          note: 'Nabd does not replace the physician; it equips them with assistive tools to work with greater precision and efficiency.',
        },
        {
          id: 'patient-data',
          title: 'Your responsibility for patient data',
          bullets: [
            'You are responsible for obtaining patients\' consent, or the legal basis required, to record and process their data in Nabd.',
            'You are responsible for the accuracy of the data you enter and for complying with the medical practice and data protection laws of your country.',
            'Nabd processes patient data on your behalf and only to provide the service, as described in our Privacy Policy.',
          ],
        },
        {
          id: 'acceptable-use',
          title: 'Acceptable use',
          paragraphs: ['You must not:'],
          bullets: [
            'Use the platform for any unlawful purpose or in breach of medical ethics.',
            'Enter data you have no right to process, or access data of patients you have no treatment relationship with.',
            'Try to breach, disrupt or bypass the platform\'s security and permission controls.',
            'Copy, resell or reverse engineer the platform, or scrape its data without permission.',
            'Use AI outputs without medical review.',
          ],
        },
        {
          id: 'subscription',
          title: 'Subscriptions, free trial and payment',
          bullets: [
            'New accounts may get a free trial; after it ends, a subscription plan is required to continue.',
            'Plans, prices and usage are shown on the "Subscription & Usage" page inside the app, and prices may vary by country.',
            'Subscriptions renew automatically unless cancelled before the end of the current period, and the service stays available until the end of the paid period.',
            'Fees paid are non-refundable unless applicable law says otherwise.',
          ],
        },
        {
          id: 'ip',
          title: 'Intellectual property and data ownership',
          paragraphs: [
            'The Nabd platform, its software, design, brand and content belong to Nabd. We grant you a limited, non-exclusive, non-transferable license to use it for the duration of your subscription.',
            'The data you and your assistants enter remains yours or your facility\'s, and you give us the right to process it only as far as needed to provide the service.',
          ],
        },
        {
          id: 'availability',
          title: 'Availability and updates',
          paragraphs: [
            'We aim to keep Nabd available at all times, but the service may pause temporarily for maintenance, updates, or reasons beyond our control. We develop the platform continuously and may add, change or retire features.',
          ],
        },
        {
          id: 'liability',
          title: 'Limitation of liability',
          paragraphs: [
            'To the fullest extent permitted by law, Nabd is provided "as is". We are not liable for medical decisions made based on its outputs, or for indirect or consequential damages. In all cases, our total liability will not exceed the amounts you paid us in the twelve months before the claim.',
          ],
        },
        {
          id: 'termination',
          title: 'Suspension and termination',
          paragraphs: [
            'You can cancel your subscription at any time. We may suspend or terminate an account that breaches these terms or misuses the platform. On termination, you can request a copy of your data within a reasonable period, as described in our Privacy Policy.',
          ],
        },
        {
          id: 'changes',
          title: 'Changes to these terms',
          paragraphs: [
            'We may change these terms from time to time and will notify you of material changes in the app or by email. Continuing to use Nabd after changes take effect means you accept them.',
          ],
        },
        {
          id: 'law',
          title: 'Governing law',
          paragraphs: [
            'These terms are governed by the laws applicable in the country where the service is provided to the user. Disputes will be settled amicably wherever possible before turning to the competent authorities.',
          ],
        },
        {
          id: 'contact',
          title: 'Contact us',
          paragraphs: [
            `For any question about these terms, contact us from the "Support & Help" page inside the app at ${APP}, or from the "Contact" section of our website.`,
          ],
        },
      ],
    },
    security: {
      name: 'Security & HIPAA',
      title: 'Security & HIPAA Standards',
      metaTitle: 'Security & HIPAA Standards | Nabd - AI Medical Assistant for Doctors',
      metaDescription:
        'How Nabd protects patient data and medical records: encryption, access control, record integrity, and safeguards aligned with HIPAA and local data protection laws.',
      intro:
        'Protecting patient data and medical records is at the core of how Nabd is built. This page explains the controls we apply to protect data, and how we follow HIPAA and the data protection laws of the markets we serve.',
      sections: [
        {
          id: 'commitment',
          title: 'Our commitment to security and privacy',
          paragraphs: [
            'We treat every medical record as a trust. That is why we apply strong protection to patient data and medical records using modern encryption, and limit access to the people who actually need it to provide care.',
          ],
        },
        {
          id: 'encryption',
          title: 'Encryption',
          bullets: [
            'Encryption in transit: all connections to the website and app use HTTPS (TLS), and any unencrypted connection is automatically redirected to a secure one.',
            'Encryption at rest: medical records and uploaded files (lab and scan reports as PDF or images) are kept in encrypted cloud storage.',
            'Credential protection: passwords are never stored in plain text.',
          ],
        },
        {
          id: 'access-control',
          title: 'Access control and permissions',
          bullets: [
            'Every user has their own account, and patient data is visible only inside the account of the doctor or facility responsible for it.',
            'Doctors add their assistants and set their medical and administrative permissions, so each assistant sees only what their work requires (least privilege).',
            'Doctors can change any assistant\'s permissions or disable their account at any time.',
          ],
        },
        {
          id: 'integrity',
          title: 'Record integrity and reviewability',
          bullets: [
            'Patient files are not permanently deleted in one click; they move to the "Deleted Patients" list for review, so records are not lost by mistake.',
            'Cancelled examinations stay on record, with their details, in the "Cancelled Examinations" list instead of disappearing.',
            'Lab and scan requisitions and doctor-approved reports are recorded in the patient file, and test requisitions are printed with a barcode linking them to the patient to reduce mix-ups.',
          ],
        },
        {
          id: 'ai-safety',
          title: 'Safe AI',
          bullets: [
            'AI works as a supportive tool, and every output is reviewed and approved by the doctor before it becomes part of the record.',
            'Clinical safety alerts (drug allergies, drug interactions, abnormal findings, missing data) draw the doctor\'s attention before a decision is made.',
            'Data is processed only as far as needed to produce the requested output, and medical data is never used for advertising.',
          ],
        },
        {
          id: 'hipaa',
          title: 'Nabd and HIPAA',
          paragraphs: [
            'HIPAA is the US law that protects health information. It sets administrative, physical and technical safeguards for protected health information (PHI). We follow these safeguards in designing Nabd\'s controls:',
          ],
          bullets: [
            'Administrative safeguards: access to data limited to those who need it, and clear procedures for handling security incidents.',
            'Physical safeguards: the platform is hosted with cloud infrastructure providers that apply physical security controls to their data centers.',
            'Technical safeguards: encryption in transit and at rest, individual accounts, and permission controls.',
          ],
          after: [
            'For healthcare organizations subject to HIPAA, a Business Associate Agreement (BAA) can be discussed as part of our hospital and enterprise plans.',
          ],
          note: 'HIPAA compliance is a shared responsibility between Nabd and the healthcare organization, and depends on the organization and its country. This page describes our controls and is not a certification issued by a third party.',
        },
        {
          id: 'local-laws',
          title: 'Local data protection laws',
          paragraphs: [
            'Nabd is built with a global vision and can adapt its services to the medical and regulatory requirements of each market. We work to align our practices with the Saudi Personal Data Protection Law and Egypt\'s Personal Data Protection Law No. 151 of 2020.',
          ],
        },
        {
          id: 'incidents',
          title: 'Security incident response',
          paragraphs: [
            'We monitor the platform for unusual activity. If a security incident affects your data, we act to contain it and notify affected doctors and facilities without undue delay, as required by applicable law.',
          ],
        },
        {
          id: 'shared-responsibility',
          title: 'Your part in protecting data',
          bullets: [
            'Use a strong password that is unique to Nabd, and never share it.',
            'Create a separate account for each assistant instead of sharing yours, and review their permissions regularly.',
            'Sign out when using a shared device in the clinic.',
            'Tell us immediately if you suspect any unauthorized access.',
          ],
        },
        {
          id: 'report',
          title: 'Reporting a vulnerability',
          paragraphs: [
            `If you find a potential security vulnerability, please report it through the "Support & Help" page inside the app at ${APP}, and do not disclose it publicly until we have fixed it. We value every responsible report that helps us protect doctors and their patients.`,
          ],
        },
      ],
    },
  },
};
