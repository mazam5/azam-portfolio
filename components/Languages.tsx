// "use client";

// import { languages } from "@/data/portfolio";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { MessageCircle, Code2 } from "lucide-react";
// import { useRef } from "react";

// gsap.registerPlugin(ScrollTrigger);

// export default function Languages() {
//     const sectionRef = useRef<HTMLElement>(null);

//     const spokenLangs = languages.filter((l) => l.type === "spoken");
//     const programmingLangs = languages.filter((l) => l.type === "programming");

//     useGSAP(
//         () => {
//             gsap.fromTo(
//                 ".lang-item",
//                 { opacity: 0, x: -20 },
//                 {
//                     opacity: 1,
//                     x: 0,
//                     duration: 0.5,
//                     stagger: 0.06,
//                     ease: "power3.out",
//                     scrollTrigger: {
//                         trigger: sectionRef.current,
//                         start: "top 75%",
//                         toggleActions: "play none none reverse",
//                     },
//                 }
//             );

//             gsap.fromTo(
//                 ".lang-bar-fill",
//                 { width: "0%" },
//                 {
//                     width: (_i: number, el: HTMLElement) => el.dataset.level + "%",
//                     duration: 1,
//                     stagger: 0.05,
//                     ease: "power3.out",
//                     scrollTrigger: {
//                         trigger: sectionRef.current,
//                         start: "top 70%",
//                         toggleActions: "play none none reverse",
//                     },
//                 }
//             );
//         },
//         { scope: sectionRef }
//     );

//     return (
//         <section
//             id="languages"
//             ref={sectionRef}
//             className="relative py-24 md:py-32 px-6 z-10"
//         >
//             <div className="max-w-6xl mx-auto">
//                 {/* Section label */}
//                 <div className="flex items-center gap-4 mb-8">
//                     <span className="section-label">Languages</span>
//                     <div className="gradient-line flex-1" />
//                 </div>

//                 <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16">
//                     Languages I{" "}
//                     <span className="text-[#00ff88]">Speak & Code</span>
//                 </h2>

//                 <div className="grid md:grid-cols-2 gap-12">
//                     {/* Programming Languages */}
//                     <div>
//                         <div className="flex items-center gap-3 mb-6">
//                             <div className="p-2 rounded-lg bg-[#00eaff]/5 text-[#00eaff]">
//                                 <Code2 className="w-5 h-5" />
//                             </div>
//                             <h3 className="text-lg font-bold text-white tracking-tight">
//                                 Programming
//                             </h3>
//                         </div>

//                         <div className="space-y-4">
//                             {programmingLangs.map((lang) => (
//                                 <div key={lang.name} className="lang-item">
//                                     <div className="flex items-center justify-between mb-2">
//                                         <div className="flex items-center gap-2">
//                                             {lang.icon && (
//                                                 <span className="text-base">
//                                                     {lang.icon}
//                                                 </span>
//                                             )}
//                                             <span className="text-sm text-zinc-300 font-medium">
//                                                 {lang.name}
//                                             </span>
//                                         </div>
//                                         <span className="text-xs font-mono text-zinc-600">
//                                             {lang.level}
//                                         </span>
//                                     </div>
//                                     <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
//                                         <div
//                                             className="lang-bar-fill h-full rounded-full bg-linear-to-r from-[#00eaff] to-[#7b61ff]"
//                                             data-level={lang.proficiency}
//                                             style={{ width: 0 }}
//                                         />
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Spoken Languages */}
//                     <div>
//                         <div className="flex items-center gap-3 mb-6">
//                             <div className="p-2 rounded-lg bg-[#00ff88]/5 text-[#00ff88]">
//                                 <MessageCircle className="w-5 h-5" />
//                             </div>
//                             <h3 className="text-lg font-bold text-white tracking-tight">
//                                 Spoken
//                             </h3>
//                         </div>

//                         <div className="space-y-4">
//                             {spokenLangs.map((lang) => (
//                                 <div
//                                     key={lang.name}
//                                     className="lang-item glass-card rounded-xl p-5 flex items-center justify-between"
//                                 >
//                                     <div>
//                                         <span className="text-sm text-zinc-200 font-medium">
//                                             {lang.name}
//                                         </span>
//                                         <span className="block text-xs text-zinc-600 mt-0.5">
//                                             {lang.level}
//                                         </span>
//                                     </div>

//                                     {/* Circular proficiency indicator */}
//                                     <div className="relative w-12 h-12">
//                                         <svg
//                                             className="w-12 h-12 -rotate-90"
//                                             viewBox="0 0 36 36"
//                                         >
//                                             <path
//                                                 d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                                                 fill="none"
//                                                 stroke="rgba(255,255,255,0.05)"
//                                                 strokeWidth="3"
//                                             />
//                                             <path
//                                                 d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                                                 fill="none"
//                                                 stroke="#00ff88"
//                                                 strokeWidth="3"
//                                                 strokeDasharray={`${lang.proficiency}, 100`}
//                                                 strokeLinecap="round"
//                                                 className="skill-ring"
//                                             />
//                                         </svg>
//                                         <span className="absolute inset-0 flex items-center justify-center text-xs font-mono text-[#00ff88]">
//                                             {lang.proficiency}
//                                         </span>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }
