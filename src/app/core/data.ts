import { bi, Project, Category } from './models';
export const images = Array.from({ length: 6 }, (_, i) => `/images/interior-${i}.jpg`);
const records: [string, string, string, Category, number, number][] = [
  ['al-nour', 'شقة النور', 'Al Nour Apartment', 'apartment', 145, 12],
  ['olive', 'شقة الزيتون', 'Olive Apartment', 'apartment', 110, 8],
  ['horizon', 'مكتب أفق', 'Horizon Office', 'office', 240, 14],
  ['quiet', 'مساحة عمل هادئة', 'Quiet Workspace', 'office', 165, 10],
  ['details', 'متجر التفاصيل', 'Details Store', 'retail', 85, 7],
  ['rukn', 'بوتيك ركن', 'Rukn Boutique', 'retail', 65, 6],
];
export const projects: Project[] = records.map(
  ([slug, ar, en, category, areaSqm, estimatedDurationWeeks], i) => ({
    id: slug,
    slug,
    title: bi(ar, en),
    category,
    areaSqm,
    estimatedDurationWeeks,
    services: i % 2 ? ['renovation'] : ['design', 'finishing'],
    description: bi(
      'تصوّر لمساحة تتوازن فيها الخامات الطبيعية مع الضوء. يبدأ التصميم بفهم الاستخدام اليومي، ثم تنظيم الحركة واختيار تفاصيل هادئة وعملية تناسب المكان.',
      'A concept balancing natural materials and daylight. The approach starts with everyday use, then considers circulation, thoughtful finishes and practical details that belong in the space.',
    ),
    cover: images[i],
    gallery: [
      { src: images[i], alt: bi(ar + ' — منظر داخلي', en + ' — interior view') },
      {
        src: images[i % 2 === 0 ? i + 1 : i - 1],
        alt: bi('تفاصيل الخامات والإضاءة', 'Material and lighting details'),
      },
    ],
    featured: i % 2 === 0,
  }),
);
export const services = [
  {
    id: 'design',
    num: '01',
    title: bi('تصميم داخلي', 'Interior design'),
    desc: bi(
      'مساحة تبدأ بفكرة، وتكتمل بتفاصيل تشبهك. نخطط لكل ركن ليجمع بين الجمال والاستخدام.',
      'A space that starts with an idea and comes together through details that feel like you.',
    ),
    items: [
      bi('تخطيط المساحات وتوزيع الفراغات', 'Space planning and circulation'),
      bi('اختيار الخامات والاتجاه البصري', 'Visual direction and material selection'),
      bi('تخطيط الإضاءة والأثاث', 'Lighting and furniture planning'),
    ],
    image: images[0],
  },
  {
    id: 'finishing',
    num: '02',
    title: bi('تشطيبات', 'Finishing'),
    desc: bi(
      'من اختيار الخامة إلى آخر لمسة، تنسيق مدروس للتنفيذ ومتابعة التفاصيل.',
      'From material selection to the final touch, carefully coordinated execution and attention to detail.',
    ),
    items: [
      bi('تنسيق أعمال التشطيبات', 'Coordination of finishing works'),
      bi('اختيار المواد والتشطيبات', 'Material and finish selection'),
      bi('متابعة التنفيذ والتفاصيل', 'Execution follow-up'),
    ],
    image: images[1],
  },
  {
    id: 'renovation',
    num: '03',
    title: bi('تجديد وحدات', 'Renovation'),
    desc: bi(
      'نقرأ إمكانيات المكان من جديد، ونمنحه حياة تناسب احتياجاتك اليوم.',
      'Rediscover the potential of your space and give it a new life for the way you live today.',
    ),
    items: [
      bi('تقييم المساحة الحالية', 'Existing-space assessment'),
      bi('تحسين التوزيع والوظائف', 'Functional layout improvements'),
      bi('تجديد غرفة أو الوحدة بالكامل', 'Updating a room or the entire unit'),
    ],
    image: images[3],
  },
];
export const faqs = [
  [
    bi('ما المعلومات المطلوبة لعرض السعر؟', 'What information is needed for a quote?'),
    bi(
      'نوع الوحدة، المساحة التقريبية، الخدمة المطلوبة ووصف مختصر لاحتياجك. هذه البيانات تساعد على فهم نطاق المشروع.',
      'The unit type, approximate area, requested service and a short description help define the project scope.',
    ),
  ],
  [
    bi('هل يمكن طلب التشطيب بدون تصميم؟', 'Can I request finishing without design?'),
    bi(
      'نعم، يمكن اختيار خدمة التشطيبات بشكل مستقل بحسب احتياجات المساحة والمخططات المتاحة.',
      'Yes. Finishing can be selected independently, depending on the space and available plans.',
    ),
  ],
  [
    bi('هل يمكن تجديد غرفة واحدة؟', 'Can a single room be renovated?'),
    bi(
      'نعم، يمكن أن يشمل نطاق التجديد غرفة واحدة أو عدة غرف أو الوحدة بالكامل.',
      'Yes. Renovation may cover a single room, several rooms or an entire unit.',
    ),
  ],
  [
    bi('كيف تُحدد المدة التقديرية؟', 'How is the estimated timeline determined?'),
    bi(
      'بحسب نطاق الأعمال، حالة المكان، الخامات المطلوبة وتسلسل التنفيذ. المدد المعروضة هنا أمثلة توضيحية فقط.',
      'It depends on scope, existing conditions, material availability and sequencing. Durations shown here are illustrative only.',
    ),
  ],
  [
    bi('هل إرسال النموذج حجز فعلي؟', 'Does submitting the form create a real booking?'),
    bi(
      'لا. هذا موقع تجريبي لعرض المهارات، ولا يرسل بياناتك لأي شركة أو ينشئ حجزًا فعليًا.',
      'No. This portfolio demo does not send your information to any company or create a real booking.',
    ),
  ],
];
