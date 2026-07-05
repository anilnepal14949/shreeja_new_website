"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stages } from "@/utils/constants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Compass, Lightbulb, PenTool, Code, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const icons = [Compass, Lightbulb, PenTool, Code, Rocket];

export default function StoryboardSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const panels = panelsRef.current.filter(
      (el): el is HTMLDivElement => el !== null
    );

    const ctx = gsap.context(() => {
      gsap.set(panels.slice(1), { autoAlpha: 0, y: 40 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${(stages.length - 1) * window.innerHeight}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress);
            setActiveIndex(
              Math.min(stages.length - 1, Math.floor(self.progress * stages.length))
            );
          },
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        tl.to(panels[i - 1], { autoAlpha: 0, y: -40, duration: 1 }, i - 1).to(
          panel,
          { autoAlpha: 1, y: 0, duration: 1 },
          i - 1
        );
      });
    }, sectionRef);

    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      clearTimeout(refreshTimeout);
      ctx.revert();
    };
  }, [reducedMotion]);

  const activeStage = stages[activeIndex];

  if (reducedMotion) {
    return (
      <section id="story" className="bg-shreeja-navy-dark py-24 text-white">
        <div className="mx-auto flex max-w-3xl flex-col gap-16 px-6">
          {stages.map((stage, i) => {
            const IconComponent = icons[i];
            return (
              <div key={stage.number} className="flex flex-col gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-shreeja-orange/20 text-shreeja-orange">
                  <IconComponent size={24} />
                </div>
                <div>
                  <span className="font-body text-sm font-medium uppercase tracking-widest text-shreeja-orange">
                    {stage.label}
                  </span>
                  <h3 className="mt-2 font-display text-4xl font-semibold text-white sm:text-5xl">
                    {stage.headline}
                  </h3>
                  <p className="mt-4 max-w-lg font-body text-base font-normal text-white/60 sm:text-lg">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <div className="w-full">
      <section
        id="story"
        ref={sectionRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-shreeja-navy-dark text-white"
      >
      {/* Progress track at top of section */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-white/5">
        <div
          className="h-full bg-shreeja-orange transition-all duration-100"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Progress labels & indicators */}
      <div className="absolute left-6 top-8 font-body text-xs font-semibold uppercase tracking-widest text-white/40 sm:left-10">
        Our Approach — {String(Math.round(progress * 100)).padStart(2, "0")}%
      </div>

      {/* Giant faint number watermark in the center */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="select-none font-display text-[38vw] font-bold leading-none text-white/[0.025]">
          {activeStage.number}
        </span>
      </div>

      {/* Right side navigation index */}
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-5 sm:right-10 md:flex">
        {stages.map((stage, i) => (
          <span
            key={stage.number}
            className={`font-display text-sm font-semibold transition-colors duration-300 ${
              i === activeIndex ? "text-shreeja-orange" : "text-white/20"
            }`}
          >
            {stage.number}
          </span>
        ))}
      </div>

      {/* Pinned panels containing content + icons */}
      {stages.map((stage, i) => {
        const StageIcon = icons[i];
        return (
          <div
            key={stage.number}
            ref={(el) => {
              panelsRef.current[i] = el;
            }}
            className="absolute inset-0 flex items-center justify-center px-6"
          >
            <div className="grid w-full max-w-4xl grid-cols-1 items-center gap-12 md:grid-cols-2">
              {/* Left Column: Text Content */}
              <div>
                <span className="font-body text-sm font-medium uppercase tracking-widest text-shreeja-orange">
                  {stage.label}
                </span>
                <h3 className="mt-4 font-display text-5xl font-bold text-white sm:text-7xl">
                  {stage.headline}
                </h3>
                <p className="mt-6 max-w-md font-body text-base font-medium leading-relaxed text-white/70 sm:text-lg">
                  {stage.description}
                </p>
                
                {/* Visual Tags */}
                <div className="mt-8 flex flex-wrap gap-2 font-body text-xs font-semibold text-white/50">
                  {stage.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Large Animated Graphic (Desktop only) */}
              <div className="hidden items-center justify-center md:flex">
                <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-linear-to-br from-white/5 to-white/0 border border-white/10 shadow-inner shadow-white/5">
                  <div className="absolute inset-0 rounded-full border border-shreeja-orange/10 animate-pulse-glow" />
                  <StageIcon
                    size={96}
                    className="text-shreeja-orange transition-transform duration-700 ease-elastic hover:rotate-12"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
      </section>
    </div>
  );
}
