import MagneticButton from "./ui/MagneticButton";
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
    const { isProMode } = useTheme();

    return (
        <footer id="contact" className={`border-t pt-10 flex flex-col md:flex-row justify-between items-center gap-6 pb-10 scroll-mt-32 ${isProMode ? 'border-slate-200' : 'border-white/10'}`}>
            <div className="flex flex-col gap-1 items-center md:items-start">
                <span className={`text-xl font-bold tracking-tight ${isProMode ? 'text-slate-900' : 'text-white'}`}>Naufal Saputra</span>
                <p className={`text-sm ${isProMode ? 'text-slate-500' : 'text-slate-500'}`}>© 2026 Naufal Saputra. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-6">
                {['Email', 'GitHub', 'LinkedIn', 'Instagram'].map((item) => {
                    const links = {
                        Email: "mailto:naufalnamikaze175@gmail.com",
                        GitHub: "https://github.com/naansa-naufalsaputra",
                        LinkedIn: "https://www.linkedin.com/in/naufalanwarsaputra",
                        Instagram: "https://www.instagram.com/naansa_"
                    };
                    return (
                        <MagneticButton key={item}>
                            <a
                                href={links[item]}
                                target={item !== 'Email' ? "_blank" : undefined}
                                rel={item !== 'Email' ? "noopener noreferrer" : undefined}
                                className={`text-sm font-medium p-2 block transition-colors ${isProMode
                                        ? 'text-slate-500 hover:text-slate-900'
                                        : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                {item}
                            </a>
                        </MagneticButton>
                    );
                })}
            </div>
        </footer>
    );
};

export default Footer;
