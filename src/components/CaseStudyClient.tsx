"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ShieldCheck, Cpu, Sparkles, Target, Zap, Layout } from "lucide-react";
import type { ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Local icon map for dynamic element resolution in Client Component
const iconMap: Record<string, ElementType> = {
  ShieldCheck,
  Cpu,
  Sparkles,
  Target,
  Zap,
  Layout,
};

interface CaseStudyClientProps {
  project: {
    title: string;
    category: string;
    image: string;
    href: string;
  };
  study: {
    client: string;
    timeline: string;
    subhead: string;
    challenge: string;
    challengeMetrics: { label: string; value: string }[];
    approach: string;
    solutionPoints: { title: string; desc: string; iconKey: string }[];
    results: { label: string; value: string; desc: string }[];
  };
}

export default function CaseStudyClient({ project, study }: CaseStudyClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Scroll coordinates setup only on desktop (lg: width >= 1024px)
    const isMobile = window.matchMedia("(max-width: 1024px)").matches;
    if (isMobile) return;

    const scrollSection = scrollSectionRef.current;
    if (!scrollSection) return;

    const ctx = gsap.context(() => {
      const pinWidth = scrollSection.offsetWidth;
      const scrollWidth = pinWidth - window.innerWidth;

      gsap.to(scrollSection, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-shreeja-navy-dark overflow-hidden text-white">
      
      {/* Back Button Link (Fixed at top-left) */}
      <div className="fixed left-6 top-24 z-40 sm:left-10">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-shreeja-navy-dark/80 px-4 py-2 font-body text-xs font-semibold uppercase tracking-widest text-white/70 backdrop-blur-md transition-colors duration-200 hover:border-shreeja-orange hover:text-shreeja-orange"
        >
          <ArrowLeft size={14} />
          Portfolio
        </Link>
      </div>

      {/* Progress track at top of viewport (Fixed, Desktop only) */}
      <div className="fixed left-0 right-0 top-0 z-40 hidden h-1 bg-white/5 lg:block">
        <div
          className="h-full bg-shreeja-orange transition-all duration-100"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Horizontal Track Container */}
      <div
        ref={scrollSectionRef}
        className="flex flex-col w-full lg:flex-row lg:h-screen lg:w-[500vw] items-center bg-shreeja-navy-dark"
      >
        
        {/* SLIDE 1: INTRO / HERO */}
        <div className="relative flex min-h-screen w-full lg:w-screen lg:h-screen shrink-0 flex-col justify-center px-6 sm:px-12 md:px-24 py-32 lg:py-0 border-b border-white/5 lg:border-b-0 lg:border-r lg:border-white/10">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(255,107,53,0.1)_0%,transparent_50%)]" />
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="font-body text-sm font-semibold uppercase tracking-widest text-shreeja-orange">
                {project.category}
              </span>
              <h1 className="mt-4 font-display text-5xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-7xl">
                {project.title}
              </h1>
              <p className="mt-4 font-serif text-2xl italic text-shreeja-orange lowercase">
                {study.subhead}
              </p>
              
              <div className="mt-10 grid grid-cols-2 gap-6 font-body text-xs border-t border-white/10 pt-8">
                <div>
                  <h4 className="font-semibold text-white/40 uppercase tracking-widest">Client</h4>
                  <p className="mt-1 text-sm font-medium text-white">{study.client}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white/40 uppercase tracking-widest">Timeline</h4>
                  <p className="mt-1 text-sm font-medium text-white">{study.timeline}</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* SLIDE 2: THE CHALLENGE */}
        <div className="relative flex min-h-screen w-full lg:w-screen lg:h-screen shrink-0 flex-col justify-center px-6 sm:px-12 md:px-24 py-24 lg:py-0 border-b border-white/5 lg:border-b-0 lg:border-r lg:border-white/10">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_70%,rgba(255,107,53,0.05)_0%,transparent_50%)]" />
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div>
              <span className="font-body text-sm font-semibold uppercase tracking-widest text-shreeja-orange">
                Chapter One
              </span>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white sm:text-5xl">
                The Challenge
              </h2>
              <p className="mt-6 font-body text-base font-medium leading-relaxed text-white/70 sm:text-lg">
                {study.challenge}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {study.challengeMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 flex items-center justify-between"
                >
                  <span className="font-body text-sm font-semibold text-white/50">{metric.label}</span>
                  <span className="font-display text-2xl font-bold text-shreeja-orange">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SLIDE 3: THE APPROACH / SOLUTION */}
        <div className="relative flex min-h-screen w-full lg:w-screen lg:h-screen shrink-0 flex-col justify-center px-6 sm:px-12 md:px-24 py-24 lg:py-0 border-b border-white/5 lg:border-b-0 lg:border-r lg:border-white/10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] items-center">
            <div>
              <span className="font-body text-sm font-semibold uppercase tracking-widest text-shreeja-orange">
                Chapter Two
              </span>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white sm:text-5xl">
                Our Approach
              </h2>
              <p className="mt-6 font-body text-base font-medium leading-relaxed text-white/70">
                {study.approach}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {study.solutionPoints.map((pt) => {
                const PtIcon = iconMap[pt.iconKey] || Layout;
                return (
                  <div
                    key={pt.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-shreeja-orange/10 text-shreeja-orange">
                      <PtIcon size={18} />
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold text-white">{pt.title}</h3>
                    <p className="mt-2 font-body text-xs text-white/60 leading-relaxed">{pt.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SLIDE 4: THE RESULTS */}
        <div className="relative flex min-h-screen w-full lg:w-screen lg:h-screen shrink-0 flex-col justify-center px-6 sm:px-12 md:px-24 py-24 lg:py-0 border-b border-white/5 lg:border-b-0 lg:border-r lg:border-white/10">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,53,0.08)_0%,transparent_50%)]" />
          <div>
            <div className="text-center lg:text-left">
              <span className="font-body text-sm font-semibold uppercase tracking-widest text-shreeja-orange">
                Chapter Three
              </span>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white sm:text-5xl">
                The Results
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {study.results.map((res) => (
                <div
                  key={res.label}
                  className="rounded-2xl border border-shreeja-orange/20 bg-linear-to-br from-shreeja-orange/10 to-transparent p-8 text-center"
                >
                  <span className="font-display text-4xl font-extrabold text-white sm:text-5xl">{res.label}</span>
                  <h4 className="mt-2 font-body text-sm font-bold uppercase tracking-widest text-shreeja-orange">{res.value}</h4>
                  <p className="mt-4 font-body text-xs text-white/60 leading-relaxed">{res.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SLIDE 5: CTA / NEXT PROJECTS */}
        <div className="relative flex min-h-screen w-full lg:w-screen lg:h-screen shrink-0 flex-col justify-center px-6 sm:px-12 md:px-24 py-24 lg:py-0 bg-linear-to-b from-shreeja-navy-dark to-shreeja-navy">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-display text-4xl font-bold uppercase leading-tight text-white sm:text-5xl">
              Have a similar project in mind?
            </h2>
            <p className="mt-4 font-body text-base font-normal leading-relaxed text-white/60">
              Let&apos;s build your custom digital solutions. Get in touch with our engineering team in Australia and Nepal.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="group flex items-center gap-2 rounded-full bg-shreeja-orange px-8 py-4 font-body text-base font-semibold text-white shadow-lg shadow-shreeja-orange/30 transition-colors duration-200 hover:bg-shreeja-orange-light"
              >
                Let&apos;s Get Started
                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/portfolio"
                className="font-body text-sm font-semibold text-white/70 transition-colors duration-200 hover:text-white"
              >
                Back to Case Studies
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
