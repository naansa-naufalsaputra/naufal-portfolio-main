import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Users, Book, ExternalLink, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const GithubStats = () => {
    const { isProMode } = useTheme();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const username = 'naansa-naufalsaputra'; // Replace if needed

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setStats(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchGithubData();
    }, []);

    return (
        <section className="flex flex-col items-center justify-center py-10 w-full px-4">
            {!isProMode && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-6 flex items-center gap-2"
                >
                    <div className="h-[1px] w-8 bg-cyan-500/50"></div>
                    <h3 className="text-cyan-400 font-mono text-xs tracking-widest uppercase">Live Data Stream</h3>
                    <div className="h-[1px] w-8 bg-cyan-500/50"></div>
                </motion.div>
            )}

            <motion.a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02, boxShadow: isProMode ? "0 10px 30px rgba(0,0,0,0.1)" : "0 0 25px rgba(6, 182, 212, 0.2)" }}
                viewport={{ once: true }}
                className={`relative group w-full max-w-md rounded-xl p-6 flex items-center gap-6 overflow-hidden transition-all duration-300 ${isProMode
                        ? 'bg-white border border-slate-200 shadow-lg'
                        : 'bg-slate-900/60 backdrop-blur-md border border-cyan-500/30'
                    }`}
            >
                {/* Holographic Overlay - Only in Hacker Mode */}
                {!isProMode && (
                    <>
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 pointer-events-none" />
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent opacity-50" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
                    </>
                )}

                {loading ? (
                    <div className="flex w-full gap-6 animate-pulse">
                        <div className="relative shrink-0">
                            <div className={`w-24 h-24 rounded-full border-2 ${isProMode ? 'bg-slate-200 border-slate-300' : 'bg-slate-800 border-slate-700/50'}`}></div>
                        </div>
                        <div className="flex flex-col w-full z-10 justify-center gap-4">
                            <div className="space-y-2 w-full">
                                <div className={`h-5 w-32 rounded ${isProMode ? 'bg-slate-200' : 'bg-slate-800'}`}></div>
                                <div className={`h-3 w-20 rounded ${isProMode ? 'bg-slate-200' : 'bg-slate-800'}`}></div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 w-full">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className={`h-14 rounded-lg border ${isProMode ? 'bg-slate-100 border-slate-200' : 'bg-slate-800/50 border-white/5'}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : error ? (
                    <div className="w-full h-24 flex items-center justify-center gap-2 text-red-400 font-mono text-sm">
                        <AlertCircle size={20} />
                        <span>CONNECTION_LOST</span>
                    </div>
                ) : (
                    <>
                        {/* Avatar */}
                        <div className="relative shrink-0">
                            {!isProMode && <div className="absolute inset-0 rounded-full bg-cyan-500 blur-md opacity-40 animate-pulse"></div>}
                            <img
                                src={stats.avatar_url}
                                alt={stats.name}
                                className={`relative w-24 h-24 rounded-full border-2 object-cover ${isProMode ? 'border-slate-200 shadow-sm' : 'border-cyan-500/50'}`}
                            />
                            <div className={`absolute bottom-0 right-0 rounded-full p-1 border ${isProMode ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-cyan-500/50 text-cyan-400'}`}>
                                <Github size={16} />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col w-full z-10">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className={`font-bold text-lg tracking-tight transition-colors ${isProMode ? 'text-slate-900 group-hover:text-cyan-600' : 'text-white group-hover:text-cyan-400'}`}>
                                        {stats.name || stats.login}
                                    </h4>
                                    <p className={`text-xs font-mono ${isProMode ? 'text-slate-500' : 'text-slate-400'}`}>@{stats.login}</p>
                                </div>
                                <ExternalLink size={16} className={`transition-colors ${isProMode ? 'text-slate-400 group-hover:text-slate-600' : 'text-slate-500 group-hover:text-cyan-400'}`} />
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                <div className={`flex flex-col items-center rounded-lg p-2 border ${isProMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/50 border-white/5'}`}>
                                    <Book size={14} className={`${isProMode ? 'text-violet-600' : 'text-violet-400'} mb-1`} />
                                    <span className={`font-mono font-bold text-sm ${isProMode ? 'text-slate-900' : 'text-white'}`}>{stats.public_repos}</span>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Repos</span>
                                </div>
                                <div className={`flex flex-col items-center rounded-lg p-2 border ${isProMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/50 border-white/5'}`}>
                                    <Users size={14} className={`${isProMode ? 'text-cyan-600' : 'text-cyan-400'} mb-1`} />
                                    <span className={`font-mono font-bold text-sm ${isProMode ? 'text-slate-900' : 'text-white'}`}>{stats.followers}</span>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Followers</span>
                                </div>
                                <div className={`flex flex-col items-center rounded-lg p-2 border ${isProMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/50 border-white/5'}`}>
                                    <Users size={14} className={`${isProMode ? 'text-cyan-600' : 'text-cyan-400'} mb-1`} />
                                    <span className={`font-mono font-bold text-sm ${isProMode ? 'text-slate-900' : 'text-white'}`}>{stats.following}</span>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Following</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </motion.a>
        </section>
    );
};

export default GithubStats;
