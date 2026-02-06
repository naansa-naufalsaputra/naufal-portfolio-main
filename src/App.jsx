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

function App() {
  const [showMatrix, setShowMatrix] = useState(false);

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

  // Easter Egg Logic
  useEffect(() => {
    let keySequence = [];
    const secretCode = 'hack';

    const handleKeyDown = (e) => {
      // Reset on Escape
      if (e.key === 'Escape') {
        setShowMatrix(false);
        keySequence = [];
        return;
      }

      keySequence.push(e.key.toLowerCase());

      // Keep sequence length same as code
      if (keySequence.length > secretCode.length) {
        keySequence.shift();
      }

      if (keySequence.join('') === secretCode) {
        setShowMatrix(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <SEO />
      <AnimatePresence>
        {showMatrix && <MatrixRain />}
      </AnimatePresence>

      {/* Background ambient glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[100px]"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[40%] rounded-full bg-primary/10 blur-[130px]"></div>
      </div>

      <Navbar />

      <main className="w-full max-w-[1200px] mx-auto px-6 pb-20">
        <Hero />
        <GithubStats />
        <Projects />
        <Skills />
        <Footer />
      </main>
    </>
  );
}

export default App;
