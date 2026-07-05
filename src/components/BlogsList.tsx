"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { blogPosts } from "@/utils/constants";

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

export default function BlogsList() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="mx-auto max-w-6xl px-6 pb-24"
    >
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <motion.div
            key={post.title}
            variants={cardVariant}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:border-shreeja-orange/30"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-shreeja-navy-dark">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 350px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-4">
              <div>
                <div className="flex items-center gap-4 text-xs text-white/50">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-white transition-colors duration-200 group-hover:text-shreeja-orange">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 font-body text-sm font-normal text-white/60">
                  {post.excerpt}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <Link
                  href={`/blogs/${post.slug}`}
                  className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-shreeja-orange transition-colors duration-200 hover:text-white"
                >
                  Read Article
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
