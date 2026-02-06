import MagneticButton from "./ui/MagneticButton";

const Footer = () => {
    return (
        <footer id="contact" className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 pb-10 scroll-mt-32">
            <div className="flex flex-col gap-1 items-center md:items-start">
                <span className="text-xl font-bold text-white tracking-tight">NS</span>
                <p className="text-sm text-slate-500">© 2026 Naufal Saputra. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-6">
                <MagneticButton>
                    <a href="mailto:naufalnamikaze175@gmail.com" className="text-slate-400 hover:text-white transition-colors text-sm font-medium p-2 block">Email</a>
                </MagneticButton>
                <MagneticButton>
                    <a href="https://github.com/naansa-naufalsaputra" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors text-sm font-medium p-2 block">GitHub</a>
                </MagneticButton>
                <MagneticButton>
                    <a href="https://www.linkedin.com/in/naufalanwarsaputra" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors text-sm font-medium p-2 block">LinkedIn</a>
                </MagneticButton>
                <MagneticButton>
                    <a href="https://www.instagram.com/naansa_" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors text-sm font-medium p-2 block">Instagram</a>
                </MagneticButton>
            </div>
        </footer>
    );
};

export default Footer;
