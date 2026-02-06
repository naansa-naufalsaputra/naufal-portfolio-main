import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TechBadge = ({ name }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Tooltip descriptions for common tech stack items
    const tooltips = {
        Flutter: "Cross-platform framework for building native mobile apps.",
        Dart: "Client-optimized language for fast apps on any platform.",
        SQLite: "C-language library that implements a small, fast, self-contained SQL database engine.",
        AWS: "Comprehensive, evolving cloud computing platform provided by Amazon.",
        React: "JavaScript library for building user interfaces.",
        Tailwind: "A utility-first CSS framework for rapid UI development.",
        Framer: "A production-ready motion library for React."
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="px-3 py-1 text-xs font-medium text-slate-300 bg-white/10 rounded-full backdrop-blur-md cursor-help border border-white/5 hover:bg-white/20 transition-colors">
                {name}
            </span>

            <AnimatePresence>
                {isHovered && tooltips[name] && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl z-50 pointer-events-none"
                    >
                        <p className="text-[10px] text-slate-200 leading-tight text-center">
                            {tooltips[name]}
                        </p>
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800/90"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TechBadge;
