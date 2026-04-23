import { getVisitorCount } from "@/lib/actions";
import { Users } from "lucide-react";

export default async function VisitorDisplay() {
    const count = await getVisitorCount();

    return (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 backdrop-blur-sm border border-border/50 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300">
            <Users className="w-4 h-4 text-primary" />
            <span>
                <span className="text-foreground font-bold">{count.toLocaleString()}</span> visitors
            </span>
        </div>
    );
}
