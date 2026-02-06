import { motion } from 'framer-motion';
import {
    SiFlutter, SiFirebase, SiReact, SiCloudflare, SiPython,
    SiKalilinux, SiMysql, SiDocker,
    SiNextdotjs, SiSupabase, SiTailwindcss, SiVercel, SiGit
} from "react-icons/si";
import FloatingShapes from './3d/FloatingShapes';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';

const Skills = () => {
    const { isProMode } = useTheme();
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        // Hydration safe check for desktop
        setIsDesktop(window.innerWidth > 768);

        const handleResize = () => setIsDesktop(window.innerWidth > 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const skills = [
        { name: 'Flutter', color: 'text-cyan-400', icon: SiFlutter },
        { name: 'React', color: 'text-cyan-300', icon: SiReact },
        { name: 'Next.js', color: 'text-white', icon: SiNextdotjs },
        { name: 'Tailwind', color: 'text-teal-400', icon: SiTailwindcss },
        { name: 'Firebase', color: 'text-yellow-500', icon: SiFirebase },
        { name: 'Supabase', color: 'text-emerald-400', icon: SiSupabase },
        { name: 'SQL', color: 'text-blue-500', icon: SiMysql },
        { name: 'Python', color: 'text-yellow-300', icon: SiPython },
        { name: 'Cloudflare', color: 'text-orange-500', icon: SiCloudflare },
        { name: 'Vercel', color: 'text-white', icon: SiVercel },
        { name: 'Docker', color: 'text-blue-500', icon: SiDocker },
        { name: 'Git', color: 'text-orange-600', icon: SiGit },
        { name: 'Kali Linux', color: 'text-indigo-500', icon: SiKalilinux }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section id="skills" className="mb-32 scroll-mt-32 relative">
            {/* 3D Background - Hacker Mode & Desktop Only */}
            {!isProMode && isDesktop && (
                <div className="absolute -top-20 -right-20 w-[400px] h-[400px] z-0 opacity-50 pointer-events-none">
                    <FloatingShapes />
                </div>
            )}

            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`text-xl font-bold mb-8 flex items-center gap-3 relative z-10 ${isProMode ? 'text-slate-800' : 'text-slate-200'}`}
            >
                <span className={`w-8 h-[1px] ${isProMode ? 'bg-slate-400' : 'bg-slate-600'}`}></span>
                Tech Stack & Tools
            </motion.h2>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3 relative z-10"
            >
                {skills.map((skill) => (
                    <motion.div
                        key={skill.name}
                        variants={item}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors cursor-default border ${isProMode
                            ? 'bg-white text-slate-700 border-slate-200 shadow-sm hover:shadow-md'
                            : 'glass-panel text-slate-300 hover:bg-white/10 hover:text-white border-white/5'
                            }`}
                    >
                        <div className={`w-5 h-5 flex items-center justify-center ${isProMode ? 'text-slate-600' : skill.color}`}>
                            <skill.icon size={18} />
                        </div>
                        <span className="text-sm font-medium">{skill.name}</span>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Skills;
