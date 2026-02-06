import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const CyberCursor = () => {
    const { isProMode } = useTheme();
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Spring physics for smooth trailing
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Detect mobile users to disable custom cursor
        const mobileCheck = window.matchMedia('(pointer: coarse)');
        if (mobileCheck.matches) {
            setIsMobile(true);
            return;
        }

        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
            setIsVisible(true);
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        // Add event listeners for hover effects on interactive elements
        const addHoverListeners = () => {
            const elements = document.querySelectorAll('a, button, input, textarea, .hover-target');
            elements.forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        };

        window.addEventListener('mousemove', moveCursor);
        addHoverListeners();

        // Re-add listeners when DOM changes (simple observer simulation)
        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            observer.disconnect();
            const elements = document.querySelectorAll('a, button, input, textarea, .hover-target');
            elements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    if (isProMode || isMobile || !isVisible) return null;

    return (
        <>
            <style jsx global>{`
                /* Hide default cursor only when this component is active */
                body, a, button, input {
                    cursor: none !important;
                }
            `}</style>

            {/* Main Cursor (Exact Position) */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-400 z-[9999] pointer-events-none mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    scale: isHovering ? 1.5 : 1,
                }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full" />
            </motion.div>
        </>
    );
};

export default CyberCursor;
