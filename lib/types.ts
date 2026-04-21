
export interface ExperienceData {
    date: string;
    title: string;
    type?: string;
    company?: string;
    description?: string;
    icon?: React.ReactNode;
    position: "top" | "bottom";
    technologies?: string[];
}

export interface CardData {
    index: string;
    title: string;
    video: string;
    accentColor: string;
    overlayColor: string;
}

export interface SkillData {
    name: string;
    icon: string;
    level: string; // "Basic" | "Intermediate" | "Advanced"
    category: "frontend" | "backend" | "mobile" | "devops" | "tools" | "database";
}

export interface EducationData {
    degree: string;
    institution: string;
    date: string;
    gpa?: string;
    description?: string;
    coursework?: string[];
}

export interface CertificationData {
    title: string;
    issuer: string;
    date: string;
    credentialUrl?: string;
    badge?: string;
}

export interface ServiceData {
    title: string;
    description: string;
    icon: string;
    features: string[];
}

export interface LanguageData {
    name: string;
    level: string;
    type: "spoken" | "programming";
    proficiency: number; // 0-100
    icon?: string;
}

export interface ProjectData {
    title: string;
    description: string;
    image?: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    category: "web" | "mobile" | "fullstack" | "other";
    featured?: boolean;
}

export interface SocialLink {
    name: string;
    url: string;
    icon: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}