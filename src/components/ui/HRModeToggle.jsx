import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Terminal } from 'lucide-react';

const HRModeToggle = () => {
    const { isProMode, toggleMode } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMode}
            className={`fixed bottom-6 left-6 z-[100] px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg ${isProMode
                    ? 'bg-slate-200 text-slate-800 hover:bg-white shadow-xl'
                    : 'bg-slate-900/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-md hover:bg-slate-800 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                }`}
        >
            <AnimatePresence mode="wait">
                {isProMode ? (
                    <motion.div
                        key="pro"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        className="flex items-center gap-2"
                    >
                        <Briefcase size={14} />
                        <span>HR Mode: ON</span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="hacker"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        className="flex items-center gap-2"
                    >
                        <Terminal size={14} />
                        <span>Hacker Mode</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};

export default HRModeToggle;
