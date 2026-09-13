/**
 * Nabd AI Doctor - Modern Web Landing Page
 * Official Platform Overview Implementation
 */

import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import Features from './components/Features';
import AIShowcase from './components/AIShowcase';
import InteractiveRequisitionDemo from './components/InteractiveRequisitionDemo';
import AccuracySafetySection from './components/AccuracySafetySection';
import WorkflowEfficiencySection from './components/WorkflowEfficiencySection';
import KPIAnalyticsSection from './components/KPIAnalyticsSection';
import DashboardPreview from './components/DashboardPreview';
import EcosystemSection from './components/EcosystemSection';
import ShowcaseGallery from './components/ShowcaseGallery';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import VisionSection from './components/VisionSection';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -96 });
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen text-slate-800 selection:bg-[#4E60A2] selection:text-white bg-[#F3F4F9]">
      {/* Full-width seamless ambient lighting and dot pattern */}
      <div className="ambient-bg" />
      <div className="ambient-grid" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <Navbar />
        <main className="relative z-10 flex flex-col items-center w-full">
          {/* 1. Hero: نبض - منصة الطبيب الذكية + الركائز الـ 4 */}
          <Hero />

          {/* 2. نبذة عن منصة نبض: المعرفة والتحليل والإدارة وميثاق التمكين */}
          <AboutSection />

          {/* 3. ماذا تقدم نبض؟: الركائز الـ 6 الأساسية */}
          <Features />

          {/* 4. المختبر السريري التفاعلي: الكشف الطبي الذكي وتوليد الـ SOAP */}
          <AIShowcase />

          {/* 5. الفحوصات الذكية: توليد وطباعة طلبات التحاليل والأشعة بالباركود */}
          <InteractiveRequisitionDemo />

          {/* 6. دقة أكبر ومعلومات أكثر تنظيمًا: رادار الأمان السريري ومنع السهو والأخطاء */}
          <AccuracySafetySection />

          {/* 7. وقت أقل للإجراءات... تركيز أكبر على المريض: المهام الـ 6 وتوفير 4 ساعات */}
          <WorkflowEfficiencySection />

          {/* 8. التقارير والمؤشرات المهمة: لوحة المؤشرات الـ 7 المعتمدة بالوثيقة */}
          <KPIAnalyticsSection />

          {/* 9. واجهة الطبيب التفاعلية: مركز التحكم السريري */}
          <DashboardPreview />

          {/* 10. منظومة نبض: المنظومات الـ 5 المترابطة بهندسة متصلة */}
          <EcosystemSection />

          {/* 11. معرض الشاشات الحقيقية */}
          <ShowcaseGallery />

          {/* 12. آراء الأطباء والمراكز */}
          <Testimonials />

          {/* 13. باقات الأسعار */}
          <Pricing />

          {/* 14. منصة عالمية برؤية مستقبلية & رؤيتنا وميثاق المسؤولية الطبية */}
          <VisionSection />

          {/* 15. الدعوة للعمل: ابدأ تجربتك المجانية */}
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
