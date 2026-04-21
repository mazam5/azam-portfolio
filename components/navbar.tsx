"use client";

import { navLinks } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrollState, setScrollState] = useState<"top" | "floating" | "hidden">("top");
    const [activeSection, setActiveSection] = useState("");
    const menuRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const heroHeight = document.getElementById("hero")?.offsetHeight || 800;

            if (scrollY < 100) {
                setScrollState("top");
            } else if (scrollY > 100 && scrollY < heroHeight - 100) {
                setScrollState("hidden");
            } else {
                setScrollState("floating");
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        const observers: IntersectionObserver[] = [];
        navLinks.forEach((link) => {
            const id = link.href.replace("#", "");
            const el = document.getElementById(id);
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveSection(link.href);
                },
                { threshold: 0, rootMargin: "-45% 0px -45% 0px" }
            );
            observer.observe(el);
            observers.push(observer);
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observers.forEach((o) => o.disconnect());
        };
    }, []);

    useGSAP(() => {
        if (isMobileMenuOpen) {
            gsap.to(menuRef.current, { x: 0, duration: 0.6, ease: "power3.out" });
            gsap.fromTo(".mobile-link", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.06, delay: 0.2, duration: 0.4 });
        } else {
            gsap.to(menuRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
        }
    }, [isMobileMenuOpen]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (!href.startsWith("#")) return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (!target) return;
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);

        gsap.to(window, {
            duration: 1,
            scrollTo: { y: target, offsetY: 80 },
            ease: "power3.inOut",
        });
    };

    return (
        <nav
            ref={navRef}
            className={cn(
                "fixed left-0 right-0 z-100 transition-all duration-500 ease-in-out",
                scrollState === "top"
                    ? "top-0 py-6 bg-transparent"
                    : scrollState === "hidden"
                        ? "-top-20 opacity-0"
                        : "top-4 py-2 mx-auto max-w-fit px-2 glass-pill shadow-xl"
            )}
        >
            <div className={cn(
                "flex items-center justify-between",
                scrollState === "floating" ? "gap-8" : "container mx-auto px-6"
            )}>
                {/* Logo */}
                <a
                    href="#hero"
                    onClick={(e) => handleNavClick(e, "#hero")}
                    className={cn(
                        "text-lg font-bold tracking-tighter group transition-all duration-300",
                        scrollState === "floating" && "hidden"
                    )}
                >
                    <span className="text-primary group-hover:glow-text">M</span>
                    <span className="text-muted-foreground group-hover:text-foreground">.Azam</span>
                </a>

                <div className="flex">

                    {/* Nav Links */}
                    <div className="flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={cn(
                                    "relative text-xs font-medium px-4 py-2 rounded-full transition-all duration-300",
                                    activeSection === link.href
                                        ? "text-primary bg-primary/10"
                                        : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
                                    scrollState !== "floating" && !["About", "Projects", "Contact"].includes(link.name) && "hidden md:inline-block"
                                )}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Toggle - Only at top */}
                    {scrollState === "top" && (
                        <button
                            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    )}
                    <ThemeToggle />
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                ref={menuRef}
                className="fixed inset-0 top-0 z-110 md:hidden translate-x-full bg-background/95 backdrop-blur-3xl"
            >
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={cn(
                                "mobile-link text-2xl font-bold tracking-tight transition-colors",
                                activeSection === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute top-8 right-8 p-2 text-zinc-400"
                >
                    <X className="w-8 h-8" />
                </button>
            </div>
        </nav>
    );
}