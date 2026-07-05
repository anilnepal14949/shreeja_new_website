"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderKanban,
  FileText,
  Mail,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  X
} from "lucide-react";

interface Project {
  title: string;
  slug: string;
  category: string;
  image: string;
  href: string;
}

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  content?: string;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  date: string;
  read: boolean;
}

type TabType = "overview" | "portfolio" | "blogs" | "inquiries";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [loading, setLoading] = useState(true);

  // Database states
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // Modal control states
  const [projectModal, setProjectModal] = useState<{
    open: boolean;
    mode: "add" | "edit";
    index?: number;
    title: string;
    slug: string;
    category: string;
    image: string;
  }>({
    open: false,
    mode: "add",
    title: "",
    slug: "",
    category: "",
    image: ""
  });

  const [blogModal, setBlogModal] = useState<{
    open: boolean;
    mode: "add" | "edit";
    index?: number;
    title: string;
    slug: string;
    excerpt: string;
    date: string;
    readTime: string;
    image: string;
    content: string;
  }>({
    open: false,
    mode: "add",
    title: "",
    slug: "",
    excerpt: "",
    date: "",
    readTime: "",
    image: "",
    content: ""
  });

  const [inquiryModal, setInquiryModal] = useState<{
    open: boolean;
    inquiry: Inquiry | null;
  }>({
    open: false,
    inquiry: null
  });

  // Fetch data with LocalStorage synchronization fallback
  const fetchDatabase = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/db");
      if (res.ok) {
        const db = await res.json();
        
        // Sync local storage if present, or initialize
        const localProjects = localStorage.getItem("shreeja_projects");
        const localBlogs = localStorage.getItem("shreeja_blogs");
        const localInquiries = localStorage.getItem("shreeja_inquiries");

        if (localProjects) setProjects(JSON.parse(localProjects) as Project[]);
        else {
          setProjects(db.projects || []);
          localStorage.setItem("shreeja_projects", JSON.stringify(db.projects || []));
        }

        if (localBlogs) setBlogs(JSON.parse(localBlogs) as BlogPost[]);
        else {
          setBlogs(db.blogs || []);
          localStorage.setItem("shreeja_blogs", JSON.stringify(db.blogs || []));
        }

        if (localInquiries) setInquiries(JSON.parse(localInquiries) as Inquiry[]);
        else {
          setInquiries(db.inquiries || []);
          localStorage.setItem("shreeja_inquiries", JSON.stringify(db.inquiries || []));
        }
      }
    } catch {
      // Offline / LocalStorage only mode
      const localProjects = localStorage.getItem("shreeja_projects");
      const localBlogs = localStorage.getItem("shreeja_blogs");
      const localInquiries = localStorage.getItem("shreeja_inquiries");

      if (localProjects) setProjects(JSON.parse(localProjects) as Project[]);
      if (localBlogs) setBlogs(JSON.parse(localBlogs) as BlogPost[]);
      if (localInquiries) setInquiries(JSON.parse(localInquiries) as Inquiry[]);
    } finally {
      setLoading(false);
    }
  };

  // Verify auth session
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("shreeja_admin_logged_in") === "true";
    if (!isLoggedIn) {
      router.push("/admin/login");
    } else {
      setTimeout(() => {
        fetchDatabase();
      }, 0);
    }
  }, [router]);

  // Sync to backend file system (optional) and localstorage (mandatory for demos)
  const saveState = async (
    type: "projects" | "blogs" | "inquiries",
    updatedData: Project[] | BlogPost[] | Inquiry[]
  ) => {
    // 1. Sync LocalStorage immediately
    localStorage.setItem(`shreeja_${type}`, JSON.stringify(updatedData));

    // 2. Sync to API route handler
    try {
      const actionMap: Record<"projects" | "blogs" | "inquiries", string> = {
        projects: "saveProjects",
        blogs: "saveBlogs",
        inquiries: "saveInquiries"
      };

      await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: actionMap[type],
          data: updatedData
        })
      });
    } catch (e) {
      console.warn("Backend sync not available. Data saved locally in browser.", e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("shreeja_admin_logged_in");
    router.push("/admin/login");
  };

  // --- Portfolio CRUD operations ---
  const handleAddProject = () => {
    setProjectModal({
      open: true,
      mode: "add",
      title: "",
      slug: "",
      category: "",
      image: ""
    });
  };

  const handleEditProject = (index: number) => {
    const p = projects[index];
    setProjectModal({
      open: true,
      mode: "edit",
      index,
      title: p.title,
      slug: p.slug,
      category: p.category,
      image: p.image
    });
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const slugified = projectModal.slug || projectModal.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const updatedProject: Project = {
      title: projectModal.title,
      slug: slugified,
      category: projectModal.category,
      image: projectModal.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      href: `/portfolio/${slugified}`
    };

    let updatedProjects = [...projects];
    if (projectModal.mode === "add") {
      updatedProjects = [updatedProject, ...projects];
    } else if (projectModal.mode === "edit" && projectModal.index !== undefined) {
      updatedProjects[projectModal.index] = updatedProject;
    }

    setProjects(updatedProjects);
    saveState("projects", updatedProjects);
    setProjectModal({ ...projectModal, open: false });
  };

  const handleDeleteProject = (index: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const updatedProjects = projects.filter((_, i) => i !== index);
      setProjects(updatedProjects);
      saveState("projects", updatedProjects);
    }
  };

  // --- Blogs CRUD operations ---
  const handleAddBlog = () => {
    setBlogModal({
      open: true,
      mode: "add",
      title: "",
      slug: "",
      excerpt: "",
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      readTime: "5 min read",
      image: "",
      content: ""
    });
  };

  const handleEditBlog = (index: number) => {
    const b = blogs[index];
    setBlogModal({
      open: true,
      mode: "edit",
      index,
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      date: b.date,
      readTime: b.readTime,
      image: b.image,
      content: b.content || ""
    });
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const slugified = blogModal.slug || blogModal.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const updatedBlog: BlogPost = {
      title: blogModal.title,
      slug: slugified,
      excerpt: blogModal.excerpt,
      date: blogModal.date,
      readTime: blogModal.readTime,
      image: blogModal.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
      content: blogModal.content
    };

    let updatedBlogs = [...blogs];
    if (blogModal.mode === "add") {
      updatedBlogs = [updatedBlog, ...blogs];
    } else if (blogModal.mode === "edit" && blogModal.index !== undefined) {
      updatedBlogs[blogModal.index] = updatedBlog;
    }

    setBlogs(updatedBlogs);
    saveState("blogs", updatedBlogs);
    setBlogModal({ ...blogModal, open: false });
  };

  const handleDeleteBlog = (index: number) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      const updatedBlogs = blogs.filter((_, i) => i !== index);
      setBlogs(updatedBlogs);
      saveState("blogs", updatedBlogs);
    }
  };

  // --- Inquiries Operations ---
  const handleViewInquiry = (inquiry: Inquiry) => {
    setInquiryModal({ open: true, inquiry });
    
    // Mark as read automatically
    if (!inquiry.read) {
      const updatedInquiries = inquiries.map((item) =>
        item.id === inquiry.id ? { ...item, read: true } : item
      );
      setInquiries(updatedInquiries);
      saveState("inquiries", updatedInquiries);
    }
  };

  const handleDeleteInquiry = (id: string) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      const updatedInquiries = inquiries.filter((item) => item.id !== id);
      setInquiries(updatedInquiries);
      saveState("inquiries", updatedInquiries);
      if (inquiryModal.inquiry?.id === id) {
        setInquiryModal({ open: false, inquiry: null });
      }
    }
  };

  const handleMarkAllRead = () => {
    const updatedInquiries = inquiries.map((item) => ({ ...item, read: true }));
    setInquiries(updatedInquiries);
    saveState("inquiries", updatedInquiries);
  };

  const unreadCount = inquiries.filter((item) => !item.read).length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-shreeja-navy-dark text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-shreeja-orange border-t-transparent" />
          <p className="font-body text-sm font-semibold tracking-wider uppercase text-white/60">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-shreeja-navy-dark text-white">
      {/* Sidebar Navigation */}
      <aside className="hidden w-72 shrink-0 border-r border-white/5 bg-shreeja-navy p-8 xl:flex xl:flex-col">
        {/* Brand Header */}
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-shreeja-light px-2.5 py-1.5 shadow-sm">
            <Image
              src="/logo_resized.png"
              alt="Shreeja Digital"
              width={120}
              height={37}
              priority
              className="h-6 w-auto"
            />
          </div>
        </div>
        <p className="mt-2 pl-1 font-body text-xs font-semibold uppercase tracking-wider text-white/40">
          Website Management
        </p>

        {/* Navigation list */}
        <nav className="mt-12 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-4 rounded-lg px-4 py-3.5 font-body text-sm font-semibold tracking-wide transition-all ${
              activeTab === "overview"
                ? "bg-shreeja-orange text-white shadow-lg shadow-shreeja-orange/20"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <TrendingUp size={18} />
            Overview
          </button>

          <button
            onClick={() => setActiveTab("portfolio")}
            className={`flex items-center gap-4 rounded-lg px-4 py-3.5 font-body text-sm font-semibold tracking-wide transition-all ${
              activeTab === "portfolio"
                ? "bg-shreeja-orange text-white shadow-lg shadow-shreeja-orange/20"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <FolderKanban size={18} />
            Manage Portfolio
          </button>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`flex items-center gap-4 rounded-lg px-4 py-3.5 font-body text-sm font-semibold tracking-wide transition-all ${
              activeTab === "blogs"
                ? "bg-shreeja-orange text-white shadow-lg shadow-shreeja-orange/20"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <FileText size={18} />
            Manage Blogs
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`flex items-center justify-between rounded-lg px-4 py-3.5 font-body text-sm font-semibold tracking-wide transition-all ${
              activeTab === "inquiries"
                ? "bg-shreeja-orange text-white shadow-lg shadow-shreeja-orange/20"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-4">
              <Mail size={18} />
              Inquiries
            </div>
            {unreadCount > 0 && (
              <span className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold leading-none ${
                activeTab === "inquiries" ? "bg-white text-shreeja-orange" : "bg-shreeja-orange text-white"
              }`}>
                {unreadCount}
              </span>
            )}
          </button>
        </nav>

        {/* Footer actions */}
        <div className="mt-auto border-t border-white/5 pt-6">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-4 py-3 font-body text-xs font-semibold text-white/50 hover:bg-white/5 hover:text-white"
          >
            <ExternalLink size={16} />
            Visit Live Site
          </Link>
          <button
            onClick={handleLogout}
            className="mt-2 flex w-full items-center gap-3 rounded-lg px-4 py-3 font-body text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut size={16} />
            Log Out Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header (Mobile version navbar trigger & breadcrumbs) */}
        <header className="flex h-20 items-center justify-between border-b border-white/5 px-6 sm:px-8 bg-shreeja-navy-dark/60 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3 xl:hidden">
            <div className="rounded bg-shreeja-light px-2 py-1">
              <Image
                src="/logo_resized.png"
                alt="Shreeja Digital"
                width={80}
                height={25}
                className="h-5 w-auto"
              />
            </div>
            <span className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Admin
            </span>
          </div>

          <div className="hidden items-center gap-2 font-body text-xs font-bold uppercase tracking-wider text-white/40 xl:flex">
            <span>Admin Control Panel</span>
            <ChevronRight size={14} />
            <span className="text-white">{activeTab}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2 font-body text-xs font-semibold hover:bg-white/5 xl:hidden"
            >
              <LogOut size={14} />
              Exit
            </button>
          </div>
        </header>

        {/* Content Wrapper */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="flex flex-col gap-8">
              <div>
                <h1 className="font-display text-3xl font-bold uppercase tracking-tight">
                  Welcome to Dashboard
                </h1>
                <p className="mt-1 font-body text-sm text-white/50">
                  Quick metrics summary and recent inquiry feed
                </p>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div
                  onClick={() => setActiveTab("portfolio")}
                  className="group cursor-pointer rounded-xl border border-white/10 bg-white/5 p-6 hover:border-shreeja-orange/30 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm font-semibold uppercase tracking-wider text-white/50 group-hover:text-white/70">
                      Portfolio Projects
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-shreeja-orange/10 text-shreeja-orange group-hover:bg-shreeja-orange group-hover:text-white transition-all">
                      <FolderKanban size={20} />
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-4xl font-bold tracking-tight">
                    {projects.length}
                  </h3>
                </div>

                <div
                  onClick={() => setActiveTab("blogs")}
                  className="group cursor-pointer rounded-xl border border-white/10 bg-white/5 p-6 hover:border-shreeja-orange/30 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm font-semibold uppercase tracking-wider text-white/50 group-hover:text-white/70">
                      Blog Articles
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-shreeja-orange/10 text-shreeja-orange group-hover:bg-shreeja-orange group-hover:text-white transition-all">
                      <FileText size={20} />
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-4xl font-bold tracking-tight">
                    {blogs.length}
                  </h3>
                </div>

                <div
                  onClick={() => setActiveTab("inquiries")}
                  className="group cursor-pointer rounded-xl border border-white/10 bg-white/5 p-6 hover:border-shreeja-orange/30 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm font-semibold uppercase tracking-wider text-white/50 group-hover:text-white/70">
                      Total Inquiries
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-shreeja-orange/10 text-shreeja-orange group-hover:bg-shreeja-orange group-hover:text-white transition-all">
                      <Mail size={20} />
                    </span>
                  </div>
                  <div className="mt-4 flex items-baseline gap-3">
                    <h3 className="font-display text-4xl font-bold tracking-tight">
                      {inquiries.length}
                    </h3>
                    {unreadCount > 0 && (
                      <span className="font-body text-xs font-semibold text-shreeja-orange animate-pulse">
                        ({unreadCount} unread)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Recent Inquiries List */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold uppercase tracking-wider">
                    Recent Contact Inquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab("inquiries")}
                    className="font-body text-xs font-semibold text-shreeja-orange hover:text-shreeja-orange-light flex items-center gap-1"
                  >
                    View All <ChevronRight size={14} />
                  </button>
                </div>

                <div className="mt-6 divide-y divide-white/5">
                  {inquiries.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleViewInquiry(item)}
                      className={`flex flex-col gap-3 py-4 cursor-pointer hover:bg-white/5 px-3 rounded-lg transition-colors sm:flex-row sm:items-center sm:justify-between ${
                        !item.read ? "bg-white/5 border-l-2 border-shreeja-orange" : ""
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h4 className="font-body text-sm font-semibold text-white">
                            {item.name}
                          </h4>
                          {!item.read && (
                            <span className="rounded bg-shreeja-orange/15 px-1.5 py-0.5 font-body text-[10px] font-bold text-shreeja-orange uppercase">
                              New
                            </span>
                          )}
                        </div>
                        <p className="mt-1 font-body text-xs text-white/50 max-w-lg truncate">
                          {item.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-right">
                        <span className="font-body text-xs text-white/40">
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                        <ChevronRight size={16} className="text-white/20" />
                      </div>
                    </div>
                  ))}
                  {inquiries.length === 0 && (
                    <p className="py-6 text-center font-body text-sm text-white/30">
                      No inquires received yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PORTFOLIO CRUD */}
          {activeTab === "portfolio" && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h1 className="font-display text-3xl font-bold uppercase tracking-tight">
                    Manage Portfolio
                  </h1>
                  <p className="mt-1 font-body text-sm text-white/50">
                    Add, edit, or delete case studies displayed in the portfolio list
                  </p>
                </div>
                <button
                  onClick={handleAddProject}
                  className="flex items-center justify-center gap-2 rounded-lg bg-shreeja-orange px-4 py-3 font-body text-sm font-semibold text-white shadow-md shadow-shreeja-orange/20 transition-all hover:bg-shreeja-orange-light"
                >
                  <Plus size={16} />
                  Add Project
                </button>
              </div>

              {/* Projects List Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, idx) => (
                  <div
                    key={project.slug}
                    className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-md flex flex-col"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-shreeja-navy">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 rounded bg-shreeja-navy-dark/80 px-2 py-1 font-body text-[10px] font-semibold text-white/80 backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                      <div>
                        <h3 className="font-display text-lg font-semibold truncate text-white">
                          {project.title}
                        </h3>
                        <p className="mt-1 font-body text-xs text-white/40 font-mono">
                          slug: {project.slug}
                        </p>
                      </div>

                      <div className="flex gap-2 border-t border-white/5 pt-4">
                        <button
                          onClick={() => handleEditProject(idx)}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded bg-white/5 py-2 font-body text-xs font-semibold text-white hover:bg-white/10"
                        >
                          <Edit size={12} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(idx)}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded bg-red-500/10 py-2 font-body text-xs font-semibold text-red-400 hover:bg-red-500/20"
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BLOGS CRUD */}
          {activeTab === "blogs" && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h1 className="font-display text-3xl font-bold uppercase tracking-tight">
                    Manage Blogs
                  </h1>
                  <p className="mt-1 font-body text-sm text-white/50">
                    Publish or modify articles displayed on the blogs feed
                  </p>
                </div>
                <button
                  onClick={handleAddBlog}
                  className="flex items-center justify-center gap-2 rounded-lg bg-shreeja-orange px-4 py-3 font-body text-sm font-semibold text-white shadow-md shadow-shreeja-orange/20 transition-all hover:bg-shreeja-orange-light"
                >
                  <Plus size={16} />
                  New Article
                </button>
              </div>

              {/* Blogs Feed */}
              <div className="flex flex-col gap-4">
                {blogs.map((post, idx) => (
                  <div
                    key={post.slug}
                    className="flex flex-col gap-5 rounded-xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-shreeja-navy hidden sm:block">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-display text-base font-semibold text-white">
                          {post.title}
                        </h3>
                        <p className="mt-1 font-body text-xs text-white/40">
                          {post.date} · {post.readTime}
                        </p>
                        <p className="mt-1.5 font-body text-xs text-white/60 max-w-xl line-clamp-1">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 border-t border-white/5 pt-4 sm:border-t-0 sm:pt-0">
                      <button
                        onClick={() => handleEditBlog(idx)}
                        className="flex items-center justify-center gap-1.5 rounded bg-white/5 px-4 py-2 font-body text-xs font-semibold text-white hover:bg-white/10"
                      >
                        <Edit size={12} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(idx)}
                        className="flex items-center justify-center gap-1.5 rounded bg-red-500/10 px-4 py-2 font-body text-xs font-semibold text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 size={12} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: INQUIRIES */}
          {activeTab === "inquiries" && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h1 className="font-display text-3xl font-bold uppercase tracking-tight">
                    Contact Inquiries
                  </h1>
                  <p className="mt-1 font-body text-sm text-white/50">
                    Review and manage form inquiries sent by potential clients
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleMarkAllRead}
                    disabled={unreadCount === 0}
                    className="rounded-lg border border-white/10 px-4 py-3 font-body text-xs font-semibold text-white hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Mark All as Read
                  </button>
                </div>
              </div>

              {/* Inquiries Table */}
              <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <div className="min-w-[700px] overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5 text-xs font-bold uppercase tracking-wider text-white/50">
                        <th className="py-4 px-6">Sender</th>
                        <th className="py-4 px-6">Service</th>
                        <th className="py-4 px-6">Message Preview</th>
                        <th className="py-4 px-6">Date</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm font-body">
                      {inquiries.map((item) => (
                        <tr
                          key={item.id}
                          className={`hover:bg-white/5 transition-colors ${
                            !item.read ? "bg-white/5 border-l-2 border-shreeja-orange" : ""
                          }`}
                        >
                          <td className="py-4 px-6 font-semibold">
                            <div className="flex flex-col">
                              <span>{item.name}</span>
                              <span className="text-[10px] font-normal text-white/40">{item.email}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs text-white/80">
                              {item.service}
                            </span>
                          </td>
                          <td className="py-4 px-6 max-w-xs truncate">{item.message}</td>
                          <td className="py-4 px-6 text-white/50">
                            {new Date(item.date).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleViewInquiry(item)}
                                className="flex h-8 w-8 items-center justify-center rounded bg-white/5 hover:bg-white/10 text-white/80"
                                title="View Details"
                              >
                                <Eye size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteInquiry(item.id)}
                                className="flex h-8 w-8 items-center justify-center rounded bg-red-500/10 hover:bg-red-500/20 text-red-400"
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {inquiries.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-white/30">
                            No inquiries recorded.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* --- PORTFOLIO MODAL --- */}
      <AnimatePresence>
        {projectModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl border border-white/10 bg-shreeja-navy p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                  {projectModal.mode === "add" ? "Add New Project" : "Edit Project Details"}
                </h3>
                <button
                  onClick={() => setProjectModal({ ...projectModal, open: false })}
                  className="rounded-lg p-1 text-white/40 hover:bg-white/5 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="mt-6 flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-body text-xs font-semibold uppercase tracking-wider text-white/50">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Specials Today"
                    value={projectModal.title}
                    onChange={(e) => setProjectModal({ ...projectModal, title: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder-white/20 focus:border-shreeja-orange focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="font-body text-xs font-semibold uppercase tracking-wider text-white/50">
                      Category
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Web App Development"
                      value={projectModal.category}
                      onChange={(e) => setProjectModal({ ...projectModal, category: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder-white/20 focus:border-shreeja-orange focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-body text-xs font-semibold uppercase tracking-wider text-white/50">
                      Slug URL (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Auto-generated if blank"
                      value={projectModal.slug}
                      onChange={(e) => setProjectModal({ ...projectModal, slug: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder-white/20 focus:border-shreeja-orange focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-body text-xs font-semibold uppercase tracking-wider text-white/50">
                    Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={projectModal.image}
                    onChange={(e) => setProjectModal({ ...projectModal, image: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder-white/20 focus:border-shreeja-orange focus:outline-none"
                  />
                </div>

                <div className="mt-4 flex gap-3 border-t border-white/5 pt-5 justify-end">
                  <button
                    type="button"
                    onClick={() => setProjectModal({ ...projectModal, open: false })}
                    className="rounded-lg border border-white/10 px-5 py-3 font-body text-xs font-semibold hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-shreeja-orange px-6 py-3 font-body text-xs font-semibold text-white hover:bg-shreeja-orange-light shadow-md shadow-shreeja-orange/20"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- BLOG MODAL --- */}
      <AnimatePresence>
        {blogModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl rounded-2xl border border-white/10 bg-shreeja-navy p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                  {blogModal.mode === "add" ? "Write New Article" : "Edit Article Settings"}
                </h3>
                <button
                  onClick={() => setBlogModal({ ...blogModal, open: false })}
                  className="rounded-lg p-1 text-white/40 hover:bg-white/5 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveBlog} className="mt-6 flex flex-col gap-4 overflow-y-auto max-h-[70vh] pr-1">
                <div className="flex flex-col gap-2">
                  <label className="font-body text-xs font-semibold uppercase tracking-wider text-white/50">
                    Article Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10 Key UI/UX Principles"
                    value={blogModal.title}
                    onChange={(e) => setBlogModal({ ...blogModal, title: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder-white/20 focus:border-shreeja-orange focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="flex flex-col gap-2">
                    <label className="font-body text-xs font-semibold uppercase tracking-wider text-white/50">
                      Date Category
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. July 2026"
                      value={blogModal.date}
                      onChange={(e) => setBlogModal({ ...blogModal, date: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder-white/20 focus:border-shreeja-orange focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-body text-xs font-semibold uppercase tracking-wider text-white/50">
                      Read Time
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 5 min read"
                      value={blogModal.readTime}
                      onChange={(e) => setBlogModal({ ...blogModal, readTime: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder-white/20 focus:border-shreeja-orange focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-body text-xs font-semibold uppercase tracking-wider text-white/50">
                      Custom URL Slug (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Auto-generated if blank"
                      value={blogModal.slug}
                      onChange={(e) => setBlogModal({ ...blogModal, slug: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder-white/20 focus:border-shreeja-orange focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-body text-xs font-semibold uppercase tracking-wider text-white/50">
                    Header Banner Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={blogModal.image}
                    onChange={(e) => setBlogModal({ ...blogModal, image: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder-white/20 focus:border-shreeja-orange focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-body text-xs font-semibold uppercase tracking-wider text-white/50">
                    Short Excerpt
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Provide a brief summary of the article..."
                    value={blogModal.excerpt}
                    onChange={(e) => setBlogModal({ ...blogModal, excerpt: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder-white/20 focus:border-shreeja-orange focus:outline-none resize-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-body text-xs font-semibold uppercase tracking-wider text-white/50">
                    Detailed Rich-Text Content (Markdown or HTML supported)
                  </label>
                  <textarea
                    rows={8}
                    placeholder="Type the full body of the article here..."
                    value={blogModal.content}
                    onChange={(e) => setBlogModal({ ...blogModal, content: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder-white/20 focus:border-shreeja-orange focus:outline-none"
                  />
                </div>

                <div className="mt-4 flex gap-3 border-t border-white/5 pt-5 justify-end">
                  <button
                    type="button"
                    onClick={() => setBlogModal({ ...blogModal, open: false })}
                    className="rounded-lg border border-white/10 px-5 py-3 font-body text-xs font-semibold hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-shreeja-orange px-6 py-3 font-body text-xs font-semibold text-white hover:bg-shreeja-orange-light shadow-md shadow-shreeja-orange/20"
                  >
                    Publish Article
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- INQUIRY DETAILS VIEW MODAL --- */}
      <AnimatePresence>
        {inquiryModal.open && inquiryModal.inquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-xl rounded-2xl border border-white/10 bg-shreeja-navy p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                    Inquiry Details
                  </h3>
                  <span className="flex items-center gap-1.5 rounded-full bg-shreeja-orange/10 px-2.5 py-0.5 text-xs text-shreeja-orange">
                    <Clock size={12} />
                    {new Date(inquiryModal.inquiry.date).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={() => setInquiryModal({ open: false, inquiry: null })}
                  className="rounded-lg p-1 text-white/40 hover:bg-white/5 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-6 font-body text-sm">
                {/* Meta details */}
                <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 rounded-xl border border-white/5 bg-white/5 p-4">
                  <div>
                    <span className="text-xs text-white/40 uppercase tracking-wider">Sender Name</span>
                    <p className="font-semibold text-white mt-0.5">{inquiryModal.inquiry.name}</p>
                  </div>
                  <div>
                    <span className="text-xs text-white/40 uppercase tracking-wider">Requested Service</span>
                    <p className="mt-1">
                      <span className="rounded-full bg-shreeja-orange/20 border border-shreeja-orange/30 px-2 py-0.5 text-xs text-shreeja-orange font-semibold">
                        {inquiryModal.inquiry.service}
                      </span>
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-white/40 uppercase tracking-wider">Email Address</span>
                    <p className="text-white mt-0.5">
                      <a href={`mailto:${inquiryModal.inquiry.email}`} className="hover:text-shreeja-orange transition-colors">
                        {inquiryModal.inquiry.email}
                      </a>
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-white/40 uppercase tracking-wider">Phone Contact</span>
                    <p className="text-white mt-0.5">{inquiryModal.inquiry.phone || "Not provided"}</p>
                  </div>
                  <div className="sm:col-span-2 border-t border-white/5 pt-3">
                    <span className="text-xs text-white/40 uppercase tracking-wider">Company / Organization</span>
                    <p className="text-white mt-0.5 font-semibold">{inquiryModal.inquiry.company || "Not provided"}</p>
                  </div>
                </div>

                {/* Message block */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-white/40 uppercase tracking-wider pl-1">Client Message</span>
                  <div className="rounded-xl border border-white/5 bg-white/5 p-5 whitespace-pre-wrap leading-relaxed text-white/80">
                    {inquiryModal.inquiry.message}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-3 border-t border-white/5 pt-5 justify-between items-center">
                  <button
                    onClick={() => handleDeleteInquiry(inquiryModal.inquiry!.id)}
                    className="flex items-center gap-1.5 rounded-lg bg-red-500/10 px-4 py-3 text-xs font-semibold text-red-400 hover:bg-red-500/20"
                  >
                    <Trash2 size={14} />
                    Delete Submission
                  </button>
                  
                  <button
                    onClick={() => setInquiryModal({ open: false, inquiry: null })}
                    className="flex items-center gap-1.5 rounded-lg bg-shreeja-orange px-6 py-3 text-xs font-semibold text-white hover:bg-shreeja-orange-light shadow-md shadow-shreeja-orange/20"
                  >
                    <CheckCircle size={14} />
                    Close View
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
