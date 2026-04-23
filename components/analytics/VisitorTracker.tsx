"use client";

import { useEffect, useRef } from "react";
import { incrementVisitorCount } from "@/lib/actions";

export default function VisitorTracker() {
    const hasIncremented = useRef(false);

    useEffect(() => {
        // Prevent double increment in development due to Strict Mode
        if (!hasIncremented.current) {
            incrementVisitorCount();
            hasIncremented.current = true;
        }
    }, []);

    return null; // This component doesn't render anything
}
