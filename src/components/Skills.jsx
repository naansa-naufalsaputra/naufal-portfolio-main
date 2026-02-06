import { motion } from 'framer-motion';
import { Code, Terminal, Database, Cloud, Shield, Hexagon, Smartphone } from 'lucide-react';

const Skills = () => {
    const skills = [
        { name: 'Flutter', color: 'text-blue-400', icon: Smartphone },
        { name: 'Firebase', color: 'text-yellow-500', icon: Database },
        { name: 'React', color: 'text-cyan-400', icon: Code },
        { name: 'Cloudflare', color: 'text-orange-400', icon: Cloud },
        { name: 'Python', color: 'text-blue-600', icon: Terminal },
        { name: 'Kali Linux', color: 'text-green-500', icon: Shield },
        { name: 'SQL', color: 'text-white', icon: Database },
        { name: 'Docker', color: 'text-indigo-400', icon: Hexagon },
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
        <section id="skills" className="mb-32 scroll-mt-32">
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-xl font-bold text-slate-200 mb-8 flex items-center gap-3"
            >
                <span className="w-8 h-[1px] bg-slate-600"></span>
                Tech Stack & Tools
            </motion.h2>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
            >
                {skills.map((skill) => (
                    <motion.div
                        key={skill.name}
                        variants={item}
                        className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:bg-white/10 transition-colors cursor-default border border-white/5"
                    >
                        <div className={`w-5 h-5 flex items-center justify-center ${skill.color}`}>
                            <skill.icon size={18} />
                        </div>
                        <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Skills;
