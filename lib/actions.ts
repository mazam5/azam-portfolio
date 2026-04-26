"use server";

import clientPromise from "./mongodb";
import { revalidatePath } from "next/cache";

export async function incrementVisitorCount() {
    try {
        console.log("Incrementing visitor count...");
        const client = await clientPromise;
        const db = client.db("portfolio");
        const collection = db.collection("site_stats");

        await collection.updateOne(
            { _id: "visitors" as any },
            { $inc: { count: 1 } },
            { upsert: true }
        );
        revalidatePath("/");
    } catch (error) {
        console.error("Failed to increment visitor count:", error);
    }
}

export async function getVisitorCount() {
    try {
        const client = await clientPromise;
        const db = client.db("portfolio");
        const collection = db.collection("site_stats");

        const result = await collection.findOne({ _id: "visitors" as any });
        return result?.count || 0;
    } catch (error) {
        console.error("Failed to fetch visitor count from database:", error);
        return 0;
    }
}
