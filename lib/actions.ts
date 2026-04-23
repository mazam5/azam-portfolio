"use server";

import clientPromise from "./mongodb";

export async function incrementVisitorCount() {
    try {
        const client = await clientPromise;
        const db = client.db("portfolio"); // Using a database named "portfolio"
        const collection = db.collection("site_stats");

        // We use a single document with id "visitors" to track total count
        await collection.updateOne(
            { _id: "visitors" as any },
            { $inc: { count: 1 } },
            { upsert: true }
        );
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
        console.error("Failed to fetch visitor count:", error);
        return 0;
    }
}
