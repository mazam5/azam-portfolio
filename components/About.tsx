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
            if (personalInfo.bio.length === 0 || highlights.length === 0) return;

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
                        trigger: sectionRef.current,
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
                    <span className="section-label font-mono">About Me</span>
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
                                    <span className="text-3xl md:text-4xl font-heading font-bold text-foreground tracking-tight">
                                        {stat.value}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
}