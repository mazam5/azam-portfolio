"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { personalInfo } from "@/data/portfolio";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const [formState, setFormState] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        phone: "",
        message: "",
    });

    useGSAP(
        () => {
            gsap.fromTo(
                ".contact-element",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState("loading");
        setErrorMessage("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setFormState("success");
            setFormData({ name: "", email: "", subject: "", phone: "", message: "" });

            setTimeout(() => setFormState("idle"), 5000);
        } catch (err) {
            setFormState("error");
            setErrorMessage(
                err instanceof Error ? err.message : "Failed to send message"
            );
            setTimeout(() => setFormState("idle"), 5000);
        }
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative py-24 md:py-32 px-6 z-10"
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 bg-primary/5 rounded-full blur-[200px] pointer-events-none" />

            <div className="max-w-6xl mx-auto">
                <div className="contact-element flex items-center gap-4 mb-8">
                    <span className="section-label">Get in Touch</span>
                    <div className="gradient-line flex-1" />
                </div>

                <div className="grid lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="contact-element text-3xl md:text-5xl font-heading font-bold tracking-tight mb-6">
                            Let&rsquo;s Build
                            <br />
                            <span className="text-primary text-shimmer">
                                Something Great
                            </span>
                        </h2>

                        <p className="contact-element text-muted-foreground text-base md:text-lg mb-10 font-light leading-relaxed">
                            Have a project in mind? Want to collaborate? Or
                            just want to say hi? Fill out the form and
                            I&rsquo;ll get back to you as soon as possible.
                        </p>

                        <div className="contact-element space-y-6">


                            {/* Location */}
                            <div className="flex items-center gap-3 text-muted-foreground/60">
                                <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                                <span className="text-sm">
                                    Based in {personalInfo.location} — Available worldwide
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="contact-element">
                        <form
                            onSubmit={handleSubmit}
                            className="glass-card rounded-2xl p-8 space-y-5 shadow-2xl"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-mono text-muted-foreground tracking-wider uppercase block mb-2">
                                        Name
                                    </label>
                                    <Input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        placeholder="Your name"
                                        className="bg-secondary/50 border-input text-foreground placeholder:text-muted-foreground focus:border-primary/30 focus:ring-primary/10 rounded-xl"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-mono text-muted-foreground tracking-wider uppercase block mb-2">
                                        Email
                                    </label>
                                    <Input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        placeholder="your@email.com"
                                        className="bg-secondary/50 border-input text-foreground placeholder:text-muted-foreground focus:border-primary/30 focus:ring-primary/10 rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-mono text-muted-foreground tracking-wider uppercase block mb-2">
                                        Subject
                                    </label>
                                    <Input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                subject: e.target.value,
                                            })
                                        }
                                        placeholder="What's this about?"
                                        className="bg-secondary/50 border-input text-foreground placeholder:text-muted-foreground focus:border-primary/30 focus:ring-primary/10 rounded-xl"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-mono text-muted-foreground tracking-wider uppercase block mb-2">
                                        Contact Number (Optional)
                                    </label>
                                    <Input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                phone: e.target.value,
                                            })
                                        }
                                        placeholder="+1 234 567 890"
                                        className="bg-secondary/50 border-input text-foreground placeholder:text-muted-foreground focus:border-primary/30 focus:ring-primary/10 rounded-xl"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-mono text-muted-foreground tracking-wider uppercase block mb-2">
                                    Message
                                </label>
                                <Textarea
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            message: e.target.value,
                                        })
                                    }
                                    placeholder="Tell me about your project..."
                                    className="bg-secondary/50 border-input text-foreground placeholder:text-muted-foreground focus:border-primary/30 focus:ring-primary/10 rounded-xl resize-none"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={formState === "loading"}
                                className="w-full rounded-xl py-6 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50"
                            >
                                {formState === "loading" && (
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                )}
                                {formState === "success" && (
                                    <CheckCircle2 className="w-5 h-5 mr-2" />
                                )}
                                {formState === "error" && (
                                    <AlertCircle className="w-5 h-5 mr-2" />
                                )}
                                {formState === "idle" && (
                                    <Send className="w-5 h-5 mr-2" />
                                )}
                                {formState === "loading"
                                    ? "Sending..."
                                    : formState === "success"
                                        ? "Message Sent!"
                                        : formState === "error"
                                            ? "Try Again"
                                            : "Send Message"}
                            </Button>

                            {formState === "error" && errorMessage && (
                                <p className="text-red-500 text-sm text-center">
                                    {errorMessage}
                                </p>
                            )}

                            {formState === "success" && (
                                <p className="text-green-500 text-sm text-center">
                                    Thank you! I&rsquo;ll get back to you soon.
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}