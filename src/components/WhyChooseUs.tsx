"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const values = [
  {
    number: "01.",
    title: "Personalized Partnerships",
    description:
      "We don't do cookie-cutter. Every brand, every brief, every solution is tailored to fit your vision and goals.",
  },
  {
    number: "02.",
    title: "Full-Service Expertise",
    description:
      "From design and branding to development and marketing — everything under one creative roof, seamlessly connected.",
  },
  {
    number: "03.",
    title: "Transparent Process",
    description:
      "Clear steps, open communication, and no mystery fees — so you always know where your project stands.",
  },
  {
    number: "04.",
    title: "Modern Creativity, Cultural Roots",
    description:
      "Fresh, forward-thinking design inspired by our blend of global perspective and local heritage.",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function WhyChooseUs({ dark = true }: { dark?: boolean }) {
  return (
    <section
      id="why-us"
      className={`w-full py-24 transition-colors duration-300 ${
        dark ? "bg-shreeja-navy text-white" : "bg-shreeja-light text-shreeja-navy"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          
          {/* Left Column: Heading & Intro */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <span className="font-body text-sm font-semibold uppercase tracking-widest text-shreeja-orange">
              Why Choose Us
            </span>
            <h2 className={`mt-4 font-display text-4xl font-semibold uppercase tracking-tight sm:text-5xl leading-tight ${
              dark ? "text-white" : "text-shreeja-navy"
            }`}>
              A Team That Listens, Designs With Purpose, and Delivers With Care
            </h2>
            <p className={`mt-6 font-body text-base font-normal leading-relaxed ${
              dark ? "text-white/70" : "text-shreeja-dark/70"
            }`}>
              From first conversation to final launch, we stay curious, transparent, 
              and dedicated — so your brand doesn’t just look good, it stands out and lasts.
            </p>
            <div className="mt-8">
              <Link
                href="/about-us"
                className="inline-block rounded-full bg-shreeja-orange px-6 py-3.5 font-body text-sm font-semibold text-white transition-colors duration-200 hover:bg-shreeja-orange-light shadow-md shadow-shreeja-orange/20"
              >
                Meet Our Team
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Value Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {values.map(({ number, title, description }) => (
              <motion.div
                key={title}
                variants={item}
                className={`flex flex-col gap-3 rounded-xl border p-6 shadow-sm transition-all duration-300 ${
                  dark
                    ? "border-white/5 bg-white/5 hover:border-white/10"
                    : "border-shreeja-navy/10 bg-white hover:border-shreeja-orange/30 hover:shadow-md"
                }`}
              >
                <span className="font-display text-2xl font-bold text-shreeja-orange">
                  {number}
                </span>
                <h3 className={`font-display text-lg font-semibold ${
                  dark ? "text-white" : "text-shreeja-navy"
                }`}>
                  {title}
                </h3>
                <p className={`font-body text-sm leading-relaxed ${
                  dark ? "text-white/60" : "text-shreeja-dark/70"
                }`}>
                  {description}
                </p>
              </motion.div>
            ))}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
