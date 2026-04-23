import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    subject: z.string().min(3, "Subject must be at least 3 characters"),
    phone: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        // Validate with Zod
        const validation = contactSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.issues[0].message },
                { status: 400 }
            );
        }

        const { name, email, subject, phone, message } = validation.data;

        const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
        const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
        const sheetId = process.env.GOOGLE_SHEET_ID;

        if (!clientEmail || !privateKey || !sheetId) {
            console.error("❌ Missing Google Sheets configuration in .env");
            return NextResponse.json(
                { error: "Server configuration error. Missing API credentials." },
                { status: 500 }
            );
        }

        try {
            const auth = new google.auth.JWT({
                email: clientEmail,
                key: privateKey,
                scopes: ["https://www.googleapis.com/auth/spreadsheets"],
            });

            const sheets = google.sheets({ version: "v4", auth });

            const timestamp = new Date().toLocaleString("en-US", {
                timeZone: "Asia/Kolkata",
                dateStyle: "medium",
                timeStyle: "short"
            });

            await sheets.spreadsheets.values.append({
                spreadsheetId: sheetId,
                range: "Sheet1!A:F", // Updated range to include phone
                valueInputOption: "USER_ENTERED",
                requestBody: {
                    values: [[timestamp, name, email, phone || "N/A", subject, message]],
                },
            });

            console.log("✅ Successfully saved to Google Sheets via direct API");
        } catch (err) {
            console.error("❌ Google Sheets API Error:", err);
            return NextResponse.json(
                { error: "Failed to save message to Google Sheets." },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Message sent successfully! It has been saved to our database.",
        });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
}
