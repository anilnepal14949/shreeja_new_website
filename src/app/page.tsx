import Hero from "@/components/Hero";
import StoryboardSection from "@/components/StoryboardSection";
import ServicesTeaser from "@/components/ServicesTeaser";
import FeaturedProjects from "@/components/FeaturedProjects";
import WhyChooseUs from "@/components/WhyChooseUs";
import FAQSection from "@/components/FAQSection";
import ContactForm from "@/components/ContactForm";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <StoryboardSection />
      <ServicesTeaser />
      <FeaturedProjects />
      <WhyChooseUs />
      <FAQSection />
      <ContactForm />
      <CTASection />
    </>
  );
}
