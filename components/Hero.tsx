"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import InteractiveBackground from "./InteractiveBackground";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data/portfolio";

const roles = [
    { word1: "Software", word2: "Engineer" },
    { word1: "Full-Stack", word2: "Developer" },
    { word1: "Problem", word2: "Solver" },
    { word1: "Web", word2: "Developer" },
    { word1: "Mobile", word2: "Developer" },
    { word1: "Frontend", word2: "Developer" },
];

function HeroPhrases() {
    const [index, setIndex] = useState(0);
    const word1Ref = useRef<HTMLSpanElement>(null);
    const word2Ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const animateWords = () => {
            const tl = gsap.timeline();
            tl.fromTo(
                word1Ref.current,
                { opacity: 0, y: 15, filter: "blur(8px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5 }
            ).fromTo(
                word2Ref.current,
                { opacity: 0, y: 15, filter: "blur(8px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5 },
                "+=0.2"
            );
        };
        animateWords();

        const interval = setInterval(() => {
            gsap.to([word1Ref.current, word2Ref.current], {
                opacity: 0,
                y: -10,
                duration: 0.4,
                onComplete: () => {
                    setIndex((prev) => (prev + 1) % roles.length);
                },
            });
        }, 3500);

        return () => clearInterval(interval);
    }, [index]);

    return (
        <span className="flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-10">
            <span
                ref={word1Ref}
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tighter font-light text-foreground/60"
            >
                {roles[index].word1}
            </span>
            <span
                ref={word2Ref}
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground"
            >
                {roles[index].word2}
            </span>
        </span>
    );
}

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".hero-element",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: "power3.out",
                }
            );
        },
        { scope: containerRef }
    );

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative min-h-svh flex flex-col justify-center items-center text-center px-4 z-10 overflow-hidden"
        >
            <InteractiveBackground className="absolute inset-0 z-0 bg-background" />

            {/* Ambient glow */}
            <div className="absolute top-1/4 left-1/4 w-75 md:w-150 h-75 md:h-150 bg-[#00eaff]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-62.5 md:w-125 h-62.5 md:h-125 bg-[#7b61ff]/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Open to work badge */}
            <div className="hero-element relative z-10 mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/40 dark:border-emerald-400/30 bg-emerald-500/15 dark:bg-emerald-400/10 backdrop-blur-md text-emerald-800 dark:text-emerald-300 text-sm font-medium animate-pulse shadow-2xl">
                    <Sparkles className="w-4 h-4" />
                    <span>Open to Opportunities</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                </div>
            </div>

            {/* Name */}
            <h1 className="hero-element text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-none font-medium tracking-tighter mb-4 md:mb-6 max-w-5xl relative z-10 text-muted-foreground">
                I am{" "}
                <span className="text-foreground font-bold">
                    {personalInfo.name}
                </span>
            </h1>

            {/* Animated roles */}
            <div className="hero-element mb-8 md:mb-10 relative z-10">
                <HeroPhrases />
            </div>

            {/* Tagline */}
            <p className="hero-element text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 relative z-10 font-light">
                {personalInfo.tagline}
            </p>

            {/* CTA buttons */}
            <div className="hero-element flex flex-wrap justify-center gap-4 relative z-10">
                <a href="#projects">
                    <Button className="rounded-full px-8 py-6 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
                        View My Work{" "}
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </a>
                <a href="#contact">
                    <Button
                        variant="outline"
                        className="rounded-full px-8 py-6 text-base font-semibold border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 hover:bg-foreground/5 transition-all duration-300"
                    >
                        Get in Touch
                    </Button>
                </a>
            </div>

            {/* Scroll indicator */}
            <div className="hero-element absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
                <span className="text-xs font-mono tracking-widest uppercase opacity-60 text-muted-foreground dark:text-muted-foreground">
                    Scroll
                </span>
                <div className="w-5 h-8 rounded-full border border-foreground/20 dark:border-primary/20 flex items-start justify-center p-1">
                    <div className="w-1 h-2 rounded-full bg-primary animate-bounce shadow-lg shadow-primary/40" />
                </div>
            </div>
        </section>
    );
}