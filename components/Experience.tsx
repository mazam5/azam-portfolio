"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, MoveRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ExperienceCard from "./cards/ExperienceCard";
import { ExperienceData } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

/* ================= DESKTOP ================= */
const ExperienceDesktop = ({ experiences }: { experiences: ExperienceData[] }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!experiences.length) return;

            const wrapper = wrapperRef.current;
            if (!wrapper) return;

            // prevent negative scroll
            const totalScroll = Math.max(0, wrapper.scrollWidth - window.innerWidth);
            if (totalScroll === 0) return;

            const scrollDistance = totalScroll * 1.5;

            // initial state (prevents flicker)
            gsap.set(wrapper, { opacity: 0, scale: 0.9 });

            const tween = gsap.to(wrapper, {
                x: -totalScroll,
                ease: "none",
            });

            const trigger = ScrollTrigger.create({
                animation: tween,
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${scrollDistance}`,
                scrub: 0.1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,

                onEnter: () => {
                    gsap.to(wrapper, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        ease: "power2.out",
                    });
                },

                onLeaveBack: () => {
                    gsap.to(wrapper, {
                        scale: 0.9,
                        opacity: 0,
                        duration: 0.5,
                        ease: "power2.in",
                    });
                },
            });

            return () => {
                trigger.kill();
                tween.kill();
            };
        },
        { scope: sectionRef, dependencies: [experiences] }
    );

    return (
        <section
            id="journey"
            ref={sectionRef}
            className="journey relative h-screen overflow-hidden hidden md:flex items-center w-full"
        >
            {/* Label */}
            <div className="absolute top-16 inset-x-0 z-20">
                <div className="px-6 mx-auto max-w-6xl">
                    <div className="flex items-center gap-4">
                        <span className="opacity-20">
                            <MoveRight />
                        </span>
                        <span className="font-mono text-xs tracking-[0.4em] uppercase text-primary/60">
                            JOURNEY
                        </span>
                    </div>
                </div>
            </div>

            <div
                ref={wrapperRef}
                className="relative flex items-center h-full min-w-max px-8 md:px-[15vw] pr-[25vw]"
            >
                <div className="flex items-center gap-20">
                    {experiences.map((exp, i) => (
                        <div key={i} className="shrink-0 h-full flex">
                            <div className="flex flex-col items-center">
                                <ExperienceCard
                                    ms={{
                                        date: exp.date,
                                        title: exp.title,
                                        company: exp.company,
                                        description: exp.description,
                                        technologies: exp.technologies,
                                        icon: <Briefcase className="w-5 h-5" />,
                                    }}
                                    index={i}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ================= MOBILE ================= */
const ExperienceMobile = ({ experiences }: { experiences: ExperienceData[] }) => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (!experiences.length) return;

            const cards = sectionRef.current?.querySelectorAll(".journey-mobile-card");
            if (!cards) return;

            cards.forEach((card) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        },
        { scope: sectionRef, dependencies: [experiences] }
    );

    return (
        <section
            id="journey"
            ref={sectionRef}
            className="journey relative w-full max-w-6xl mx-auto py-24 px-6"
        >
            <div className="flex items-center gap-4 mb-16">
                <span className="opacity-20">
                    <MoveRight />
                </span>
                <span className="font-mono text-xs tracking-[0.4em] uppercase text-primary/60">
                    JOURNEY
                </span>
            </div>

            <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border/50" />

                <div className="flex flex-col gap-8">
                    {experiences.map((exp, i) => (
                        <div key={i} className="journey-mobile-card relative pl-10">
                            {/* Timeline node */}
                            <div className="absolute left-3.5 top-6 w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)] border-2 border-background z-10" />

                            <div className="p-8 rounded-3xl glass-card border-primary/10 shadow-2xl flex flex-col gap-4 relative overflow-hidden group">
                                {/* Decorative background accent */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                                <div className="flex justify-between items-start">
                                    <span className="text-primary font-mono text-[10px] tracking-widest font-bold px-3 py-1 rounded-full bg-primary/10">
                                        {exp.date}
                                    </span>
                                </div>

                                <div>
                                    <h4 className="text-lg font-bold tracking-tight text-foreground/90">
                                        {exp.title}
                                    </h4>
                                    {exp.company && (
                                        <p className="text-sm text-primary/80 font-medium mt-1">
                                            {exp.company}
                                        </p>
                                    )}
                                </div>

                                <p className="text-sm text-muted-foreground/80 leading-relaxed">
                                    {exp.description}
                                </p>

                                {exp.technologies && exp.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {exp.technologies.slice(0, 3).map((tech, j) => (
                                            <span key={j} className="text-[10px] px-2 py-0.5 rounded-md bg-secondary/50 text-muted-foreground border border-border/50">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ================= MAIN ================= */
export default function Experience() {
    const [experiences, setExperiences] = useState<ExperienceData[]>([]);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);

        const controller = new AbortController();

        const fetchExperiences = async () => {
            try {
                const res = await fetch("/api/experiences", {
                    signal: controller.signal,
                });
                const data = await res.json();
                setExperiences(data);
            } catch (err: any) {
                if (err.name !== "AbortError") {
                    console.error("Fetch error:", err);
                }
            }
        };

        fetchExperiences();

        return () => {
            controller.abort();
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    if (isMobile === null) return <div className="h-screen bg-background" />;

    return (
        <>
            {isMobile ? (
                <ExperienceMobile experiences={experiences} />
            ) : (
                <ExperienceDesktop experiences={experiences} />
            )}
        </>
    );
}