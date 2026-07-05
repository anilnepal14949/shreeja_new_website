"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about-us", label: "About Us" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  // Close mobile menu on path changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  return (
    <>
      {/* Uniform Premium Navbar (Always Solid Dark Navy) */}
      <nav
        className={`fixed left-0 top-0 z-50 w-full bg-shreeja-navy-dark/95 backdrop-blur-md border-b border-white/5 shadow-lg shadow-shreeja-navy-dark/30 transition-all duration-300 ${
          scrolled ? "py-4" : "py-5"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-transform duration-200 hover:scale-[1.02]"
            aria-label="Shreeja Digital Agency home"
          >
            <div className="rounded-md bg-shreeja-light px-2.5 py-1.5 shadow-sm">
              <Image
                src="/logo_resized.png"
                alt="Shreeja Digital Agency"
                width={140}
                height={43}
                priority
                className="h-7 w-auto sm:h-8"
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-8 xl:flex">
            <div className="flex items-center gap-8">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative font-body text-sm font-medium transition-colors duration-200 hover:text-shreeja-orange ${
                      isActive ? "text-shreeja-orange" : "text-white/80"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1 left-0 h-[2px] w-full bg-shreeja-orange"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Link
                href="/bootcamp"
                className="inline-block rounded-full bg-shreeja-orange px-5 py-2.5 font-body text-sm font-semibold text-white shadow-md shadow-shreeja-orange/30 transition-colors duration-200 hover:bg-shreeja-orange-light"
              >
                Join Our Bootcamp
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 xl:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-shreeja-navy-dark pt-24 text-white xl:hidden"
          >
            <div className="flex h-full flex-col justify-between px-6 pb-12 pt-6">
              <div className="flex flex-col gap-6">
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`font-display text-3xl font-semibold uppercase tracking-tight transition-colors duration-200 hover:text-shreeja-orange ${
                        isActive ? "text-shreeja-orange" : "text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="border-t border-white/10 pt-6">
                <Link
                  href="/bootcamp"
                  className="group flex w-full items-center justify-between rounded-full bg-shreeja-orange px-6 py-4 font-body text-base font-semibold text-white transition-colors duration-200 hover:bg-shreeja-orange-light"
                >
                  Join Our Bootcamp
                  <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
