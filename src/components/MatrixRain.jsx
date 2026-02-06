import React, { useEffect, useRef } from 'react';

const MatrixRain = ({ onExit }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Paksa ukuran canvas fullscreen
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;

        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 30);
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Listener ESC & Click
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') if (onExit) onExit();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onExit]);

    return (
        // PERBAIKAN UTAMA DISINI:
        // 1. 'fixed' dan 'inset-0' agar menempel di layar
        // 2. 'z-[99999]' (tambah angka 9) agar super tinggi
        // 3. Style manual 'zIndex: 99999' untuk memastikan Tailwind tidak kalah
        <div
            onClick={onExit}
            className="fixed inset-0 bg-black cursor-pointer"
            style={{ zIndex: 99999 }}
        >
            <canvas ref={canvasRef} className="block w-full h-full" />

            <div className="absolute top-5 right-5 pointer-events-none" style={{ zIndex: 100000 }}>
                <span className="bg-black/80 text-green-500 border border-green-500 px-3 py-1 rounded text-xs font-mono animate-pulse">
                    [ESC] or TAP SCREEN to Exit
                </span>
            </div>
        </div>
    );
};

export default MatrixRain;
