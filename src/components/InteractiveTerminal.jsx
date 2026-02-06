import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const InteractiveTerminal = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'output', content: 'Welcome to NaufalOS v2.0. Type "help" to see available commands.' }
    ]);
    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    const handleCommand = (cmd) => {
        const cleanCmd = cmd.trim().toLowerCase();
        let response = null;

        switch (cleanCmd) {
            case 'help':
                response = (
                    <div className="space-y-1">
                        <p>Available commands:</p>
                        <ul className="pl-4 list-disc text-slate-400">
                            <li><span className="text-cyan-400">about</span> - Who is Naufal?</li>
                            <li><span className="text-cyan-400">projects</span> - View portfolio works</li>
                            <li><span className="text-cyan-400">skills</span> - List technical capabilities</li>
                            <li><span className="text-cyan-400">contact</span> - Get contact info</li>
                            <li><span className="text-cyan-400">clear</span> - Clear terminal</li>
                            <li><span className="text-cyan-400">whoami</span> - Current user</li>
                        </ul>
                    </div>
                );
                break;
            case 'whoami':
                response = "guest@naufalsaputra.dev";
                break;
            case 'ls':
                response = "about/  projects/  skills/  contact.txt";
                break;
            case 'cat about':
            case 'about':
                response = "Naufal Saputra: Cyber Security enthusiast & Cloud Engineer. Passionate about securing digital infrastructure and building scalable web apps.";
                break;
            case 'projects':
                response = "Navigating to Projects section...";
                setTimeout(() => window.location.href = '#projects', 500);
                break;
            case 'skills':
                response = "Navigating to Skills section...";
                setTimeout(() => window.location.href = '#skills', 500);
                break;
            case 'cat contact.txt':
            case 'contact':
                response = "Email: contact@naufalsaputra.dev | GitHub: @naansa-naufalsaputra";
                break;
            case 'clear':
                setHistory([]);
                return;
            default:
                if (cleanCmd.startsWith('sudo')) {
                    response = "Permission denied: you are not root. Nice try! 😉";
                } else if (cleanCmd === '') {
                    response = null;
                } else {
                    response = `command not found: ${cleanCmd}`;
                }
        }

        if (response) {
            setHistory(prev => [...prev, { type: 'output', content: response }]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const newHistory = [...history, { type: 'command', content: input }];
            setHistory(newHistory);
            handleCommand(input);
            setInput('');
        }
    };

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // Keep focus
    useEffect(() => {
        const handleClick = () => inputRef.current?.focus();
        document.addEventListener('click', handleClick); // Optional: global focus or just component? 
        // Better to just focus on component mount and click on container
        inputRef.current?.focus();
        return () => document.removeEventListener('click', handleClick);
    }, []);

    const focusInput = () => inputRef.current?.focus();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="w-full max-w-2xl mx-auto"
            onClick={focusInput}
        >
            <div className="bg-slate-950/90 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-2xl font-mono text-sm md:text-base h-[300px] flex flex-col">
                {/* Window Controls */}
                <div className="bg-white/5 px-4 py-2 flex items-center gap-2 border-b border-white/5 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <div className="ml-2 text-xs text-slate-500">guest@naufal:~</div>
                </div>

                {/* Terminal Content */}
                <div className="p-4 flex-1 overflow-y-auto custom-scrollbar space-y-2 cursor-text" onClick={focusInput}>
                    {history.map((line, index) => (
                        <div key={index} className={`${line.type === 'command' ? 'text-white' : 'text-emerald-400'}`}>
                            {line.type === 'command' ? (
                                <div className="flex gap-2">
                                    <span className="text-cyan-400">guest@naufal:~$</span>
                                    <span>{line.content}</span>
                                </div>
                            ) : (
                                <div>{line.content}</div>
                            )}
                        </div>
                    ))}

                    {/* Active Input Line */}
                    <div className="flex gap-2 text-white items-center">
                        <span className="text-cyan-400 shrink-0">guest@naufal:~$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-none outline-none flex-1 text-white placeholder-transparent caret-transparent"
                            autoComplete="off"
                            spellCheck="false"
                        />
                        {/* Custom Caret Animation */}
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
                            className="w-2.5 h-5 bg-emerald-500 -ml-1" // Negative margin to overlap hidden caret
                        />
                    </div>
                    <div ref={bottomRef} />
                </div>
            </div>
        </motion.div>
    );
};

export default InteractiveTerminal;
