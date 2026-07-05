import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyClient from "@/components/CaseStudyClient";
import { projects } from "@/utils/constants";
import fs from "fs";
import path from "path";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const dbPath = path.join(process.cwd(), "src", "data", "db.json");
  try {
    const fileData = fs.readFileSync(dbPath, "utf-8");
    const db = JSON.parse(fileData);
    if (db.projects) {
      return db.projects.map((project: any) => ({
        slug: project.slug,
      }));
    }
  } catch {}
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const dbPath = path.join(process.cwd(), "src", "data", "db.json");
  let allProjects = projects;
  try {
    const fileData = fs.readFileSync(dbPath, "utf-8");
    const db = JSON.parse(fileData);
    if (db.projects) {
      allProjects = db.projects;
    }
  } catch {}

  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} Case Study | Shreeja Digital Agency`,
    description: `Case study details, design systems, and business metrics achieved for ${project.title}.`,
  };
}

// Case study contents (Server representations)
const serverCaseStudyContents: Record<
  string,
  {
    client: string;
    timeline: string;
    subhead: string;
    challenge: string;
    challengeMetrics: { label: string; value: string }[];
    approach: string;
    solutionPoints: { title: string; desc: string; iconKey: string }[];
    results: { label: string; value: string; desc: string }[];
  }
> = {
  "specials-today": {
    client: "Specials Today Inc.",
    timeline: "12 Weeks (Q1 2026)",
    subhead: "reducing retail food waste through real-time notifications.",
    challenge: "Restaurants throw away fresh surplus meals daily because there is no direct channel to notify nearby diners before closing. The challenge was building an instant matching engine that updates listings within seconds and handles flash traffic bursts.",
    challengeMetrics: [
      { label: "Surplus Food Waste", value: "35% Avg" },
      { label: "Partner Outlets", value: "40+" },
      { label: "Notify Latency", value: "> 10m" },
    ],
    approach: "We designed a lightweight serverless Next.js edge API and dynamic maps layout. Users subscribe to their favorite eateries and receive push alerts the moment a listing is posted, with integrated Apple Pay checkouts.",
    solutionPoints: [
      { title: "Geo-Fenced Search", desc: "Allows consumers to find hot deals within a 2km walking radius.", iconKey: "Target" },
      { title: "Dynamic Feed", desc: "Live listings synchronized with edge databases to update instant quantities.", iconKey: "Zap" },
      { title: "One-Tap Claim", desc: "Frictionless checkout reservation flows built on Apple & Google Pay.", iconKey: "ShieldCheck" },
    ],
    results: [
      { label: "4.2 Tons", value: "Waste Saved", desc: "Estimated food surplus saved in first 90 days." },
      { label: "+18%", value: "Store Margin", desc: "Eateries recouped cost margins on unsold stocks." },
      { label: "15,000+", value: "Active Users", desc: "Local diners claiming active daily specials." },
    ],
  },
  "centrum-academy": {
    client: "Centrum Academy Group",
    timeline: "16 Weeks (Q4 2025)",
    subhead: "streamlining digital learning systems for classrooms.",
    challenge: "Centrum needed to migrate legacy tutoring schedules, assignment submissions, and grade tracking out of scattered emails into a secure, single-pane web dashboard for students, parents, and instructors.",
    challengeMetrics: [
      { label: "Manual Email Tasks", value: "15 hrs/wk" },
      { label: "Active Cohorts", value: "12" },
      { label: "Assignment Lag", value: "5 Days" },
    ],
    approach: "Designed a clean dashboard portal utilizing strict TypeScript interfaces and PostgreSQL databases. Integrated a real-time web socket chat engine for parent-teacher notes and file storage for uploads.",
    solutionPoints: [
      { title: "Gradebook Logs", desc: "Encrypted student grades and tutor feedback reports accessible instantly.", iconKey: "ShieldCheck" },
      { title: "Lecture Tracks", desc: "Live streaming schedules and offline class recordings library.", iconKey: "Cpu" },
      { title: "Class Calendar", desc: "Interactive calendar syncing class timings directly to mobile utilities.", iconKey: "Layout" },
    ],
    results: [
      { label: "-85%", value: "Admin Tasks", desc: "Reduced weekly manual cohort coordination hours." },
      { label: "98.2%", value: "On-time Uploads", desc: "Homework submission rates after system notification alerts." },
      { label: "3,200+", value: "Enrollments", desc: "Students actively logging in for resources." },
    ],
  },
  "meridian-studio": {
    client: "Meridian Architecture Studio",
    timeline: "8 Weeks (Q2 2026)",
    subhead: "creating an immersive canvas for design aesthetics.",
    challenge: "Meridian, a premium architecture firm, had a slow website that compressed and distorted high-resolution render photography, failing to communicate the physical depth and material details of their builds.",
    challengeMetrics: [
      { label: "Page Load Speed", value: "5.4s" },
      { label: "Image Weight", value: "8.5MB" },
      { label: "User Bounce Rate", value: "58%" },
    ],
    approach: "Developed a canvas layout utilizing Next.js custom image loaders, asset optimization pipelines, and WebP compression. Added subtle GSAP scroll-triggered parallax effects to mimic spatial depth.",
    solutionPoints: [
      { title: "Asset Optimizer", desc: "Compresses large architectural renders into tiny, crisp WebP images.", iconKey: "Cpu" },
      { title: "Smooth Parallax", desc: "Adds responsive parallax offsets to structural images on scroll.", iconKey: "Sparkles" },
      { title: "Clean Layout", desc: "Minimalist layout with hidden menus to prioritize graphic visuals.", iconKey: "Layout" },
    ],
    results: [
      { label: "98/100", value: "PageSpeed Score", desc: "Google Lighthouse mobile performance grade score." },
      { label: "-70%", value: "Bounce Rate", desc: "Drastic drop in site exit rates after layout rebuild." },
      { label: "3.2MB", value: "Data Saved", desc: "Average data weight saved per gallery session load." },
    ],
  },
  "urban-threads": {
    client: "Urban Threads Clothing",
    timeline: "14 Weeks (Q3 2025)",
    subhead: "building standard-setting e-commerce shopping.",
    challenge: "The brand's conversion rates were dropping due to a slow, multi-page checkout flow and lack of visual product filter adjustments on catalog sizes and color pairings.",
    challengeMetrics: [
      { label: "Cart Abandonment", value: "72%" },
      { label: "Catalog Filter time", value: "3.2s" },
      { label: "Mobile Conversions", value: "1.4%" },
    ],
    approach: "Designed a single-page checkout flow integrated with Stripe, Apple Pay, and PayPal. Created a client-side search indexing catalog filter using React state variables to update listings instantly.",
    solutionPoints: [
      { title: "Instant Filter", desc: "Filter sizes, colors, and pricing ranges in under 5 milliseconds.", iconKey: "Target" },
      { title: "Express Cart", desc: "Slide-out drawer cart with direct guest checkout integrations.", iconKey: "Zap" },
      { title: "Secure Checkout", desc: "PCI-compliant payment gateways with secure fraud filters.", iconKey: "ShieldCheck" },
    ],
    results: [
      { label: "+45%", value: "Conversions", desc: "Increase in checkout conversion rates on mobile devices." },
      { label: "-35%", value: "Cart Abandons", desc: "Drop in empty cart exits using express drawers." },
      { label: "12,000+", value: "Sales/Month", desc: "Orders successfully processed without system faults." },
    ],
  },
  "growthlab": {
    client: "GrowthLab Analytics",
    timeline: "10 Weeks (Q1 2026)",
    subhead: "consolidating customer acquisition metrics.",
    challenge: "SaaS client teams were wasting time compiling user acquisition data, conversion funnels, and ad spend values from three separate dashboards into a weekly Excel spreadsheet.",
    challengeMetrics: [
      { label: "Reporting Hours", value: "6 hrs/wk" },
      { label: "API Sync Sync Latency", value: "24 hrs" },
      { label: "Data Discrepancies", value: "12%" },
    ],
    approach: "Developed an API aggregator dashboard utilizing React charts and Tailwind CSS. Scheduled Cron scripts to pull data from Facebook Ads, Google Ads, and Stripe hourly, displaying metrics on clean graphs.",
    solutionPoints: [
      { title: "Aggregator APIs", desc: "Consolidates Stripe, Meta, and Google data into a single datastore.", iconKey: "Cpu" },
      { title: "Live Charts", desc: "Responsive visual bar charts illustrating sales and costs.", iconKey: "Layout" },
      { title: "Scheduled Alerting", desc: "Telegram and Slack alerts detailing daily target acquisition gains.", iconKey: "Zap" },
    ],
    results: [
      { label: "10 Min", value: "Compile Time", desc: "Acquisition compile time dropped from hours to seconds." },
      { label: "0%", value: "Data Errors", desc: "Eliminated manual input copy-paste typing errors." },
      { label: "80+", value: "Team Users", desc: "Product marketers tracking campaign budgets live." },
    ],
  },
  "pumpkin-store": {
    client: "Pumpkin Store Grocery",
    timeline: "12 Weeks (Q2 2026)",
    subhead: "automating organic subscription deliveries.",
    challenge: "A farm-to-table organic grocery vendor needed an automated subscription engine allowing local shoppers to customize their weekly produce boxes and adjust delivery calendars.",
    challengeMetrics: [
      { label: "Phone Order Times", value: "18 mins" },
      { label: "Route Errors", value: "8%" },
      { label: "Customer Churn", value: "14%" },
    ],
    approach: "Built a customized Shopify headless storefront with a React interface. Designed a delivery calendar selector integrated with Mapbox routing vectors for optimized farm pickups.",
    solutionPoints: [
      { title: "Box Customizer", desc: "Drag-and-drop React tool to swap fruits and vegetables.", iconKey: "Layout" },
      { title: "Mapbox Router", desc: "Optimizes delivery routes and sends instant drop tracking links.", iconKey: "Target" },
      { title: "Autopay Setup", desc: "Monthly Stripe billing profiles with click-to-pause delivery toggles.", iconKey: "ShieldCheck" },
    ],
    results: [
      { label: "92%", value: "Online Orders", desc: "Phone order workflows shifted entirely to online portals." },
      { label: "0", value: "Route Misses", desc: "Mapbox routing vectors reduced manual drop mistakes." },
      { label: "2,500+", value: "Subscriptions", desc: "Local families receiving fresh weekly crop boxes." },
    ],
  },
};

export default async function PortfolioDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  
  const dbPath = path.join(process.cwd(), "src", "data", "db.json");
  let allProjects = projects;
  try {
    const fileData = fs.readFileSync(dbPath, "utf-8");
    const db = JSON.parse(fileData);
    if (db.projects) {
      allProjects = db.projects;
    }
  } catch {}

  const project = allProjects.find((p) => p.slug === slug);
  
  if (!project) {
    notFound();
  }

  // Generate / retrieve case study details
  const study = serverCaseStudyContents[slug] || {
    client: project.client || project.title,
    timeline: project.timeline || "8 Weeks",
    subhead: `delivering tailored ${project.category.toLowerCase()} solutions.`,
    challenge: project.challenge || `The client required a modern, highly functional ${project.category.toLowerCase()} project built with best practices and speed optimizations.`,
    challengeMetrics: [
      { label: "Performance Score", value: "98/100" },
      { label: "SEO Grade", value: "A+" },
      { label: "Load Velocity", value: "1.2s" },
    ],
    approach: project.approach || "We designed dynamic custom layouts, engineered lightweight react states, optimized image caching, and set up edge routing layers.",
    solutionPoints: [
      { title: "Optimized Stack", desc: "Built on high-performance framework structures.", iconKey: "Cpu" },
      { title: "Visual Flow", desc: "Dynamic aesthetics crafted to captivate users.", iconKey: "Layout" },
    ],
    results: [
      { label: "100%", value: "Satisfaction", desc: "Project met and exceeded business expectations." },
      { label: "2x", value: "Performance", desc: "Load speeds optimized to under 1.5 seconds." },
    ],
  };

  return <CaseStudyClient project={project} study={study} />;
}
