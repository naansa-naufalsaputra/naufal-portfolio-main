import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, ExternalLink, Github } from 'lucide-react';
import ProjectCard from './ProjectCard';
import TechBadge from './ui/TechBadge';

const projectsData = [
    {
        id: 1,
        title: 'DuaSaku',
        description: 'A comprehensive personal finance manager built with Flutter. Track expenses, manage budgets, and visualize savings goals.',
        longDescription: "DuaSaku represents a modern approach to personal finance management. Built with Flutter for cross-platform performance, it utilizes SQLite for robust local data storage, ensuring user privacy and offline capability. The app features intuitive visualizations for spending habits, custom budget categories, and goal tracking.",
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ1aLjeS3m-Gdnajd3T1Kb6hm2IsdCqWqYxRGPrt71waEccGESWy7_D-OkqFwK-bb6vOC-jXzv-DNXoopkeM8-ZR5tSKwDwfswtITmpgj_uEgIoYThsieE_MEhk25-BOk7KlS70RqN54NdAM_v-3oWZonAZyTzTPqZIx1PD5WwJq2_o-52w1vZ1OY0fj8yIptGFYVcdih8rGBYIIzPGllo9YTPrVDtBg06FVNxfcQGMjoYUxVNqBH-aqdunyfSM5xtUP9o3PFbbTo',
        video: 'https://cdn.dribbble.com/users/1615584/screenshots/11267803/media/e14f08f82875b486950e932906b86554.mp4', // Placeholder video
        tech: ['Flutter', 'Dart', 'SQLite'],
        status: 'Live',
        statusColor: 'bg-green-500/20 text-green-400 border-green-500/30',
        className: 'md:col-span-2'
    },
    {
        id: 2,
        title: 'Loom',
        description: 'Scalable cloud architecture visualizer.',
        longDescription: "Loom simplifies the complexity of cloud infrastructure by providing a visual interface to design and monitor AWS architectures. Built with React and utilizing modern diagramming libraries.",
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3Tkth9qpqYhda1fYYLKmfBMIhIuBSKFK45fQve9bYH_11mvyqbR_KYV-bABrY35shkE4UC-NqK-uSUdgQ8ZlFtvXzbJJI75CtrEwkQFZMfVcYJfcfp5ch9pWy7bogy3QNGrE7wHJwSdaTb1JDdC6PU1M4dVGuIkGO33kbak0nVI4Qwo1n_AkXS_ayqpd9oJIqLMYmismgjIUo_Owi_zHWK9hNqcGC4NQuRjzQJILqXUSClwhpOoWGlaXOLXJPw71-6JW0d7Wl2GA',
        tech: ['AWS', 'React', 'Tailwind'],
        status: 'Coming Soon',
        statusColor: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
        className: ''
    },
    {
        id: 3,
        title: 'Portfolio v1',
        description: 'My previous personal site built with basic HTML/CSS.',
        longDescription: "A minimalist portfolio site demonstrating core web fundamentals without frameworks. Served as a learning platform for CSS Grid and Flexbox.",
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000', // Placeholder
        tech: ['HTML', 'CSS', 'JavaScript'],
        status: 'Open Source',
        statusColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        className: 'md:col-span-1'
    }
];

const Projects = () => {
    const [selectedId, setSelectedId] = useState(null);
    const selectedProject = projectsData.find(p => p.id === selectedId);

    return (
        <section id="projects" className="mb-32 pt-20 relative scroll-mt-32">
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Selected Projects</h2>
                <a href="#" className="text-sm font-medium text-slate-400 hover:text-primary transition-colors flex items-center gap-1">
                    See All <ArrowRight size={16} />
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                {projectsData.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={() => setSelectedId(project.id)}
                    />
                ))}
            </div>

            <AnimatePresence>
                {selectedId && selectedProject && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />

                        {/* Expanded Card */}
                        <motion.div
                            layoutId={`card-${selectedProject.id}`}
                            className="w-full max-w-3xl bg-[#161b22] rounded-3xl overflow-hidden shadow-2xl z-10 relative flex flex-col max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Image Section */}
                            <div className="relative h-64 md:h-80 w-full shrink-0">
                                <motion.img
                                    layoutId={`image-${selectedProject.id}`}
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] to-transparent opacity-80" />

                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <motion.h3 layoutId={`title-${selectedProject.id}`} className="text-3xl md:text-4xl font-bold text-white mb-2">{selectedProject.title}</motion.h3>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {selectedProject.tech.map(tag => (
                                            <TechBadge key={tag} name={tag} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8 pt-2 overflow-y-auto">
                                <motion.p
                                    layoutId={`desc-${selectedProject.id}`}
                                    className="text-slate-300 text-lg leading-relaxed mb-8"
                                >
                                    {selectedProject.longDescription || selectedProject.description}
                                </motion.p>

                                <div className="flex gap-4">
                                    <a href="#" className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-colors">
                                        <span>Visit Site</span>
                                        <ExternalLink size={18} />
                                    </a>
                                    <a href="#" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-colors border border-white/10">
                                        <Github size={20} />
                                        <span>Source Code</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
