import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import ContactForm from "@/components/ContactForm";
import { services, projects } from "@/utils/constants";
import fs from "fs";
import path from "path";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const dbPath = path.join(process.cwd(), "src", "data", "db.json");
  try {
    const fileData = fs.readFileSync(dbPath, "utf-8");
    const db = JSON.parse(fileData);
    if (db.services) {
      return db.services.map((service: any) => ({
        slug: service.slug,
      }));
    }
  } catch {}
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const dbPath = path.join(process.cwd(), "src", "data", "db.json");
  let allServices = services;
  try {
    const fileData = fs.readFileSync(dbPath, "utf-8");
    const db = JSON.parse(fileData);
    if (db.services) {
      allServices = db.services;
    }
  } catch {}

  const service = allServices.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: `${service.title} | Shreeja Digital Agency`,
    description: service.description,
  };
}

// Custom detailed features for each service slug
const serviceFeaturesMap: Record<string, { subtitle: string; points: string[] }> = {
  "web-development": {
    subtitle: "High-Performance Engineering",
    points: [
      "Custom Next.js & React architectures optimized for speed and indexing.",
      "Headless CMS integration (Sanity, Strapi) for fluid content editing.",
      "Fully responsive design for mobiles, tablets, and desktops.",
      "Fast page loads via Edge CDN deployments and smart asset caching.",
      "E-commerce architectures utilizing secure gateways and custom checkouts.",
    ],
  },
  "mobile-app-development": {
    subtitle: "Seamless Mobile Experience",
    points: [
      "Cross-platform applications engineered in React Native and Flutter.",
      "Native device integration (Camera, GPS, FaceID, Push Notifications).",
      "Offline-first databases allowing seamless functionality anywhere.",
      "App Store & Google Play submission and approval management.",
      "Fluid page transitions and intuitive gestures matching OS guides.",
    ],
  },
  "ui-ux-design": {
    subtitle: "User-Centered Interfaces",
    points: [
      "In-depth user research, customer persona mapping, and empathy audits.",
      "Interactive high-fidelity prototypes demonstrating real user flows.",
      "Comprehensive typography, color guidelines, and design systems.",
      "Visual page layouts structured to guide eyes and drive conversions.",
      "Usability testing and iterations to remove interaction friction.",
    ],
  },
  "digital-marketing": {
    subtitle: "Growth-Oriented Campaigns",
    points: [
      "Paid advertising management across Google Search and Meta Ads.",
      "Organic social media templates and targeted content calendars.",
      "Conversion Rate Optimization (CRO) to maximize your landing traffic.",
      "Advanced attribution tracking to monitor lead acquisition costs.",
      "Email marketing automations built to nurture prospects to sales.",
    ],
  },
  "branding-logo-design": {
    subtitle: "Memorable Identity Systems",
    points: [
      "Custom logo vector marks that reflect your brand values and goals.",
      "Color palettes and typeface pairs curated for cohesive messaging.",
      "Social media assets, letterheads, and stationery mockups.",
      "A digital Brand Guidelines document ensuring consistency everywhere.",
      "Competitor landscape positioning audits to ensure visual standout.",
    ],
  },
  seo: {
    subtitle: "Organic Search Domination",
    points: [
      "Comprehensive technical audits resolving crawler index blocks.",
      "Strategic keyword research matching high-intent customer searches.",
      "On-page optimization including metadata, titles, and schema tags.",
      "Content strategy blueprints to build domain authority.",
      "Monthly search ranking reports and key metric analysis logs.",
    ],
  },
};

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  
  const dbPath = path.join(process.cwd(), "src", "data", "db.json");
  let allServices = services;
  let allProjects = projects;
  try {
    const fileData = fs.readFileSync(dbPath, "utf-8");
    const db = JSON.parse(fileData);
    if (db.services) {
      allServices = db.services;
    }
    if (db.projects) {
      allProjects = db.projects;
    }
  } catch {}

  const service = allServices.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }

  const features = serviceFeaturesMap[slug] || {
    subtitle: "Professional Services",
    points: [
      "Tailored strategies aligned with your direct business metrics.",
      "Experienced developers and designers running every stage.",
      "Clear timelines, milestones tracking, and transparent reporting.",
    ],
  };

  // Find some relevant portfolio projects (or fallback to general ones)
  const relatedProjects = allProjects.slice(0, 3);

  return (
    <div className="w-full">
      
      {/* 1. Header Block (Light Theme) */}
      <div className="bg-shreeja-light pt-28">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-widest text-shreeja-dark/50 transition-colors duration-200 hover:text-shreeja-orange"
          >
            <ArrowLeft size={16} />
            Back to Services
          </Link>
        </div>
      </div>

      <PageHeader
        subtitle={`Service ${service.number}`}
        title={service.title}
        highlightedTitle={service.description}
        description={service.detail}
      />

      {/* 2. Feature Split Layout (Dark Theme) */}
      <section className="w-full bg-shreeja-navy-dark py-24 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            
            {/* Left Column: What's Included */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 sm:p-12 animate-float">
              <span className="font-body text-xs font-semibold uppercase tracking-widest text-shreeja-orange">
                {features.subtitle}
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold uppercase text-white sm:text-3xl">
                What We Deliver
              </h2>
              <div className="mt-8 flex flex-col gap-6">
                {features.points.map((point) => (
                  <div key={point} className="flex gap-4">
                    <CheckCircle2 size={20} className="mt-1 shrink-0 text-shreeja-orange" />
                    <p className="font-body text-sm leading-relaxed text-white/70">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Dynamic Inquiry CTA */}
            <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-white/0 p-8 sm:p-12 text-center lg:text-left">
              <h3 className="font-display text-3xl font-bold leading-tight text-white">
                Ready to build something remarkable?
              </h3>
              <p className="mt-4 font-body text-base font-normal leading-relaxed text-white/60">
                Partner with our engineers and designers in Australia and Nepal. We&apos;ll outline a clear action plan, define scope boundaries, and provide a transparent quote.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  href="/contact"
                  className="group flex items-center gap-2 rounded-full bg-shreeja-orange px-8 py-4 font-body text-base font-semibold text-white shadow-lg shadow-shreeja-orange/30 transition-colors duration-200 hover:bg-shreeja-orange-light"
                >
                  Get Started
                  <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/services"
                  className="font-body text-sm font-semibold text-white/70 transition-colors duration-200 hover:text-white"
                >
                  Compare Other Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 Pricing Tiers Section */}
      {service.priceStarter && (
        <section className="w-full bg-shreeja-navy py-24 text-white border-t border-white/5">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="font-body text-sm font-medium uppercase tracking-widest text-shreeja-orange">
                Transparent Pricing
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
                Choose the Right Tier
              </h2>
              <p className="mt-2 font-body text-sm text-white/50">
                Simple, predictable options tailored to your project scope.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {/* Starter Package Card */}
              <div className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:border-shreeja-orange/30 hover:bg-white/10">
                <div>
                  <span className="font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                    Starter Package
                  </span>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold text-white">
                      {service.priceStarter}
                    </span>
                  </div>
                  <p className="mt-4 font-body text-xs text-white/50 leading-relaxed">
                    Perfect for startups and simple business validation projects.
                  </p>
                  
                  <div className="mt-8 border-t border-white/5 pt-6">
                    <span className="font-body text-xs font-semibold uppercase tracking-wider text-shreeja-orange">
                      What&apos;s Included:
                    </span>
                    <div className="mt-4 flex flex-col gap-3">
                      {service.featuresStarter?.map((feat: string) => (
                        <div key={feat} className="flex items-center gap-3">
                          <CheckCircle2 size={16} className="text-shreeja-orange shrink-0" />
                          <span className="font-body text-xs text-white/80">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="block w-full text-center rounded-lg border border-white/10 bg-white/5 py-3 font-body text-xs font-semibold text-white transition-colors hover:border-shreeja-orange hover:bg-shreeja-orange"
                  >
                    Select Starter Plan
                  </Link>
                </div>
              </div>

              {/* Pro Package Card */}
              <div className="group relative flex flex-col justify-between rounded-2xl border-2 border-shreeja-orange bg-shreeja-navy-dark p-8 shadow-xl shadow-shreeja-orange/5">
                <span className="absolute -top-3.5 left-8 rounded-full bg-shreeja-orange px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-white">
                  Most Popular
                </span>
                <div>
                  <span className="font-body text-xs font-semibold uppercase tracking-widest text-white/60">
                    Professional Package
                  </span>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold text-white">
                      {service.pricePro}
                    </span>
                  </div>
                  <p className="mt-4 font-body text-xs text-white/50 leading-relaxed">
                    Designed for growing businesses requiring custom integrations and scale.
                  </p>

                  <div className="mt-8 border-t border-white/5 pt-6">
                    <span className="font-body text-xs font-semibold uppercase tracking-wider text-shreeja-orange">
                      What&apos;s Included:
                    </span>
                    <div className="mt-4 flex flex-col gap-3">
                      {service.featuresPro?.map((feat: string) => (
                        <div key={feat} className="flex items-center gap-3">
                          <CheckCircle2 size={16} className="text-shreeja-orange shrink-0" />
                          <span className="font-body text-xs text-white/80">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="block w-full text-center rounded-lg bg-shreeja-orange py-3 font-body text-xs font-semibold text-white transition-colors hover:bg-shreeja-orange-light shadow-md shadow-shreeja-orange/20"
                  >
                    Select Professional Plan
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Case Studies Teaser (Light Theme) */}
      <section className="w-full bg-shreeja-light py-24 text-shreeja-navy">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center sm:text-left">
            <span className="font-body text-sm font-medium uppercase tracking-widest text-shreeja-orange">
              Case Studies
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase text-shreeja-navy sm:text-4xl">
              Related Projects
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((project) => (
              <div
                key={project.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-shreeja-navy/10 bg-white p-3 shadow-xs transition-all duration-300 hover:border-shreeja-orange/30 hover:shadow-md"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-shreeja-navy-dark">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <span className="font-body text-xs font-semibold uppercase tracking-wider text-shreeja-orange">
                      {project.category}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-semibold text-shreeja-navy">
                      {project.title}
                    </h3>
                  </div>
                  <div className="mt-6">
                    <Link
                      href={project.href}
                      className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-shreeja-navy transition-colors duration-200 hover:text-shreeja-orange"
                    >
                      View Case Study
                      <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Embedded Contact Form at Bottom (Dark Theme) */}
      <ContactForm />
    </div>
  );
}
