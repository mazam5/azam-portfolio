"use client";

import About from "./About";
// import Certifications from "./Certifications";
import Contact from "./Contact";
import Education from "./Education";
import Experience from "./Experience";
import Hero from "./Hero";
// import Languages from "./Languages";
import FloatingSocials from "./layout/FloatingSocials";
import ScrollTracker from "./layout/ScrollTracker";
import Navbar from "./navbar";
import Projects from "./Projects";
import Services from "./Services";
import Skills from "./Skills";

export default function Portfolio() {
    return (
        <div id="main-container" className="main-container relative min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
            {/* Fixed layout elements */}
            <Navbar />
            <FloatingSocials />
            <ScrollTracker />

            {/* Sections */}
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Education />
            <Projects />
            <Services />
            <Contact />
        </div>
    );
}