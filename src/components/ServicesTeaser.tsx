"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/utils/constants";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function ServicesTeaser() {
  const featured = services.slice(0, 3);

  return (
    <section className="w-full border-t border-shreeja-navy/10 bg-shreeja-light py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-body text-sm font-medium uppercase tracking-widest text-shreeja-orange">
            What We Do
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight text-shreeja-navy sm:text-6xl">
            Services Built to Grow With You
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {featured.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="group flex flex-col rounded-lg border border-shreeja-navy/10 bg-white p-8 shadow-sm transition-shadow duration-200 hover:shadow-xl hover:shadow-shreeja-navy/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-shreeja-orange/10 text-shreeja-orange transition-colors duration-200 group-hover:bg-shreeja-orange group-hover:text-white">
                <Icon size={24} />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-shreeja-navy">
                {title}
              </h3>
              <p className="mt-2 font-body text-sm font-normal text-shreeja-dark/70">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-shreeja-navy px-8 py-4 font-body text-base font-medium text-shreeja-navy transition-colors duration-200 hover:bg-shreeja-navy hover:text-white"
          >
            View All Services
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
