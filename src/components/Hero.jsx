import { useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import MagneticButton from "./ui/MagneticButton";
import Terminal from "./Terminal";

const Hero = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const particlesOptions = {
        fullScreen: { enable: false }, // Render inside the section container
        background: {
            color: {
                value: "transparent",
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "grab", // Connect lines to cursor
                },
                resize: true,
            },
            modes: {
                grab: {
                    distance: 150,
                    links: {
                        opacity: 0.5,
                    },
                },
            },
        },
        particles: {
            color: {
                value: ["#06b6d4", "#8b5cf6"], // Cyan and Violet
            },
            links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.2, // Subtle
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 60,
            },
            opacity: {
                value: 0.3,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 3 },
            },
        },
        detectRetina: true,
    };

    return (
        <section id="about" className="min-h-screen flex flex-col justify-center items-center relative pt-20 overflow-hidden">
            {/* Particles Background - Absolute positioned within section */}
            <div className="absolute inset-0 z-0">
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    options={particlesOptions}
                    className="w-full h-full"
                />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center text-center justify-center min-h-screen">

                {/* Availability Tag */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-md"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    System Online
                </motion.div>

                {/* Main Headline */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-col items-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-300 mb-4 tracking-tight">
                        Hi, I'm
                    </h2>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter text-white mb-2">
                        <span className="glitch-wrapper">
                            <span className="glitch text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500" data-text="Naufal Saputra">
                                Naufal Saputra
                            </span>
                        </span>
                    </h1>
                </motion.div>

                {/* Terminal Component */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full max-w-2xl mt-12 mb-12"
                >
                    <Terminal />
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-wrap gap-6 justify-center"
                >
                    <MagneticButton className="group relative flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold transition-all border border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_35px_rgba(6,182,212,0.4)] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <a href="#projects" className="relative flex items-center gap-2 z-10">
                            <span className="text-cyan-400 group-hover:text-white transition-colors">Initialize Projects</span>
                            <ArrowRight size={18} className="text-cyan-400 group-hover:text-white transition-colors group-hover:translate-x-1" />
                        </a>
                    </MagneticButton>

                    <div className="flex gap-4">
                        <MagneticButton>
                            <a
                                href="https://github.com/naansa-naufalsaputra"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="w-14 h-14 flex items-center justify-center rounded-full glass-panel hover:bg-white/10 text-slate-300 hover:text-white transition-all border border-white/10 hover:border-white/30"
                            >
                                <Github size={24} />
                            </a>
                        </MagneticButton>
                        <MagneticButton>
                            <a
                                href="https://www.linkedin.com/in/naufalanwarsaputra"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="w-14 h-14 flex items-center justify-center rounded-full glass-panel hover:bg-white/10 text-slate-300 hover:text-white transition-all border border-white/10 hover:border-white/30"
                            >
                                <Linkedin size={24} />
                            </a>
                        </MagneticButton>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
