"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "@/utils/constants";

export default function FeaturedProjects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      checkScroll();
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="portfolio" className="w-full bg-shreeja-navy-dark py-24 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-body text-sm font-medium uppercase tracking-widest text-shreeja-orange">
              Our Work
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight sm:text-6xl">
              Featured Projects
            </h2>
          </div>
          
          {/* Controls */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-200 ${
                canScrollLeft
                  ? "border-white/20 bg-white/5 text-white hover:border-shreeja-orange hover:bg-shreeja-orange"
                  : "border-white/10 text-white/20 cursor-not-allowed"
              }`}
              aria-label="Previous project"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-200 ${
                canScrollRight
                  ? "border-white/20 bg-white/5 text-white hover:border-shreeja-orange hover:bg-shreeja-orange"
                  : "border-white/10 text-white/20 cursor-not-allowed"
              }`}
              aria-label="Next project"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="no-scrollbar mt-12 flex gap-6 overflow-x-auto scroll-smooth pb-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="w-[280px] shrink-0 snap-start sm:w-[320px] md:w-[350px]"
            >
              <div className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 transition-all duration-300 hover:border-shreeja-orange/30">
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  {/* Unsplash Image / Dynamic Mockup */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-shreeja-navy-dark via-shreeja-navy-dark/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="font-body text-xs font-semibold uppercase tracking-wider text-shreeja-orange">
                      {project.category}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
                      {project.title}
                    </h3>
                    <div className="mt-4 overflow-hidden">
                      <Link
                        href={project.href}
                        className="inline-flex translate-y-6 items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 group-hover:translate-y-0 hover:text-shreeja-orange"
                      >
                        Explore Case Study
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* View All Card at the end */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: projects.length * 0.05 }}
            className="w-[280px] shrink-0 snap-start sm:w-[320px] md:w-[350px]"
          >
            <div className="group relative flex aspect-square flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-300 hover:border-shreeja-orange/30 animate-pulse-glow">
              <h3 className="font-display text-2xl font-semibold text-white">
                Interested in seeing more?
              </h3>
              <p className="mt-3 font-body text-sm text-white/50">
                Explore our full archive of web designs, custom mobile apps, and branding case studies.
              </p>
              <Link
                href="/portfolio"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-shreeja-orange px-6 py-3 font-body text-sm font-semibold text-white transition-all duration-200 hover:bg-shreeja-orange-light"
              >
                View All Projects
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
