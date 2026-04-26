"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { ExperienceData } from "@/lib/types";

export default function ExperienceCard({ ms, index }: { ms: ExperienceData; index: number }) {
    const isTop = ms.position === "top" || index % 2 === 0;

    return (
        <div
            className={cn(
                "relative flex flex-col items-center",
                isTop ? "justify-end pb-12" : "justify-start pt-12"
            )}
        >

            {/* Card Content */}
            <div
                className={cn(
                    "w-[280px] sm:w-80 p-5 sm:p-6 rounded-2xl glass-card border border-primary/10 group hover:border-primary/30 transition-all duration-500",
                )}
            >
                <div className="flex items-center justify-between mb-4">
                    <span className="text-primary/60 font-mono text-xs tracking-widest font-bold">
                        {ms.date}
                    </span>
                    {ms.icon && (
                        <div className="p-2 bg-primary/5 rounded-xl border border-primary/20 group-hover:bg-primary/10 transition-colors">
                            <div className="text-primary">
                                {ms.icon}
                            </div>
                        </div>
                    )}
                </div>

                <h3 className="text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                    {ms.title}
                </h3>
                {ms.company && (
                    <p className="text-xs text-muted-foreground mt-1 mb-3">{ms.company}</p>
                )}
                {ms.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed font-light mb-4 opacity-80 line-clamp-3">
                        {ms.description}
                    </p>
                )}

                {ms.technologies && (
                    <div className="flex flex-wrap gap-1.5 mt-auto">
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
                            <span className="text-[10px] text-muted-foreground/60">+{ms.technologies.length - 3}</span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
