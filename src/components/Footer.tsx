"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import SocialIcon, { type SocialPlatform } from "./shared/SocialIcon";
import { usePathname } from "next/navigation";
import { offices } from "@/utils/constants";
import { useParallax } from "@/hooks/useParallax";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about-us", label: "About Us" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

const socials: { platform: SocialPlatform; href: string; label: string }[] = [
  { platform: "facebook", href: "https://facebook.com/shreejadigitalagency", label: "Facebook" },
  { platform: "instagram", href: "https://instagram.com/shreejadigitalagency", label: "Instagram" },
  { platform: "linkedin", href: "https://linkedin.com/company/shreejadigitalagency", label: "LinkedIn" },
  { platform: "tiktok", href: "https://tiktok.com/@shreejadigitalagency", label: "TikTok" },
];

export default function Footer() {
  const pathname = usePathname();
  const footerRef = useRef<HTMLElement>(null);
  // Parallax drift translation offset
  const y = useParallax(footerRef, -0.25);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer ref={footerRef} className="w-full bg-shreeja-navy-dark pt-16 pb-0 text-white/80 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.1fr_0.7fr_2fr]">
          <div>
            <div className="inline-block rounded-md bg-shreeja-light px-3 py-2">
              <Image
                src="/logo_resized.png"
                alt="Shreeja Digital Agency"
                width={160}
                height={49}
                className="h-9 w-auto"
              />
            </div>
            <p className="mt-4 max-w-xs font-body text-sm">
              Creative solutions for modern brands — bringing your vision
              into reality, one story at a time.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socials.map(({ platform, href, label }) => (
                <a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/60 transition-colors duration-200 hover:text-shreeja-orange"
                >
                  <SocialIcon platform={platform} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm transition-colors duration-200 hover:text-shreeja-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
            {offices.map((office) => (
              <div key={office.country}>
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
                  {office.country}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5 font-body text-sm">
                  <li className="flex items-start gap-2">
                    <MapPin size={16} className="mt-0.5 shrink-0" />
                    {office.address}
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone size={16} className="shrink-0" />
                    {office.phone}
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail size={16} className="shrink-0" />
                    <a
                      href={`mailto:${office.email}`}
                      className="break-all transition-colors duration-200 hover:text-shreeja-orange"
                    >
                      {office.email}
                    </a>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center font-body text-xs text-white/50">
          © {new Date().getFullYear()} Shreeja Digital Agency. All rights
          reserved.
        </div>
      </div>

      {/* Massive Parallax Typography Watermark (Peeking out at bottom) */}
      <div className="relative mt-8 w-full select-none overflow-hidden leading-none pointer-events-none">
        <motion.h2
          style={{ y }}
          className="font-display text-[13vw] font-black uppercase leading-none tracking-tighter text-shreeja-orange text-center select-none"
        >
          Shreeja Digital
        </motion.h2>
      </div>
    </footer>
  );
}
