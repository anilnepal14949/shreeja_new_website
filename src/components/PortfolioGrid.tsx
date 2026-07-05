"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "@/utils/constants";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function PortfolioGrid() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="mx-auto max-w-6xl px-6 pb-24"
    >
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={cardVariant}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:border-shreeja-orange/30"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-shreeja-navy-dark">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 350px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-4">
              <div>
                <span className="font-body text-xs font-semibold uppercase tracking-wider text-shreeja-orange">
                  {project.category}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">
                  {project.title}
                </h3>
              </div>
              <div className="mt-6">
                <Link
                  href={project.href}
                  className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-white transition-colors duration-200 hover:text-shreeja-orange"
                >
                  View Case Study
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
