"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function ScrollButtons() {
    const [visible, setVisible] = useState(false);
    const [atBottom, setAtBottom] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

            setVisible(scrollY > 80);
            setAtBottom(scrollY >= maxScroll - 40);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (target: "top" | "bottom") => {
        gsap.to(window, {
            scrollTo: target === "top" ? 0 : document.documentElement.scrollHeight,
            duration: 1.2,
            ease: "power3.inOut",
        });
    };

    return (
        <div
            className="fixed bottom-8 right-6 z-50 flex flex-col gap-2 transition-all duration-500"
            style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
        >
            <button
                onClick={() => scrollTo("top")}
                aria-label="Scroll to top"
                className="
                    group relative flex items-center justify-center
                    w-10 h-10 rounded-xl
                    border border-primary/20
                    bg-background/70 backdrop-blur-md
                    hover:border-primary/50 hover:bg-primary/10
                    transition-all duration-300
                    shadow-lg shadow-black/10
                "
            >
                <ChevronUp
                    className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors duration-300 group-hover:-translate-y-0.5 transform"
                />
                <span className="
                    absolute right-12 px-2 py-1 rounded-md
                    text-[10px] font-mono tracking-widest uppercase
                    bg-background/90 border border-primary/10 text-primary/60
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-200
                    whitespace-nowrap pointer-events-none
                ">
                    Top
                </span>
            </button>

            <button
                onClick={() => scrollTo("bottom")}
                aria-label="Scroll to bottom"
                className="
                    group relative flex items-center justify-center
                    w-10 h-10 rounded-xl
                    border border-primary/20
                    bg-background/70 backdrop-blur-md
                    hover:border-primary/50 hover:bg-primary/10
                    transition-all duration-300
                    shadow-lg shadow-black/10
                    disabled:opacity-30 disabled:cursor-not-allowed
                "
                disabled={atBottom}
            >
                <ChevronDown
                    className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors duration-300 group-hover:translate-y-0.5 transform"
                />
                <span className="
                    absolute right-12 px-2 py-1 rounded-md
                    text-[10px] font-mono tracking-widest uppercase
                    bg-background/90 border border-primary/10 text-primary/60
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-200
                    whitespace-nowrap pointer-events-none
                ">
                    Bottom
                </span>
            </button>
        </div>
    );
}