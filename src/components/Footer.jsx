import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, Terminal, Cpu, Activity, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const navLinks = [
        { label: 'OVERVIEW', path: '/' },
        { label: 'PROJECTS', path: '/projects' },
        { label: 'SKILLS', path: '/skills' },
        { label: 'CERTS', path: '/certifications' },
        { label: 'EXPERIENCE', path: '/experience' },
        { label: 'CONTACT', path: '/contact' },
    ];

    const socialLinks = [
        { icon: Github, href: 'https://github.com/vishalsoni18', label: 'GitHub', color: 'hover:text-purple-400' },
        { icon: Linkedin, href: 'https://linkedin.com/in/vishalsoni18', label: 'LinkedIn', color: 'hover:text-blue-400' },
        { icon: Mail, href: 'mailto:vishalsoni6350@gmail.com', label: 'Email', color: 'hover:text-primary' },
    ];

    return (
        <footer className="relative bg-black border-t border-white/5 overflow-hidden">
            {/* Background grid pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                {/* Top Section: Brand + Nav + Social */}
                <div className="grid md:grid-cols-3 gap-10 mb-10">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                <Terminal className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-xl font-mono font-bold tracking-tighter">
                                VISHAL<span className="text-primary">.DEV</span>
                            </h3>
                        </div>
                        <p className="text-gray-500 text-sm font-mono leading-relaxed">
                            Building cloud systems that deploy themselves,
                            recover from failure, and scale under load.
                        </p>
                        <div className="flex items-center gap-2 mt-4 text-[10px] font-mono text-primary/50">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span>ALL SYSTEMS OPERATIONAL</span>
                        </div>
                    </div>

                    {/* Quick Nav */}
                    <div>
                        <div className="text-[10px] font-mono text-gray-600 tracking-widest mb-4 uppercase">Navigation</div>
                        <div className="grid grid-cols-2 gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    to={link.path}
                                    className="text-sm font-mono text-gray-500 hover:text-primary transition-colors flex items-center gap-1 group"
                                >
                                    <ChevronRight className="w-3 h-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <div className="text-[10px] font-mono text-gray-600 tracking-widest mb-4 uppercase">Connect</div>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target={social.href.startsWith('mailto') ? undefined : '_blank'}
                                    rel="noopener noreferrer"
                                    className={`social-glow p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 ${social.color} hover:border-white/20 transition-all duration-300`}
                                    title={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>

                        {/* System Status */}
                        <div className="mt-6 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600">
                                <Cpu className="w-3 h-3 text-primary/50" />
                                <span>SESSION: {time.toLocaleTimeString()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600 mt-1">
                                <Activity className="w-3 h-3 text-green-500/50" />
                                <span>UPTIME: 99.999% | LATENCY: 24ms</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Terminal-style copyright */}
                        <div className="flex items-center gap-2 text-xs font-mono text-gray-600">
                            <span className="text-primary/40">$</span>
                            <span>© {new Date().getFullYear()} vishal-soni // all rights reserved</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-mono text-gray-600">
                            <span>Built with</span>
                            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                            <span>using React + Tailwind</span>
                            <span className="text-primary/30">|</span>
                            <span className="text-primary/40">v2.0.4</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative corner markers */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/10" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/10" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/10" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/10" />
        </footer>
    );
};

export default Footer;
