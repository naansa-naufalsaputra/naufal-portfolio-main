import React from 'react';
import { FileText, Mail, Linkedin, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfessionalBio = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl shadow-slate-900/10 border border-white/50 overflow-hidden text-left p-8 flex flex-col md:flex-row gap-8 items-center md:items-start"
        >

            {/* Kolom Kiri: Foto/Avatar (Placeholder Profesional) */}
            <div className="shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-slate-100 shadow-sm relative group">
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors z-10" />
                    <img
                        src="https://github.com/naansa-naufalsaputra.png"
                        alt="Naufal Saputra"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            </div>

            {/* Kolom Kanan: Teks Profesional */}
            <div className="flex-1 space-y-4">
                <div>
                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Informatics Engineering Student</h3>
                    <p className="text-slate-500 font-medium flex items-center gap-2">
                        Universitas Negeri Semarang
                    </p>
                </div>

                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    A fast learner and adaptable Informatics student who thrives on <strong>solving complex problems</strong>. 
            I am passionate about <strong>Cyber Security</strong> and never afraid to take on new technical challenges. 
            Outside of coding, I enjoy strategy games which sharpen my analytical thinking and decision-making skills.
                </p>

                {/* Tombol Aksi HR */}
                <div className="flex flex-wrap gap-3 pt-2">
                    <button className="px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 text-sm font-bold">
                        <Download size={16} /> Download CV
                    </button>
                    <a href="mailto:naufalnamikaze175@gmail.com" className="px-5 py-2.5 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-all shadow-sm hover:shadow-md border border-slate-200 flex items-center gap-2 text-sm font-bold">
                        <Mail size={16} /> Email Me
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default ProfessionalBio;
