// "use client";

// import { certifications } from "@/data/portfolio";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Award, ExternalLink } from "lucide-react";
// import { useRef } from "react";

// gsap.registerPlugin(ScrollTrigger);

// export default function Certifications() {
//     const sectionRef = useRef<HTMLElement>(null);

//     useGSAP(
//         () => {
//             gsap.fromTo(
//                 ".cert-card",
//                 { opacity: 0, y: 30, rotateX: 5 },
//                 {
//                     opacity: 1,
//                     y: 0,
//                     rotateX: 0,
//                     duration: 0.6,
//                     stagger: 0.1,
//                     ease: "power3.out",
//                     scrollTrigger: {
//                         trigger: ".cert-grid",
//                         start: "top 80%",
//                         toggleActions: "play none none reverse",
//                     },
//                 }
//             );
//         },
//         { scope: sectionRef }
//     );

//     return (
//         <section ref={sectionRef} className="relative py-16 md:py-24 px-6 z-10">
//             <div className="max-w-6xl mx-auto">
//                 {/* Section label */}
//                 <div className="flex items-center gap-4 mb-8">
//                     <Award className="w-4 h-4 text-[#ffa600]/60" />
//                     <span className="section-label">Certifications</span>
//                     <div className="gradient-line flex-1" />
//                 </div>

//                 <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
//                     Professional{" "}
//                     <span className="text-[#ffa600]">Credentials</span>
//                 </h2>

//                 <div className="cert-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                     {certifications.map((cert, i) => (
//                         <div
//                             key={i}
//                             className="cert-card glass-card rounded-2xl p-6 flex flex-col justify-between group"
//                         >
//                             <div>
//                                 <div className="p-3 rounded-xl bg-[#ffa600]/5 text-[#ffa600] w-fit mb-4 group-hover:bg-[#ffa600]/10 transition-colors">
//                                     <Award className="w-5 h-5" />
//                                 </div>
//                                 <h3 className="text-sm font-bold text-white tracking-tight mb-2 group-hover:text-[#ffa600] transition-colors">
//                                     {cert.title}
//                                 </h3>
//                                 <p className="text-xs text-zinc-500">
//                                     {cert.issuer}
//                                 </p>
//                             </div>
//                             <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
//                                 <span className="text-xs font-mono text-zinc-600">
//                                     {cert.date}
//                                 </span>
//                                 {cert.credentialUrl && (
//                                     <a
//                                         href={cert.credentialUrl}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-zinc-600 hover:text-[#00eaff] transition-colors"
//                                         aria-label={`Verify ${cert.title}`}
//                                     >
//                                         <ExternalLink className="w-3.5 h-3.5" />
//                                     </a>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }
