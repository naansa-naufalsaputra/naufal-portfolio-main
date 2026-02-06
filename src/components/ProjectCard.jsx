import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import TechBadge from './ui/TechBadge';

const ProjectCard = ({ project, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);

    // 3D Tilt Effect Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    return (
        <motion.div
            layoutId={`card-${project.id}`}
            onClick={onClick}
            onMouseMove={onMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={onMouseLeave}
            ref={cardRef}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`group relative ${project.className || ''} glass-panel rounded-3xl overflow-hidden hover:border-primary/50 transition-colors cursor-pointer`}
        >
            {/* Background Image/Video */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                style={{
                    transform: "translateZ(-50px) scale(1.1)", // Parallax depth
                    backgroundImage: `linear-gradient(to top, rgba(13, 17, 23, 0.9) 0%, rgba(13, 17, 23, 0.2) 60%), url("${project.image}")`
                }}
            >
                {isHovered && project.video && (
                    <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-0 animate-fade-in"
                        style={{ opacity: 1, transition: 'opacity 0.5s ease-in-out' }}
                    />
                )}
            </div>

            {/* Status Badge */}
            {project.status && (
                <div className="absolute top-4 right-4 z-10" style={{ transform: "translateZ(30px)" }}>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${project.statusColor} border border-opacity-30 text-xs font-bold backdrop-blur-md`}>
                        {project.status === 'Live' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                        )}
                        {project.status}
                    </span>
                </div>
            )}

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-8 w-full z-10" style={{ transform: "translateZ(20px)" }}>
                <div className="transform group-hover:translate-y-[-8px] transition-transform duration-500">
                    <motion.h3 layoutId={`title-${project.id}`} className="text-2xl font-bold text-white mb-2">{project.title}</motion.h3>
                    <motion.p layoutId={`desc-${project.id}`} className="text-slate-300 mb-4 max-w-md text-sm md:text-base line-clamp-2">{project.description}</motion.p>
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map(tag => (
                            <TechBadge key={tag} name={tag} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Lighting effect */}
            <motion.div
                className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: useTransform(
                        mouseX,
                        [-0.5, 0.5],
                        [
                            "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 0% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)"
                        ]
                    )
                }}
            />
        </motion.div>
    );
};

export default ProjectCard;
