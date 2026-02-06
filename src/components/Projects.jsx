import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Code2, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const projects = [
    {
        id: 1,
        title: "DuaSaku",
        description: "A comprehensive personal finance manager built with Flutter. Track expenses, manage budgets, and visualize savings goals.",
        fullDescription: "DuaSaku is designed to solve the complexity of financial tracking for students. It features local database storage (SQLite), interactive charts using FL Chart, and export to CSV functionality. Built with Clean Architecture principles.",
        tech: ["Flutter", "Dart", "SQLite", "GetX"],
        image: "/projects/duasaku.png", // Ganti dengan gambar aslimu
        link: "https://duasaku.naufalsaputra.dev/",
        github: "https://github.com/naansa-naufalsaputra/duasaku-pwa",
        status: "Live"
    },
];

const Projects = () => {
    const { isProMode } = useTheme();
    const [selectedId, setSelectedId] = useState(null);

    return (
        <section id="projects" className="py-20 px-6 max-w-7xl mx-auto min-h-screen">
            <h2 className={`text-4xl font-black mb-12 flex items-center gap-3 ${isProMode ? 'text-slate-900' : 'text-white'}`}>
                <Code2 className={isProMode ? "text-cyan-600" : "text-cyan-400"} /> Selected Projects
            </h2>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <motion.div
                        layoutId={project.id} // Kunci animasi 1
                        key={project.id}
                        onClick={() => setSelectedId(project.id)}
                        className={`group relative rounded-2xl overflow-hidden border cursor-pointer shadow-xl transition-colors ${isProMode
                                ? 'bg-white border-slate-200 hover:shadow-2xl hover:border-slate-300'
                                : 'bg-slate-900 border-slate-800 hover:shadow-cyan-500/20 hover:border-cyan-500/50'
                            }`}
                        whileHover={{ y: -5 }}
                    >
                        {/* Image Preview */}
                        <div className="h-48 overflow-hidden relative">
                            <div className={`absolute inset-0 z-10 transition-all ${isProMode ? 'bg-black/5 group-hover:bg-transparent' : 'bg-slate-900/10 group-hover:bg-transparent'}`} />
                            <motion.img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 right-3 z-20">
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/50 backdrop-blur-md border border-white/10 text-white">
                                    {project.status}
                                </span>
                            </div>
                        </div>

                        {/* Content Preview */}
                        <div className="p-6">
                            <motion.h3 className={`text-xl font-bold mb-2 ${isProMode ? 'text-slate-900' : 'text-white'}`}>{project.title}</motion.h3>
                            <p className={`text-sm line-clamp-2 ${isProMode ? 'text-slate-600' : 'text-slate-400'}`}>{project.description}</p>
                            <div className={`mt-4 text-xs font-medium uppercase tracking-wider ${isProMode ? 'text-cyan-600' : 'text-cyan-400'}`}>
                                Click to expand
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* POP-UP MODAL (AnimatePresence) */}
            <AnimatePresence>
                {selectedId && (
                    <>
                        {/* Backdrop Blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />

                        {/* Modal Card */}
                        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
                            <motion.div
                                layoutId={selectedId} // Kunci animasi 2 (Harus sama dengan card)
                                className={`w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl pointer-events-auto relative ${isProMode
                                        ? 'bg-white border border-slate-200'
                                        : 'bg-slate-900 border border-slate-700'
                                    }`}
                            >
                                {/* Tombol Close */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                    className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-red-500/80 transition-colors z-30"
                                >
                                    <X size={20} />
                                </button>

                                {(() => {
                                    const project = projects.find(p => p.id === selectedId);
                                    return (
                                        <div className="flex flex-col h-full max-h-[80vh] overflow-y-auto">
                                            {/* Modal Image */}
                                            <div className="h-64 w-full relative shrink-0">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className={`absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t ${isProMode ? 'from-white to-transparent' : 'from-slate-900 to-transparent'}`} />
                                            </div>

                                            {/* Modal Content */}
                                            <div className="p-8">
                                                <motion.h3 className={`text-3xl font-black mb-2 ${isProMode ? 'text-slate-900' : 'text-white'}`}>
                                                    {project.title}
                                                </motion.h3>

                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {project.tech.map((t, i) => (
                                                        <span key={i} className={`px-3 py-1 rounded-full text-sm border ${isProMode
                                                                ? 'bg-slate-100 text-slate-700 border-slate-200'
                                                                : 'bg-cyan-900/30 text-cyan-400 border-cyan-500/30'
                                                            }`}>
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>

                                                <p className={`leading-relaxed mb-8 text-lg ${isProMode ? 'text-slate-600' : 'text-slate-300'}`}>
                                                    {project.fullDescription || project.description}
                                                </p>

                                                {/* Action Buttons */}
                                                <div className="flex gap-4">
                                                    {project.link !== '#' && (
                                                        <a href={project.link} target="_blank" className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
                                                            <ExternalLink size={20} /> Visit Site
                                                        </a>
                                                    )}
                                                    <a href={project.github} target="_blank" className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-600">
                                                        <Github size={20} /> Source Code
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;