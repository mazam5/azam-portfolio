"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ExperienceData } from "@/lib/types";
import { ReactNode } from "react";

interface ExperienceCardProps {
    ms: ExperienceData & { icon?: ReactNode };
    index: number;
}

export default function ExperienceCard({ ms, index }: ExperienceCardProps) {
    return (
        <div className="w-[260px] sm:w-[300px] md:w-80 p-5 sm:p-6 rounded-2xl glass-card border border-primary/10 group hover:border-primary/30 transition-all duration-500 flex flex-col">
            {/* Header row */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-primary/60 font-mono text-xs tracking-widest font-bold">
                    {ms.date}
                </span>
                {ms.icon && (
                    <div className="p-2 bg-primary/5 rounded-xl border border-primary/20 group-hover:bg-primary/10 transition-colors shrink-0">
                        <div className="text-primary">{ms.icon}</div>
                    </div>
                )}
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors leading-snug">
                {ms.title}
            </h3>

            {/* Company */}
            {ms.company && (
                <p className="text-xs text-muted-foreground mt-1 mb-3 font-medium">
                    {ms.company}
                </p>
            )}

            {/* Description */}
            {ms.description && (
                <p className="text-xs text-muted-foreground leading-relaxed font-light mb-4 opacity-80 line-clamp-3 flex-1">
                    {ms.description}
                </p>
            )}

            {/* Tech badges */}
            {ms.technologies && ms.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                    {ms.technologies.slice(0, 3).map((tech) => (
                        <Badge
                            key={tech}
                            variant="outline"
                            className="text-[10px] border-secondary bg-secondary/30 text-muted-foreground px-2 py-0"
                        >
                            {tech}
                        </Badge>
                    ))}
                    {ms.technologies.length > 3 && (
                        <span className="text-[10px] text-muted-foreground/60 self-center">
                            +{ms.technologies.length - 3}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
} 