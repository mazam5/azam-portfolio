"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, MoveRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ExperienceCard from "./cards/ExperienceCard";
import { ExperienceData } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
    const [experiences, setExperiences] = useState<ExperienceData[]>([]);
    const sectionRef = useRef<HTMLElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const hasAnimatedIn = useRef(false);

    useGSAP(
        () => {
            if (!experiences.length) return;

            const section = sectionRef.current;
            const wrapper = wrapperRef.current;
            if (!section || !wrapper) return;

            const getScrollAmount = () => {
                const leftPad = wrapper.getBoundingClientRect().left;
                return Math.max(0, wrapper.scrollWidth - window.innerWidth + leftPad);
            };

            gsap.set(wrapper, { opacity: 0, y: 50, x: 0 });
            hasAnimatedIn.current = false;

            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                const tween = gsap.to(wrapper, {
                    x: () => -getScrollAmount(),
                    ease: "none",
                    paused: true,
                });

                ScrollTrigger.create({
                    id: "experience-horizontal-scroll",
                    animation: tween,
                    trigger: section,
                    start: "top top",
                    end: () =>
                        `+=${Math.max(
                            window.innerHeight,
                            getScrollAmount() + window.innerHeight * 0.5
                        )}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,

                    onEnter: () => {
                        if (hasAnimatedIn.current) return;
                        hasAnimatedIn.current = true;

                        gsap.to(wrapper, {
                            opacity: 1,
                            y: 0,
                            duration: 0.9,
                            ease: "power3.out",
                            overwrite: "auto",
                        });
                        gsap.fromTo(
                            ".experience-card-inner",
                            { opacity: 0, y: 80, scale: 0.85, filter: "blur(14px)" },
                            {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                filter: "blur(0px)",
                                duration: 1,
                                stagger: 0.15,
                                ease: "power4.out",
                                delay: 0.15,
                                overwrite: "auto",
                            }
                        );
                    },

                    onLeaveBack: () => {
                        hasAnimatedIn.current = false;
                        gsap.to(wrapper, {
                            opacity: 0,
                            y: 50,
                            duration: 0.5,
                            ease: "power2.in",
                            overwrite: "auto",
                        });
                    },
                });
            });

            mm.add("(max-width: 767px)", () => {
                ScrollTrigger.create({
                    id: "experience-fade-in",
                    trigger: section,
                    start: "top 80%",
                    onEnter: () => {
                        if (hasAnimatedIn.current) return;
                        hasAnimatedIn.current = true;

                        gsap.to(wrapper, {
                            opacity: 1,
                            y: 0,
                            duration: 0.9,
                            ease: "power3.out",
                            overwrite: "auto",
                        });
                        gsap.fromTo(
                            ".experience-card-inner",
                            { opacity: 0, y: 80, scale: 0.85, filter: "blur(14px)" },
                            {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                filter: "blur(0px)",
                                duration: 1,
                                stagger: 0.15,
                                ease: "power4.out",
                                delay: 0.15,
                                overwrite: "auto",
                            }
                        );
                    },
                    onLeaveBack: () => {
                        hasAnimatedIn.current = false;
                        gsap.to(wrapper, {
                            opacity: 0,
                            y: 50,
                            duration: 0.5,
                            ease: "power2.in",
                            overwrite: "auto",
                        });
                    },
                });
            });
        },
        { scope: sectionRef, dependencies: [experiences] }
    );

    useEffect(() => {
        const controller = new AbortController();

        const fetchExperiences = async () => {
            try {
                const res = await fetch("/api/experiences", {
                    signal: controller.signal,
                });
                const data = await res.json();
                setExperiences(data);
            } catch (err: unknown) {
                if (err instanceof Error && err.name !== "AbortError") {
                    console.error("Fetch error:", err);
                }
            }
        };

        fetchExperiences();

        return () => controller.abort();
    }, []);

    return (
        <section
            id="journey"
            ref={sectionRef}
            className="journey relative min-h-screen md:h-screen md:overflow-hidden flex items-center w-full py-32 md:py-0"
        >
            <div className="absolute top-16 inset-x-0 z-30 pointer-events-none">
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
                className="relative flex flex-col md:flex-row items-center h-full w-full md:w-auto md:min-w-max mt-12 md:mt-0"
                style={{
                    paddingLeft: "clamp(24px, 8vw, 180px)",
                    paddingRight: "clamp(24px, 18vw, 280px)",
                }}
            >
                <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 w-full">
                    {experiences.map((exp, i) => (
                        <div key={i} className="experience-card-inner shrink-0 flex w-full md:w-auto">
                            <ExperienceCard
                                ms={{
                                    date: exp.date,
                                    title: exp.title,
                                    company: exp.company,
                                    description: exp.description,
                                    technologies: exp.technologies,
                                    icon: <Briefcase className="w-5 h-5" />,
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}