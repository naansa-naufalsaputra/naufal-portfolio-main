import React, { useState, useEffect, useRef } from 'react';

const InteractiveTerminal = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'output', content: 'Welcome to My Page. Type "help" to see available commands.' }
    ]);
    const inputRef = useRef(null);
    const terminalRef = useRef(null);

    // --- LOGIKA COMMAND (Tidak Berubah) ---
    const handleCommand = (cmd) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        let response = '';

        switch (trimmedCmd) {
            case 'help':
                response = `Available commands:
  about    - Who is Naufal?
  projects - View portfolio works
  contact  - Get contact info
  clear    - Clear terminal
  whoami   - Current user`;
                break;
            case 'whoami':
                response = 'guest@naufal.dev';
                break;
            case 'about':
                response = 'Naufal Saputra. Informatics Student @ UNNES. Cyber Security enthusiast & Cloud Engineer.';
                break;
            case 'contact':
                response = 'Email: naufalnamikaze175@gmail.com\nLinkedIn: https://www.linkedin.com/in/naufalanwarsaputra\nGitHub: github.com/naansa-naufalsaputra\nInstagram: https://www.instagram.com/naansa_';
                break;
            case 'projects':
                response = 'Check out the "Selected Projects" section below to see my work on DuaSaku';
                break;
            case 'clear':
                setHistory([]);
                return;
            default:
                response = `command not found: ${trimmedCmd}`;
        }

        setHistory(prev => [
            ...prev,
            { type: 'input', content: trimmedCmd },
            { type: 'output', content: response }
        ]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    // Auto-scroll ke bawah
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    // 🔥 FITUR 1: AGGRESSIVE SCROLL LOCK (Jurus Manual) 🔥
    useEffect(() => {
        const element = terminalRef.current;
        if (!element) return;

        const handleWheel = (e) => {
            // Hentikan total perilaku scroll bawaan browser
            e.preventDefault();
            e.stopPropagation();

            // Lakukan scroll secara manual
            element.scrollTop += e.deltaY;
        };

        // Pasang event listener dengan passive: false agar bisa di-preventDefault
        element.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            element.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (
        <div
            className="w-full max-w-2xl mx-auto bg-slate-950 rounded-lg overflow-hidden border border-slate-800 shadow-2xl font-mono text-sm relative z-20"
            onClick={() => inputRef.current?.focus()}
        >
            {/* 🔥 FITUR 2: CUSTOM CYBER SCROLLBAR CSS 🔥 */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .cyber-scrollbar::-webkit-scrollbar {
          width: 6px; /* Scrollbar lebih tipis */
        }
        .cyber-scrollbar::-webkit-scrollbar-track {
          background: #0f172a; /* Warna track gelap (slate-950) */
        }
        .cyber-scrollbar::-webkit-scrollbar-thumb {
          background-color: #059669; /* Warna jempol emerald gelap */
          border-radius: 20px;
        }
        .cyber-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #10b981; /* Warna jempol menyala saat di-hover (emerald-500) */
        }
        /* Firefox */
        .cyber-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #059669 #0f172a;
        }
      `}} />

            {/* Window Controls */}
            <div className="bg-slate-900 px-4 py-2 flex items-center gap-2 border-b border-slate-800">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="ml-4 text-slate-500 text-xs select-none">guest@naufal:~</div>
            </div>

            {/* Terminal Body dengan Class Baru */}
            <div
                ref={terminalRef}
                // Tambahkan class 'cyber-scrollbar' disini
                className="cyber-scrollbar p-4 h-80 overflow-y-auto text-left"
            >
                {history.map((line, i) => (
                    <div key={i} className={`mb-1 ${line.type === 'input' ? 'text-slate-400' : 'text-emerald-400 whitespace-pre-wrap'}`}>
                        {line.type === 'input' ? '> ' : ''}{line.content}
                    </div>
                ))}

                {/* Input Line */}
                <div className="flex items-center text-slate-100">
                    <span className="text-emerald-500 mr-2">guest@naufal:~$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-600"
                        autoFocus
                        spellCheck="false"
                        autoComplete="off"
                    />
                </div>
            </div>
        </div>
    );
};

export default InteractiveTerminal;
