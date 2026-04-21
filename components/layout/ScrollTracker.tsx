"use client";

import { sections } from "@/data/portfolio";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function ScrollTracker() {
    const [activeSection, setActiveSection] = useState("hero");
    const [scrollProgress, setScrollProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? scrollTop / docHeight : 0;
            setScrollProgress(progress);
        };

        // IntersectionObserver for section detection
        const observers: IntersectionObserver[] = [];

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(section.id);
                    }
                },
                { threshold: 0, rootMargin: "-45% 0px -45% 0px" }
            );

            observer.observe(el);
            observers.push(observer);
        });

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observers.forEach((o) => o.disconnect());
        };
    }, []);

    useGSAP(
        () => {
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.8, delay: 2, ease: "power3.out" }
            );
        },
        { scope: containerRef }
    );

    const handleSectionClick = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div
            ref={containerRef}
            className="fixed left-6 top-1/2 -translate-y-1/2 z-100 hidden lg:flex items-center gap-4 opacity-0"
        >
            {/* Progress bar */}
            <div className="relative h-48 w-0.5 bg-foreground/10 rounded-full overflow-hidden">
                <div
                    ref={progressRef}
                    className="absolute top-0 left-0 w-full bg-linear-to-b from-primary to-yellow-500 rounded-full transition-all duration-150 ease-out"
                    style={{ height: `${scrollProgress * 100}%` }}
                />
                {/* Glowing dot at current position */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.6)] transition-all duration-150 ease-out"
                    style={{ top: `calc(${scrollProgress * 100}% - 4px)` }}
                />
            </div>

            {/* Section labels */}
            <div className="flex flex-col gap-1">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => handleSectionClick(section.id)}
                        className={`text-[12px] font-mono tracking-wider uppercase text-left px-2 py-1 rounded transition-all duration-300 ${activeSection === section.id
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground/90 dark:text-muted-foreground/60 hover:text-foreground"
                            }`}
                    >
                        {section.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
