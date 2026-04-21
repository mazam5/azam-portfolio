import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("portfolio");
        const projects = await db.collection("projects").find({}).toArray();
        const data = JSON.parse(JSON.stringify(projects));
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching experiences:", error);
        return NextResponse.error();
    }
}
