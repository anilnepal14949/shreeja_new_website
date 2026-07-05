"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  subtitle: string;
  title: string;
  highlightedTitle?: string;
  description: string;
  dark?: boolean;
}

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

export default function PageHeader({
  subtitle,
  title,
  highlightedTitle,
  description,
  dark = false,
}: PageHeaderProps) {
  return (
    <section
      className={`w-full py-32 text-center ${
        dark ? "bg-shreeja-navy-dark text-white" : "bg-shreeja-light text-shreeja-navy"
      }`}
    >
      <div className="mx-auto max-w-3xl px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="font-body text-sm font-semibold uppercase tracking-widest text-shreeja-orange"
        >
          {subtitle}
        </motion.span>
        
        <h1 className="mt-4 font-display text-5xl font-semibold uppercase tracking-tight sm:text-7xl">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
            className="block"
          >
            {title}
          </motion.span>
          {highlightedTitle && (
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
              className="mt-2 block text-shreeja-orange italic lowercase font-serif"
            >
              {highlightedTitle}
            </motion.span>
          )}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: easeOut }}
          className={`mt-6 font-body text-base font-normal leading-relaxed sm:text-lg ${
            dark ? "text-white/60" : "text-shreeja-dark/70"
          }`}
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
