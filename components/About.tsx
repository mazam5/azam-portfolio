"use client";

import { personalInfo } from "@/data/portfolio";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Lightbulb, Rocket, Users } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
    {
        icon: <Rocket className="w-6 h-6" />,
        label: "Projects Shipped",
        value: personalInfo.stats.projectsCompleted + "+",
    },
    {
        icon: <Lightbulb className="w-6 h-6" />,
        label: "Technologies",
        value: personalInfo.stats.technologiesUsed + "+",
    },
    {
        icon: <Users className="w-6 h-6" />,
        label: "Companies",
        value: personalInfo.stats.companiesWorked + "+",
    },
];

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".about-text",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            gsap.fromTo(
                ".stat-card",
                { opacity: 0, y: 30, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".stats-grid",
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative py-24 md:py-32 px-6 z-10"
        >
            <div className="max-w-6xl mx-auto">
                {/* Section label */}
                <div className="about-text flex items-center gap-4 mb-16">
                    <span className="section-label">About Me</span>
                    <div className="gradient-line flex-1" />
                </div>

                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
                    {/* Left — Text */}
                    <div className="lg:col-span-3 space-y-6">
                        {personalInfo.bio.map((paragraph, i) => (
                            <p
                                key={i}
                                className="about-text text-base md:text-lg text-muted-foreground leading-relaxed font-light"
                            >
                                {paragraph}
                            </p>
                        ))}

                        {/* Philosophy */}
                        <div className="about-text mt-8 p-6 rounded-2xl border border-primary/10 bg-primary/5">
                            <p className="text-sm text-primary/80 font-mono mb-2 tracking-wider uppercase">
                                My Philosophy
                            </p>
                            <p className="text-lg text-foreground italic font-light leading-relaxed opacity-80">
                                &ldquo;Code is not just instructions for machines — it&rsquo;s a
                                craft that bridges human problems with elegant
                                solutions. Every line should be intentional,
                                every architecture decision thoughtful.&rdquo;
                            </p>
                        </div>
                    </div>

                    {/* Right — Stats */}
                    <div className="lg:col-span-2">
                        <div className="stats-grid grid grid-cols-2 gap-4">
                            {highlights.map((stat, i) => (
                                <div
                                    key={i}
                                    className="stat-card glass-card rounded-2xl p-6 text-center flex flex-col items-center gap-3"
                                >
                                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                        {stat.icon}
                                    </div>
                                    <span className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                                        {stat.value}
                                    </span>
                                    <span className="text-xs text-muted-foreground font-mono tracking-wider uppercase">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Terminal-style snippet */}
                        <div className="about-text mt-6 p-5 rounded-2xl bg-slate-950 border border-white/5 font-mono text-sm shadow-xl">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                                <span className="ml-2 text-zinc-600 text-xs">
                                    about.ts
                                </span>
                            </div>
                            <div className="space-y-1 text-xs">
                                <p>
                                    <span className="text-purple-400">const</span>{" "}
                                    <span className="text-cyan-400">engineer</span>{" "}
                                    <span className="text-zinc-500">=</span> {"{"}
                                </p>
                                <p className="pl-4">
                                    <span className="text-zinc-400">name:</span>{" "}
                                    <span className="text-green-400">&quot;{personalInfo.name}&quot;</span>,
                                </p>
                                <p className="pl-4">
                                    <span className="text-zinc-400">passion:</span>{" "}
                                    <span className="text-green-400">&quot;Building things that matter&quot;</span>,
                                </p>
                                <p className="pl-4">
                                    <span className="text-zinc-400">approach:</span>{" "}
                                    <span className="text-green-400">&quot;Problem-first, code-second&quot;</span>,
                                </p>
                                <p className="pl-4">
                                    <span className="text-zinc-400">coffee:</span>{" "}
                                    <span className="text-amber-400">Infinity</span>,
                                </p>
                                <p>{"}"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}