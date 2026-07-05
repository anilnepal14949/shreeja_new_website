"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2, Smartphone, PenTool, Megaphone, Fingerprint, TrendingUp, type LucideIcon } from "lucide-react";
import { services } from "@/utils/constants";

export const lucideIconMap: Record<string, LucideIcon> = {
  Code2,
  Smartphone,
  PenTool,
  Megaphone,
  Fingerprint,
  TrendingUp,
};

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

export default function ServicesGrid() {
  const [items, setItems] = useState<any[]>(services);

  useEffect(() => {
    const local = localStorage.getItem("shreeja_services");
    if (local) {
      setTimeout(() => setItems(JSON.parse(local)), 0);
    }
  }, []);

  return (
    <section id="services" className="w-full bg-shreeja-navy-dark py-24 text-white">
      <div className="mx-auto max-w-5xl divide-y divide-white/10 border-y border-white/10 px-6">
        {items.map((service, i) => {
          const isRight = i % 2 === 1;
          const Icon = typeof service.icon === "string" ? lucideIconMap[service.icon] || Code2 : service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className={`group relative flex flex-col gap-6 overflow-hidden py-12 md:flex-row md:items-center md:gap-12 ${
                isRight ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Giant faint number watermark */}
              <span
                className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 select-none font-display text-[10rem] font-semibold leading-none text-white/[0.025] transition-colors duration-300 group-hover:text-shreeja-orange/[0.06] md:block ${
                  isRight ? "-right-6" : "-left-6"
                }`}
              >
                {service.number}
              </span>

              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-shreeja-orange/10 text-shreeja-orange transition-colors duration-300 group-hover:bg-shreeja-orange group-hover:text-white">
                <Icon size={28} />
              </div>

              <div className="relative max-w-xl">
                <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-3 font-body text-base font-medium text-white/80">
                  {service.description}
                </p>
                <p className="mt-2 font-body text-sm font-normal text-white/60">
                  {service.detail}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {service.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-body text-xs font-medium text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`flex flex-1 justify-end md:w-auto ${isRight ? "md:justify-start" : "md:justify-end"}`}>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-body text-xs font-semibold text-white transition-all duration-300 hover:border-shreeja-orange hover:bg-shreeja-orange hover:text-white"
                >
                  Learn More
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
