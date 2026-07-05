"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

export default function Hero() {
  const backRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const backY = useParallax(backRef, 0.3);
  const midY = useParallax(midRef, 0.6);

  const handleGetStarted = () => {
    const contactSection = document.getElementById("contact-form");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-shreeja-navy-dark pt-16"
    >
      {/* Background glow graphics */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,rgba(255,107,53,0.15)_0%,rgba(255,107,53,0.08)_20%,transparent_50%)]">
        <motion.div
          ref={backRef}
          style={{ y: backY }}
          className="absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-shreeja-orange/15 blur-3xl animate-float"
        />
        <motion.div
          ref={midRef}
          style={{ y: midY }}
          className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-white/5 blur-3xl"
        />
        <motion.div
          style={{ y: backY }}
          className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-shreeja-orange-light/10 blur-2xl animate-pulse-glow"
        />
      </div>

      {/* Hero content */}
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <h1 className="font-display text-5xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: easeOut }}
              className="block"
            >
              Bringing Your
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.1, ease: easeOut }}
              className="block"
            >
              Vision Into
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.2, ease: easeOut }}
              className="block text-shreeja-orange italic lowercase font-serif"
            >
              Reality
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: easeOut }}
          className="mt-8 max-w-2xl font-body text-base font-medium leading-relaxed text-white/70 sm:text-lg lg:text-xl"
        >
          We build digital foundations that bring ideas to life — crafting websites,
          apps, branding, and strategies that connect people and spark growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: easeOut }}
          className="mt-10"
        >
          <motion.button
            onClick={handleGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="group flex items-center gap-2 rounded-full bg-shreeja-orange px-8 py-4 font-body text-base font-semibold text-white shadow-lg shadow-shreeja-orange/30 hover:bg-shreeja-orange-light"
          >
            Let&apos;s Get Started
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
