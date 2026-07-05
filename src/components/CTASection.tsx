"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-shreeja-navy-dark py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-shreeja-orange/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center"
      >
        <h2 className="font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-white sm:text-7xl">
          Ready to Build Your{" "}
          <span className="text-shreeja-orange">Digital Future?</span>
        </h2>
        <p className="mt-6 max-w-xl font-body text-base font-normal text-white/60 sm:text-lg">
          Tell us where you want to go — we&apos;ll help you write the next
          chapter of your brand&apos;s story.
        </p>

        <motion.a
          href="mailto:contact@shreejadigital.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="mt-10 inline-block rounded-full bg-shreeja-orange px-8 py-4 font-body text-base font-medium text-white shadow-lg shadow-shreeja-orange/30 transition-colors duration-200 hover:bg-shreeja-orange-light"
        >
          Contact Us
        </motion.a>
      </motion.div>
    </section>
  );
}
