import { NextResponse } from "next/server";
import { experiences } from "@/data/portfolio";

export const revalidate = 3600; // revalidate every hour

export async function GET() {
    // Returns experiences with current company detection
    const data = experiences.map((exp) => ({
        ...exp,
        isCurrent: exp.date.includes("Present"),
        icon: undefined, // strip React nodes for JSON serialization
    }));

    return NextResponse.json({
        experiences: data,
        currentRole: data.find((e) => e.isCurrent) || null,
    });
}
