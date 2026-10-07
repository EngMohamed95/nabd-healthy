/**
 * Nabd AI Doctor - Modern Web Landing Page
 * Official Platform Overview Implementation
 */

import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoSection from './components/VideoSection';
import AboutSection from './components/AboutSection';
import Features from './components/Features';
import WorkflowEfficiencySection from './components/WorkflowEfficiencySection';
import KPIAnalyticsSection from './components/KPIAnalyticsSection';
import EcosystemSection from './components/EcosystemSection';
import ShowcaseGallery from './components/ShowcaseGallery';
import Pricing from './components/Pricing';
import VisionSection from './components/VisionSection';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ScrollReveal from './components/ScrollReveal';
import { SHOW_PRICING } from './lib/featureFlags';

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
      if (!hash) return;
      if (hash === '#') {
        e.preventDefault();
        lenis.scrollTo(0, { offset: 0 });
        return;
      }
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      // Use layout position (offsetTop) rather than getBoundingClientRect so in-progress
      // scroll-reveal transforms don't skew the landing point.
      let top = 0;
      for (let node = el as HTMLElement | null; node; node = node.offsetParent as HTMLElement | null) {
        top += node.offsetTop;
      }
      lenis.scrollTo(top - 96);
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

          {/* 1.5. فيديو تعريفي: جولة سريعة داخل منصة نبض */}
          <ScrollReveal><VideoSection /></ScrollReveal>

          {/* 2. ماذا تقدم نبض؟: الركائز الـ 6 الأساسية */}
          <ScrollReveal><Features /></ScrollReveal>

          {/* 3. نبذة عن منصة نبض: المعرفة والتحليل والإدارة */}
          <ScrollReveal><AboutSection /></ScrollReveal>

          {/* 7. وقت أقل للإجراءات... تركيز أكبر على المريض: المهام الـ 6 وتوفير 4 ساعات */}
          <ScrollReveal><WorkflowEfficiencySection /></ScrollReveal>

          {/* 8. التقارير والمؤشرات المهمة: لوحة المؤشرات الـ 7 المعتمدة بالوثيقة */}
          <ScrollReveal><KPIAnalyticsSection /></ScrollReveal>

          {/* 9. منظومة نبض: المنظومات الـ 5 المترابطة بهندسة متصلة */}
          <ScrollReveal><EcosystemSection /></ScrollReveal>

          {/* 11. معرض الشاشات الحقيقية */}
          <ScrollReveal><ShowcaseGallery /></ScrollReveal>

          {/* 13. باقات الأسعار */}
          {SHOW_PRICING && <ScrollReveal><Pricing /></ScrollReveal>}

          {/* 14. منصة عالمية برؤية مستقبلية & رؤيتنا وميثاق المسؤولية الطبية */}
          <ScrollReveal><VisionSection /></ScrollReveal>

          {/* 15. الدعوة للعمل: ابدأ تجربتك المجانية */}
          <ScrollReveal><CTA /></ScrollReveal>
        </main>
        <ScrollReveal enterOffset={['start end', 'end end']} exit={false}>
          <Footer />
        </ScrollReveal>
      </div>
    </div>
  );
}
