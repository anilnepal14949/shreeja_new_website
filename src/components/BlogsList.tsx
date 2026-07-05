"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { blogPosts, type BlogPost } from "@/utils/constants";

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
  const [items, setItems] = useState<BlogPost[]>(blogPosts);

  useEffect(() => {
    const localBlogs = localStorage.getItem("shreeja_blogs");
    if (localBlogs) {
      const parsed = JSON.parse(localBlogs) as BlogPost[];
      setTimeout(() => setItems(parsed), 0);
    }
  }, []);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="mx-auto max-w-6xl px-6 pb-24"
    >
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((post) => (
          <motion.div
            key={post.title}
            variants={cardVariant}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:border-shreeja-orange/30"
          >
            {/* Image container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-shreeja-navy">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-w-768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-shreeja-navy-dark/80 via-shreeja-navy-dark/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
            </div>

            {/* Content info */}
            <div className="flex flex-1 flex-col justify-between p-4 pt-5">
              <div>
                <span className="font-body text-xs font-semibold text-shreeja-orange">
                  {post.date} · {post.readTime}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug text-white transition-colors duration-200 group-hover:text-shreeja-orange line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 font-body text-xs leading-relaxed text-white/60 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                <span className="font-body text-xs font-medium uppercase tracking-wider text-white/50 group-hover:text-white transition-colors duration-200">
                  Read Article
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white transition-all duration-300 group-hover:bg-shreeja-orange group-hover:translate-x-1">
                  <ArrowRight size={16} />
                </span>
              </div>
            </div>

            {/* Click link overlay */}
            <Link
              href={`/blogs/${post.slug}`}
              className="absolute inset-0 z-10"
              aria-label={`Read ${post.title} article`}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
