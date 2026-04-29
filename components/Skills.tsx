"use client";

import { SkillData } from "@/lib/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

gsap.registerPlugin(ScrollTrigger);

const categories = [
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend" },
    { key: "mobile", label: "Mobile" },
    { key: "database", label: "Database" },
    { key: "tools", label: "Tools" },
] as const;

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [skills, setSkills] = useState<SkillData[]>([]);
    const levelOrder = {
        Advanced: 3,
        Intermediate: 2,
        Basic: 1,
    };

    const filteredSkills =
        activeCategory === "all"
            ? skills
            : skills.filter((s) => s.category === activeCategory);

    const sortedSkills = [...filteredSkills].sort(
        (a, b) => levelOrder[b.level] - levelOrder[a.level]
    );

    useGSAP(
        () => {
            if (sortedSkills.length === 0) return;

            gsap.fromTo(
                ".skill-item",
                { opacity: 0, y: 20, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.04,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        },
        { scope: sectionRef, dependencies: [sortedSkills] }
    );

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await fetch("/api/skills");
                const data = await response.json();
                setSkills(data);
            } catch (error) {
                console.error("Error fetching skills:", error);
            }
        };

        fetchSkills();
    }, []);

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="relative py-24 md:py-32 px-6 z-10"
        >
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <span className="section-label">Skills & Expertise</span>
                    <div className="gradient-line flex-1" />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    Technologies I{" "}
                    <span className="text-primary">Work With</span>
                </h2>
                <p className="text-muted-foreground text-base md:text-lg mb-12 max-w-2xl font-light">
                    A curated toolkit for solving problems across the full
                    stack.
                </p>

                <div className="flex flex-wrap gap-2 mb-12">
                    <button
                        onClick={() => setActiveCategory("all")}
                        className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-sm font-medium transition-all duration-300 ${activeCategory === "all"
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "bg-secondary/50 text-muted-foreground border border-transparent hover:text-foreground hover:bg-secondary transition-colors"
                            }`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <Button
                            key={cat.key}
                            onClick={() => setActiveCategory(cat.key)}
                            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-sm font-medium transition-all duration-300 ${activeCategory === cat.key
                                ? "bg-primary/10 text-primary border border-primary/20"
                                : "bg-secondary/50 text-muted-foreground border border-transparent hover:text-foreground hover:bg-secondary transition-colors"
                                }`}
                        >
                            {cat.label}
                        </Button>
                    ))}
                </div>

                <div className="skills-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {sortedSkills.map((skill) => (
                        <div
                            key={skill.name}
                            className="skill-item glass-card rounded-xl p-3 md:p-5 group transition-all duration-300 hover:border-primary/20 hover:bg-primary/5"
                        >
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between w-full">
                                    <span className="text-lg md:text-xl">{skill.icon}</span>
                                    <span className="text-[8px] md:text-[10px] font-mono text-primary/60 uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-primary/5 border border-primary/10">
                                        {skill.level}
                                    </span>
                                </div>
                                <span className="text-xs md:text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors line-clamp-1">
                                    {skill.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}