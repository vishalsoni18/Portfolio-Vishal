import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, ExternalLink, Copy, Check, Globe, Cpu, ArrowRight } from 'lucide-react';
import HackerText from './HackerText';

const ContactCard = ({ icon: Icon, label, value, href, action, color = "primary", isPrimary = false, className = "", mask = null }) => {
    const [copied, setCopied] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        if (action === 'copy') {
            navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
        // If it's a link, we let the <a> tag handle it naturally, or window.open if needed
    };

    const displayValue = mask && !isHovered ? mask : value;

    const CardContent = () => (
        <div className={`relative bg-black/60 backdrop-blur-xl border ${isPrimary ? `border-${color}/40` : 'border-white/10'} rounded-xl p-6 h-full flex flex-col justify-between hover:border-${color}/50 transition-colors ${className}`}>

            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg bg-${color}/10 border border-${color}/20 text-${color}`}>
                    <Icon className="w-6 h-6" />
                </div>
                {action === 'copy' && (
                    <div className="p-2 text-gray-500 group-hover:text-white transition-colors">
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </div>
                )}
                {href && (
                    <div className="p-2 text-gray-500 group-hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                    </div>
                )}
            </div>

            {/* Content */}
            <div>
                <div className="text-xs font-mono text-gray-500 mb-1 uppercase tracking-wider">{label}</div>
                <div className={`font-bold text-white break-all font-display group-hover:text-${color} transition-colors ${isPrimary ? 'text-xl md:text-2xl' : 'text-lg'} ${mask && !isHovered ? 'italic text-gray-400' : ''}`}>
                    {displayValue}
                </div>
            </div>

            {/* Decorative Corner */}
            <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-${color}/10 to-transparent rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
        </div>
    );

    if (href) {
        return (
            <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`relative group cursor-pointer block ${isPrimary ? 'md:col-span-1' : ''}`}
            >
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-${color}/50 to-transparent rounded-xl blur opacity-20 group-hover:opacity-60 transition duration-500`} />
                <CardContent />
            </motion.a>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={handleClick}
            className={`relative group cursor-pointer ${isPrimary ? 'md:col-span-2' : ''}`}
        >
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-${color}/50 to-transparent rounded-xl blur opacity-20 group-hover:opacity-60 transition duration-500`} />
            <CardContent />
        </motion.div>
    );
};

const Contact = () => {
    const [isMobile, setIsMobile] = useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section className="py-24 relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black perspective-1000">
            {/* Digital Horizon Background - Static on Mobile */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {isMobile ? (
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black" />
                ) : (
                    <>
                        {/* Moving Grid Floor */}
                        <div
                            className="absolute inset-[-100%] opacity-30"
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

                        {/* Horizon Glow */}
                        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-primary/20 via-transparent to-transparent opacity-50 blur-3xl" />
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black via-black to-transparent" />

                        {/* Floating Particles */}
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: Math.random() * 1000 }}
                                animate={{
                                    opacity: [0, 0.5, 0],
                                    y: [Math.random() * 1000, Math.random() * -1000]
                                }}
                                transition={{
                                    duration: Math.random() * 10 + 10,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="absolute w-1 h-1 bg-primary rounded-full"
                                style={{ left: `${Math.random() * 100}%` }}
                            />
                        ))}
                    </>
                )}
            </div>

            <style>{`
                @keyframes grid-move {
                    0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
                    100% { transform: perspective(500px) rotateX(60deg) translateY(100px); }
                }
            `}</style>

            <div className="max-w-5xl mx-auto px-6 w-full relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-6 backdrop-blur-md"
                    >
                        <Globe className="w-3 h-3 animate-pulse" />
                        <span>GLOBAL_CONNECTIVITY_HUB</span>
                    </motion.div>

                    <h2 className="text-3xl md:text-7xl font-bold font-display mb-6">
                        <HackerText text="INITIATE_UPLINK" />
                    </h2>

                    <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed font-light">
                        Reach out for <span className="text-white font-semibold">internships</span>, <span className="text-white font-semibold">full-time roles</span>, or technical discussions.
                    </p>
                </div>

                {/* Contact Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">

                    {/* Primary: Email (Full Width on Mobile, Span 2 on Desktop if needed, but here we balance with LinkedIn) */}
                    {/* Actually, let's make Email span full width or be very prominent */}
                    <div className="md:col-span-2">
                        <motion.a
                            href="mailto:vishalsoni6350@gmail.com"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.01 }}
                            className="relative group cursor-pointer block"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500" />
                            <div className="relative bg-black/80 backdrop-blur-xl border border-primary/50 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-primary transition-colors overflow-hidden">
                                {/* Holographic sheen */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                                <div className="flex items-center gap-6">
                                    <div className="p-4 rounded-full bg-primary/20 text-primary">
                                        <Mail className="w-8 h-8" />
                                    </div>
                                    <div className="text-center md:text-left">
                                        <div className="text-sm font-mono text-gray-400 uppercase tracking-wider mb-1">Primary Communication Channel</div>
                                        <div className="text-2xl md:text-3xl font-bold text-white font-display break-all">vishalsoni6350@gmail.com</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-mono text-primary group-hover:translate-x-1 transition-transform">SEND TRANSMISSION</span>
                                    <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.a>
                    </div>

                    {/* Secondary: LinkedIn & GitHub */}
                    <ContactCard
                        icon={Linkedin}
                        label="Professional Network"
                        value="linkedin.com/in/vishalsoni18"
                        href="https://linkedin.com/in/vishalsoni18"
                        color="blue-500"
                        className="border-blue-500/30 hover:border-blue-500/60"
                    />

                    <ContactCard
                        icon={Github}
                        label="Code Repository"
                        value="github.com/vishalsoni18"
                        href="https://github.com/vishalsoni18/"
                        color="purple-500"
                        className="opacity-80 hover:opacity-100"
                    />
                </div>

                {/* Tertiary: Phone & Availability */}
                <div className="grid md:grid-cols-3 gap-6">
                    <ContactCard
                        icon={Phone}
                        label="Secure Line"
                        value="+91 63751 88332"
                        href="tel:+916375188332"
                        color="green-500"
                        className="opacity-80 hover:opacity-100"
                    />

                    {/* Availability Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative group md:col-span-2"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-white/5 to-transparent rounded-xl blur opacity-10 group-hover:opacity-30 transition duration-500" />
                        <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-6 h-full flex flex-col md:flex-row justify-between items-center gap-4 hover:border-white/20 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
                                    <div className="absolute -inset-1 rounded-full border border-green-500/30 animate-pulse" />
                                    <div className="absolute -inset-2 rounded-full border border-green-500/15" style={{ animation: 'pulse-ring 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite' }} />
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-white">OPEN TO DEVOPS / CLOUD ENGINEERING ROLES</div>
                                    <div className="text-xs font-mono text-gray-500">AVAILABLE FOR IMMEDIATE DEPLOYMENT</div>
                                </div>
                            </div>
                            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400">
                                REMOTE / HYBRID / ONSITE
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-block p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md">
                        <div className="flex items-center gap-3 text-sm text-gray-400 font-mono">
                            <Cpu className="w-4 h-4 text-primary" />
                            <span>ENCRYPTED TRANSMISSION PROTOCOL: V.2.0.4</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Contact;
