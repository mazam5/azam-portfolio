import { personalInfo } from "@/data/portfolio";
import VisitorDisplay from "./analytics/VisitorDisplay";

export default function Footer() {
    return (
        <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <p className="text-xs text-muted-foreground/60 font-mono tracking-wider">
                        &copy; {new Date().getFullYear()} {personalInfo.name}.
                        CRAFTED WITH PRECISION.
                    </p>
                    <p className="text-[10px] text-muted-foreground/40 font-mono uppercase tracking-[0.2em]">
                        Built with Next.js, GSAP & shadcn/ui
                    </p>
                </div>

                <VisitorDisplay />
            </div>
        </footer>
    );
}
