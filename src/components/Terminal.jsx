import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Terminal = () => {
    const [text, setText] = useState('');
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    const lines = [
        "initializing system...",
        "loading cloud_architecture...",
        "cyber_security_protocols: ACTIVE",
        "status: READY_TO_INNOVATE"
    ];

    // Cursor blinking effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    // Typing effect
    useEffect(() => {
        const handleType = () => {
            const currentLine = lines[lineIndex];

            // If deleting
            if (isDeleting) {
                if (charIndex > 0) {
                    setText(currentLine.substring(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                } else {
                    setIsDeleting(false);
                    setLineIndex((prev) => (prev + 1) % lines.length);
                }
            }
            // If typing
            else {
                if (charIndex < currentLine.length) {
                    setText(currentLine.substring(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                } else {
                    // Finished typing line, wait before deleting
                    // For the last line, maybe don't delete? Or cycle?
                    // The prompt says "cycle through commands", so we delete.
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            }
        };

        const typingSpeed = isDeleting ? 50 : 100;
        const timer = setTimeout(handleType, typingSpeed);

        return () => clearTimeout(timer);
    }, [text, isDeleting, lineIndex, charIndex, lines]);

    // Specific color logic for certain keywords could be added here if needed
    // For now simple mono text

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="w-full max-w-md mx-auto"
        >
            <div className="bg-black/80 backdrop-blur-md rounded-lg overflow-hidden border border-white/10 shadow-2xl font-mono text-sm md:text-base">
                {/* Window Controls */}
                <div className="bg-white/5 px-4 py-2 flex items-center gap-2 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <div className="ml-2 text-xs text-slate-500">terminal</div>
                </div>

                {/* Terminal Content */}
                <div className="p-4 h-32 flex items-center text-green-400">
                    <span>{'>'} {text}</span>
                    <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} ml-1 inline-block w-2 h-4 bg-green-400`}></span>
                </div>
            </div>
        </motion.div>
    );
};

export default Terminal;
