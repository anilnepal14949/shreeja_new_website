import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { offices } from "@/utils/constants";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Shreeja Digital Agency",
  description:
    "Get in touch with Shreeja Digital Agency — offices in Sydney, Australia and Hetauda, Nepal.",
};

export default function ContactPage() {
  return (
    <>
      <section className="w-full bg-shreeja-navy-dark py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="font-body text-sm font-medium uppercase tracking-widest text-shreeja-orange">
            Get In Touch
          </span>
          <h1 className="mt-4 font-display text-5xl font-semibold uppercase tracking-tight text-white sm:text-7xl">
            Let&apos;s Start a{" "}
            <span className="text-shreeja-orange">Conversation</span>
          </h1>
          <p className="mt-6 font-body text-base font-normal text-white/60 sm:text-lg">
            Tell us where you want to go — we&apos;ll help you write the next
            chapter of your brand&apos;s story.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-8 px-6 sm:grid-cols-2">
          {offices.map((office) => (
            <div
              key={office.country}
              className="rounded-lg border border-white/10 bg-white/5 p-8"
            >
              <h2 className="font-display text-xl font-semibold text-white">
                {office.country}
              </h2>
              <ul className="mt-5 flex flex-col gap-3 font-body text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-shreeja-orange" />
                  {office.address}
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="shrink-0 text-shreeja-orange" />
                  {office.phone}
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="shrink-0 text-shreeja-orange" />
                  <a
                    href={`mailto:${office.email}`}
                    className="transition-colors duration-200 hover:text-shreeja-orange"
                  >
                    {office.email}
                  </a>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </section>
      <ContactForm />
    </>
  );
}
