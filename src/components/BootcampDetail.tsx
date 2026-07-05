"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Calendar, Award, Code } from "lucide-react";
import { motion } from "framer-motion";

const syllabus = [
  {
    week: "Weeks 1-2: Front-End Core",
    topic: "Modern HTML5, Semantic CSS, responsive grids, and JavaScript programming concepts.",
  },
  {
    week: "Weeks 3-5: React & Next.js",
    topic: "React hooks, state management, Next.js routing, server components, and styling with Tailwind.",
  },
  {
    week: "Weeks 6-8: Back-End & Databases",
    topic: "Node.js REST APIs, database queries (PostgreSQL/MongoDB), user auth, and server deployments.",
  },
  {
    week: "Weeks 9-12: Real-World Team Project",
    topic: "Collaborating in Git worktrees, planning product backlogs, and launching a production web application.",
  },
];

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
};

export default function BootcampDetail() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 text-white">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        
        {/* Left Column: Details */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <span className="font-body text-sm font-medium uppercase tracking-widest text-shreeja-orange">
            Learn & Grow
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl leading-tight">
            Gain Real Agency Experience
          </h2>
          <p className="mt-6 font-body text-base font-normal text-white/60 sm:text-lg">
            Launch your career in software engineering. Learn directly from working developers, build a premium production portfolio, and prepare for placement opportunities in Australia and Nepal.
          </p>
          
          <div className="mt-10 flex flex-col gap-6 font-body text-sm text-white/80">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-shreeja-orange/10 text-shreeja-orange">
                <Calendar size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-white">Next Cohort Starts</h3>
                <p className="text-white/60">August 15, 2026 — 12-week program</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-shreeja-orange/10 text-shreeja-orange">
                <Code size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-white">Hands-on Method</h3>
                <p className="text-white/60">Daily coding assignments on real-world briefs.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-shreeja-orange/10 text-shreeja-orange">
                <Award size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-white">Graduation Referral</h3>
                <p className="text-white/60">Verified certificate and job matching referrals.</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-shreeja-orange px-8 py-4 font-body text-base font-semibold text-white shadow-lg shadow-shreeja-orange/30 transition-colors duration-200 hover:bg-shreeja-orange-light"
            >
              Apply Now
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Syllabus Checklist */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-8"
        >
          <h2 className="font-display text-2xl font-semibold text-white">
            Bootcamp Curriculum
          </h2>
          <p className="mt-2 font-body text-sm text-white/50">
            A comprehensive project-based learning syllabus structured for modern developers.
          </p>
          <div className="mt-8 flex flex-col gap-6">
            {syllabus.map((item) => (
              <motion.div
                key={item.week}
                variants={itemVariant}
                className="flex gap-4"
              >
                <CheckCircle2 size={20} className="mt-1 shrink-0 text-shreeja-orange" />
                <div>
                  <h3 className="font-display text-base font-semibold text-white">
                    {item.week}
                  </h3>
                  <p className="mt-1 font-body text-xs text-white/60">
                    {item.topic}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}
