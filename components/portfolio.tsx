import About from "./About"
import Contact from "./Contact"
import Experience from "./Experience"
import Hero from "./Hero"
import Projects from "./Projects"
import Skills from "./Skills"
import Testimonial from "./Testimonial"
import { ThemeToggle } from "./theme-toggle"

const Portfolio = () => {
    return (
        <div>
            <div className="flex justify-between">
                <ThemeToggle />
            </div>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Testimonial />
            <Contact />
        </div>
    )
}

export default Portfolio