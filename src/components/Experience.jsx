import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Calendar, MapPin, ChevronRight, Server, Cloud, Code } from 'lucide-react';
import HackerText from './HackerText';

const Experience = () => {
    const experiences = [
        {
            id: "EXP-003",
            role: "Software Engineering Intern",
            company: "Indian Institute of Technology Ropar — VLED Lab",
            location: "Remote",
            period: "May 2026 - Present",
            bullets: [
                "Engineered production-ready features for CSFAQ as part of a 5-member engineering team, owning implementation, automated testing, and peer code reviews.",
                "Led delivery of 15+ enhancements to the open-source FLN Assessment Platform, refactoring the evaluation engine, reporting infrastructure, assessment analytics, and PDF export pipeline.",
                "Completed the Foundations of Data Science program (50/50 endorsed), earned the Legend Badge, and ranked among the Top 15 interns of the cohort."
            ],
            tags: ["React", "System Design", "Automated Testing", "Peer Code Reviews"],
            icon: Code,
            badge: "INTERNSHIP"
        },
        {
            id: "EXP-004",
            role: "Virtual Intern",
            company: "ServiceNow",
            location: "Remote",
            period: "Jun 2026 - Jul 2026",
            bullets: [
                "Configured enterprise ITSM workflows on ServiceNow, applying Flow Designer, Automated Test Framework (ATF), and platform administration through structured exercises.",
                "Completed the ServiceNow CSA preparation curriculum covering workflow automation, Agentic AI, and reporting modules."
            ],
            tags: ["ServiceNow", "Workflow Automation", "ITSM", "ATF", "Agentic AI"],
            icon: Cloud,
            badge: "INTERNSHIP"
        },
        {
            id: "EXP-002",
            role: "Open Source Contributor",
            company: "eSim (FOSSEE, IIT Bombay)",
            location: "Remote",
            period: "Feb 2026 - Present",
            bullets: [
                "Debugged and resolved 13 dependency, compiler, and Python 3.13 compatibility issues to port the eSim EDA toolchain to Ubuntu 25.04.",
                "Contributed upstream fixes for cross-platform build support."
            ],
            tags: ["Ubuntu 25.04", "KiCad", "GHDL", "LLVM", "Python 3.13", "Toolchains"],
            icon: Terminal,
            badge: "OPEN SOURCE"
        },
        {
            id: "EXP-001",
            role: "Python Developer Intern",
            company: "CodSoft",
            location: "Remote",
            period: "June 2024 - July 2024",
            bullets: [
                "Developed Python scripts for automation and data processing, reinforcing scripting practices that translate directly into CI/CD workflows and infrastructure automation.",
                "Built reusable automation scripts to streamline data processing tasks, reducing manual execution time by 40%."
            ],
            tags: ["Python", "Task Automation", "Scripting", "CLI Tooling"],
            icon: Code,
            badge: "INTERNSHIP"
        }
    ];

    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section className="py-20 min-h-screen flex flex-col justify-center relative overflow-hidden bg-black perspective-1000">
            {/* Infinity Corridor Background - Static on Mobile */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {isMobile ? (
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black" />
                ) : (
                    <>
                        {/* 3D Grid Tunnel */}
                        <div
                            className="absolute inset-[-100%] opacity-20"
                            style={{
                                backgroundImage: `
                                    linear-gradient(transparent 0%, #00f0ff 2px, transparent 3px),
                                    linear-gradient(90deg, transparent 0%, #00f0ff 2px, transparent 3px)
                                `,
                                backgroundSize: '100px 100px',
                                transform: 'perspective(500px) rotateX(60deg)',
                                transformOrigin: 'center top',
                                animation: 'grid-move 20s linear infinite'
                            }}
                        />

                        {/* Speed Lines (Stars) */}
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, scale: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0, 3],
                                    z: [0, 100] // Simulated Z-depth via scale
                                }}
                                transition={{
                                    duration: Math.random() * 2 + 1,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: Math.random() * 2
                                }}
                                className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"
                            />
                        ))}

                        {/* Central Fog / Void */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
                    </>
                )}
            </div>

            <style>{`
                @keyframes grid-move {
                    0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
                    100% { transform: perspective(500px) rotateX(60deg) translateY(100px); }
                }
            `}</style>

            <div className="max-w-4xl mx-auto px-6 w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-2 text-primary font-mono text-xs mb-4">
                        <Terminal className="w-4 h-4" />
                        <span>SYSTEM_LOGS_ACCESSED</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
                        <HackerText text="CAREER_LOGS" />
                    </h2>
                </motion.div>

                <div className="space-y-8">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative pl-8 border-l border-white/10 group"
                        >
                            {/* Traveling timeline pulse */}
                            {index === 0 && (
                                <div className="absolute left-[-1px] w-[2px] top-0 bottom-0 overflow-hidden pointer-events-none">
                                    <div className="w-full h-8 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full" style={{ animation: 'timeline-pulse 5s ease-in-out infinite' }} />
                                </div>
                            )}
                            {/* Timeline Dot */}
                            <div className="absolute left-[-5px] top-0">
                                {exp.period.includes('Present') ? (
                                    <div className="relative">
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(0,255,157,0.5)]" />
                                        <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-500 animate-ping opacity-75" />
                                    </div>
                                ) : (
                                    <div className="w-2.5 h-2.5 rounded-full bg-black border border-white/30 group-hover:border-primary group-hover:bg-primary transition-colors shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
                                )}
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-primary/30 transition-colors group-hover:bg-white/10">
                                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                    <div className="flex gap-4">
                                        <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-primary h-fit">
                                            <exp.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors flex flex-wrap items-center gap-2">
                                                {exp.role}
                                                {exp.badge && (
                                                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold tracking-widest ${
                                                        exp.badge === 'INTERNSHIP'
                                                            ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_10px_rgba(0,240,255,0.15)]'
                                                            : exp.badge === 'OPEN SOURCE'
                                                            ? 'bg-secondary/20 text-secondary border border-secondary/30 shadow-[0_0_10px_rgba(112,0,255,0.15)]'
                                                            : 'bg-white/5 text-gray-400 border border-white/10'
                                                    }`}>
                                                        {exp.badge}
                                                    </span>
                                                )}
                                            </h3>
                                            <div className="text-lg text-gray-400 font-mono">{exp.company}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 justify-end">
                                            <Calendar className="w-3 h-3" /> {exp.period}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 justify-end mt-1">
                                            <MapPin className="w-3 h-3" /> {exp.location}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6 border-l-2 border-white/10 pl-4">
                                    {exp.description && (
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            {exp.description}
                                        </p>
                                    )}
                                    {exp.bullets ? (
                                        exp.bullets.map((b, idx) => (
                                            <div key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                                                <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                                <span>{b}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex items-start gap-2 text-sm text-gray-400">
                                            <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                            <span>{exp.bullet}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {exp.tags.map((tag, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 + i * 0.05 }}
                                            className="text-[10px] px-2 py-1 rounded bg-black/50 border border-white/10 text-gray-400 font-mono hover:text-white hover:border-primary/50 transition-colors"
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
