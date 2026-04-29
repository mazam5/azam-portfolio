"use client";

import { useEffect, useRef } from "react";
import { incrementVisitorCount } from "@/lib/actions";

export default function VisitorTracker() {
    const hasIncremented = useRef(false);

    useEffect(() => {
        if (!hasIncremented.current) {
            incrementVisitorCount();
            hasIncremented.current = true;
        }
    }, []);

    return null;
}
