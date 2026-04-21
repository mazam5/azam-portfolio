import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        // Validate
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }

        // Send email via nodemailer
        // Configure SMTP in .env.local:
        //   SMTP_HOST=smtp.gmail.com
        //   SMTP_PORT=587
        //   SMTP_USER=your@gmail.com
        //   SMTP_PASS=your-app-password
        //   CONTACT_EMAIL=your@gmail.com

        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = Number(process.env.SMTP_PORT || 587);
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        const contactEmail = process.env.CONTACT_EMAIL;

        if (!smtpHost || !smtpUser || !smtpPass || !contactEmail) {
            // If SMTP not configured, log and return success (dev mode)
            console.log("📧 Contact form submission (SMTP not configured):");
            console.log({ name, email, subject, message });
            return NextResponse.json({
                success: true,
                message: "Message received! I'll get back to you soon.",
            });
        }

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });

        await transporter.sendMail({
            from: `"Portfolio Contact" <${smtpUser}>`,
            to: contactEmail,
            replyTo: email,
            subject: `[Portfolio] ${subject}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #00eaff;">New Contact Form Submission</h2>
                    <hr style="border: 1px solid #1a1a2e;" />
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <h3>Message:</h3>
                    <p style="white-space: pre-wrap; background: #0a0a1a; padding: 16px; border-radius: 8px; color: #e0e0e0;">${message}</p>
                    <hr style="border: 1px solid #1a1a2e;" />
                    <p style="color: #666; font-size: 12px;">Sent from your portfolio contact form</p>
                </div>
            `,
        });

        return NextResponse.json({
            success: true,
            message: "Message sent successfully! I'll get back to you soon.",
        });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Failed to send message. Please try again later." },
            { status: 500 }
        );
    }
}
