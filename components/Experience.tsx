"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, MoveRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ExperienceCard from "./cards/ExperienceCard";
import { ExperienceData } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

// DESKTOP — horizontal scroll pinned section (md and above)
const ExperienceDesktop = ({ experiences }: { experiences: ExperienceData[] }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    useGSAP(
        () => {
            if (experiences.length === 0) return;

            const wrapper = wrapperRef.current;
            if (!wrapper) return;

            const totalScroll = wrapper.scrollWidth - window.innerWidth;
            const scrollDistance = totalScroll * 1.5;

            const scrollTween = gsap.to(wrapper, {
                x: () => -totalScroll,
                ease: "none",
            });

            ScrollTrigger.create({
                animation: scrollTween,
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${scrollDistance}`,
                scrub: 0.1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onEnter: () => {
                    gsap.to(wrapper, {
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        ease: "power2.out",
                    });
                },
                onLeaveBack: () => {
                    gsap.to(wrapper, {
                        scale: 0.9,
                        duration: 0.8,
                        ease: "power2.in",
                    });
                },
                onUpdate: (self) => {
                    if (self.progress > 0.05) {
                        gsap.to(wrapper, {
                            opacity: 1,
                            ease: "none",
                            duration: 0.1,
                        });
                    }
                },
            });
        },
        { scope: sectionRef, dependencies: [experiences] }
    );



    return (
        <section
            id="experience"
            ref={sectionRef}
            className="journey relative h-screen z-10 overflow-hidden flex items-center w-full md:flex"
        >
            {/* Label */}
            <div className="absolute top-16 inset-x-0 z-20">
                <div className="px-6 mx-auto max-w-6xl">
                    <div className="flex items-center gap-4 cursor-default">
                        <span className="text-foreground font-bold opacity-20 select-none tracking-tighter">
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
                className="journey-wrapper relative flex items-center h-full min-w-max px-8 md:px-[15vw] pr-[25vw]"
            >
                <div className="relative flex items-center gap-20">
                    {experiences.map((exp, i) => {
                        return (
                            <div
                                key={i}
                                className="shrink-0 h-full flex"
                            >
                                <div className="relative flex flex-col items-center">
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
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

// MOBILE — simple vertical timeline (below md)
const ExperienceMobile = ({ experiences }: { experiences: ExperienceData[] }) => {
    const sectionRef = useRef<HTMLElement>(null);


    useGSAP(
        () => {
            if (experiences.length === 0) return;

            gsap.utils
                .toArray<HTMLElement>(".journey-mobile-card")
                .forEach((card) => {
                    gsap.fromTo(
                        card,
                        { opacity: 0, y: 40 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.7,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 88%",
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
            className="journey relative z-10 w-full max-w-6xl mx-auto md:hidden py-24 px-6"
        >
            <div className="flex items-center gap-4 cursor-default mb-12">
                <span className="text-foreground font-bold opacity-20 select-none tracking-tighter">
                    <MoveRight />
                </span>
                <span className="section-label">
                    JOURNEY
                </span>
            </div>

            <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border/50" />

                <div className="flex flex-col gap-10">
                    {experiences.map((exp, i) => (
                        <div key={i} className="journey-mobile-card relative pl-12">
                            <div className="absolute left-2.75 top-6 w-2.5 h-2.5 rounded-full bg-primary/40 border-2 border-primary shadow-[0_0_8px_rgba(2,132,199,0.3)]" />

                            <div className="w-full p-6 rounded-2xl glass-card border-primary/10 shadow-lg flex flex-col gap-3">
                                <span className="text-primary/70 font-mono text-xs tracking-widest font-bold">
                                    {exp.date}
                                </span>
                                <h4 className="text-foreground text-sm font-bold tracking-tight">
                                    {exp.title}
                                </h4>
                                {exp.company && (
                                    <p className="text-xs text-muted-foreground font-medium">
                                        {exp.company}
                                    </p>
                                )}
                                <p className="text-muted-foreground text-xs leading-relaxed font-light line-clamp-3">
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

export default function Experience() {
    const [experiences, setExperiences] = useState<ExperienceData[]>([]);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await fetch("/api/experiences");
                const data = await response.json();
                setExperiences(data);
            } catch (error) {
                console.error("Error fetching experiences:", error);
            }
        };

        fetchExperiences();
    }, []);

    return (
        <>
            <ExperienceMobile experiences={experiences} />
            <ExperienceDesktop experiences={experiences} />
        </>
    );
}