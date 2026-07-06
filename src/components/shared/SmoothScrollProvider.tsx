"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll and refresh ScrollTrigger coordinates on page transitions
  useEffect(() => {
    // Disable native browser scroll restoration conflicts
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (lenisRef.current) {
      // Instantly scroll to top of the page on route change
      lenisRef.current.scrollTo(0, { immediate: true });
      // Force start scrolling listeners and update internal sizes
      lenisRef.current.start();
      lenisRef.current.resize();
    }
    
    // Clear ScrollTrigger cache and force a position recalculation
    ScrollTrigger.clearScrollMemory();
    
    // Give Next.js layout render a split second to stabilize
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
    }, 250);

    return () => clearTimeout(refreshTimeout);
  }, [pathname]);

  return <>{children}</>;
}
