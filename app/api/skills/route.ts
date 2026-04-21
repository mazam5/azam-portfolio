import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("portfolio");
        const skills = await db.collection("skills").find({}).toArray();
        const data = JSON.parse(JSON.stringify(skills));
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching experiences:", error);
        return NextResponse.error();
    }
}
