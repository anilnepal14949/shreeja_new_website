import type { Metadata } from "next";
import ServicesGrid from "@/components/ServicesGrid";
import FAQSection from "@/components/FAQSection";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Services | Shreeja Digital Agency",
  description:
    "Web development, mobile apps, UI/UX design, digital marketing, branding, and SEO — six disciplines, one connected team.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        subtitle="What We Do"
        title="We Can Help You"
        highlightedTitle="With..."
        description="Six disciplines, one connected team — everything a modern brand needs to launch, grow, and stand out."
      />
      <ServicesGrid />
      <FAQSection />
      <ContactForm />
    </>
  );
}
