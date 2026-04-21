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
            id="experience"
            ref={sectionRef}
            className="journey relative h-screen overflow-hidden flex items-center w-full md:flex"
        >
            {/* Label */}
            <div className="absolute top-16 inset-x-0 z-20">
                <div className="px-6 mx-auto max-w-6xl">
                    <div className="flex items-center gap-4">
                        <span className="opacity-20">
                            <MoveRight />
                        </span>
                        <span className="font-mono text-xs tracking-[0.4em] uppercase text-muted-foreground/60">
                            PROFESSIONAL JOURNEY
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
            id="experience-mobile"
            ref={sectionRef}
            className="journey relative w-full max-w-6xl mx-auto md:hidden py-24 px-6"
        >
            <div className="flex items-center gap-4 mb-12">
                <span className="opacity-20">
                    <MoveRight />
                </span>
                <span className="section-label">JOURNEY</span>
            </div>

            <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border/50" />

                <div className="flex flex-col gap-10">
                    {experiences.map((exp, i) => (
                        <div key={i} className="journey-mobile-card relative pl-12">
                            <div className="absolute left-3 top-6 w-2.5 h-2.5 rounded-full bg-primary/40 border-2 border-primary" />

                            <div className="p-6 rounded-2xl glass-card border-primary/10 shadow-lg flex flex-col gap-3">
                                <span className="text-primary/70 font-mono text-xs tracking-widest font-bold">
                                    {exp.date}
                                </span>
                                <h4 className="text-sm font-bold">
                                    {exp.title}
                                </h4>
                                {exp.company && (
                                    <p className="text-xs text-muted-foreground">
                                        {exp.company}
                                    </p>
                                )}
                                <p className="text-xs text-muted-foreground line-clamp-3">
                                    {exp.description}
                                </p>
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

    useEffect(() => {
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

        return () => controller.abort();
    }, []);

    return (
        <>
            <ExperienceMobile experiences={experiences} />
            <ExperienceDesktop experiences={experiences} />
        </>
    );
}