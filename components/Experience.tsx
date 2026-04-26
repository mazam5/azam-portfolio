"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, MoveRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ExperienceCard from "./cards/ExperienceCard";
import { ExperienceData } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

/* ================= MAIN ================= */
export default function Experience() {
    const [experiences, setExperiences] = useState<ExperienceData[]>([]);
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
                        duration: 1,
                        ease: "power3.out",
                    });
                    gsap.fromTo(
                        ".experience-card-inner",
                        { opacity: 0, y: 40, filter: "blur(10px)" },
                        {
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                            duration: 0.8,
                            stagger: 0.15,
                            ease: "power3.out",
                            delay: 0.2,
                        }
                    );
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

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <section
            id="journey"
            ref={sectionRef}
            className="journey relative h-screen overflow-hidden flex items-center w-full"
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
                <div className="flex items-center gap-12 md:gap-20">
                    {experiences.map((exp, i) => (
                        <div key={i} className="experience-card-inner shrink-0 h-full flex">
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
}