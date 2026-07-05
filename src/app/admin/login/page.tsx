"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, User, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect if already logged in
    const isLoggedIn = localStorage.getItem("shreeja_admin_logged_in") === "true";
    if (isLoggedIn) {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("shreeja_admin_logged_in", "true");
        router.push("/admin");
      } else {
        setError(data.error || "Invalid username or password configuration.");
        setLoading(false);
      }
    } catch (err) {
      setError("Server connection failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-shreeja-navy-dark px-6 py-12">
      {/* Background glow graphics */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,53,0.1)_0%,transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo and title */}
        <div className="flex flex-col items-center text-center">
          <Link href="/">
            <div className="rounded-md bg-shreeja-light px-3 py-2 shadow-md">
              <Image
                src="/logo_resized.png"
                alt="Shreeja Digital Agency"
                width={150}
                height={46}
                priority
                className="h-8 w-auto sm:h-9"
              />
            </div>
          </Link>
          <h1 className="mt-8 font-display text-2xl font-bold uppercase tracking-wider text-white">
            Admin Portal
          </h1>
          <p className="mt-2 font-body text-sm text-white/50">
            Sign in to manage your dynamic website content
          </p>
        </div>

        {/* Login Card */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl">
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
              >
                <AlertCircle size={18} className="shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Username Input */}
            <div className="flex flex-col gap-2">
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-white/60">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 font-body text-sm text-white placeholder-white/30 transition-all duration-200 focus:border-shreeja-orange focus:bg-white/10 focus:outline-none"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-white/60">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  required
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 font-body text-sm text-white placeholder-white/30 transition-all duration-200 focus:border-shreeja-orange focus:bg-white/10 focus:outline-none"
                />
              </div>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center rounded-lg bg-shreeja-orange py-3.5 font-body text-sm font-semibold text-white shadow-lg shadow-shreeja-orange/20 transition-all duration-200 hover:bg-shreeja-orange-light focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="font-body text-sm text-white/40 transition-colors duration-200 hover:text-shreeja-orange"
          >
            ← Back to Homepage
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
