"use client";

import { Badge } from "@/components/ui/badge";
import { ExperienceData } from "@/lib/types";
import { ReactNode } from "react";

interface ExperienceCardProps {
    ms: ExperienceData & { icon?: ReactNode };
}

export default function ExperienceCard({ ms }: ExperienceCardProps) {
    const MAX_BADGES = 4;
    const visibleTechs = ms.technologies?.slice(0, MAX_BADGES) ?? [];
    const overflow = (ms.technologies?.length ?? 0) - MAX_BADGES;

    return (
        <div
            className="
                w-[260px] sm:w-[300px] md:w-[320px] lg:w-[340px] xl:w-[360px]
                h-[260px] sm:h-[280px] md:h-[300px]
                p-5 sm:p-6
                rounded-2xl
                glass-card
                border border-primary/10
                group
                hover:border-primary/30
                transition-all duration-500
                flex flex-col
                bg-background/60 backdrop-blur-md
                supports-[not(backdrop-filter:blur(0))]:bg-background/90
            "
        >
            <div className="flex items-center justify-between mb-3 gap-2 shrink-0">
                <span className="text-primary/60 font-mono text-xs tracking-widest font-bold leading-tight min-w-0 truncate">
                    {ms.date}
                </span>
                {ms.icon && (
                    <div className="shrink-0 p-2 bg-primary/5 rounded-xl border border-primary/20 group-hover:bg-primary/10 transition-colors">
                        <div className="text-primary">{ms.icon}</div>
                    </div>
                )}
            </div>

            <h3 className="shrink-0 text-base sm:text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors leading-snug line-clamp-2">
                {ms.title}
            </h3>

            {ms.company && (
                <p className="shrink-0 text-xs text-muted-foreground mt-1 mb-2 font-medium truncate">
                    {ms.company}
                </p>
            )}

            {ms.description && (
                <p className="
                    text-xs text-muted-foreground leading-relaxed font-light
                    opacity-80
                    flex-1 overflow-hidden
                    line-clamp-4
                    mt-1
                ">
                    {ms.description}
                </p>
            )}

            {visibleTechs.length > 0 && (
                <div className="flex flex-wrap gap-1.5 shrink-0 pt-3 mt-auto">
                    {visibleTechs.map((tech) => (
                        <Badge
                            key={tech}
                            variant="outline"
                            className="
                                text-[10px]
                                border-secondary bg-secondary/30 text-muted-foreground
                                px-2 py-0
                                whitespace-nowrap
                            "
                        >
                            {tech}
                        </Badge>
                    ))}
                    {overflow > 0 && (
                        <span className="text-[10px] text-muted-foreground/60 self-center">
                            +{overflow}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}