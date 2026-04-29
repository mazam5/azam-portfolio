"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Layers } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ProjectData } from "@/lib/types";
import { Button } from "./ui/button";

gsap.registerPlugin(ScrollTrigger);

const filterTabs = [
    { key: "all", label: "All" },
    { key: "web", label: "Web" },
    { key: "mobile", label: "Mobile" },
    { key: "fullstack", label: "Full Stack" },
];

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeFilter, setActiveFilter] = useState("all");
    const [projects, setProjects] = useState<ProjectData[]>([]);

    const filteredProjects = [...(activeFilter === "all"
        ? projects
        : projects.filter((p) => p.category === activeFilter)
    )].sort((a, b) => {
        if (a.featured === b.featured) return 0;
        return a.featured ? -1 : 1;
    });


    useGSAP(
        () => {
            if (filteredProjects.length === 0) return;
            gsap.fromTo(
                ".project-card",
                { opacity: 0, y: 40, scale: 0.95 },
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
        { scope: sectionRef, dependencies: [activeFilter] }
    );
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("/api/projects");
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects();
    }, []);
    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative py-24 md:py-32 px-6 z-10"
        >
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Layers className="w-4 h-4 text-[#00eaff]/40" />
                    <span className="section-label">Projects</span>
                    <div className="gradient-line flex-1" />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    Things I&rsquo;ve{" "}
                    <span className="text-primary">Built</span>
                </h2>
                <p className="text-muted-foreground text-base md:text-lg mb-12 max-w-2xl font-light">
                    A selection of projects that showcase my approach to
                    problem-solving and engineering.
                </p>

                <div className="flex flex-wrap gap-2 mb-12">
                    {filterTabs.map((tab) => (
                        <Button
                            key={tab.key}
                            onClick={() => setActiveFilter(tab.key)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === tab.key
                                ? "bg-primary/10 text-primary border border-primary/20"
                                : "bg-secondary text-muted-foreground border border-transparent hover:text-foreground hover:bg-secondary/80 transition-colors"
                                }`}
                        >
                            {tab.label}
                        </Button>
                    ))}
                </div>

                <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredProjects.map((project, i) => (
                        <div
                            key={i}
                            className="project-card glass-card rounded-2xl overflow-hidden group border border-border/50 hover:border-primary/30"
                        >
                            <div className="relative h-40 bg-linear-to-br from-primary/10 to-primary/5 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 dot-pattern opacity-10 dark:opacity-30" />
                                <div className="absolute top-4 right-4 w-20 h-20 rounded-full border border-primary/10 opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700" />
                                <div className="absolute bottom-6 left-6 w-12 h-12 rounded-lg border border-primary/10 opacity-20 group-hover:opacity-50 group-hover:rotate-12 transition-all duration-700" />

                                <h3 className="text-xl font-bold text-foreground/80 tracking-tight group-hover:text-primary transition-colors z-10 px-6 text-center">
                                    {project.title}
                                </h3>

                                {project.featured && (
                                    <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono tracking-wider uppercase">
                                        Featured
                                    </span>
                                )}
                            </div>

                            <div className="p-6">
                                <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-light line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-1.5 mb-5">
                                    {project.technologies.map((tech) => (
                                        <Badge
                                            key={tech}
                                            variant="outline"
                                            className="text-[10px] border-secondary bg-secondary/50 text-muted-foreground px-2 py-0.5"
                                        >
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex items-center gap-3 pt-4 border-t border-foreground/5">
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            Live Demo
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            Source
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}