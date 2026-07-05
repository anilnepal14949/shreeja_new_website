"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    try {
      // 1. Sync to client LocalStorage for instant dynamic browser demo
      const localInquiriesRaw = localStorage.getItem("shreeja_inquiries") || "[]";
      const localInquiries = JSON.parse(localInquiriesRaw);
      const newInquiry = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        message,
        service: "General Inquiry",
        date: new Date().toISOString(),
        read: false
      };
      localStorage.setItem("shreeja_inquiries", JSON.stringify([newInquiry, ...localInquiries]));

      // 2. Post to backend REST API route handler
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          service: "General Inquiry"
        })
      });

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact-form" className="w-full bg-shreeja-navy-dark py-24">
      <div className="mx-auto max-w-2xl px-6">
        <div className="text-center">
          <span className="font-body text-sm font-medium uppercase tracking-widest text-shreeja-orange">
            Get In Touch
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl">
            Tell Us About Your Project
          </h2>
          <p className="mt-4 font-body text-sm text-white/60 sm:text-base">
            We will answer your questions via email within 24 hours.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center py-8 text-center text-white"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-shreeja-orange/10 text-shreeja-orange"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <h3 className="mt-6 font-display text-2xl font-semibold">
                  Inquiry Sent Successfully!
                </h3>
                <p className="mt-3 max-w-md font-body text-sm text-white/60">
                  Thank you for reaching out. We have received your details and our team will get back to you shortly.
                </p>
                
                <div className="mt-8 rounded-lg bg-white/5 p-4 text-xs text-white/40">
                  <p>
                    If your email client did not launch automatically, you can email us directly at:
                  </p>
                  <a
                    href="mailto:contact@shreejadigital.com"
                    className="mt-2 block font-body font-semibold text-shreeja-orange hover:underline"
                  >
                    contact@shreejadigital.com
                  </a>
                </div>
                
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 rounded-full border border-white/20 px-6 py-2 font-body text-xs font-semibold uppercase tracking-wider text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="font-body text-xs font-semibold uppercase tracking-wider text-white/50"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      required
                      disabled={status === "sending"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-white/30 focus:border-shreeja-orange focus:outline-none disabled:opacity-50"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="font-body text-xs font-semibold uppercase tracking-wider text-white/50"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      disabled={status === "sending"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-white/30 focus:border-shreeja-orange focus:outline-none disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="font-body text-xs font-semibold uppercase tracking-wider text-white/50"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    disabled={status === "sending"}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project..."
                    className="resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-white/30 focus:border-shreeja-orange focus:outline-none disabled:opacity-50"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-shreeja-orange px-8 py-4 font-body text-base font-semibold text-white shadow-lg shadow-shreeja-orange/30 transition-colors duration-200 hover:bg-shreeja-orange-light disabled:cursor-not-allowed disabled:bg-shreeja-orange/50"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
