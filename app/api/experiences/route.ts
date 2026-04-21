import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

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
}
