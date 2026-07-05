import {
  Code2,
  Smartphone,
  PenTool,
  Megaphone,
  Fingerprint,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export interface Stage {
  number: string;
  label: string;
  headline: string;
  description: string;
  tags: string[];
}

export const stages: Stage[] = [
  {
    number: "01",
    label: "Chapter One",
    headline: "Discover",
    description: "We listen carefully to understand your goals and vision.",
    tags: ["Listen", "Research", "Vision"],
  },
  {
    number: "02",
    label: "Chapter Two",
    headline: "Strategize",
    description: "Crafting a tailored plan that fits your unique needs.",
    tags: ["Planning", "Roadmap", "Milestones"],
  },
  {
    number: "03",
    label: "Chapter Three",
    headline: "Design",
    description: "Creating engaging visuals that speak your brand's story.",
    tags: ["UI/UX", "Visual identity", "Storytelling"],
  },
  {
    number: "04",
    label: "Chapter Four",
    headline: "Develop",
    description: "Building seamless, user-friendly websites and apps.",
    tags: ["Web", "Mobile", "Performance"],
  },
  {
    number: "05",
    label: "Chapter Five",
    headline: "Launch",
    description: "Delivering your project with care, plus ongoing help.",
    tags: ["Deployment", "Support", "Growth"],
  },
];

export interface Service {
  number: string;
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
  detail: string;
  tags: string[];
}

export const services: Service[] = [
  {
    number: "01",
    slug: "web-development",
    icon: Code2,
    title: "Web Development",
    description: "Responsive websites crafted for seamless experiences.",
    detail:
      "We build fast, accessible sites on modern frameworks, tuned for every screen size and built to scale as your business grows.",
    tags: ["Landing Pages", "E-commerce", "CMS Integration"],
  },
  {
    number: "02",
    slug: "mobile-app-development",
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Intuitive mobile apps designed for engagement and growth.",
    detail:
      "From concept to app store, we design and build native-feeling mobile experiences that keep people coming back.",
    tags: ["iOS", "Android", "Cross-platform"],
  },
  {
    number: "03",
    slug: "ui-ux-design",
    icon: PenTool,
    title: "UI/UX Design",
    description:
      "Creative, user-focused designs that blend beauty and functionality.",
    detail:
      "Every interface starts with research into how real people will use it, then gets refined until it feels effortless.",
    tags: ["Wireframing", "Prototyping", "Design Systems"],
  },
  {
    number: "04",
    slug: "digital-marketing",
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "Strategic campaigns that boost your brand's reach and impact.",
    detail:
      "We plan and run campaigns across the channels that matter to your audience, measured against real business goals.",
    tags: ["Social Media", "Paid Ads", "Content Strategy"],
  },
  {
    number: "05",
    slug: "branding-logo-design",
    icon: Fingerprint,
    title: "Branding & Logo Design",
    description: "Create a strong and memorable brand presence.",
    detail:
      "From logo to full visual identity, we shape a brand that's instantly recognizable and consistent everywhere it shows up.",
    tags: ["Logo Design", "Visual Identity", "Brand Guidelines"],
  },
  {
    number: "06",
    slug: "seo",
    icon: TrendingUp,
    title: "SEO",
    description: "Improve visibility and rank higher with smart SEO strategies.",
    detail:
      "We audit, optimize, and track performance so your site is found by the people already searching for what you offer.",
    tags: ["Technical SEO", "Keyword Strategy", "Analytics"],
  },
];

export interface Office {
  country: string;
  email: string;
  phone: string;
  address: string;
}

export const offices: Office[] = [
  {
    country: "Australia",
    email: "contact@shreejadigital.com",
    phone: "+61 452 148 411",
    address: "Sydney, NSW, Australia",
  },
  {
    country: "Nepal",
    email: "contact@shreejadigital.com",
    phone: "+61 404 672 891",
    address: "Hetauda, Nepal",
  },
];

export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "What services does your digital agency offer?",
    answer:
      "We offer a comprehensive range of digital services including web design and development, mobile app development, UI/UX design, digital branding, digital marketing, and SEO optimization.",
  },
  {
    question: "How long does it typically take to complete a website project?",
    answer:
      "Timelines vary by scope, but most website projects take between 4 to 8 weeks from discovery to launch. We'll give you a clear timeline after our first conversation about your goals.",
  },
  {
    question: "What is your process for working with clients?",
    answer:
      "We follow a five-chapter process — Discover, Strategize, Design, Develop, and Launch — keeping you involved and informed at every stage.",
  },
  {
    question: "How do you price your services?",
    answer:
      "Pricing depends on the scope and complexity of your project. We provide a transparent, itemized quote after understanding your requirements, with no hidden fees.",
  },
  {
    question: "Do you provide ongoing maintenance and support?",
    answer:
      "Yes. Every project includes a support window after launch, and we offer ongoing maintenance plans to keep your site or app running smoothly.",
  },
  {
    question: "How do you measure the success of digital marketing campaigns?",
    answer:
      "We track the metrics that matter to your goals — traffic, conversions, engagement, and ROI — and share regular reports so you always know how campaigns are performing.",
  },
];

export interface Project {
  title: string;
  slug: string;
  category: string;
  image: string;
  href: string;
  client?: string;
  timeline?: string;
  challenge?: string;
  approach?: string;
}

export const projects: Project[] = [
  {
    title: "Specials Today",
    slug: "specials-today",
    category: "Web App Development",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    href: "/portfolio/specials-today",
  },
  {
    title: "Centrum Academy",
    slug: "centrum-academy",
    category: "Education Platform",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    href: "/portfolio/centrum-academy",
  },
  {
    title: "Meridian Studio",
    slug: "meridian-studio",
    category: "Architecture & Design",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    href: "/portfolio/meridian-studio",
  },
  {
    title: "Urban Threads",
    slug: "urban-threads",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    href: "/portfolio/urban-threads",
  },
  {
    title: "GrowthLab",
    slug: "growthlab",
    category: "Analytics Platform",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    href: "/portfolio/growthlab",
  },
  {
    title: "Pumpkin Store",
    slug: "pumpkin-store",
    category: "Retail E-Commerce",
    image: "https://images.unsplash.com/photo-1506869642237-a7be94709855?w=800&q=80",
    href: "/portfolio/pumpkin-store",
  },
];

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Why Next.js is the Ultimate Framework for SEO-Rich Websites",
    slug: "nextjs-seo-ultimate-framework",
    excerpt: "Discover how Next.js features like static rendering, server components, and image optimizations help agencies rank higher.",
    date: "July 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
  },
  {
    title: "10 Key UI/UX Principles to Maximize Landing Page Conversions",
    slug: "ui-ux-conversion-principles",
    excerpt: "Visual hierarchy, responsive grid structures, and clear calls-to-action can turn casual scroll behavior into qualified business leads.",
    date: "June 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&q=80",
  },
  {
    title: "Mobile App Development: Cross-Platform vs Native Solutions",
    slug: "mobile-app-crossplatform-vs-native",
    excerpt: "Compare React Native, Flutter, and Swift/Kotlin approaches to select the ideal timeline and budget strategy for your business mobile launch.",
    date: "May 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
  },
];
