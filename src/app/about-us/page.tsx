import type { Metadata } from "next";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "About Us | Shreeja Digital Agency",
  description:
    "A creative team blending global perspective with local heritage to bring your vision into reality.",
};

export default function AboutUsPage() {
  return (
    <div className="w-full bg-shreeja-navy-dark">
      <PageHeader
        dark
        subtitle="About Shreeja"
        title="Bringing Your Vision"
        highlightedTitle="Into Reality"
        description="Shreeja Digital Agency is a creative team spanning Australia and Nepal, building brands and digital products with a blend of global perspective and local heritage. We work as one connected team across design, development, and marketing — so every project moves as a single, coherent story."
      />
      <WhyChooseUs dark={false} />
      <ContactForm />
    </div>
  );
}
