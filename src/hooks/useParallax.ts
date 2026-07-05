"use client";

import type { RefObject } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * Ties an element's vertical offset to page scroll at a fraction of scroll speed.
 * speed < 1 drifts slower than scroll (background), speed > 1 drifts faster (foreground).
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  speed: number = 0.5
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = 400 * speed;
  return useTransform(scrollYProgress, [0, 1], [-range, range]);
}
