import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import ContactForm from "@/components/ContactForm";
import { blogPosts } from "@/utils/constants";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | Shreeja Digital Agency`,
    description: post.excerpt,
  };
}

// Custom rich content for each blog post slug
const blogContentsMap: Record<
  string,
  {
    content: React.ReactNode;
    author: string;
    authorRole: string;
  }
> = {
  "nextjs-seo-ultimate-framework": {
    author: "Shreeja Dev Team",
    authorRole: "Senior Frontend Engineer",
    content: (
      <>
        <p>
          Search Engine Optimization (SEO) is no longer just about keywords and meta tags. In today&apos;s digital environment, web performance, accessibility, and content rendering play a major role in search engine result pages. Next.js has emerged as the industry standard framework for building fast, SEO-rich sites.
        </p>
        
        <h2 className="mt-10 font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
          1. Static Site Generation (SSG)
        </h2>
        <p className="mt-4">
          By rendering your HTML pages at compile time rather than requesting them on the fly, search engine crawlers can index complete web page structures instantly. This avoids crawl delay issues caused by heavy client-side JavaScript calculations.
        </p>

        <h2 className="mt-10 font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
          2. Server Components Architecture
        </h2>
        <p className="mt-4">
          Next.js Server Components load database requests directly on the server. The client receives minimal JavaScript payload sizes, resulting in immediate Largest Contentful Paint (LCP) times and superior performance scores.
        </p>

        <blockquote className="my-8 rounded-2xl border-l-4 border-shreeja-orange bg-white/5 p-6 font-serif italic text-white/90">
          &ldquo;Performance and SEO are tightly coupled. A one-second reduction in page load speed can boost conversion metrics by over twenty percent.&rdquo;
        </blockquote>

        <h2 className="mt-10 font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
          3. Optimized Image Pipelines
        </h2>
        <p className="mt-4">
          The built-in Next.js Image component automatically resizes vectors, enforces responsive widths, serves optimized web-friendly formats like WebP, and prevents layout shift issues. This directly fulfills Google&apos;s Core Web Vitals criteria.
        </p>
      </>
    ),
  },
  "ui-ux-conversion-principles": {
    author: "Shreeja Design Lab",
    authorRole: "Head of Product Design",
    content: (
      <>
        <p>
          Creating a beautiful layout is only half the battle. A truly successful interface guides visitors along a structured journey, converting traffic into engaged leads. Let&apos;s examine key principles that turn visual layouts into high-conversion tools.
        </p>

        <h2 className="mt-10 font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
          1. Visual Hierarchy & Reading Flow
        </h2>
        <p className="mt-4">
          Web users scan layouts in standard F or Z shapes. Position your main value statement, high-contrast buttons, and social proof elements precisely along these natural scanning vectors to maximize optical alignment.
        </p>

        <h2 className="mt-10 font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
          2. Actionable Call-to-Actions (CTAs)
        </h2>
        <p className="mt-4">
          CTAs should be clear, high-contrast, and action-oriented. Instead of generic text like &ldquo;Submit,&rdquo; use specific labels like &ldquo;Get My Free Strategy Audit.&rdquo;
        </p>

        <blockquote className="my-8 rounded-2xl border-l-4 border-shreeja-orange bg-white/5 p-6 font-serif italic text-white/90">
          &ldquo;Excellent user experiences are invisible. If your user has to stop and think about where to click next, the interface has failed.&rdquo;
        </blockquote>

        <h2 className="mt-10 font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
          3. Whitespace & Breathing Room
        </h2>
        <p className="mt-4">
          Clutter decreases user reading retention. Generous layout gaps focus user attention onto active elements, improving scannability and giving your brand a clean, premium visual aesthetic.
        </p>
      </>
    ),
  },
  "mobile-app-crossplatform-vs-native": {
    author: "Shreeja Mobile Lead",
    authorRole: "Lead Mobile Architect",
    content: (
      <>
        <p>
          Launching a dedicated mobile application is a major milestone. However, deciding whether to build cross-platform codebases (React Native, Flutter) or write native files (Swift, Kotlin) remains a critical decision.
        </p>

        <h2 className="mt-10 font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
          1. Cross-Platform Frameworks
        </h2>
        <p className="mt-4">
          Frameworks like React Native and Flutter enable developer teams to maintain a single codebase that deploys to both iOS and Android. This reduces production costs, unifies layout designs, and speeds up time-to-market.
        </p>

        <h2 className="mt-10 font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
          2. Native Apps Benefits
        </h2>
        <p className="mt-4">
          Native environments excel in hardware integration. If your application relies heavily on device resources (like local Bluetooth, custom AR features, or 3D animations), native files ensure optimal framerates.
        </p>

        <blockquote className="my-8 rounded-2xl border-l-4 border-shreeja-orange bg-white/5 p-6 font-serif italic text-white/90">
          &ldquo;Choose cross-platform for standard data portals and consumer utilities; reserve native files for custom hardware-heavy tools.&rdquo;
        </blockquote>

        <h2 className="mt-10 font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
          3. Strategic Selection
        </h2>
        <p className="mt-4">
          For most startups, launching cross-platform is the recommended approach to validate product-market fit before allocating budgets to duplicate platform engineering loops.
        </p>
      </>
    ),
  },
};

export default async function BlogDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  const article = blogContentsMap[slug] || {
    author: "Shreeja Insights",
    authorRole: "Tech Contributor",
    content: <p>Detailed article contents are being compiled. Check back soon for guides and guidelines.</p>,
  };

  return (
    <div className="w-full">
      {/* 1. Header (Light Background) */}
      <div className="bg-shreeja-light pt-28">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-widest text-shreeja-dark/50 transition-colors duration-200 hover:text-shreeja-orange"
          >
            <ArrowLeft size={16} />
            Back to Blogs
          </Link>
        </div>
      </div>

      <PageHeader
        subtitle={`${post.date} • ${post.readTime}`}
        title="Blog"
        highlightedTitle="Article"
        description={post.title}
      />

      {/* 2. Article Body (Dark Navy Background) */}
      <section className="w-full bg-shreeja-navy-dark py-20 text-white">
        <div className="mx-auto max-w-4xl px-6">
          {/* Main Hero Image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
              priority
            />
          </div>

          {/* Author Block */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-8 font-body text-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-shreeja-orange/20 border border-shreeja-orange/30 flex items-center justify-center font-display font-semibold text-shreeja-orange text-xs uppercase">
                {article.author.slice(0, 2)}
              </div>
              <div>
                <h4 className="font-semibold text-white">{article.author}</h4>
                <p className="text-xs text-white/50">{article.authorRole}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-white/50 text-xs">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Rich Content Area */}
          <article className="prose prose-invert mt-12 max-w-none font-body text-base leading-relaxed text-white/70">
            {article.content}
          </article>

          {/* Back Nav Link at bottom */}
          <div className="mt-16 border-t border-white/10 pt-8 flex items-center justify-between">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-white/50 transition-colors duration-200 hover:text-shreeja-orange"
            >
              <ArrowLeft size={16} />
              Read Other Articles
            </Link>
            
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-shreeja-orange transition-colors duration-200 hover:text-white"
            >
              Talk to Our Team
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Newsletter / Contact Form at Bottom */}
      <ContactForm />
    </div>
  );
}
