"use client";

import { education } from "@/data/portfolio";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, BookOpen } from "lucide-react";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (education.length === 0) return;

            gsap.fromTo(
                ".edu-element",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    return (
        <section
            id="education"
            ref={sectionRef}
            className="relative py-24 md:py-32 px-6 z-10"
        >
            <div className="max-w-6xl mx-auto">
                {/* Section label */}
                <div className="edu-element flex items-center gap-4 mb-16">
                    <GraduationCap className="w-4 h-4 text-primary/40" />
                    <span className="section-label">Education</span>
                    <div className="gradient-line flex-1" />
                </div>

                <h2 className="edu-element text-3xl md:text-4xl font-bold tracking-tight mb-16">
                    Academic{" "}
                    <span className="text-primary">Background</span>
                </h2>

                <div className="space-y-8">
                    {education.map((edu, i) => (
                        <div
                            key={i}
                            className="edu-element glass-card rounded-2xl p-8 md:p-10 border border-border/50 hover:border-primary/20 transition-all duration-500"
                        >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                                        <GraduationCap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground tracking-tight">
                                            {edu.degree}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {edu.institution}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 shrink-0">
                                    {edu.gpa && (
                                        <span className="px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-mono">
                                            GPA: {edu.gpa}
                                        </span>
                                    )}
                                    <span className="text-[12px] font-mono text-muted-foreground/60 tracking-widest uppercase">
                                        {edu.date}
                                    </span>
                                </div>
                            </div>

                            {edu.description && (
                                <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-light line-clamp-3">
                                    {edu.description}
                                </p>
                            )}

                            {edu.coursework && (
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <BookOpen className="w-4 h-4 text-muted-foreground/30" />
                                        <span className="text-[10px] font-mono text-muted-foreground/40 tracking-widest uppercase">
                                            Key Coursework
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {edu.coursework.map((course) => (
                                            <Badge
                                                key={course}
                                                variant="outline"
                                                className="text-[10px] border-primary/10 bg-primary/5 text-muted-foreground hover:text-primary hover:border-primary/20 transition-colors px-2 py-0"
                                            >
                                                {course}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
