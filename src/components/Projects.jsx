import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Server, Database, Globe, Shield, Zap, ExternalLink, Github, Terminal, X, ChevronRight, Layers, Cloud, Lock, Cpu, Crown } from 'lucide-react';
import HackerText from './HackerText';

const ProjectCard = ({ project, onClick, index }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        if (window.innerWidth < 768) return; // Disable tilt on mobile
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onClick(project)}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
                        className={`relative w-full ${project.isFlagship ? 'md:w-[580px] md:min-h-[500px]' : 'max-w-sm md:w-[350px] h-[480px]'} rounded-xl bg-black/40 border ${project.isFlagship ? 'border-yellow-500/30' : 'border-white/10'} cursor-pointer group perspective-1000`}
        >
            {/* Neon Glow */}
            <div
                style={{
                    transform: "translateZ(75px)",
                }}
                className={`absolute inset-0 rounded-xl ${project.isFlagship ? 'bg-yellow-500/10' : 'bg-primary/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
            />

            {/* Card Content */}
            <div
                style={{
                    transform: "translateZ(50px)",
                }}
                className={`absolute inset-0 rounded-xl bg-black/80 backdrop-blur-md border ${project.isFlagship ? 'border-yellow-500/30 group-hover:border-yellow-500/50' : 'border-white/10 group-hover:border-primary/50'} overflow-hidden flex flex-col p-6 shadow-2xl transition-colors duration-300`}
            >
                {/* Flagship Badge */}
                {project.isFlagship && (
                    <div className="absolute top-0 right-0 px-4 py-1 bg-yellow-500/20 text-yellow-500 text-[10px] font-bold tracking-widest border-l border-b border-yellow-500/30 rounded-bl-xl flex items-center gap-2">
                        <Crown className="w-3 h-3" /> FLAGSHIP PROJECT
                    </div>
                )}

                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-lg bg-white/5 border ${project.isFlagship ? 'border-yellow-500/30' : 'border-white/10'} transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                        {project.icon}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                            {project.liveUrl ? (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-[10px] font-mono text-primary hover:text-white transition-colors flex items-center gap-1 bg-primary/10 border border-primary/20 px-2 py-0.5 rounded"
                                    title="View Live Site"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
                                    <span>LIVE</span>
                                    <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                            ) : (
                                <span className="text-[10px] font-mono text-gray-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded">● OFFLINE</span>
                            )}
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1.5 rounded bg-white/5 hover:bg-white/20 text-gray-400 hover:text-white transition-colors border border-white/5 hover:border-white/20"
                                title="View Source Code"
                            >
                                <Github className="w-3 h-3" />
                            </a>
                        </div>
                        <span className="text-[10px] font-mono text-gray-500">ID: {project.id}</span>
                    </div>
                </div>

                <div className={project.isFlagship ? "flex flex-col md:flex-row gap-8 h-full" : "flex flex-col h-full"}>
                    {/* Title & Desc */}
                    <div className="mb-auto flex-1">
                        <h3 className={`font-bold font-display text-white mb-2 transition-colors ${project.isFlagship ? 'text-4xl group-hover:text-yellow-500' : 'text-2xl group-hover:text-primary'}`}>
                            {project.title}
                        </h3>
                        <p className={`text-gray-400 font-mono leading-relaxed mb-3 ${project.isFlagship ? 'text-base line-clamp-none' : 'text-sm line-clamp-3'}`}>
                            {project.shortDesc}
                        </p>
                        {/* Infra Line */}
                        <div className={`flex items-start gap-2 text-[10px] font-mono bg-primary/5 p-2 rounded border border-primary/10 ${project.isFlagship ? 'text-yellow-500/80' : 'text-primary/80'}`}>
                            <Cloud className="w-3 h-3 mt-0.5 shrink-0" />
                            <span>{project.infra}</span>
                        </div>
                    </div>

                    {/* Tech Stack (Expanded for Flagship) */}
                    <div className={`${project.isFlagship ? 'w-full md:w-64 border-l border-white/10 pl-0 md:pl-8 flex flex-col justify-center' : 'space-y-4 mt-4 w-full'}`}>
                        {!project.isFlagship && <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />}

                        <div className="flex flex-wrap gap-2">
                            {project.tech.slice(0, project.isFlagship ? 8 : 3).map((t, i) => (
                                <span key={i} className={`text-[10px] px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5 transition-colors ${project.isFlagship ? 'group-hover:border-yellow-500/30' : 'group-hover:border-primary/30'}`}>
                                    {t}
                                </span>
                            ))}
                        </div>

                        {project.isFlagship && (
                            <div className="mt-6 space-y-2">
                                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">PLATFORM CAPABILITIES</div>
                                <div className="grid grid-cols-2 gap-2">
                                    {project.stats.slice(0, 4).map((stat, i) => (
                                        <div key={i} className="text-xs text-gray-400">
                                            <span className="text-yellow-500">•</span> {stat.value}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className={`flex items-center justify-between text-xs font-mono text-gray-500 transition-colors ${project.isFlagship ? 'mt-auto pt-4 group-hover:text-yellow-500' : 'group-hover:text-primary mt-4'}`}>
                            <span>VIEW_DIAGNOSTICS</span>
                            <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const SidePanel = ({ project, onClose, isMobile }) => {
    return createPortal(
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
            />
            <motion.div
                initial={{ x: '100%', y: isMobile ? 0 : '-50%' }}
                animate={{ x: 0, y: isMobile ? 0 : '-50%' }}
                exit={{ x: '100%', y: isMobile ? 0 : '-50%' }}
                style={{ top: isMobile ? 0 : '50%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed right-0 h-full md:h-auto md:max-h-[90vh] w-full md:w-[600px] bg-black border-l border-y border-primary/20 z-[9999] flex flex-col md:rounded-l-xl shadow-2xl"
            >
                {/* Fixed Header */}
                <div className="bg-black/90 backdrop-blur-md border-b border-white/10 p-4 md:p-6 flex items-center justify-between z-10 flex-none md:rounded-tl-xl">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded border border-primary/30 text-primary">
                            {project.icon}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold font-display text-white">{project.title}</h2>
                            <div className="text-xs font-mono text-gray-500">SYSTEM_DIAGNOSTIC // {project.id}</div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8" data-lenis-prevent>
                    <div>
                        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-primary" /> MISSION BRIEF
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed font-mono border-l-2 border-primary/50 pl-4 bg-primary/5 p-4 rounded-r">
                            {project.description}
                        </p>
                    </div>

                    {/* Engineering Notes */}
                    <div>
                        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-yellow-500" /> ENGINEERING NOTES
                        </h3>
                        <div className="text-gray-400 text-sm leading-relaxed font-mono bg-white/5 p-4 rounded border border-white/10">
                            {project.engineeringNotes}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {project.stats.map((stat, i) => (
                            <div key={i} className="bg-white/5 p-4 rounded border border-white/5 hover:border-primary/30 transition-colors group">
                                <div className="text-[10px] text-gray-500 mb-1 font-mono group-hover:text-primary transition-colors">{stat.label}</div>
                                <div className="text-xl font-bold text-white">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                    {project.metricsDisclaimer && (
                        <p className="text-[10px] text-gray-500 font-mono mt-2 italic border-l-2 border-primary/30 pl-3">
                            {project.metricsDisclaimer}
                        </p>
                    )}

                    {project.validationSteps && (
                        <div>
                            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-red-400" /> FAILURE VALIDATION (CHAOS TESTING)
                            </h3>
                            <div className="bg-red-500/5 border border-red-500/20 rounded p-4 space-y-2">
                                {project.validationSteps.map((step, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-gray-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                        {step}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-secondary" /> TECH STACK
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t, i) => (
                                <span key={i} className="px-3 py-1.5 text-xs font-mono rounded bg-white/5 border border-white/10 text-gray-300 hover:bg-primary/10 hover:border-primary/30 transition-all cursor-default">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-green-400" /> CORE PROTOCOLS
                        </h3>
                        <ul className="space-y-3">
                            {project.protocols.map((f, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-400 bg-white/5 p-3 rounded border border-white/5">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_5px_#00f0ff]" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Inline Footer Action */}
                    <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${project.liveUrl ? 'flex-1' : 'w-full'} py-4 bg-white/10 border border-white/20 text-white font-mono text-sm tracking-widest hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 flex items-center justify-center gap-2 rounded group`}
                        >
                            <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            <span>ACCESS SOURCE_CODE</span>
                        </a>
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 py-4 bg-primary/10 border border-primary/30 text-primary font-mono text-sm tracking-widest hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 flex items-center justify-center gap-2 rounded group"
                            >
                                <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span>ACCESS LIVE_SYSTEM</span>
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </>,
        document.body
    );
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            id: "PRJ-005",
            title: "CloudForge",
            shortDesc: "Provisioned a highly available Multi-AZ AWS infrastructure using Terraform IaC, automating VPC, EKS, ECR, IAM, and ALB deployment.",
            infra: "Auto-Scaling AWS EKS Cluster + GitHub Actions CI/CD.",
            icon: <Layers className="w-8 h-8 text-yellow-500" />,
            description: "Provisioned a highly available Multi-AZ AWS infrastructure using Terraform IaC, automating VPC, EKS, ECR, IAM, and ALB deployment - reducing provisioning effort from hours to minutes and eliminating single points of failure. Automated end-to-end CI/CD using GitHub Actions, enabling zero-downtime Kubernetes deployments with HPA (2-10 replicas), self-healing, and <5-second pod recovery via Prometheus/Grafana observability.",
            metricsDisclaimer: "Metrics derived from HPA behavior under synthetic load testing.",
            engineeringNotes: "Focused on recovery over happy-path. Tested failures extensively by simulating node termination and pod deletion to verify scheduling reliability. Implemented Prometheus/Grafana alerts.",
            githubUrl: "https://github.com/vishalsoni18/CloudForge",
            tech: ["AWS EKS", "Terraform", "Kubernetes", "GitHub Actions", "Prometheus", "Grafana", "Docker", "AWS ECR", "AWS IAM", "ALB"],
            isFlagship: true,
            stats: [
                { label: "SCALING", value: "HPA / Auto" },
                { label: "STRATEGY", value: "Rolling Update" },
                { label: "RESILIENCE", value: "Self-Healing" },
                { label: "PROVISIONING", value: "Terraform IaC" }
            ],
            validationSteps: [
                "Pod deletion -> Verify auto restart",
                "Node termination -> Verify pod scheduling on healthy nodes",
                "Load spikes -> Verify HPA triggers scaling"
            ],
            protocols: [
                "Infrastructure provisioning using reusable Terraform modules",
                "Secure zero-downtime deployments using Kubernetes HPA",
                "Keyless OIDC integrations for GitHub Actions deploy pipelines"
            ]
        },
        {
            id: "PRJ-000",
            title: "CollabCode",
            shortDesc: "A distributed collaborative IDE enabling conflict-free editing across 100+ concurrent sessions using a custom Operational Transformation engine with sub-second synchronization latency.",
            infra: "Decoupled Go backend on Railway + Next.js frontend on Vercel with Supabase PgBouncer setup.",
            icon: <Crown className="w-8 h-8 text-yellow-500" />,
            description: "Engineered a distributed collaborative IDE enabling conflict-free editing across 100+ concurrent sessions using a custom Operational Transformation (OT) engine with sub-second synchronization latency. Scaled a Go Fiber Pub/Sub architecture with 25+ RESTful APIs, JWT-based authentication, Monaco Editor integration, and sandboxed code execution.",
            metricsDisclaimer: "Performance optimized using decoupled containerized stateful WebSocket servers to bypass Vercel serverless limitations.",
            engineeringNotes: "Bypassed Vercel Serverless WebSocket limits by containerizing a stateful Go service on Railway. Solved Supabase connection pooler (PgBouncer) prepared-statement limitations by programmatically configuring simple protocol queries in pgx.",
            githubUrl: "https://github.com/vishalsoni18/CollabCode",
            liveUrl: "https://collab-code-mocha.vercel.app/",
            tech: ["Next.js", "TypeScript", "Go", "WebSocket", "PostgreSQL", "WebRTC", "Docker", "Zustand", "Redis", "Supabase", "Go Fiber", "Monaco Editor"],
            isFlagship: true,
            stats: [
                { label: "COLLABORATION", value: "Realtime OT" },
                { label: "NETWORKING", value: "WebSockets" },
                { label: "INFRASTRUCTURE", value: "Railway / Go" },
                { label: "DATABASE", value: "PostgreSQL" }
            ],
            validationSteps: [
                "WebSocket upgrade bypass -> Verification of persistent sessions",
                "Prepared statements bypass -> PgBouncer connection integrity check",
                "Concurrency stress -> Operational Transform resolution verification"
            ],
            protocols: [
                "Stateful WebSocket message broadcasting and client hub state synchronization",
                "Idempotent database transactions using Supabase connection pooler",
                "Multi-language code compilation via containerized os/exec runtimes",
                "WebRTC peer connection setup with custom websocket signal routing"
            ]
        },
        {
            id: "PRJ-001",
            title: "ChronoVault",
            shortDesc: "Distributed encrypted file vault prototype implementing AES-256 GCM encryption, 1KB sharding, and Merkle-tree validation.",
            infra: "Go CLI simulation + HTTP Server API supporting JSON package bundles.",
            icon: <Lock className="w-8 h-8 text-green-400" />,
            description: "Built a fault-tolerant encrypted storage platform eliminating single-point failures through AES-256-GCM encryption, deterministic sharding, and Merkle-tree integrity verification for tamper-evident data at rest. Strengthened data resilience with decentralized IPFS chunk distribution, HKDF key derivation, biometric authentication, and secure file reconstruction within a microservices architecture.",
            metricsDisclaimer: "Secure retrieval blocked dynamically if any chunk hash fails Merkle root comparison.",
            engineeringNotes: "Structured two execution modes: local CLI pipeline and a Web experience. Developed robust file reconstruction logic to assemble shredded chunks using a custom text manifest containing order and filenames.",
            githubUrl: "https://github.com/vishalsoni18/ChronoVault",
            liveUrl: "https://chronovault-psi.vercel.app/",
            tech: ["Go", "React", "FastAPI", "AES-256-GCM", "IPFS", "SHA-256", "HKDF"],
            stats: [
                { label: "ENCRYPTION", value: "AES-256 GCM" },
                { label: "INTEGRITY", value: "Merkle Root" },
                { label: "SHARDING", value: "1KB Chunks" }
            ],
            protocols: [
                "Content-addressed chunk storage in shredded_store directory",
                "Merkle Tree construction and validation of chunk hashes",
                "Decoupled upload/retrieve web API with custom HTTP headers"
            ]
        },
        {
            id: "PRJ-002",
            title: "AnswerHub",
            shortDesc: "An intelligent community Q&A and FAQ platform featuring gamification, voice search, and in-browser extractive AI summaries.",
            infra: "React 19 + Vite 8 SPA deployed on Vercel with Supabase PostgreSQL backend.",
            icon: <Cpu className="w-8 h-8 text-purple-400" />,
            description: "A moderated Q&A and FAQ platform featuring role-based access control, a reputation/badge gamification engine, client-side AI summaries, Web Speech API voice search/TTS accessibility, and real-time leaderboards.",
            metricsDisclaimer: "AI summarizer generates key insights in under 5ms completely on the client side to minimize server costs.",
            engineeringNotes: "Configured database triggers on auth.users for automatic profile generation. Built atomic upvoting/downvoting SQL functions and indexes. Implemented Fuse.js fuzzy matching for type-ahead and duplicate question detection.",
            githubUrl: "https://github.com/vishalsoni18/Answerhub",
            liveUrl: "https://answerhub-zeta.vercel.app/",
            tech: ["React 19", "Vite 8", "Supabase", "Tailwind CSS", "Framer Motion", "Fuse.js", "Web Speech API"],
            stats: [
                { label: "SEARCH", value: "Voice / Fuzzy" },
                { label: "AI", value: "Client Summaries" },
                { label: "SECURITY", value: "Row Level Policies" }
            ],
            protocols: [
                "Extractive frequency-based NLP summary algorithm",
                "Supabase PostgreSQL database triggers and composite primary keys",
                "Web Speech Recognition API and SpeechSynthesis read-aloud hooks"
            ]
        },
        {
            id: "PRJ-003",
            title: "Arvis X",
            shortDesc: "AI-powered travel & booking platform supporting flights, hotels, and events with real-time seat reservation under high concurrency.",
            infra: "Stateless backend scaling via AWS Lambda & EKS, automated with Terraform IaC.",
            icon: <Globe className="w-8 h-8 text-primary" />,
            description: "Architected a travel booking platform supporting role-based dashboards for users, vendors, and administrators. Engineered real-time seat reservations using Redis locking and WebSockets. Integrated Cashfree payments with automatic refund workflows and an LLM travel concierge.",
            metricsDisclaimer: "Redis-based mutex locks prevent double-booking of seats during high-traffic campaigns.",
            engineeringNotes: "Focused on concurrency and transactional consistency. Handled payment timeouts and webhook failures gracefully via idempotent database checks. Deployed via Terraform-managed IaC.",
            githubUrl: "https://github.com/vishalsoni18/Arvis",
            liveUrl: "https://arvis-frontend.vercel.app/",
            tech: ["Next.js", "Cashfree", "AWS Lambda", "Kubernetes", "Redis", "WebSockets", "Terraform", "LLM APIs"],
            stats: [
                { label: "CONCURRENCY", value: "Redis Mutex" },
                { label: "ROUTING", value: "WebSocket Sync" },
                { label: "CLOUD", value: "AWS / EKS" }
            ],
            protocols: [
                "Redis-based lock managers for high-concurrency seat blocking",
                "Idempotent payment capture and automatic refund logic",
                "Context-aware travel itineraries using LLM embeddings"
            ]
        },
        {
            id: "PRJ-004",
            title: "DineOps",
            shortDesc: "Restaurant management SaaS command center featuring 7 role-based portals, curating order workflows and offline JSON fallback.",
            infra: "Next.js + NestJS backend deployed on Vercel and Supabase PostgreSQL.",
            icon: <Server className="w-8 h-8 text-blue-400" />,
            description: "Deployed a full-stack restaurant management platform with 6 RBAC-secured portals, implementing POS, kitchen display, reservations, inventory, delivery tracking, and JWT authentication. Introduced offline-first persistence with PostgreSQL, Prisma ORM, Supabase Realtime subscriptions, and automated Vercel CI/CD pipelines.",
            metricsDisclaimer: "Offline mode preserves 100% feature parity using a local storage JSON file structure.",
            engineeringNotes: "Designed dual-mode persistence that monitors database connections and dynamically routes queries. Implemented JWT auth with 7-tier role hierarchy and route guards.",
            githubUrl: "https://github.com/vishalsoni18/DineOps",
            liveUrl: "https://dine-ops-hazel.vercel.app/",
            tech: ["Next.js", "Prisma", "Supabase", "PostgreSQL", "Cashfree", "TypeScript", "Vercel CI/CD"],
            stats: [
                { label: "PORTALS", value: "6 Role-Based" },
                { label: "DATABASE", value: "Dual-Mode / Hybrid" },
                { label: "SECURITY", value: "JWT RBAC" }
            ],
            protocols: [
                "Connection monitoring and automatic JSON database fallback triggers",
                "Real-time kitchen display system updates via server-sent events",
                "Enterprise role-based access control and router guarding"
            ]
        }
    ];

    const [isMobile, setIsMobile] = useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section className="py-20 relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Holographic Blueprint Background - Static on Mobile */}
            <div className="absolute inset-0 pointer-events-none bg-black">
                {isMobile ? (
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black" />
                ) : (
                    <>
                        {/* Technical Grid */}
                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: `linear-gradient(to right, #00f0ff 1px, transparent 1px), linear-gradient(to bottom, #00f0ff 1px, transparent 1px)`,
                                backgroundSize: '40px 40px',
                                maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                            }}
                        />

                        {/* Scanning Laser Line */}
                        <motion.div
                            animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 w-full h-[2px] bg-primary shadow-[0_0_20px_#00f0ff]"
                        />

                        {/* Rotating Wireframe Cube (Simulated) */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute top-20 right-20 w-64 h-64 border border-primary/20 rounded-full opacity-20"
                            style={{ borderStyle: 'dashed' }}
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-20 left-20 w-48 h-48 border border-secondary/20 rounded-full opacity-20"
                            style={{ borderStyle: 'dotted' }}
                        />

                        {/* Digital Noise / Grain */}
                        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    </>
                )}
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-6">
                        <Zap className="w-3 h-3 animate-pulse" />
                        <span>SYSTEM_OVERRIDE_ENGAGED</span>
                    </div>
                    <h2 className="text-3xl md:text-7xl font-bold font-display mb-6 tracking-tight">
                        <HackerText text="PROJECT_ARCHIVE" />
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto text-lg font-mono">
                        Advanced infrastructure deployments and security protocols.
                    </p>
                </motion.div>

                {/* 3D Carousel Grid */}
                <div className="flex flex-wrap justify-center gap-8 perspective-2000">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            onClick={setSelectedProject}
                        />
                    ))}
                </div>
            </div>

            {/* Side Panel */}
            <AnimatePresence>
                {selectedProject && (
                    <SidePanel
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                        isMobile={isMobile}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
