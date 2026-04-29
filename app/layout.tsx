import SmoothScroll from "@/components/layout/SmoothScroll";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { Geist_Mono, Inter, Outfit } from "next/font/google";
import "./globals.css";
import VisitorTracker from "@/components/analytics/VisitorTracker";
import { Cursor } from "@/components/layout/Cursor";

const inter = Inter({
    variable: "--font-sans",
    subsets: ["latin"],
    display: "swap",
});

const outfit = Outfit({
    variable: "--font-heading",
    subsets: ["latin"],
    display: "swap",
});

const geistMono = Geist_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Mohammed Azam | Software Engineer",
    description:
        "Full-stack software engineer specializing in React, Next.js, Flutter, and scalable web applications. Building digital solutions that solve real-world problems.",
    keywords: [
        "Mohammed Azam",
        "Software Engineer",
        "Full Stack Developer",
        "React",
        "Next.js",
        "Flutter",
        "Web Developer",
        "Portfolio",
    ],
    authors: [{ name: "Mohammed Azam" }],
    openGraph: {
        title: "Mohammed Azam | Software Engineer",
        description:
            "Full-stack software engineer building digital solutions that solve real-world problems.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${outfit.variable} ${geistMono.variable}`}
            suppressHydrationWarning
        >
            <body className="antialiased bg-background text-foreground">
                <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
                    <SmoothScroll>
                        <TooltipProvider delayDuration={200}>
                            <VisitorTracker />
                            <Cursor />
                            {children}
                        </TooltipProvider>
                    </SmoothScroll>
                </ThemeProvider>
            </body>
        </html>
    );
}
