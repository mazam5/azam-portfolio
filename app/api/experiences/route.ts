import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
// import { experiences } from "@/data/portfolio";

export const revalidate = 3600; // revalidate every hour

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("portfolio");
        const experiences = await db.collection("experiences").find({}).toArray();
        const data = JSON.parse(JSON.stringify(experiences));
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching experiences:", error);
        return NextResponse.error();
    }
    // Returns experiences with current company detection
    // const data = experiences.map((exp) => ({
    //     ...exp,
    //     isCurrent: exp.date.includes("Present"),
    //     icon: undefined, // strip React nodes for JSON serialization
    // }));

    // return NextResponse.json({
    //     experiences: data,
    //     currentRole: data.find((e) => e.isCurrent) || null,
    // });
}
