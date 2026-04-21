import {
    EducationData,
    ServiceData,
    SocialLink
} from "@/lib/types";

// ─── Personal Info ──────────────────────────────────────────────────────────
export const personalInfo = {
    name: "Mohammed Azam",
    title: "Software Engineer",
    tagline: "Building digital solutions that solve real-world problems",
    email: "lG3oO@example.com", // displayed in form, actual send via env
    location: "India",
    resumeUrl: "/resume.pdf",
    avatarUrl: "/avatar.jpg",
    bio: [
        "I'm a passionate Software Engineer who thrives on turning complex problems into elegant solutions. I have hands-on experience across the full stack — from crafting pixel-perfect UIs to architecting backend systems.",
        "My approach combines technical curiosity with a focus on building products that matter. I don't just write code; I build experiences that deliver impact.",
    ],
    stats: {
        projectsCompleted: 10,
        technologiesUsed: 20,
        companiesWorked: 4,
    },
};

// ─── Social Links ───────────────────────────────────────────────────────────
export const socialLinks: SocialLink[] = [
    {
        name: "GitHub",
        url: "https://github.com/mazam5",
        icon: "github",
    },
    {
        name: "LinkedIn",
        url: "https://linkedin.com/in/azam5",
        icon: "linkedin",
    },
    {
        name: "Email",
        url: "#contact",
        icon: "mail",
    },
];

// ─── Navigation ──────────────────────────────────────────────────────────────
export const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
];

// ─── Education ───────────────────────────────────────────────────────────────
export const education: EducationData[] = [
    {
        degree: "Bachelor of Technology in Computer Science",
        institution: "Jawaharlal Nehru Technological University",
        date: "2024",
        // gpa: "/10",
        description:
            "Specialized in software engineering and web technologies. Active participant in hackathons and coding competitions.",
        coursework: [
            "Data Structures & Algorithms",
            "Database Management Systems",
            "Operating Systems",
            "Computer Networks",
            "Software Engineering",
            "Object-Oriented Programming",
            "Web Technologies",
        ],
    },
];

// ─── Services ────────────────────────────────────────────────────────────────
export const services: ServiceData[] = [
    {
        title: "Web Development",
        description: "Building performant, scalable web applications with modern frameworks and best practices.",
        icon: "globe",
        features: ["React / Next.js", "Server-Side Rendering", "Progressive Web Apps", "SEO Optimization"],
    },
    {
        title: "Mobile Development",
        description: "Creating cross-platform mobile experiences that feel native and perform flawlessly.",
        icon: "smartphone",
        features: ["Flutter", "React Native", "iOS & Android", "App Store Deployment"],
    },
    {
        title: "API Architecture",
        description: "Designing robust, secure APIs that power your applications at scale.",
        icon: "server",
        features: ["RESTful APIs", "GraphQL", "Microservices", "Authentication & Security"],
    },
    {
        title: "UI/UX Engineering",
        description: "Translating designs into pixel-perfect, accessible, and animated interfaces.",
        icon: "palette",
        features: ["Design Systems", "Responsive Design", "Animations (GSAP)", "Accessibility (a11y)"],
    },
    {
        title: "Database Design",
        description: "Architecting efficient data models and optimizing query performance.",
        icon: "database",
        features: ["SQL & NoSQL", "Schema Design", "Query Optimization", "Data Migration"],
    },
];


// ─── Section metadata ────────────────────────────────────────────────────────
export const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
];
