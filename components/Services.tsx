"use client";

import { services } from "@/data/portfolio";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Globe,
    Smartphone,
    Server,
    Palette,
    Database,
    Cloud,
} from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
    globe: <Globe className="w-6 h-6" />,
    smartphone: <Smartphone className="w-6 h-6" />,
    server: <Server className="w-6 h-6" />,
    palette: <Palette className="w-6 h-6" />,
    database: <Database className="w-6 h-6" />,
    cloud: <Cloud className="w-6 h-6" />,
};

const accentColors = [
    "#00eaff",
    "#7b61ff",
    "#ff6b9d",
    "#00ff88",
    "#ffa600",
    "#00eaff",
];

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".service-card",
                { opacity: 0, y: 40, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".services-grid",
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    return (
        <section
            id="services"
            ref={sectionRef}
            className="relative py-24 md:py-32 px-6 z-10"
        >
            <div className="max-w-6xl mx-auto">
                {/* Section label */}
                <div className="flex items-center gap-4 mb-8">
                    <span className="section-label">What I Offer</span>
                    <div className="gradient-line flex-1" />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    Services &{" "}
                    <span className="text-primary">Expertise</span>
                </h2>
                <p className="text-muted-foreground text-base md:text-lg mb-16 max-w-2xl font-light">
                    End-to-end engineering solutions — from concept to
                    deployment, I handle the full spectrum.
                </p>

                <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((service, i) => {
                        const color = accentColors[i % accentColors.length];
                        return (
                            <div
                                key={i}
                                className="service-card glass-card rounded-2xl p-7 group relative overflow-hidden"
                            >
                                {/* Background glow */}
                                <div
                                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                                    style={{ backgroundColor: color }}
                                />

                                <div
                                    className="p-3 rounded-xl w-fit mb-5 transition-colors duration-300"
                                    style={{
                                        backgroundColor: `${color}15`,
                                        color: color,
                                    }}
                                >
                                    {iconMap[service.icon]}
                                </div>

                                <h3
                                    className="text-lg font-bold text-foreground tracking-tight mb-3 transition-colors duration-300"
                                    style={{
                                        color: "var(--foreground)",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = color)}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--foreground)")}
                                >
                                    {service.title}
                                </h3>

                                <p className="text-sm text-muted-foreground leading-relaxed mb-5 font-light line-clamp-3">
                                    {service.description}
                                </p>

                                <ul className="space-y-2">
                                    {service.features.map((feature, j) => (
                                        <li
                                            key={j}
                                            className="flex items-center gap-2 text-xs text-muted-foreground/80"
                                        >
                                            <span
                                                className="w-1 h-1 rounded-full shrink-0"
                                                style={{
                                                    backgroundColor: color,
                                                }}
                                            />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
