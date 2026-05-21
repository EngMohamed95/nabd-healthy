/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AIShowcase from './components/AIShowcase';
import Features from './components/Features';
import DashboardPreview from './components/DashboardPreview';
import WhyChooseUs from './components/WhyChooseUs';
import ShowcaseGallery from './components/ShowcaseGallery';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
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
    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[var(--color-darker)] text-slate-800 overflow-hidden">
      <Navbar />
      <main className="relative z-10 flex flex-col items-center w-full">
        <Hero />
        <AIShowcase />
        <Features />
        <DashboardPreview />
        <WhyChooseUs />
        <ShowcaseGallery />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

