import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import MatrixRain from './components/MatrixRain';
import GithubStats from './components/GithubStats';
import SEO from './components/SEO';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import CyberCursor from './components/ui/CyberCursor';
import HRModeToggle from './components/ui/HRModeToggle';

function App() {
  const [showMatrix, setShowMatrix] = useState(false);
  const { isProMode } = useTheme();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Integrate with native anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        lenis.scrollTo(this.getAttribute('href'));
      });
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className={`min-h-screen relative overflow-x-hidden transition-colors duration-500 ${isProMode ? 'bg-slate-200 text-slate-800' : 'bg-slate-950 text-white'}`}>
      <SEO />

      <CyberCursor />
      <HRModeToggle />



      {/* 🔥 BAGIAN PENTING 2: Navbar ditaruh disini, sejajar dengan konten utama */}
      <Navbar />

      {/* 🔥 BAGIAN PENTING 3: Konten Website Utama dibungkus wrapper ini dengan z-10 */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pb-20">
        <Hero triggerHack={() => !isProMode && setShowMatrix(true)} />
        <GithubStats />
        <Projects />
        <Skills />
        <Footer />
      </div>

      {/* 🔥 BAGIAN PENTING: Matrix Rain ditaruh PALING BAWAH agar Z-Index Menang 🔥 */}
      <AnimatePresence>
        {showMatrix && !isProMode && <MatrixRain onExit={() => setShowMatrix(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
