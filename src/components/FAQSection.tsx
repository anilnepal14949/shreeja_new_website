"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/utils/constants";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-shreeja-light py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <span className="font-body text-sm font-medium uppercase tracking-widest text-shreeja-orange">
            FAQs
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight text-shreeja-navy sm:text-5xl">
            Providing Answers to Your Questions
          </h2>
        </div>

        <div className="mt-14 divide-y divide-shreeja-navy/10 border-y border-shreeja-navy/10">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-base font-semibold text-shreeja-navy sm:text-lg">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-shreeja-orange/10 text-shreeja-orange"
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 font-body text-sm font-normal text-shreeja-dark/70 sm:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
